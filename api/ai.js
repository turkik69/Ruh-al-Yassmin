const MATERIAL_IDS=['bergamot','lemon','lavender','rose','jasmine','cardamom','saffron','cedar','sandal','oud','amber','vanilla','musk','leather','neroli','patchouli','vetiver','blackpepper','clove','cinnamon','cypriol','guaiac','frankincense'];

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

export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS');
  res.setHeader('Cache-Control','no-store');
  if(req.method==='OPTIONS') return res.status(204).end();
  if(req.method!=='POST') return res.status(405).json({error:'METHOD_NOT_ALLOWED'});
  if(!process.env.GEMINI_API_KEY) return res.status(503).json({error:'AI_NOT_CONFIGURED',provider:'gemini'});

  const prompt=String(req.body?.prompt||'').slice(0,5000);
  const context=req.body?.context||{};
  if(!prompt) return res.status(400).json({error:'EMPTY_PROMPT'});

  const instructions=`أنت خبير عطور داخل تطبيق "روح الياسمين". اقترح صيغة عطرية تجريبية فقط من المعرفات التالية: ${MATERIAL_IDS.join(', ')}. اجعل مجموع النسب 100، وعدد المواد 5 إلى 8. أعد JSON فقط بالشكل {"name":"","mood":"","occasion":"","rationale":"","notes":[{"id":"bergamot","pct":15}]}. لا تدّع أن النسب آمنة للاستخدام الجلدي بمجرد اقتراحها؛ اجعل rationale يذكر مراجعة IFRA وSDS وحدود المورد وإجراء اختبار مناسب قبل الاستخدام.`;

  const r=await fetch(geminiUrl(),{
    method:'POST',
    headers:{'x-goog-api-key':process.env.GEMINI_API_KEY,'Content-Type':'application/json'},
    body:JSON.stringify({
      contents:[{role:'user',parts:[{text:instructions+'\n\nطلب المستخدم وسياقه:\n'+JSON.stringify({request:prompt,context})}]}],
      generationConfig:{responseMimeType:'application/json',temperature:0.35,maxOutputTokens:1200}
    })
  });
  const raw=await r.json().catch(()=>({}));
  if(!r.ok) return res.status(r.status).json({error:'GEMINI_ERROR',details:raw?.error?.message||'Request failed',provider:'gemini'});

  try{
    const out=parseJsonText(extractGeminiText(raw));
    out.notes=(out.notes||[]).filter(n=>MATERIAL_IDS.includes(n.id)).map(n=>({id:n.id,pct:Number(n.pct)||0}));
    return res.status(200).json(out);
  }catch{
    return res.status(502).json({error:'MODEL_FORMAT',provider:'gemini'});
  }
}