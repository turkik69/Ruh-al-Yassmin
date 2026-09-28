const MATERIAL_IDS=["bergamot","lemon","lavender","rose","jasmine","cardamom","saffron","cedar","sandal","oud","amber","vanilla","musk","leather","neroli"];

export async function onRequestPost(context){
  const {request,env}=context;
  if(!env.OPENAI_API_KEY) return respond({error:"AI_NOT_CONFIGURED"},503);
  let body;
  try{body=await request.json()}catch{return respond({error:"BAD_JSON"},400)}
  const prompt=String(body?.prompt||"").slice(0,4000);
  if(!prompt) return respond({error:"EMPTY_PROMPT"},400);

  const instructions = "أنت خبير تصميم عطور داخل تطبيق شخصي اسمه روح الياسمين. استخدم فقط معرفات المواد التالية: "+MATERIAL_IDS.join(", ")+". ابنِ تركيبة أولية من 5 إلى 7 مواد ومجموع النسب 100. أعد JSON فقط بهذا الشكل: {\"name\":\"اسم عربي قصير\",\"mood\":\"طابع\",\"occasion\":\"استخدام\",\"rationale\":\"شرح عربي موجز\",\"notes\":[{\"id\":\"bergamot\",\"pct\":15}]}. لا تقترح مواد خارج القائمة. اجعل الاقتراح إبداعيًا لكنه واقعيًا كنقطة بداية تجريبية، واذكر في rationale ضرورة مراجعة IFRA/SDS واختبار التوافق قبل الاستخدام الفعلي.";

  const payload={
    model:env.OPENAI_MODEL||"gpt-6-astra",
    input:[
      {role:"system",content:instructions},
      {role:"user",content:JSON.stringify({request:prompt,context:body?.context||{}})}
    ]
  };

  const r=await fetch("https://api.openai.com/v1/responses",{
    method:"POST",
    headers:{"Authorization":"Bearer "+env.OPENAI_API_KEY,"Content-Type":"application/json"},
    body:JSON.stringify(payload)
  });

  const raw=await r.json();
  if(!r.ok) return respond({error:"OPENAI_ERROR",details:raw?.error?.message||"Request failed"},r.status);

  let text="";
  if(typeof raw?.output_text==="string") text=raw.output_text;
  if(!text){
    for(const item of raw?.output||[]){
      for(const c of item?.content||[]){
        if(c?.type==="output_text"&&typeof c.text==="string"){text=c.text;break;}
      }
      if(text) break;
    }
  }

  try{
    const clean=text.replace(/^\`\`\`json\s*/i,"").replace(/\`\`\`$/,"").trim();
    const out=JSON.parse(clean);
    if(!Array.isArray(out.notes)) throw new Error("notes");
    out.notes=out.notes.filter(n=>MATERIAL_IDS.includes(n.id)).map(n=>({id:n.id,pct:Number(n.pct)||0}));
    return respond(out,200);
  }catch{
    return respond({error:"MODEL_FORMAT",raw:text},502);
  }
}

function respond(data,status=200){
  return new Response(JSON.stringify(data),{status,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"}});
}