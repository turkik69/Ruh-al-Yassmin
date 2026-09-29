export default function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  res.setHeader('Cache-Control','no-store');
  if(req.method==='OPTIONS')return res.status(204).end();
  return res.status(200).json({
    ok:true,
    service:'Ruh Al Yassmin Backend',
    version:'2.0-gemini',
    provider:'gemini',
    aiConfigured:Boolean(process.env.GEMINI_API_KEY),
    time:new Date().toISOString()
  });
}