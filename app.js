const MATERIALS = [
  {id:'bergamot',name:'برغموت',en:'Bergamot',family:'حمضي',level:'افتتاحية',power:5,life:3,icon:'🍋',pairs:['لافندر','خشب الأرز','مسك','هيل']},
  {id:'lemon',name:'ليمون',en:'Lemon',family:'حمضي',level:'افتتاحية',power:4,life:2,icon:'🍋',pairs:['برغموت','لافندر','نيرولي','مسك']},
  {id:'lavender',name:'لافندر',en:'Lavender',family:'عطري',level:'قلب',power:5,life:5,icon:'🪻',pairs:['برغموت','فانيلا','خشب الأرز','هيل']},
  {id:'rose',name:'ورد',en:'Rose',family:'زهري',level:'قلب',power:6,life:6,icon:'🌹',pairs:['عود','زعفران','عنبر','مسك']},
  {id:'jasmine',name:'ياسمين',en:'Jasmine',family:'زهري',level:'قلب',power:7,life:6,icon:'🌼',pairs:['ورد','مسك','صندل','برغموت']},
  {id:'cardamom',name:'هيل',en:'Cardamom',family:'حار',level:'قلب',power:6,life:5,icon:'✦',pairs:['لافندر','عنبر','أرز','عود']},
  {id:'saffron',name:'زعفران',en:'Saffron',family:'حار',level:'قلب',power:8,life:7,icon:'✺',pairs:['عود','ورد','عنبر','جلد']},
  {id:'cedar',name:'خشب الأرز',en:'Cedarwood',family:'خشبي',level:'قاعدة',power:6,life:8,icon:'🌲',pairs:['برغموت','لافندر','مسك','عنبر']},
  {id:'sandal',name:'خشب الصندل',en:'Sandalwood',family:'خشبي',level:'قاعدة',power:6,life:9,icon:'🪵',pairs:['ياسمين','فانيلا','عنبر','مسك']},
  {id:'oud',name:'عود',en:'Oud',family:'شرقي',level:'قاعدة',power:10,life:10,icon:'◆',pairs:['ورد','زعفران','عنبر','صندل']},
  {id:'amber',name:'عنبر',en:'Amber',family:'شرقي',level:'قاعدة',power:8,life:9,icon:'🟠',pairs:['عود','فانيلا','صندل','مسك']},
  {id:'vanilla',name:'فانيلا',en:'Vanilla',family:'حلو',level:'قاعدة',power:7,life:8,icon:'◌',pairs:['عنبر','لافندر','صندل','مسك']},
  {id:'musk',name:'مسك',en:'Musk',family:'نظيف',level:'قاعدة',power:7,life:9,icon:'◉',pairs:['ورد','ياسمين','أرز','عنبر']},
  {id:'leather',name:'جلد',en:'Leather',family:'جلدي',level:'قاعدة',power:9,life:9,icon:'▰',pairs:['زعفران','عود','عنبر','أرز']},
  {id:'neroli',name:'نيرولي',en:'Neroli',family:'زهري حمضي',level:'افتتاحية',power:5,life:4,icon:'✿',pairs:['برغموت','مسك','ياسمين','صندل']}
];
const DBKEY='ruhYasminDB_v1';
const defaultDB={formulas:[],draft:{name:'',mood:'فاخر',occasion:'مسائي',gender:'يونيسكس',notes:[]},theme:'dark'};
let db=JSON.parse(localStorage.getItem(DBKEY)||'null')||structuredClone(defaultDB);
let route='home';
const view=document.getElementById('view');
const modal=document.getElementById('modal');
const modalContent=document.getElementById('modalContent');
const save=()=>localStorage.setItem(DBKEY,JSON.stringify(db));
const esc=s=>String(s??'').replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));
const toast=(m)=>{const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),1800)};
function setRoute(r){route=r;document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.route===r));render()}
document.querySelectorAll('.nav-item').forEach(b=>b.onclick=()=>setRoute(b.dataset.route));
document.getElementById('themeBtn').onclick=()=>{db.theme=db.theme==='light'?'dark':'light';applyTheme();save()};
function applyTheme(){document.documentElement.classList.toggle('light',db.theme==='light')}; applyTheme();
function home(){
 const last=db.formulas[0]; return `<section class="hero visual-hero">
   <img src="hero-ui.jpg" alt="روح الياسمين - مختبر صناعة العطور">
   <div class="hero-overlay"><span class="eyebrow">مختبرك الشخصي لصناعة العطور</span><h2>روح الياسمين</h2><p>حيث تتحول المشاعر إلى عطور</p></div>
 </section>
 <div class="home-grid">
   <button class="home-tile tile-pink" onclick="setRoute('create')"><span class="tile-copy"><b>اصنع عطرك</b><small>ابدأ تركيبتك خطوة بخطوة</small></span><span class="tile-icon">✦</span></button>
   <button class="home-tile tile-teal" onclick="setRoute('lab')"><span class="tile-copy"><b>المختبر</b><small>اخلط وجرب وعدّل النسب</small></span><span class="tile-icon">⚗</span></button>
   <button class="home-tile tile-lilac" onclick="setRoute('materials')"><span class="tile-copy"><b>مكتبة المواد</b><small>اكتشف المكونات وتوافقاتها</small></span><span class="tile-icon">◈</span></button>
   <button class="home-tile tile-gold" onclick="setRoute('formulas')"><span class="tile-copy"><b>تركيباتي</b><small>احفظ الإصدارات وارجع لها</small></span><span class="tile-icon">▤</span></button>
   <button class="home-tile tile-rose" onclick="last?openFormula(last.id):toast('احفظ أول تركيبة لتقييمها')"><span class="tile-copy"><b>التقييم</b><small>سجل ملاحظاتك الحسية</small></span><span class="tile-icon">♡</span></button>
   <button class="home-tile tile-amber" onclick="setRoute('lab')"><span class="tile-copy"><b>دفعات الخلط</b><small>احسب الكميات وحجم الدفعة</small></span><span class="tile-icon">⚗</span></button>
 </div>
 <section class="journey"><b>رحلة لا تنتهي من الإبداع</b><small>اكتشف • امزج • جرّب • واصنع قصتك العطرية</small></section>
 <div class="section-title"><h3>لوحة المختبر</h3><span>محفوظ محليًا على جهازك</span></div><div class="grid">
 <div class="card"><p>التركيبات</p><div class="metric">${db.formulas.length}</div></div><div class="card"><p>المواد</p><div class="metric">${MATERIALS.length}</div></div>
 <div class="card full"><h4>آخر تركيبة</h4>${last?`<div class="formula"><div><strong>${esc(last.name)}</strong><small>${esc(last.mood)} • ${esc(last.occasion)} • ${last.notes.length} مواد</small></div><button class="ghost" onclick="openFormula('${last.id}')">فتح</button></div>`:'<p>لم تحفظ أي تركيبة بعد.</p>'}</div></div>`
}
function pageHero(title,subtitle,icon,variant='gold'){return `<section class="subpage-hero subpage-${variant}"><div class="subpage-hero-copy"><span class="subpage-kicker">روح الياسمين</span><h2>${icon} ${title}</h2><p>${subtitle}</p></div><div class="subpage-orb">${icon}</div></section>`}
function create(){ const d=db.draft; return `${pageHero('اصنع عطرك','حوّل فكرتك إلى تركيبة عطرية خاصة بك خطوة بخطوة','✦','pink')}
 <section class="lux-panel tone-pink"><div class="panel-heading"><div><span class="mini-label">هوية العطر</span><h3>ابدأ من الإحساس</h3></div><span class="panel-icon">🌸</span></div>
 <div class="form-grid"><div class="field"><label>اسم العطر</label><input id="fName" value="${esc(d.name)}" placeholder="مثال: ليلة مسقط"></div>
 <div class="grid"><div class="field"><label>الطابع</label><select id="fMood">${['فاخر','منعش','غامض','نظيف','حلو','خشبي','شرقي','بحري','جلدي','زهري'].map(x=>`<option ${d.mood===x?'selected':''}>${x}</option>`).join('')}</select></div><div class="field"><label>الاستخدام</label><select id="fOcc">${['يومي','مسائي','رسمي','صيفي','شتوي','مناسبات'].map(x=>`<option ${d.occasion===x?'selected':''}>${x}</option>`).join('')}</select></div></div>
 <div class="field"><label>التصنيف</label><div class="chips">${['رجالي','نسائي','يونيسكس'].map(x=>`<button class="chip ${d.gender===x?'active':''}" onclick="db.draft.gender='${x}';save();render()">${x}</button>`).join('')}</div></div></div></section>
 <section class="lux-panel tone-cream"><div class="panel-heading"><div><span class="mini-label">الفكرة العطرية</span><h3>صف العطر الذي تتخيله</h3></div><span class="panel-icon">📝</span></div>
 <div class="field"><textarea id="idea" placeholder="مثال: عطر رجالي فاخر، افتتاحيته منعشة، قلبه حار وقاعدته عود وعنبر..."></textarea></div>
 <div class="actions premium-actions"><button class="primary" onclick="generateFromIdea()">✦ مساعد التركيب الذكي</button><button class="ghost" onclick="setRoute('lab')">⚗ أكمل يدويًا في المختبر</button></div></section>
 <div class="section-title"><h3>المواد المختارة</h3><span>${d.notes.length} مادة</span></div>${draftNotesHTML()}` }
