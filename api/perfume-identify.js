
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
  return out.slice(0,6);
}
async function findReferenceImage(sources){
  const urls=(sources||[]).map(x=>x?.url).filter(Boolean).slice(0,4);
  for(const url of urls){
    try{
      const r=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0 RuhAlYassmin/1.0'},redirect:'follow'});
      if(!r.ok)continue;
      const html=(await r.text()).slice(0,500000);
      const m=html.match(/<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image(?::src)?)["'][^>]+content=["']([^"']+)["'][^>]*>/i)
        || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["'](?:og:image|twitter:image(?::src)?)["'][^>]*>/i);
      if(m?.[1]){
        try{return new URL(m[1],url).href}catch{return m[1]}
      }
    }catch{}
  }
  return '';
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
    const prompt='أنت باحث متخصص في العطور. ابحث على الويب عن جميع المنتجات المحتملة التي تطابق الاسم: "'+name+'". أعد JSON فقط بالشكل {"mode":"candidates","query":"'+name+'","candidates":[{"brand":"","product_name":"","concentration":"","year":"","disambiguation":""}]}. أعط حتى 10 نتائج حقيقية مختلفة ولا تكرر نفس المنتج، وافصل الإصدارات المختلفة.';
    const {r,raw}=await callGeminiRobust([{text:prompt}],{search:true,maxOutputTokens:1200,temperature:.2});
    if(!r.ok)return res.status(r.status).json({error:'GEMINI_ERROR',details:raw?.error?.message||'Search failed',provider:'gemini'});
    try{
      const out=parseJsonText(extractGeminiText(raw));
      const candidates=(Array.isArray(out.candidates)?out.candidates:[]).slice(0,10).map(x=>({
        brand:String(x.brand||'').slice(0,120),
        product_name:String(x.product_name||'').slice(0,180),
        concentration:String(x.concentration||'').slice(0,80),
        year:String(x.year||'').slice(0,20),
        disambiguation:String(x.disambiguation||'').slice(0,240)
      })).filter(x=>x.product_name);
      const sources=geminiSources(raw);
      const refImage=await findReferenceImage(sources);
      const enriched=candidates.map(x=>({...x,image_url:x.image_url||refImage||''}));
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
    out.image_url=String(out.image_url||selected?.image_url||await findReferenceImage(out.sources)||'');
    return res.status(200).json(out);
  }catch{return res.status(502).json({error:'MODEL_FORMAT',provider:'gemini',sources:geminiSources(raw)});}
}