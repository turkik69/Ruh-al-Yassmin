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

  const instructions=`أنت خبير عطور داخل تطبيق "روح الياسمين". ابنِ وصفة جديدة اعتمادًا على وصف المستخدم الحالي فقط، ولا تورث إعدادات من طلب سابق إلا إذا كان mode=review. استخدم فقط المعرفات التالية للمواد: ${MATERIAL_IDS.join(', ')}. اجعل مجموع نسب notes = 100، وعدد المواد 5 إلى 8. استنتج الأداء ديناميكيًا من وصف المستخدم: projection واحدة من soft, medium, strong, very-strong؛ perfume_class واحدة من edc, edt, edp, perfume؛ concentration رقم بين 5 و40؛ longevity_hours رقم تقريبي بين 2 و16. اختر القيم من وصف المستخدم نفسه ولا تجعلها ثابتة، ولا تعتبر التركيز العالي مرادفًا تلقائيًا للفوحان العالي. أعد JSON فقط بالشكل {"name":"","mood":"","occasion":"","rationale":"","projection":"medium","perfume_class":"edp","concentration":20,"longevity_hours":8,"performance_reason":"","notes":[{"id":"bergamot","pct":15}]}. لا تدّع أن النسب آمنة للاستخدام الجلدي بمجرد اقتراحها؛ اجعل rationale يذكر مراجعة IFRA وSDS وحدود المورد وإجراء اختبار مناسب قبل الاستخدام.`;

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
    const projections=['soft','medium','strong','very-strong'];
    const classes=['edc','edt','edp','perfume'];
    if(!projections.includes(out.projection))out.projection='medium';
    if(!classes.includes(out.perfume_class))out.perfume_class='edp';
    out.concentration=Math.max(5,Math.min(40,Number(out.concentration)||20));
    out.longevity_hours=Math.max(2,Math.min(16,Number(out.longevity_hours)||8));
    out.performance_reason=String(out.performance_reason||'').slice(0,500);
    return res.status(200).json(out);
  }catch{
    return res.status(502).json({error:'MODEL_FORMAT',provider:'gemini'});
  }
}