function draftNotesHTML(){if(!db.draft.notes.length)return '<div class="empty lux-panel tone-lilac">لم تضف مواد بعد. استخدم المساعد الذكي أو افتح المختبر لإضافة المواد.</div>';return `<div class="lux-panel tone-lilac formula-editor">${db.draft.notes.map((n,i)=>{const m=MATERIALS.find(x=>x.id===n.id);return `<div class="note-row perfume-row"><div class="material-dot">${m.icon}</div><div><strong>${m.name}</strong><small>${m.level} • ${m.family}</small></div><input type="number" min="0" max="100" value="${n.pct}" onchange="updatePct(${i},this.value)"><button onclick="removeNote(${i})">×</button></div>`}).join('')}<div class="mix-total"><div><span>إجمالي التركيبة</span><b>${totalPct()}%</b></div><div class="progress"><span style="width:${Math.min(100,totalPct())}%"></span></div></div></div>`}
function lab(){const d=db.draft;return `${pageHero('المختبر','اخلط المواد، عدّل النسب، واحسب دفعتك بدقة','⚗','teal')}
 <div class="lab-summary">
   <section class="lux-panel tone-dark"><span class="mini-label">التركيبة الحالية</span><h3>${esc(d.name)||'تركيبة جديدة'}</h3><p>${esc(d.mood)} • ${esc(d.occasion)} • ${esc(d.gender)}</p></section>
   <section class="stat-glass"><span>مجموع التركيبة</span><b>${totalPct()}%</b></section>
   <section class="stat-glass"><span>عدد المواد</span><b>${d.notes.length}</b></section>
 </div>
 <div class="section-title"><h3>الهرم العطري</h3><span>نسب التركيز داخل الزيت العطري</span></div>${draftNotesHTML()}
 <div class="actions premium-actions"><button class="primary" onclick="addMaterialModal()">+ إضافة مادة</button><button class="secondary" onclick="normalizeDraft()">موازنة إلى 100%</button></div>
 <section class="lux-panel tone-gold batch-panel"><div class="panel-heading"><div><span class="mini-label">دفعات الخلط</span><h3>حساب كمية الإنتاج</h3></div><span class="panel-icon">🧪</span></div>
 <div class="grid"><div class="field"><label>حجم العبوة ml</label><input id="batchSize" type="number" value="50" min="1"></div><div class="field"><label>تركيز الزيت العطري</label><select id="conc"><option value="20">EDP 20%</option><option value="25" selected>EDP+ 25%</option><option value="30">Parfum 30%</option><option value="35">Extrait 35%</option></select></div></div><button class="ghost wide-btn" onclick="calcBatch()">احسب الكميات</button><div id="batchResult"></div></section>
 <section class="lux-panel tone-rose"><div class="panel-heading"><div><span class="mini-label">إدارة الإصدارات</span><h3>احفظ تركيبتك</h3></div><span class="panel-icon">📖</span></div><div class="field"><label>ملاحظات النسخة</label><textarea id="versionNotes" placeholder="مثال: قللت الفانيلا وزدت الصندل..."></textarea></div><button class="primary wide-btn" onclick="saveFormula()">حفظ نسخة جديدة V</button></section>`}
