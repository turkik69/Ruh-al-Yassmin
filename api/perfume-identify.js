export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS');
  if(req.method==='OPTIONS') return res.status(204).end();
  if(req.method!=='POST') return res.status(405).json({error:'METHOD_NOT_ALLOWED'});
  if(!process.env.OPENAI_API_KEY) return res.status(503).json({error:'AI_NOT_CONFIGURED'});

  const image=req.body?.image||null;
  const name=String(req.body?.name||'').slice(0,300);
  if(!image&&!name) return res.status(400).json({error:'IMAGE_OR_NAME_REQUIRED'});

  const materials=[
    'bergamot','lemon','lavender','rose','jasmine','cardamom','saffron',
    'cedar','sandal','oud','amber','vanilla','musk','leather','neroli','patchouli','vetiver','blackpepper','clove','cinnamon','cypriol','guaiac','frankincense'
  ];

  const mode=String(req.body?.mode||'identify');
  const selected=req.body?.selected||null;

  if(mode==='search' && name && !image){
    const searchPrompt='أنت باحث متخصص في العطور. ابحث على الويب عن جميع المنتجات المحتملة التي تطابق الاسم: "'+name+'". المطلوب إزالة الالتباس قبل اختيار المستخدم، وليس تخمين عطر واحد. أعد JSON فقط بهذا الشكل: {"mode":"candidates","query":"'+name+'","candidates":[{"brand":"","product_name":"","concentration":"","year":"","disambiguation":""}]}. أعط حتى 10 نتائج حقيقية ومختلفة فقط، ولا تكرر نفس المنتج. إذا توجد إصدارات متعددة من نفس الخط فأظهرها منفصلة. استخدم العلامة التجارية والاسم الكامل والتركيز أو سنة الإصدار عند توفرها. لا تنشئ clone_notes في هذه المرحلة.';
    const sr=await fetch('https://api.openai.com/v1/responses',{
      method:'POST',
      headers:{'Authorization':'Bearer '+process.env.OPENAI_API_KEY,'Content-Type':'application/json'},
      body:JSON.stringify({
        model:process.env.OPENAI_MODEL||'gpt-5.6-luna',
        tools:[{type:'web_search'}],
        tool_choice:'auto',
        input:searchPrompt
      })
    });
    const raw=await sr.json();
    if(!sr.ok) return res.status(sr.status).json({error:'OPENAI_ERROR',details:raw?.error?.message||'Search failed'});
    let txt=raw.output_text||'';
    if(!txt)for(const item of raw.output||[])for(const c of item.content||[])if(c.type==='output_text')txt=c.text||txt;
    try{
      const clean=txt.replace(/^```json\s*/i,'').replace(/```$/,'').trim();
      const out=JSON.parse(clean);
      const candidates=(Array.isArray(out.candidates)?out.candidates:[]).slice(0,10).map(x=>({
        brand:String(x.brand||'').slice(0,120),
        product_name:String(x.product_name||'').slice(0,180),
        concentration:String(x.concentration||'').slice(0,80),
        year:String(x.year||'').slice(0,20),
        disambiguation:String(x.disambiguation||'').slice(0,240)
      })).filter(x=>x.product_name);
      return res.status(200).json({mode:'candidates',query:name,candidates});
    }catch{
      return res.status(502).json({error:'MODEL_FORMAT',raw:txt});
    }
  }
  const prompt=`
أنت خبير عطور وباحث منتجات. مهمتك:
1) إذا أُرفقت صورة، تعرّف على اسم العطر والعلامة التجارية من شكل الزجاجة والنص الظاهر، وكن صريحًا في درجة الثقة.
2) استخدم البحث على الويب للتحقق من المنتج والعثور على النوتات العطرية المنشورة عنه من مصادر موثوقة.
3) لا تدّع معرفة الصيغة التجارية السرية. فرّق بوضوح بين "النوتات المنشورة" و"صيغة مستوحاة".
4) ابنِ صيغة مستوحاة من 5 إلى 8 مواد فقط من هذه القائمة: ${materials.join(', ')}، ومجموع النسب 100.
5) أعد JSON فقط بدون markdown بهذا الشكل:
{
 "brand":"",
 "product_name":"",
 "confidence":"high|medium|low",
 "top_notes":[],
 "heart_notes":[],
 "base_notes":[],
 "accords":[],
 "rationale":"شرح عربي موجز",
 "clone_notes":[{"id":"bergamot","pct":15}]
}
إذا لم تستطع التأكد من العطر فلا تخمّن بثقة عالية.
اسم يدوي اختياري: ${name||'غير مذكور'}
${selected?`هذا هو المنتج الذي اختاره المستخدم تحديدًا: ${JSON.stringify(selected)}. التزم بهذا المنتج ولا تستبدله بإصدار مشابه.`:''}
`;

  const content=[{type:'input_text',text:prompt}];
  if(image) content.push({type:'input_image',image_url:image});

  const r=await fetch('https://api.openai.com/v1/responses',{
    method:'POST',
    headers:{
      'Authorization':'Bearer '+process.env.OPENAI_API_KEY,
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      model:process.env.OPENAI_MODEL||'gpt-5.6-luna',
      tools:[{type:'web_search'}],
      tool_choice:'auto',
      include:['web_search_call.action.sources'],
      input:[{role:'user',content}]
    })
  });

  const raw=await r.json();
  if(!r.ok) return res.status(r.status).json({error:'OPENAI_ERROR',details:raw?.error?.message||'Request failed'});

  let text='';
  const sources=[];
  if(typeof raw.output_text==='string') text=raw.output_text;
  for(const item of raw.output||[]){
    if(item.type==='web_search_call'){
      const srcs=item.action?.sources||item.sources||[];
      for(const src of srcs){
        if(src?.url&&!sources.some(x=>x.url===src.url))sources.push({title:src.title||src.url,url:src.url});
      }
    }
    for(const c of item.content||[]){
      if(c.type==='output_text'&&typeof c.text==='string') text=c.text;
      for(const a of c.annotations||[]){
        if(a.type==='url_citation'&&a.url&&!sources.some(x=>x.url===a.url))sources.push({title:a.title||a.url,url:a.url});
      }
    }
  }

  try{
    const clean=text.replace(/^\`\`\`json\s*/i,'').replace(/\`\`\`$/,'').trim();
    const out=JSON.parse(clean);
    out.clone_notes=(out.clone_notes||[]).filter(n=>materials.includes(n.id)).map(n=>({id:n.id,pct:Number(n.pct)||0}));
    out.sources=sources.slice(0,6);
    return res.status(200).json(out);
  }catch{
    return res.status(502).json({error:'MODEL_FORMAT',raw:text,sources:sources.slice(0,6)});
  }
}