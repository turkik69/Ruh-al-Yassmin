const GEMINI_MODEL=process.env.GEMINI_MODEL||'gemini-3.5-flash-lite';
function geminiUrl(){
  return 'https://generativelanguage.googleapis.com/v1beta/models/'+encodeURIComponent(GEMINI_MODEL)+':generateContent';
}
function extractGeminiText(raw){
  return (raw?.candidates?.[0]?.content?.parts||[]).map(p=>p?.text||'').join('').trim();
}
function parseJsonText(text){
  const clean=String(text||'').replace(/^```json\s*/i,'').replace(/```$/,'').trim();
  const first=clean.indexOf('{'),last=clean.lastIndexOf('}');
  return JSON.parse(first>=0&&last>first?clean.slice(first,last+1):clean);
}
function imagePartFromDataUrl(image){
  if(!image||typeof image!=='string')return null;
  const m=image.match(/^data:([^;]+);base64,(.+)$/);
  if(!m)return null;
  return {inline_data:{mime_type:m[1],data:m[2]}};
}
function geminiSources(raw){
  const chunks=raw?.candidates?.[0]?.groundingMetadata?.groundingChunks||[];
  const seen=new Set(),out=[];
  for(const c of chunks){
    const w=c?.web;if(!w?.uri||seen.has(w.uri))continue;
    seen.add(w.uri);out.push({title:w.title||w.uri,url:w.uri});
  }
  return out.slice(0,10);
}
function decodeHtml(s=''){
  return String(s).replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
}
function metaValue(html,key){
  const escaped=key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const a=new RegExp('<meta[^>]+(?:property|name)=["\\']'+escaped+'["\\'][^>]+content=["\\']([^"\\']+)["\\'][^>]*>','i');
  const b=new RegExp('<meta[^>]+content=["\\']([^"\\']+)["\\'][^>]+(?:property|name)=["\\']'+escaped+'["\\'][^>]*>','i');
  return decodeHtml((html.match(a)||html.match(b)||[])[1]||'');
}
async function fetchPageMeta(url){
  try{
    const r=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0 RuhAlYassmin/2.0'},redirect:'follow'});
    if(!r.ok)return null;
    const type=String(r.headers.get('content-type')||'');
    if(!type.includes('text/html'))return null;
    const html=(await r.text()).slice(0,700000);
    let image=metaValue(html,'og:image')||metaValue(html,'twitter:image')||metaValue(html,'twitter:image:src');
    const title=metaValue(html,'og:title')||decodeHtml((html.match(/<title[^>]*>([^<]{1,250})<\/title>/i)||[])[1]||'');
    if(!image){
      const j=html.match(/"image"\s*:\s*(?:\[\s*)?["'](https?:\\?\/\\?\/[^"']+)["']/i);
      if(j?.[1])image=j[1].replace(/\\\//g,'/');
    }
    if(image){try{image=new URL(image,r.url||url).href}catch{}}
    return {url:r.url||url,title,image};
  }catch{return null}
}
function words(s){
  return String(s||'').toLowerCase().normalize('NFKD').replace(/[^a-z0-9\u0600-\u06ff]+/g,' ').trim().split(/\s+/).filter(x=>x.length>1);
}
function candidateScore(candidate,meta){
  const wanted=new Set(words([candidate.brand,candidate.product_name,candidate.concentration,candidate.year].filter(Boolean).join(' ')));
  const hay=new Set(words((meta?.title||'')+' '+(meta?.url||'')));
  let score=0;for(const w of wanted)if(hay.has(w))score++;
  return score;
}
async function findReferenceImage(sources){
  const metas=await Promise.all((sources||[]).slice(0,6).map(x=>fetchPageMeta(x?.url)));
  return metas.find(x=>x?.image)?.image||'';
}
async function callGeminiRobust(parts,{search=true,maxOutputTokens=1200,temperature=.2}={}){
  const makeBody=(withSearch)=>({
    contents:[{role:'user',parts}],
    ...(withSearch?{tools:[{google_search:{}}]}:{}),
    generationConfig:{temperature,maxOutputTokens}
  });
  let r=await fetch(geminiUrl(),{
    method:'POST',
    headers:{'x-goog-api-key':process.env.GEMINI_API_KEY,'Content-Type':'application/json'},
    body:JSON.stringify(makeBody(search))
  });
  let raw=await r.json().catch(()=>({}));
  if(!r.ok&&search){
    r=await fetch(geminiUrl(),{
      method:'POST',
      headers:{'x-goog-api-key':process.env.GEMINI_API_KEY,'Content-Type':'application/json'},
      body:JSON.stringify(makeBody(false))
    });
    raw=await r.json().catch(()=>({}));
  }
  return {r,raw};
}
async function exactCandidateImage(candidate){
  try{
    const q=[candidate.brand,candidate.product_name,candidate.concentration,candidate.year].filter(Boolean).join(' ');
    const prompt='Find the exact perfume product page or a reputable perfume database page for: '+q+'. Focus on the exact edition and bottle. Reply with one short sentence only.';
    const {r,raw}=await callGeminiRobust([{text:prompt}],{search:true,maxOutputTokens:80,temperature:0});
    if(!r.ok)return '';
    return await findReferenceImage(geminiSources(raw));
  }catch{return ''}
}
async function enrichCandidateImages(candidates,initialSources){
  const sourceMetas=(await Promise.all((initialSources||[]).slice(0,8).map(x=>fetchPageMeta(x?.url)))).filter(Boolean);
  const out=candidates.map(x=>({...x,image_url:''}));
  for(const c of out){
    let best=null,bestScore=0;
    for(const m of sourceMetas){
      const score=candidateScore(c,m);
      if(m?.image&&score>bestScore){best=m;bestScore=score}
    }
    if(bestScore>=2)c.image_url=best.image;
  }
  let next=0;
  async function worker(){
    while(next<out.length){
      const i=next++;
      if(out[i].image_url)continue;
      out[i].image_url=await exactCandidateImage(out[i]);
    }
  }
  await Promise.all([worker(),worker()]);
  return out;
}
export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS');
  res.setHeader('Cache-Control','no-store');
  if(req.method==='OPTIONS') return res.status(204).end();
  if(req.method!=='POST') return res.status(405).json({error:'METHOD_NOT_ALLOWED'});
  if(!process.env.GEMINI_API_KEY) return res.status(503).json({error:'AI_NOT_CONFIGURED',provider:'gemini'});

  const image=req.body?.image||null;
  const name=String(req.body?.name||'').slice(0,300);
  if(!image&&!name) return res.status(400).json({error:'IMAGE_OR_NAME_REQUIRED'});

  const materials=['bergamot','lemon','lavender','rose','jasmine','cardamom','saffron','cedar','sandal','oud','amber','vanilla','musk','leather','neroli','patchouli','vetiver','blackpepper','clove','cinnamon','cypriol','guaiac','frankincense'];
  const mode=String(req.body?.mode||'identify');
  const selected=req.body?.selected||null;

  if(mode==='search'&&name&&!image){
    const prompt='أنت باحث متخصص في العطور. ابحث على الويب عن المنتجات والإصدارات المحتملة التي تطابق الاسم: "'+name+'". ميّز الإصدارات التي تتشابه أسماؤها حسب العلامة والتركيز والسنة. أعد JSON فقط بالشكل {"mode":"candidates","query":"'+name+'","candidates":[{"brand":"","product_name":"","concentration":"","year":"","disambiguation":""}]}. أعط حتى 8 نتائج حقيقية مختلفة ولا تكرر نفس المنتج.';
    const {r,raw}=await callGeminiRobust([{text:prompt}],{search:true,maxOutputTokens:1400,temperature:.15});
    if(!r.ok)return res.status(r.status).json({error:'GEMINI_ERROR',details:raw?.error?.message||'Search failed',provider:'gemini'});
    try{
      const out=parseJsonText(extractGeminiText(raw));
      const candidates=(Array.isArray(out.candidates)?out.candidates:[]).slice(0,8).map(x=>({
        brand:String(x.brand||'').slice(0,120),
        product_name:String(x.product_name||'').slice(0,180),
        concentration:String(x.concentration||'').slice(0,80),
        year:String(x.year||'').slice(0,20),
        disambiguation:String(x.disambiguation||'').slice(0,240)
      })).filter(x=>x.product_name);
      const sources=geminiSources(raw);
      const enriched=await enrichCandidateImages(candidates,sources);
      return res.status(200).json({mode:'candidates',query:name,candidates:enriched,sources});
    }catch{return res.status(502).json({error:'MODEL_FORMAT',provider:'gemini'});}
  }

  const prompt=`أنت خبير عطور وباحث منتجات.
1) إذا أُرفقت صورة، تعرّف على اسم العطر والعلامة التجارية من شكل الزجاجة والنص الظاهر واذكر درجة الثقة.
2) استخدم Google Search للتحقق من المنتج والنوتات المنشورة عنه.
3) لا تدّع معرفة الصيغة التجارية السرية.
4) ابنِ صيغة مستوحاة من 5 إلى 8 مواد فقط من: ${materials.join(', ')} ومجموعها 100.
5) أعد JSON فقط:
{"brand":"","product_name":"","confidence":"high|medium|low","top_notes":[],"heart_notes":[],"base_notes":[],"accords":[],"rationale":"","clone_notes":[{"id":"bergamot","pct":15}]}
اسم يدوي اختياري: ${name||'غير مذكور'}
${selected?'هذا هو المنتج الذي اختاره المستخدم تحديدًا: '+JSON.stringify(selected):''}`;

  const parts=[{text:prompt}];
  const ip=imagePartFromDataUrl(image);if(ip)parts.push(ip);
  const {r,raw}=await callGeminiRobust(parts,{search:true,maxOutputTokens:1600,temperature:.2});
  if(!r.ok)return res.status(r.status).json({error:'GEMINI_ERROR',details:raw?.error?.message||'Request failed',provider:'gemini'});
  try{
    const out=parseJsonText(extractGeminiText(raw));
    out.clone_notes=(out.clone_notes||[]).filter(n=>materials.includes(n.id)).map(n=>({id:n.id,pct:Number(n.pct)||0}));
    out.sources=geminiSources(raw);
    out.image_url=String(selected?.image_url||out.image_url||await findReferenceImage(out.sources)||'');
    return res.status(200).json(out);
  }catch{return res.status(502).json({error:'MODEL_FORMAT',provider:'gemini',sources:geminiSources(raw)});}
}