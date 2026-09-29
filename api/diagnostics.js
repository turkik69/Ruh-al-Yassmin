
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
  res.setHeader('Cache-Control','no-store');
  if(req.method==='OPTIONS')return res.status(204).end();
  if(!process.env.GEMINI_API_KEY)return res.status(200).json({ok:false,stage:'config',provider:'gemini',code:'AI_NOT_CONFIGURED',message:'GEMINI_API_KEY is missing',model:GEMINI_MODEL});
  try{
    const r=await fetch(geminiUrl(),{
      method:'POST',
      headers:{'x-goog-api-key':process.env.GEMINI_API_KEY,'Content-Type':'application/json'},
      body:JSON.stringify({contents:[{role:'user',parts:[{text:'Reply with exactly OK'}]}],generationConfig:{maxOutputTokens:32,temperature:0}})
    });
    const raw=await r.json().catch(()=>({}));
    if(!r.ok)return res.status(200).json({ok:false,stage:'gemini',provider:'gemini',httpStatus:r.status,model:GEMINI_MODEL,code:raw?.error?.status||'GEMINI_ERROR',message:raw?.error?.message||'Gemini request failed'});
    return res.status(200).json({ok:true,stage:'gemini',provider:'gemini',model:GEMINI_MODEL,message:'Gemini API request succeeded'});
  }catch(e){
    return res.status(200).json({ok:false,stage:'network',provider:'gemini',model:GEMINI_MODEL,code:'NETWORK_ERROR',message:String(e?.message||e)});
  }
}