function materials(){return `${pageHero('مكتبة المواد','استكشف المكونات الطبيعية والاصطناعية وتعرّف على توافقاتها','◈','lilac')}
 <section class="lux-panel tone-lilac library-search"><div class="field"><label>ابحث في مكتبة روح الياسمين</label><input id="matSearch" oninput="filterMaterials(this.value)" placeholder="اسم المادة، العائلة، أو طبقة الهرم..."></div><div class="library-count">${MATERIALS.length} مادة عطرية</div></section>
 <div id="materialList" class="material-list material-cards">${materialsHTML(MATERIALS)}</div>`}
function materialsHTML(arr){return arr.map((m,i)=>`<div class="material material-premium mat-${['pink','teal','lilac','gold'][i%4]}"><div class="material-icon">${m.icon}</div><div><h4>${m.name} <small>${m.en}</small></h4><p>${m.level} • ${m.family}</p><div class="material-bars"><span>قوة ${m.power}/10</span><span>ثبات ${m.life}/10</span></div></div><button onclick="materialInfo('${m.id}')">تفاصيل</button></div>`).join('')}
function formulas(){return `${pageHero('تركيباتي','دفتر تركيباتك الخاصة وإصدارات V1 وV2 وV3','▤','gold')}
 <section class="formula-banner"><div><span>دفتر العطور</span><b>${db.formulas.length}</b><small>تركيبة محفوظة</small></div><div class="bottle-mark">✦</div></section>
 ${db.formulas.length?`<div class="material-list formula-cards">${db.formulas.map((f,i)=>`<div class="formula-card formula-tone-${i%4}"><div class="formula-v">${esc(f.version)}</div><div class="formula-copy"><strong>${esc(f.name)}</strong><small>${esc(f.mood)} • ${esc(f.occasion)}</small><small>${new Date(f.createdAt).toLocaleDateString('ar-OM')} • ${f.notes.length} مواد</small></div><button class="formula-open" onclick="openFormula('${f.id}')">فتح</button></div>`).join('')}</div>`:'<div class="empty lux-panel tone-gold">لا توجد تركيبات محفوظة حتى الآن. ابدأ من «اصنع عطرك» ثم احفظ أول إصدار لك.</div>'}`}
