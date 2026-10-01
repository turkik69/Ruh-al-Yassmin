function isBlockedHost(host){
  const h=String(host||'').toLowerCase();
  if(!h||h==='localhost'||h.endsWith('.local'))return true;
  if(/^127\./.test(h)||/^10\./.test(h)||/^169\.254\./.test(h)||/^192\.168\./.test(h))return true;
  const m=h.match(/^172\.(\d+)\./);if(m&&Number(m[1])>=16&&Number(m[1])<=31)return true;
  if(h==='0.0.0.0'||h==='::1')return true;
  return false;
}
export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Cache-Control','public, max-age=86400, s-maxage=604800');
  if(req.method!=='GET')return res.status(405).json({error:'METHOD_NOT_ALLOWED'});
  const raw=String(req.query?.url||'');
  if(!raw||raw.length>3000)return res.status(400).json({error:'BAD_URL'});
  let u;try{u=new URL(raw)}catch{return res.status(400).json({error:'BAD_URL'})}
  if(!['http:','https:'].includes(u.protocol)||isBlockedHost(u.hostname))return res.status(400).json({error:'URL_NOT_ALLOWED'});
  try{
    const r=await fetch(u.href,{headers:{'User-Agent':'Mozilla/5.0 RuhAlYassmin/2.0','Accept':'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'},redirect:'follow'});
    if(!r.ok)return res.status(r.status).json({error:'IMAGE_FETCH_FAILED'});
    const type=String(r.headers.get('content-type')||'').split(';')[0];
    if(!type.startsWith('image/'))return res.status(415).json({error:'NOT_IMAGE'});
    const len=Number(r.headers.get('content-length')||0);if(len>6*1024*1024)return res.status(413).json({error:'IMAGE_TOO_LARGE'});
    const buf=Buffer.from(await r.arrayBuffer());
    if(buf.length>6*1024*1024)return res.status(413).json({error:'IMAGE_TOO_LARGE'});
    res.setHeader('Content-Type',type);
    return res.status(200).send(buf);
  }catch{return res.status(502).json({error:'IMAGE_PROXY_FAILED'})}
}