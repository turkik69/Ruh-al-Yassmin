const MATERIAL_IDS=['bergamot','lemon','lavender','rose','jasmine','cardamom','saffron','cedar','sandal','oud','amber','vanilla','musk','leather','neroli'];

export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS');
  res.setHeader('Cache-Control','no-store');
  if(req.method==='OPTIONS') return res.status(204).end();
  if(req.method!=='POST') return res.status(405).json({error:'METHOD_NOT_ALLOWED'});
  if(!process.env.OPENAI_API_KEY) return res.status(503).json({error:'AI_NOT_CONFIGURED'});

  const prompt=String(req.body?.prompt||'').slice(0,5000);
  const context=req.body?.context||{};
  if(!prompt) return res.status(400).json({error:'EMPTY_PROMPT'});

  const instructions=`أنت خبير عطور داخل تطبيق "روح الياسمين". اقترح صيغة عطرية تجريبية فقط من المعرفات التالية: ${MATERIAL_IDS.join(', ')}. اجعل مجموع النسب 100، وعدد المواد 5 إلى 8. أعد JSON فقط بالشكل {"name":"","mood":"","occasion":"","rationale":"","notes":[{"id":"bergamot","pct":15}]}. لا تدّع أن النسب آمنة للاستخدام الجلدي بمجرد اقتراحها؛ اجعل rationale يذكر مراجعة IFRA وSDS وحدود المورد وإجراء اختبار مناسب قبل الاستخدام.`;

  const r=await fetch('https://api.openai.com/v1/responses',{
    method:'POST',
    headers:{'Authorization':'Bearer '+process.env.OPENAI_API_KEY,'Content-Type':'application/json'},
    body:JSON.stringify({
      model:process.env.OPENAI_MODEL||'gpt-5.6-luna',
      input:[
        {role:'system',content:instructions},
        {role:'user',content:JSON.stringify({request:prompt,context})}
      ]
    })
  });
  const raw=await r.json();
  if(!r.ok) return res.status(r.status).json({error:'OPENAI_ERROR',details:raw?.error?.message||'Request failed'});

  let text=typeof raw.output_text==='string'?raw.output_text:'';
  if(!text){
    for(const item of raw.output||[]){
      for(const c of item.content||[]){
        if(c.type==='output_text'&&typeof c.text==='string'){text=c.text;break;}
      }
      if(text)break;
    }
  }

  try{
    const clean=text.replace(/^\`\`\`json\s*/i,'').replace(/\`\`\`$/,'').trim();
    const out=JSON.parse(clean);
    out.notes=(out.notes||[]).filter(n=>MATERIAL_IDS.includes(n.id)).map(n=>({id:n.id,pct:Number(n.pct)||0}));
    return res.status(200).json(out);
  }catch{
    return res.status(502).json({error:'MODEL_FORMAT'});
  }
}