function render(){view.innerHTML=({home,create,lab,materials,formulas}[route]||home)();bindDraftInputs()}
function bindDraftInputs(){['fName','fMood','fOcc'].forEach(id=>{const e=document.getElementById(id);if(!e)return;e.onchange=()=>{if(id==='fName')db.draft.name=e.value;if(id==='fMood')db.draft.mood=e.value;if(id==='fOcc')db.draft.occasion=e.value;save()}})}
function totalPct(){return Math.round(db.draft.notes.reduce((a,n)=>a+Number(n.pct||0),0)*10)/10}
function updatePct(i,v){db.draft.notes[i].pct=Math.max(0,Number(v)||0);save();render()}
function removeNote(i){db.draft.notes.splice(i,1);save();render()}
function addMaterial(id,pct=5){const ex=db.draft.notes.find(x=>x.id===id);if(ex)ex.pct+=pct;else db.draft.notes.push({id,pct});save();render()}
function addMaterialModal(){modalContent.innerHTML=`<h3>إضافة مادة</h3><div class="material-list">${MATERIALS.map(m=>`<div class="material"><div class="material-icon">${m.icon}</div><div><h4>${m.name}</h4><p>${m.level} • ${m.family}</p></div><button onclick="addMaterial('${m.id}',5);modal.close()">إضافة</button></div>`).join('')}</div><button class="ghost" style="width:100%;margin-top:12px" onclick="modal.close()">إغلاق</button>`;modal.showModal()}
function normalizeDraft(){const t=totalPct();if(!t)return toast('أضف مواد أولاً');db.draft.notes=db.draft.notes.map(n=>({...n,pct:Math.round((n.pct/t*100)*10)/10}));save();render();toast('تمت الموازنة إلى 100%')}
function generateFromIdea(){const text=(document.getElementById('idea')?.value||'').toLowerCase();db.draft.name=document.getElementById('fName')?.value||db.draft.name||'تركيبة خاصة';db.draft.mood=document.getElementById('fMood')?.value||db.draft.mood;db.draft.occasion=document.getElementById('fOcc')?.value||db.draft.occasion;
 let ids=['bergamot','lavender','cedar','amber','musk'];
 if(/عود|شرقي|غامض/.test(text))ids=['bergamot','cardamom','saffron','oud','amber','musk'];
 if(/زهري|ياسمين|ورد/.test(text))ids=['bergamot','neroli','jasmine','rose','sandal','musk'];
 if(/نظيف|فندق|فاخر/.test(text))ids=['bergamot','neroli','lavender','cedar','sandal','musk'];
 if(/جلد|جلدي/.test(text))ids=['bergamot','cardamom','saffron','leather','oud','amber'];
 if(/حلو|فانيلا/.test(text))ids=['bergamot','lavender','vanilla','amber','sandal','musk'];
 const weights=ids.length===6?[16,14,12,20,20,18]:[18,15,22,25,20];db.draft.notes=ids.map((id,i)=>({id,pct:weights[i]}));save();setRoute('lab');toast('تم إنشاء تركيبة أولية قابلة للتعديل')}
