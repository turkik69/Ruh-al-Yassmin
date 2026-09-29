
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
    const r=await fetch(geminiUrl(),{
      method:'POST',
      headers:{'x-goog-api-key':process.env.GEMINI_API_KEY,'Content-Type':'application/json'},
      body:JSON.stringify({
        contents:[{role:'user',parts:[{text:prompt}]}],
        tools:[{google_search:{}}],
        generationConfig:{responseMimeType:'application/json',temperature:0.2,maxOutputTokens:1200}
      })
    });
    const raw=await r.json().catch(()=>({}));
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
      return res.status(200).json({mode:'candidates',query:name,candidates,sources:geminiSources(raw)});
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
  const r=await fetch(geminiUrl(),{
    method:'POST',
    headers:{'x-goog-api-key':process.env.GEMINI_API_KEY,'Content-Type':'application/json'},
    body:JSON.stringify({
      contents:[{role:'user',parts}],
      tools:[{google_search:{}}],
      generationConfig:{responseMimeType:'application/json',temperature:0.2,maxOutputTokens:1600}
    })
  });
  const raw=await r.json().catch(()=>({}));
  if(!r.ok)return res.status(r.status).json({error:'GEMINI_ERROR',details:raw?.error?.message||'Request failed',provider:'gemini'});
  try{
    const out=parseJsonText(extractGeminiText(raw));
    out.clone_notes=(out.clone_notes||[]).filter(n=>materials.includes(n.id)).map(n=>({id:n.id,pct:Number(n.pct)||0}));
    out.sources=geminiSources(raw);
    return res.status(200).json(out);
  }catch{return res.status(502).json({error:'MODEL_FORMAT',provider:'gemini',sources:geminiSources(raw)});}
}