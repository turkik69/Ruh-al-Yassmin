const MATERIAL_IDS=['bergamot','lemon','lavender','rose','jasmine','cardamom','saffron','cedar','sandal','oud','amber','vanilla','musk','leather','neroli','patchouli','vetiver','blackpepper','clove','cinnamon','cypriol','guaiac','frankincense'];

const GEMINI_MODEL=process.env.GEMINI_MODEL||'gemini-3.5-flash-lite';
function geminiUrl(){
  return 'https://generativelanguage.googleapis.com/v1beta/models/'+encodeURIComponent(GEMINI_MODEL)+':generateContent';
}
function extractGeminiText(raw){
  return (raw?.candidates?.[0]?.content?.parts||[]).map(p=>p?.text||'').join('').trim();
}
function inferRequestProfile(text){
  const t=String(text||'').toLowerCase();
  let p={projection:'medium',perfume_class:'edp',concentration:20,longevity_hours:8,
    reason:'وصف متوازن لا يطلب خفة شديدة ولا قوة مبالغًا فيها.',
    preferred:['bergamot','cardamom','cedar','sandal','musk']};

  if(/خفيف|خفيفة|لطيف|لطيفة|صيفي|صيفية|نهاري|نهارية|منعش|منعشة/.test(t)){
    p={projection:'soft',perfume_class:'edt',concentration:11,longevity_hours:5,
      reason:'الوصف يطلب حضورًا خفيفًا ومرنًا؛ لذلك تم خفض التركيز والفوحان.',
      preferred:['bergamot','lemon','neroli','lavender','cedar']};
  }
  if(/ناعم|ناعمة|هادئ|هادئة|راقي|راقية|نظيف|نظيفة/.test(t)){
    p={projection:'soft',perfume_class:'edp',concentration:17,longevity_hours:7,
      reason:'الوصف ناعم وهادئ لكنه ليس ضعيفًا؛ لذلك تم الحفاظ على ثبات جيد مع فوحان قريب.',
      preferred:['neroli','jasmine','lavender','sandal','musk']};
  }
  if(/قوي جدًا|قوية جدًا|فواح جدًا|فوحان قوي جدًا|صارخ|حاد جدًا|مزعج|مزعجة/.test(t)){
    p={projection:'very-strong',perfume_class:'edp',concentration:18,longevity_hours:7,
      reason:'الوصف يطلب انتشارًا حادًا وملحوظًا؛ لذلك رُفع الفوحان مع إبقاء التركيز متوسطًا حتى لا يصبح العطر مكتومًا.',
      preferred:['blackpepper','bergamot','cardamom','cedar','patchouli']};
  } else if(/قوي|قوية|فواح|فواحة|واضح|واضحة|حضور/.test(t)){
    p={projection:'strong',perfume_class:'edp',concentration:22,longevity_hours:9,
      reason:'الوصف يطلب حضورًا واضحًا وفوحانًا قويًا مع ثبات جيد.',
      preferred:['bergamot','blackpepper','cardamom','patchouli','amber','cedar']};
  }
  if(/ثابت جدًا|ثبات طويل|يدوم طويلًا|مركز جدًا|ثقيل جدًا/.test(t)){
    p={projection:/فواح|قوي|صارخ|مزعج/.test(t)?'strong':'medium',perfume_class:'perfume',concentration:32,longevity_hours:14,
      reason:'الطلب يركز على الثبات والعمق أكثر من الانتشار، لذلك ارتفع التركيز مع قاعدة أثقل.',
      preferred:['patchouli','oud','amber','sandal','musk','frankincense']};
  } else if(/ثابت|ثبات|ثقيل|ثقيلة|مركز|مركزة|عود|دخاني|دخانية/.test(t)){
    p={projection:/فواح|قوي/.test(t)?'strong':'medium',perfume_class:'perfume',concentration:28,longevity_hours:12,
      reason:'الوصف يميل لقاعدة ثقيلة وثبات أطول، لذلك تم رفع نسبة الخلاصة.',
      preferred:['patchouli','oud','amber','sandal','vetiver','frankincense']};
  }
  if(/كولونيا|cologne/.test(t)){
    p={projection:'soft',perfume_class:'edc',concentration:7,longevity_hours:3,
      reason:'تم طلب طابع كولونيا خفيف وسريع ومنعش.',
      preferred:['lemon','bergamot','neroli','lavender']};
  }
  return p;
}
function normalizeNotes(notes){
  const valid=(notes||[]).filter(n=>MATERIAL_IDS.includes(n.id)).map(n=>({id:n.id,pct:Math.max(0,Number(n.pct)||0)}));
  const total=valid.reduce((s,n)=>s+n.pct,0)||1;
  const out=valid.map(n=>({id:n.id,pct:Math.round(n.pct/total*1000)/10}));
  if(out.length){
    const fix=100-out.reduce((s,n)=>s+n.pct,0);
    out[out.length-1].pct=Math.round((out[out.length-1].pct+fix)*10)/10;
  }
  return out;
}
function enforceProfileNotes(notes,profile){
  let out=normalizeNotes(notes);
  const have=new Set(out.map(n=>n.id));
  const missing=profile.preferred.filter(id=>!have.has(id)).slice(0,2);
  for(const id of missing){
    if(out.length>=8){
      out.sort((a,b)=>a.pct-b.pct);
      out.shift();
    }
    out.push({id,pct:8});
  }
  return normalizeNotes(out);
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
  const requestProfile=inferRequestProfile(prompt);

  const instructions=`أنت خبير عطور داخل تطبيق "روح الياسمين". ابنِ وصفة جديدة اعتمادًا على وصف المستخدم الحالي فقط، ولا تورث إعدادات من طلب سابق إلا إذا كان mode=review. استخدم فقط المعرفات التالية للمواد: ${MATERIAL_IDS.join(', ')}. اجعل مجموع نسب notes = 100، وعدد المواد 5 إلى 8. استنتج الأداء ديناميكيًا من وصف المستخدم: projection واحدة من soft, medium, strong, very-strong؛ perfume_class واحدة من edc, edt, edp, perfume؛ concentration رقم بين 5 و40؛ longevity_hours رقم تقريبي بين 2 و16. اختر القيم من وصف المستخدم نفسه ولا تجعلها ثابتة، ولا تعتبر التركيز العالي مرادفًا تلقائيًا للفوحان العالي. أعد JSON فقط بالشكل {"name":"","mood":"","occasion":"","rationale":"","projection":"medium","perfume_class":"edp","concentration":20,"longevity_hours":8,"performance_reason":"","notes":[{"id":"bergamot","pct":15}]}. لا تدّع أن النسب آمنة للاستخدام الجلدي بمجرد اقتراحها؛ اجعل rationale يذكر مراجعة IFRA وSDS وحدود المورد وإجراء اختبار مناسب قبل الاستخدام.`;

  const r=await fetch(geminiUrl(),{
    method:'POST',
    headers:{'x-goog-api-key':process.env.GEMINI_API_KEY,'Content-Type':'application/json'},
    body:JSON.stringify({
      contents:[{role:'user',parts:[{text:instructions+'\n\nطلب المستخدم وسياقه:\n'+JSON.stringify({request:prompt,context,performance_hint:requestProfile})}]}],
      generationConfig:{responseMimeType:'application/json',temperature:0.35,maxOutputTokens:1200}
    })
  });
  const raw=await r.json().catch(()=>({}));
  if(!r.ok) return res.status(r.status).json({error:'GEMINI_ERROR',details:raw?.error?.message||'Request failed',provider:'gemini'});

  try{
    const out=parseJsonText(extractGeminiText(raw));
    out.notes=enforceProfileNotes(out.notes,requestProfile);
    // الأداء النهائي يتبع وصف المستخدم مباشرة؛ Gemini يحدد الصياغة والمكونات داخل هذا الهدف.
    out.projection=requestProfile.projection;
    out.perfume_class=requestProfile.perfume_class;
    out.concentration=requestProfile.concentration;
    out.longevity_hours=requestProfile.longevity_hours;
    out.performance_reason=requestProfile.reason;
    return res.status(200).json(out);
  }catch{
    return res.status(502).json({error:'MODEL_FORMAT',provider:'gemini'});
  }
}