function smartIdea(){const ideas=[['نسيم اللبان','منعش','يومي',['bergamot','neroli','cedar','sandal','musk'],[22,14,18,22,24]],['ليل الصحراء','غامض','مسائي',['cardamom','saffron','oud','amber','musk'],[14,10,24,28,24]],['ياسمين أبيض','زهري','مناسبات',['bergamot','jasmine','rose','sandal','musk'],[18,25,18,19,20]]];const x=ideas[Math.floor(Math.random()*ideas.length)];db.draft={name:x[0],mood:x[1],occasion:x[2],gender:'يونيسكس',notes:x[3].map((id,i)=>({id,pct:x[4][i]}))};save();setRoute('lab')}
function calcBatch(){const size=Number(document.getElementById('batchSize').value||50),conc=Number(document.getElementById('conc').value||25),oil=size*conc/100,carrier=size-oil;let html=`<div class="card" style="margin-top:10px"><p>الزيت العطري: <b>${oil.toFixed(2)} ml</b> • الكحول/القاعدة: <b>${carrier.toFixed(2)} ml</b></p>`;html+=db.draft.notes.map(n=>{const m=MATERIALS.find(x=>x.id===n.id);return `<p>${m.name}: <b>${(oil*(n.pct/100)).toFixed(2)} ml</b></p>`}).join('')+'</div>';document.getElementById('batchResult').innerHTML=html}
function saveFormula(){if(!db.draft.notes.length)return toast('لا توجد مواد لحفظها');if(Math.abs(totalPct()-100)>0.2)return toast('وازن النسب إلى 100% أولاً');const same=db.formulas.filter(f=>f.baseName===(db.draft.name||'تركيبة خاصة'));const v=`V${same.length+1}`;db.formulas.unshift({id:crypto.randomUUID(),baseName:db.draft.name||'تركيبة خاصة',name:db.draft.name||'تركيبة خاصة',mood:db.draft.mood,occasion:db.draft.occasion,gender:db.draft.gender,notes:structuredClone(db.draft.notes),version:v,versionNotes:document.getElementById('versionNotes')?.value||'',createdAt:new Date().toISOString(),ratings:{projection:0,longevity:0,opening:0,drydown:0}});save();setRoute('formulas');toast(`تم حفظ ${v}`)}
function openFormula(id){const f=db.formulas.find(x=>x.id===id);if(!f)return;modalContent.innerHTML=`<h3>${esc(f.name)} — ${f.version}</h3><p style="color:var(--muted)">${esc(f.mood)} • ${esc(f.occasion)} • ${esc(f.gender)}</p>${f.notes.map(n=>{const m=MATERIALS.find(x=>x.id===n.id);return `<div class="note-row"><div><strong>${m.name}</strong><small style="display:block;color:var(--muted)">${m.level}</small></div><b>${n.pct}%</b><span></span></div>`}).join('')}<hr style="border:0;border-top:1px solid var(--line)"><p>${esc(f.versionNotes)||'لا توجد ملاحظات.'}</p><div class="actions"><button class="secondary" onclick="loadFormula('${f.id}')">استخدم كأساس لنسخة جديدة</button><button class="danger" onclick="deleteFormula('${f.id}')">حذف</button><button class="ghost" onclick="modal.close()">إغلاق</button></div>`;modal.showModal()}
function loadFormula(id){const f=db.formulas.find(x=>x.id===id);db.draft={name:f.name,mood:f.mood,occasion:f.occasion,gender:f.gender,notes:structuredClone(f.notes)};save();modal.close();setRoute('lab')}
function deleteFormula(id){db.formulas=db.formulas.filter(x=>x.id!==id);save();modal.close();render();toast('تم حذف التركيبة')}
function materialInfo(id){const m=MATERIALS.find(x=>x.id===id);modalContent.innerHTML=`<h3>${m.icon} ${m.name}</h3><p>${m.en}</p><div class="grid"><div class="card"><p>الطبقة</p><b>${m.level}</b></div><div class="card"><p>العائلة</p><b>${m.family}</b></div><div class="card"><p>القوة</p><b>${m.power}/10</b></div><div class="card"><p>الثبات</p><b>${m.life}/10</b></div></div><p style="margin-top:16px">يتناغم مع: ${m.pairs.map(x=>`<span class="tag">${x}</span>`).join('')}</p><button class="primary" onclick="addMaterial('${m.id}',5);modal.close()">أضف للمختبر</button> <button class="ghost" onclick="modal.close()">إغلاق</button>`;modal.showModal()}
function filterMaterials(q){q=q.trim().toLowerCase();const a=MATERIALS.filter(m=>[m.name,m.en,m.family,m.level].join(' ').toLowerCase().includes(q));document.getElementById('materialList').innerHTML=materialsHTML(a)}
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
render();