export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  res.setHeader('Cache-Control','no-store');
  if(req.method==='OPTIONS') return res.status(204).end();
  if(!process.env.OPENAI_API_KEY){
    return res.status(503).json({ok:false,stage:'config',code:'AI_NOT_CONFIGURED',message:'OPENAI_API_KEY is missing'});
  }

  const model=process.env.OPENAI_MODEL||'gpt-5.6-luna';
  try{
    const r=await fetch('https://api.openai.com/v1/responses',{
      method:'POST',
      headers:{
        'Authorization':'Bearer '+process.env.OPENAI_API_KEY,
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        model,
        input:'Reply with exactly: OK',
        max_output_tokens:16
      })
    });

    const raw=await r.json().catch(()=>({}));
    if(!r.ok){
      return res.status(200).json({
        ok:false,
        stage:'openai',
        httpStatus:r.status,
        model,
        code:raw?.error?.code||raw?.error?.type||'OPENAI_ERROR',
        message:raw?.error?.message||'OpenAI request failed',
        requestId:r.headers.get('x-request-id')||null
      });
    }

    return res.status(200).json({
      ok:true,
      stage:'openai',
      model,
      message:'OpenAI API request succeeded',
      requestId:r.headers.get('x-request-id')||null
    });
  }catch(e){
    return res.status(200).json({
      ok:false,
      stage:'network',
      model,
      code:'NETWORK_ERROR',
      message:String(e?.message||e)
    });
  }
}