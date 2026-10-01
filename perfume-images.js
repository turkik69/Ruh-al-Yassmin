(function(){
  const directThumb=makePerfumeThumb;
  function proxyImage(src){
    const s=String(src||'').trim();
    if(!s)return '';
    if(s.startsWith('data:')||s.startsWith('blob:'))return s;
    if(!/^https?:\/\//i.test(s))return s;
    return apiUrl('/api/image-proxy?url='+encodeURIComponent(s));
  }
  function imageMarkup(item,cls='perfume-result-thumb'){
    const src=proxyImage(item?.image_url||'');
    if(!src)return '<span class="perfume-image-fallback" aria-hidden="true">🧴</span>';
    return '<span class="perfume-image-shell"><img class="'+cls+'" src="'+esc(src)+'" alt="'+esc([item?.brand,item?.product_name].filter(Boolean).join(' ')||'صورة العطر')+'" loading="lazy" onerror="this.style.display=\'none\';this.parentElement.classList.add(\'is-fallback\')"><i>🧴</i></span>';
  }

  makePerfumeThumb=async function(src,size=96){
    return await directThumb(proxyImage(src),size);
  };

  searchPerfumeFromHome=async function(){
    const q=document.getElementById('homePerfumeSearch')?.value?.trim()||'';
    const box=document.getElementById('homePerfumeSearchResults');
    if(!q)return toast('اكتب اسم العطر أولاً');
    if(box)box.innerHTML='<div class="ai-thinking">✦ أبحث عن العطر وصور الإصدارات المطابقة...</div>';
    try{
      const res=await fetch(cloneEndpoint(),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:q,mode:'search'})});
      if(!res.ok)throw new Error('SEARCH_FAILED');
      const data=await res.json();
      homeSearchCandidates=Array.isArray(data.candidates)?data.candidates.slice(0,8):[];
      saveCloneArchive({type:'search',query:q,candidates:structuredClone(homeSearchCandidates)});
      if(!homeSearchCandidates.length){if(box)box.innerHTML='<div class="empty">لم أجد نتائج واضحة. جرّب كتابة العلامة التجارية مع اسم العطر.</div>';return}
      if(box)box.innerHTML='<div class="home-search-results perfume-visual-results">'+homeSearchCandidates.map((x,i)=>'<button class="home-search-result perfume-visual-result" onclick="selectHomePerfumeResult('+i+')">'+imageMarkup(x)+'<div class="perfume-result-copy"><b>'+esc(x.product_name||'عطر')+'</b><span>'+esc(x.brand||'علامة غير محددة')+(x.concentration?' • '+esc(x.concentration):'')+(x.year?' • '+esc(x.year):'')+'</span><small>'+esc(x.disambiguation||'اضغط لاختيار هذا الإصدار')+'</small></div><strong>اختيار ←</strong></button>').join('')+'</div>';
    }catch(e){if(box)box.innerHTML='<div class="ai-error">تعذر البحث الآن. تحقق من Backend وGemini ثم حاول مرة أخرى.</div>'}
  };

  searchPerfumeFromCreate=async function(){
    const q=document.getElementById('createPerfumeSearch')?.value?.trim()||'';
    const box=document.getElementById('createPerfumeSearchResults');
    if(!q)return toast('اكتب اسم العطر أولاً');
    if(box)box.innerHTML='<div class="ai-thinking">✦ أبحث عن العطر وصور الإصدارات المطابقة...</div>';
    try{
      const res=await fetch(cloneEndpoint(),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:q,mode:'search'})});
      if(!res.ok)throw new Error('SEARCH_FAILED');
      const data=await res.json();
      createSearchCandidates=Array.isArray(data.candidates)?data.candidates.slice(0,8):[];
      saveCloneArchive({type:'search',query:q,candidates:structuredClone(createSearchCandidates)});
      if(!createSearchCandidates.length){if(box)box.innerHTML='<div class="empty">لم أجد نتائج واضحة بهذا الاسم. جرّب كتابة العلامة التجارية مع اسم العطر.</div>';return}
      if(box)box.innerHTML='<div class="create-search-results perfume-visual-results">'+createSearchCandidates.map((x,i)=>'<button class="create-search-result perfume-visual-result" onclick="selectCreatePerfumeResult('+i+')">'+imageMarkup(x)+'<div class="perfume-result-copy"><b>'+esc(x.product_name||'عطر')+'</b><span>'+esc(x.brand||'علامة غير محددة')+(x.concentration?' • '+esc(x.concentration):'')+(x.year?' • '+esc(x.year):'')+'</span><small>'+esc(x.disambiguation||'اضغط لاختيار هذا الإصدار')+'</small></div><strong>اختيار ←</strong></button>').join('')+'</div>';
    }catch(e){if(box)box.innerHTML='<div class="ai-error">تعذر البحث الآن. تحقق من Backend وGemini ثم حاول مرة أخرى.</div>'}
  };

  showCloneCandidates=function(items,query,archive=true){
    cloneCandidates=items.slice(0,8);
    if(archive)saveCloneArchive({type:'search',query:String(query||''),candidates:structuredClone(cloneCandidates)});
    const box=document.getElementById('cloneResult');if(!box)return;
    let html='<div class="clone-candidate-wrap"><div class="clone-title"><span>نتائج البحث</span><h3>اختر العطر من الاسم والصورة</h3><p>قد تتشابه أسماء العطور والإصدارات؛ استخدم صورة الزجاجة والعلامة والتركيز لاختيار المنتج الصحيح.</p></div><div class="clone-candidate-list perfume-visual-results">';
    html+=cloneCandidates.map((x,i)=>'<button class="clone-candidate perfume-visual-result" onclick="selectCloneCandidate('+i+')">'+imageMarkup(x,'clone-candidate-thumb')+'<div class="perfume-result-copy"><b>'+esc(x.product_name||'عطر')+'</b><span>'+esc(x.brand||'علامة غير محددة')+(x.concentration?' • '+esc(x.concentration):'')+(x.year?' • '+esc(x.year):'')+'</span><small>'+esc(x.disambiguation||x.description||'اضغط لاختيار هذا العطر')+'</small></div><strong>اختيار ←</strong></button>').join('');
    html+='</div></div>';box.innerHTML=html;
  };

  const baseShowCloneResult=showCloneResult;
  showCloneResult=function(data,archive=true){
    if(data?.image_url)data={...data,image_url:data.image_url};
    baseShowCloneResult(data,archive);
    const img=document.querySelector('.clone-result-thumb');
    if(img&&/^https?:\/\//i.test(img.getAttribute('src')||''))img.src=proxyImage(img.getAttribute('src'));
  };

  window.RUH_YASMIN_IMAGE_PROXY=proxyImage;
})();