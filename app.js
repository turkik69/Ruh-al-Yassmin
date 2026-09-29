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
  {id:'patchouli',name:'باتشولي',en:'Patchouli',family:'ترابي خشبي',level:'قاعدة',power:9,life:10,icon:'🌿',pairs:['عود','فيتيفر','عنبر','فلفل أسود']},
  {id:'vetiver',name:'فيتيفر',en:'Vetiver',family:'خشبي ترابي',level:'قاعدة',power:8,life:9,icon:'🌾',pairs:['باتشولي','خشب الأرز','برغموت','فلفل أسود']},
  {id:'blackpepper',name:'فلفل أسود',en:'Black Pepper',family:'سبايسي جاف',level:'قلب',power:8,life:5,icon:'✹',pairs:['فيتيفر','هيل','خشب الأرز','عود']},
  {id:'clove',name:'قرنفل',en:'Clove',family:'سبايسي دافئ',level:'قلب',power:9,life:7,icon:'✦',pairs:['قرفة','عنبر','عود','باتشولي']},
  {id:'cinnamon',name:'قرفة',en:'Cinnamon',family:'سبايسي دافئ',level:'قلب',power:9,life:7,icon:'≈',pairs:['قرنفل','فانيلا','عنبر','عود']},
  {id:'cypriol',name:'سيبريول / ناغارموثا',en:'Cypriol / Nagarmotha',family:'خشبي دخاني',level:'قاعدة',power:10,life:10,icon:'◆',pairs:['عود','جلد','باتشولي','زعفران']},
  {id:'guaiac',name:'خشب الغاياك',en:'Guaiac Wood',family:'خشبي دخاني',level:'قاعدة',power:8,life:9,icon:'🪵',pairs:['عود','عنبر','فيتيفر','جلد']},
  {id:'frankincense',name:'لبان',en:'Frankincense',family:'راتنجي بخوري',level:'قاعدة',power:8,life:8,icon:'◈',pairs:['عود','باتشولي','عنبر','فلفل أسود']},
  {id:'neroli',name:'نيرولي',en:'Neroli',family:'زهري حمضي',level:'افتتاحية',power:5,life:4,icon:'✿',pairs:['برغموت','مسك','ياسمين','صندل']}
];
const SUPPLY_DEFAULTS=[
 {id:'bergamot-oil',category:'زيوت ومواد عطرية',name:'برغموت',qty:30,unit:'ml',note:'مادة افتتاحية أساسية ومتعددة الاستخدام'},
 {id:'lemon-oil',category:'زيوت ومواد عطرية',name:'ليمون',qty:30,unit:'ml',note:'للافتتاحيات المنعشة والحمضية'},
 {id:'lavender-oil',category:'زيوت ومواد عطرية',name:'لافندر',qty:30,unit:'ml',note:'مفيد للتركيبات النظيفة والعطرية'},
 {id:'jasmine-oil',category:'زيوت ومواد عطرية',name:'ياسمين',qty:10,unit:'ml',note:'قلب زهري فاخر؛ ابدأ بكمية صغيرة'},
 {id:'rose-oil',category:'زيوت ومواد عطرية',name:'ورد',qty:10,unit:'ml',note:'للقلب الزهري والشرقي'},
 {id:'cardamom-oil',category:'زيوت ومواد عطرية',name:'هيل',qty:10,unit:'ml',note:'قلب حار ومنعش'},
 {id:'saffron-oil',category:'زيوت ومواد عطرية',name:'زعفران',qty:10,unit:'ml',note:'للتركيبات الشرقية والجلدية'},
 {id:'cedar-oil',category:'زيوت ومواد عطرية',name:'خشب الأرز',qty:30,unit:'ml',note:'قاعدة خشبية عملية ومتوازنة'},
 {id:'sandal-oil',category:'زيوت ومواد عطرية',name:'خشب الصندل',qty:20,unit:'ml',note:'قاعدة كريمية وثابتة'},
 {id:'oud-oil',category:'زيوت ومواد عطرية',name:'عود',qty:10,unit:'ml',note:'قوي ومكلف عادة؛ يكفي حجم صغير للبداية'},
 {id:'amber-oil',category:'زيوت ومواد عطرية',name:'عنبر',qty:30,unit:'ml',note:'قاعدة شرقية واسعة الاستخدام'},
 {id:'vanilla-oil',category:'زيوت ومواد عطرية',name:'فانيلا',qty:20,unit:'ml',note:'لتليين التركيبات وإضافة دفء'},
 {id:'musk-oil',category:'زيوت ومواد عطرية',name:'مسك',qty:30,unit:'ml',note:'مفيد للثبات والطابع النظيف'},
 {id:'neroli-oil',category:'زيوت ومواد عطرية',name:'نيرولي',qty:10,unit:'ml',note:'افتتاحية زهرية حمضية'},
 {id:'leather-oil',category:'زيوت ومواد عطرية',name:'جلد',qty:10,unit:'ml',note:'Accord جلدي قوي؛ ابدأ بكمية صغيرة'},
 {id:'patchouli-oil',category:'زيوت ومواد عطرية',name:'باتشولي',qty:30,unit:'ml',note:'زيت عطري أساسي للطابع الترابي والخشبي الداكن وثبات القاعدة'},
 {id:'vetiver-oil',category:'زيوت ومواد عطرية',name:'فيتيفر',qty:30,unit:'ml',note:'زيت عطري خشبي جاف وترابي مناسب للعطور الخشنة'},
 {id:'blackpepper-oil',category:'زيوت ومواد عطرية',name:'فلفل أسود',qty:20,unit:'ml',note:'زيت عطري سبايسي جاف يرفع الحيوية والفوحان'},
 {id:'clove-oil',category:'زيوت ومواد عطرية',name:'قرنفل',qty:10,unit:'ml',note:'زيت عطري قوي جدًا ودافئ؛ يستخدم بحذر وبنسب منخفضة'},
 {id:'cinnamon-oil',category:'زيوت ومواد عطرية',name:'قرفة',qty:10,unit:'ml',note:'مادة سبايسي قوية؛ يفضل استخدام نوع مناسب للعطور وبنسب منخفضة جدًا'},
 {id:'cypriol-oil',category:'زيوت ومواد عطرية',name:'سيبريول / ناغارموثا',qty:20,unit:'ml',note:'زيت عطري داكن ودخاني قريب من أجواء العود والجلد'},
 {id:'guaiac-oil',category:'زيوت ومواد عطرية',name:'خشب الغاياك',qty:20,unit:'ml',note:'خشبي دخاني دافئ ممتاز للقاعدات الداكنة'},
 {id:'frankincense-oil',category:'زيوت ومواد عطرية',name:'لبان',qty:20,unit:'ml',note:'راتنجي بخوري يضيف عمقًا وهيبة للتركيبات الشرقية والخشبية'},
 {id:'ethanol',category:'الكحول والقاعدة',name:'كحول عطري / إيثانول مناسب للعطور',qty:1,unit:'L',note:'اختر درجة مناسبة لصناعة العطور من مورد موثوق'},
 {id:'storage-30',category:'زجاجات الحفظ',name:'زجاجات زجاجية داكنة 30 ml',qty:20,unit:'حبة',note:'لحفظ التركيبات والتجارب'},
 {id:'storage-100',category:'زجاجات الحفظ',name:'زجاجات زجاجية داكنة 100 ml',qty:10,unit:'حبة',note:'للدفعات الأكبر'},
 {id:'sample-10',category:'زجاجات الحفظ',name:'زجاجات عينات 10 ml',qty:30,unit:'حبة',note:'للتجارب والمقارنة بين الإصدارات'},
 {id:'droppers',category:'القطّارات والأدوات',name:'قطّارات زجاجية مدرجة',qty:20,unit:'حبة',note:'يفضل تخصيص قطّارة لكل مادة قدر الإمكان'},
 {id:'pipettes',category:'القطّارات والأدوات',name:'ماصّات/قطّارات نقل بلاستيكية',qty:100,unit:'حبة',note:'مناسبة للاستخدام السريع مرة واحدة'},
 {id:'labels',category:'القطّارات والأدوات',name:'ملصقات مقاومة للكحول',qty:100,unit:'حبة',note:'لتسجيل الاسم والإصدار والتاريخ'}
];
const DBKEY='ruhYasminDB_v1';
const defaultDB={formulas:[],draft:{name:'',mood:'فاخر',occasion:'مسائي',gender:'يونيسكس',notes:[]},theme:'dark'};
let db=JSON.parse(localStorage.getItem(DBKEY)||'null')||structuredClone(defaultDB);
if(!Array.isArray(db.supplies))db.supplies=[];
for(const def of SUPPLY_DEFAULTS){
 const old=db.supplies.find(x=>x.id===def.id);
 if(!old)db.supplies.push({...def,bought:false,remaining:0,capacity:def.qty});
 else{
  if(old.capacity==null)old.capacity=Number(old.qty)||def.qty;
  if(old.remaining==null)old.remaining=old.bought?(Number(old.qty)||0):0;
 }
}
if(!Array.isArray(db.usageHistory))db.usageHistory=[];
if(!Array.isArray(db.cloneArchive))db.cloneArchive=[];
if(!db.backend)db.backend={enabled:true,url:'https://ruh-al-yassmin.vercel.app',lastStatus:'unknown'};
if(!db.backend.url)db.backend.url='https://ruh-al-yassmin.vercel.app';
const ROUTES=['home','create','lab','materials','formulas','knowledge','favorites','profile','settings','backend','supplies','clone','assistant'];
let route=ROUTES.includes(sessionStorage.getItem('ruhYasminRoute'))?sessionStorage.getItem('ruhYasminRoute'):'home';
const view=document.getElementById('view');
const modal=document.getElementById('modal');
const modalContent=document.getElementById('modalContent');
const save=()=>localStorage.setItem(DBKEY,JSON.stringify(db));
const esc=s=>String(s??'').replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));
const toast=(m)=>{const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),1800)};
function setRoute(r){
 if(!ROUTES.includes(r))r='home';
 route=r;
 sessionStorage.setItem('ruhYasminRoute',route);
 document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.route===r));
 render();
 window.scrollTo({top:0,behavior:'instant'});
}
function renderKeepScroll(){
 const y=window.scrollY;
 render();
 requestAnimationFrame(()=>window.scrollTo({top:y,behavior:'instant'}));
}
window.setRoute=setRoute;
const themeBtn=document.getElementById('themeBtn'); if(themeBtn) themeBtn.onclick=()=>{db.theme=db.theme==='light'?'dark':'light';applyTheme();save()};
function applyTheme(){document.documentElement.classList.toggle('light',db.theme==='light')}; applyTheme();
function openBackendSettings(){
 sessionStorage.setItem('ruhYasminRoute','backend');
 route='backend';
 render();
 window.scrollTo({top:0,behavior:'instant'});
}
function toggleAppTheme(){
 db.theme=db.theme==='light'?'dark':'light';
 applyTheme();
 save();
 render();
}
window.openBackendSettings=openBackendSettings;
window.toggleAppTheme=toggleAppTheme;
window.applyTheme=applyTheme;
function home(){
 return `<section class="hero visual-hero concept-hero">
   <img src="hero-art.svg" alt="روح الياسمين - مختبر صناعة العطور">
   <div class="hero-overlay concept-copy"><span class="eyebrow">مختبرك الشخصي لصناعة العطور</span><h2>روح الياسمين</h2><p>حيث تتحول المشاعر إلى عطور</p></div>
 </section>
 <div class="home-grid concept-grid">
   <button class="home-tile tile-pink art-card" onclick="setRoute('create')"><span class="card-art art-perfume">◉</span><span class="tile-copy"><b>اصنع عطرك</b><small>امزج المكونات وابتكر عطرك الخاص خطوة بخطوة</small></span><span class="tile-icon">→</span></button>
   <button class="home-tile tile-teal art-card" onclick="setRoute('lab')"><span class="card-art art-lab">⚗</span><span class="tile-copy"><b>المختبر</b><small>أدوات احترافية للخلط وتجربة التركيبات</small></span><span class="tile-icon">→</span></button>
   <button class="home-tile tile-lilac art-card" onclick="setRoute('materials')"><span class="card-art art-materials">✿</span><span class="tile-copy"><b>مكتبة المواد</b><small>اكتشف مكونات العطور الطبيعية والاصطناعية</small></span><span class="tile-icon">→</span></button>
   <button class="home-tile tile-gold art-card" onclick="setRoute('formulas')"><span class="card-art art-book">▤</span><span class="tile-copy"><b>تركيباتي</b><small>احفظ وأدر تركيباتك الخاصة وإصداراتها</small></span><span class="tile-icon">→</span></button>
   <button class="home-tile tile-rose art-card" onclick="setRoute('favorites')"><span class="card-art art-eval">♡</span><span class="tile-copy"><b>التقييم</b><small>قيّم التركيبات وسجل ملاحظاتك الحسية</small></span><span class="tile-icon">→</span></button>
   <button class="home-tile tile-amber art-card" onclick="setRoute('lab')"><span class="card-art art-batch">⚗</span><span class="tile-copy"><b>دفعات الخلط</b><small>تابع دفعات الخلط واحسب كميات الإنتاج</small></span><span class="tile-icon">→</span></button>
   <button class="home-tile tile-supply art-card full-home-tile" onclick="setRoute('supplies')"><span class="card-art art-supply">🧴</span><span class="tile-copy"><b>تجهيزات مختبري</b><small>تابع الزيوت والكحول والزجاجات والقطّارات والكميات المتبقية في مخزونك</small></span><span class="tile-icon">→</span></button>
   <button class="home-tile tile-clone art-card full-home-tile" onclick="setRoute('clone')"><span class="card-art art-clone">📷</span><span class="tile-copy"><b>استنساخ عطر</b><small>صوّر أي عطر، تعرّف عليه، واستخرج نوتاته لبناء نسخة مستوحاة خاصة بك</small></span><span class="tile-icon">→</span></button>
 </div>
 <section class="journey concept-journey"><div><b>رحلة لا تنتهي من الإبداع</b><small>اكتشف • امزج • جرّب • واصنع قصتك العطرية</small></div><span>✿</span></section>`
}
function pageHero(title,subtitle,icon,variant='gold'){return `<section class="subpage-hero subpage-${variant}"><div class="subpage-hero-copy"><span class="subpage-kicker">روح الياسمين</span><h2>${icon} ${title}</h2><p>${subtitle}</p></div><button class="subpage-orb" onclick="setRoute('home')" aria-label="العودة للرئيسية">${icon}</button></section>`}
function create(){ const d=db.draft; return `${pageHero('اصنع عطرك','حوّل فكرتك إلى تركيبة عطرية خاصة بك خطوة بخطوة','✦','pink')}
 <section class="lux-panel tone-pink"><div class="panel-heading"><div><span class="mini-label">هوية العطر</span><h3>ابدأ من الإحساس</h3></div><span class="panel-icon">🌸</span></div>
 <div class="form-grid"><div class="field"><label>اسم العطر</label><input id="fName" value="${esc(d.name)}" placeholder="مثال: ليلة مسقط"></div>
 <div class="grid"><div class="field"><label>الطابع</label><select id="fMood">${['فاخر','منعش','غامض','نظيف','حلو','خشبي','شرقي','بحري','جلدي','زهري'].map(x=>`<option ${d.mood===x?'selected':''}>${x}</option>`).join('')}</select></div><div class="field"><label>الاستخدام</label><select id="fOcc">${['يومي','مسائي','رسمي','صيفي','شتوي','مناسبات'].map(x=>`<option ${d.occasion===x?'selected':''}>${x}</option>`).join('')}</select></div></div>
 <div class="field"><label>التصنيف</label><div class="chips">${['رجالي','نسائي','يونيسكس'].map(x=>`<button class="chip ${d.gender===x?'active':''}" onclick="db.draft.gender='${x}';save();render()">${x}</button>`).join('')}</div></div></div></section>
 <section class="lux-panel tone-cream"><div class="panel-heading"><div><span class="mini-label">الفكرة العطرية</span><h3>صف العطر الذي تتخيله</h3></div><span class="panel-icon">📝</span></div>
 <div class="field"><textarea id="idea" placeholder="مثال: عطر رجالي فاخر، افتتاحيته منعشة، قلبه حار وقاعدته عود وعنبر..."></textarea></div>
 <div class="actions premium-actions"><button class="primary" onclick="askAIFromCreate()">✦ مساعد روح الياسمين AI</button><button class="ghost" onclick="setRoute('lab')">⚗ أكمل يدويًا في المختبر</button></div></section>
 <div class="section-title"><h3>المواد المختارة</h3><span>${d.notes.length} مادة</span></div>${draftNotesHTML()}` }

async function searchPerfumeFromCreate(){
 const q=document.getElementById('createPerfumeSearch')?.value?.trim()||'';
 const box=document.getElementById('createPerfumeSearchResults');
 if(!q)return toast('اكتب اسم العطر أولاً');
 if(box)box.innerHTML='<div class="ai-thinking">✦ أبحث عن العطور والإصدارات المطابقة...</div>';
 try{
  const res=await fetch(cloneEndpoint(),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:q,mode:'search'})});
  if(!res.ok)throw new Error('SEARCH_FAILED');
  const data=await res.json();
  createSearchCandidates=Array.isArray(data.candidates)?data.candidates.slice(0,10):[];
  saveCloneArchive({type:'search',query:q,candidates:structuredClone(createSearchCandidates)});
  if(!createSearchCandidates.length){
   if(box)box.innerHTML='<div class="empty">لم أجد نتائج واضحة بهذا الاسم. جرّب كتابة العلامة التجارية مع اسم العطر.</div>';
   return;
  }
  if(box)box.innerHTML='<div class="create-search-results">'+createSearchCandidates.map((x,i)=>'<button class="create-search-result" onclick="selectCreatePerfumeResult('+i+')"><div><b>'+esc(x.product_name||'عطر')+'</b><span>'+esc(x.brand||'علامة غير محددة')+(x.concentration?' • '+esc(x.concentration):'')+(x.year?' • '+esc(x.year):'')+'</span></div><small>'+esc(x.disambiguation||'اضغط لاختيار هذا الإصدار')+'</small><strong>اختيار ←</strong></button>').join('')+'</div>';
 }catch(e){
  if(box)box.innerHTML='<div class="ai-error">تعذر البحث الآن. تحقق من اتصال Backend ثم حاول مرة أخرى.</div>';
 }
}
async function selectCreatePerfumeResult(index){
 const item=createSearchCandidates[index];if(!item)return;
 const box=document.getElementById('createPerfumeSearchResults');
 if(box)box.innerHTML='<div class="ai-thinking">✦ أجلب نوتات '+esc([item.brand,item.product_name].filter(Boolean).join(' — '))+'...</div>';
 try{
  const res=await fetch(cloneEndpoint(),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
   mode:'identify',
   name:[item.brand,item.product_name,item.concentration,item.year].filter(Boolean).join(' '),
   selected:item
  })});
  if(!res.ok)throw new Error('DETAILS_FAILED');
  const data=await res.json();
  saveCloneArchive({type:'result',query:String(data?.product_name||item.product_name||''),data:structuredClone(data)});
  useCloneFormula(data.clone_notes||[],data.product_name||item.product_name||'عطر');
 }catch(e){
  if(box)box.innerHTML='<div class="ai-error">تعذر جلب تفاصيل هذا العطر الآن. حاول مرة أخرى.</div>';
 }
}
function draftNotesHTML(){if(!db.draft.notes.length)return '<div class="empty lux-panel tone-lilac">لم تضف مواد بعد. استخدم المساعد الذكي أو افتح المختبر لإضافة المواد.</div>';return `<div class="lux-panel tone-lilac formula-editor">${db.draft.notes.map((n,i)=>{const m=MATERIALS.find(x=>x.id===n.id);return `<div class="note-row perfume-row"><div class="material-dot">${m.icon}</div><div><strong>${m.name}</strong><small>${m.level} • ${m.family}</small></div><input type="number" min="0" max="100" value="${n.pct}" onchange="updatePct(${i},this.value)"><button onclick="removeNote(${i})">×</button></div>`}).join('')}<div class="mix-total"><div><span>إجمالي التركيبة</span><b>${totalPct()}%</b></div><div class="progress"><span style="width:${Math.min(100,totalPct())}%"></span></div></div></div>`}
function lab(){const d=db.draft;return `${pageHero('المختبر','اخلط المواد، عدّل النسب، واحسب دفعتك بدقة','⚗','teal')}
 <div class="lab-summary">
   <section class="lux-panel tone-dark"><span class="mini-label">التركيبة الحالية</span><h3>${esc(d.name)||'تركيبة جديدة'}</h3><p>${esc(d.mood)} • ${esc(d.occasion)} • ${esc(d.gender)}</p></section>
   <section class="stat-glass"><span>مجموع التركيبة</span><b>${totalPct()}%</b></section>
   <section class="stat-glass"><span>عدد المواد</span><b>${d.notes.length}</b></section>
 </div>
 <div class="section-title"><h3>الهرم العطري</h3><span>نسب التركيز داخل الزيت العطري</span></div>${draftNotesHTML()}
 <div class="actions premium-actions"><button class="primary" onclick="addMaterialModal()">+ إضافة مادة</button><button class="secondary" onclick="normalizeDraft()">موازنة إلى 100%</button><button class="ai-action" onclick="openAIReview()">✦ راجع التركيبة بالذكاء الاصطناعي</button></div>
 <section class="lux-panel tone-teal performance-panel">
   <div class="panel-heading"><div><span class="mini-label">محسن الأداء العطري</span><h3>الفوحان • التركيز • الثبات</h3></div><span class="panel-icon">✦</span></div>
   <div class="performance-grid">
     <div class="field"><label>التركيز المستهدف</label><select id="perfConc"><option value="20">EDP — 20%</option><option value="25" selected>EDP+ — 25%</option><option value="30">Parfum — 30%</option><option value="35">Extrait — 35%</option></select></div>
     <div class="field"><label>الفوحان المطلوب</label><select id="perfProjection"><option value="soft">ناعم وقريب</option><option value="medium" selected>متوازن</option><option value="strong">قوي</option><option value="very-strong">قوي جدًا</option></select></div>
     <div class="field"><label>الثبات المستهدف</label><select id="perfLongevity"><option value="4">حوالي 4 ساعات</option><option value="6">حوالي 6 ساعات</option><option value="8" selected>حوالي 8 ساعات</option><option value="10">حوالي 10 ساعات</option><option value="12">12+ ساعة</option></select></div>
   </div>
   <button class="perf-analyze-btn" onclick="analyzePerformance()">حلّل التركيبة واقترح التعديلات</button>
   <div id="performanceResult"></div>
 </section>
 <section class="lux-panel tone-gold batch-panel"><div class="panel-heading"><div><span class="mini-label">دفعات الخلط</span><h3>حساب كمية الإنتاج</h3></div><span class="panel-icon">🧪</span></div>
 <div class="grid"><div class="field"><label>حجم العبوة ml</label><input id="batchSize" type="number" value="50" min="1"></div><div class="field"><label>تركيز الزيت العطري</label><select id="conc"><option value="20">EDP 20%</option><option value="25" selected>EDP+ 25%</option><option value="30">Parfum 30%</option><option value="35">Extrait 35%</option></select></div></div><button class="ghost wide-btn" onclick="calcBatch()">احسب الكميات</button><div id="batchResult"></div></section>
 <section class="lux-panel tone-rose"><div class="panel-heading"><div><span class="mini-label">إدارة الإصدارات</span><h3>احفظ تركيبتك</h3></div><span class="panel-icon">📖</span></div><div class="field"><label>ملاحظات النسخة</label><textarea id="versionNotes" placeholder="مثال: قللت الفانيلا وزدت الصندل..."></textarea></div><button class="primary wide-btn" onclick="saveFormula()">حفظ نسخة جديدة V</button></section>`}
function materials(){return `${pageHero('مكتبة المواد','استكشف المكونات الطبيعية والاصطناعية وتعرّف على توافقاتها','◈','lilac')}
 <section class="lux-panel tone-lilac library-search"><div class="field"><label>ابحث في مكتبة روح الياسمين</label><input id="matSearch" oninput="filterMaterials(this.value)" placeholder="اسم المادة، العائلة، أو طبقة الهرم..."></div><div class="library-count">${MATERIALS.length} مادة عطرية</div></section>
 <div id="materialList" class="material-list material-cards">${materialsHTML(MATERIALS)}</div>`}
function materialsHTML(arr){return arr.map((m,i)=>`<div class="material material-premium mat-${['pink','teal','lilac','gold'][i%4]}"><button class="material-icon material-icon-btn" onclick="materialInfo('${m.id}')" aria-label="تفاصيل ${m.name}">${m.icon}</button><div><h4>${m.name} <small>${m.en}</small></h4><p>${m.level} • ${m.family}</p><div class="material-bars"><span>قوة ${m.power}/10</span><span>ثبات ${m.life}/10</span></div></div><button onclick="materialInfo('${m.id}')">تفاصيل</button></div>`).join('')}
function formulas(){return `${pageHero('تركيباتي','دفتر تركيباتك الخاصة وإصدارات V1 وV2 وV3','▤','gold')}
 <section class="formula-banner"><div><span>دفتر العطور</span><b>${db.formulas.length}</b><small>تركيبة محفوظة</small></div><div class="bottle-mark">✦</div></section>
 ${db.formulas.length?`<div class="material-list formula-cards">${db.formulas.map((f,i)=>`<div class="formula-card formula-tone-${i%4}"><div class="formula-v">${esc(f.version)}</div><div class="formula-copy"><strong>${esc(f.name)}</strong><small>${esc(f.mood)} • ${esc(f.occasion)}</small><small>${new Date(f.createdAt).toLocaleDateString('ar-OM')} • ${f.notes.length} مواد</small></div><button class="formula-open" onclick="openFormula('${f.id}')">فتح</button></div>`).join('')}</div>`:'<div class="empty lux-panel tone-gold">لا توجد تركيبات محفوظة حتى الآن. ابدأ من «اصنع عطرك» ثم احفظ أول إصدار لك.</div>'}`}
function knowledge(){return `${pageHero('المعرفة','مرجعك السريع لفهم الهرم العطري والعائلات والتوافقات','▤','teal')}<div class="knowledge-grid"><button class="lux-panel tone-lilac knowledge-card" onclick="setRoute('materials')"><b>مكتبة المواد</b><small>خصائص المواد وقوتها وثباتها وتوافقاتها</small></button><section class="lux-panel tone-gold knowledge-card"><b>الهرم العطري</b><small>افتتاحية • قلب • قاعدة — ابنِ توازنًا واضحًا لكل تركيبة</small></section><section class="lux-panel tone-pink knowledge-card"><b>التجربة والتعتيق</b><small>سجل ملاحظات كل نسخة قبل الانتقال إلى الإصدار التالي</small></section></div>`}
function favorites(){const list=db.formulas.slice(0,6);return `${pageHero('المفضلة','مكان سريع للرجوع إلى التركيبات التي تعمل عليها','♡','pink')}${list.length?`<div class="formula-cards material-list">${list.map((f,i)=>`<div class="formula-card formula-tone-${i%4}"><div class="formula-v">${esc(f.version)}</div><div class="formula-copy"><strong>${esc(f.name)}</strong><small>${esc(f.mood)} • ${f.notes.length} مواد</small></div><button class="formula-open" onclick="openFormula('${f.id}')">فتح</button></div>`).join('')}</div>`:'<div class="empty lux-panel tone-pink">عندما تحفظ تركيباتك ستظهر هنا للرجوع السريع.</div>'}`}
function profile(){return `${pageHero('حسابي','مساحة روح الياسمين الشخصية على هذا الجهاز','♙','gold')}
<section class="lux-panel tone-cream profile-card"><div class="profile-logo"><img src="icon.svg" alt=""></div><div><span class="mini-label">مختبر شخصي</span><h3>روح الياسمين</h3><p>تركيبات محفوظة: <b>${db.formulas.length}</b> • مواد المكتبة: <b>${MATERIALS.length}</b></p></div></section>
<button class="profile-formulas-card" onclick="openProfileFormulas()"><div><span class="mini-label">مكتبتي الشخصية</span><h3>التركيبات المحفوظة</h3><p>${db.formulas.length?db.formulas.length+' تركيبة محفوظة — اضغط لعرضها':'لا توجد تركيبات محفوظة بعد'}</p></div><span class="profile-formulas-arrow">←</span></button>
<div id="profileFormulasArea"></div>`}
function openProfileFormulas(){
 const box=document.getElementById('profileFormulasArea');if(!box)return;
 if(!db.formulas.length){box.innerHTML='<div class="empty lux-panel tone-lilac">لا توجد تركيبات محفوظة بعد. احفظ تركيبة من المختبر وستظهر هنا تلقائيًا.</div>';return}
 box.innerHTML='<section class="lux-panel tone-lilac"><div class="panel-heading"><div><span class="mini-label">تركيباتي</span><h3>التركيبات المحفوظة</h3></div><span class="panel-icon">▤</span></div><div class="profile-formula-list">'+db.formulas.map(f=>'<button class="profile-formula-item" onclick="openFormula(\''+f.id+'\')"><div><b>'+esc(f.name||f.baseName||'تركيبة')+' <span>'+esc(f.version||'')+'</span></b><small>'+esc(f.mood||'')+(f.occasion?' • '+esc(f.occasion):'')+' • '+(f.notes?.length||0)+' مواد</small></div><strong>فتح ←</strong></button>').join('')+'</div></section>';
 box.scrollIntoView({behavior:'smooth',block:'start'});
}
function settings(){return `${pageHero('الإعدادات','إدارة تجربة التطبيق والاتصال بالخادم','⚙','lilac')}
<section class="settings-menu">
 <button type="button" class="setting-card backend-setting" onclick="openBackendSettings()"><span class="setting-icon">☁</span><div><b>Backend</b><small>تشغيل وفحص خادم الذكاء الاصطناعي والتعرف على العطور</small></div><span class="setting-arrow">←</span></button>
 <section class="lux-panel tone-lilac"><div class="panel-heading"><div><span class="mini-label">التطبيق</span><h3>روح الياسمين</h3></div><span class="panel-icon">⚙</span></div><p>يتم حفظ تركيباتك وقائمة مشتريات المختبر محليًا على هذا الجهاز.</p><div class="actions"><button type="button" class="ghost" onclick="toggleAppTheme()">تبديل المظهر</button></div></section>
</section>`}

function backendPage(){
 const status=db.backend.lastStatus||'unknown';
 return `${pageHero('Backend','إدارة الاتصال بالخادم السحابي لميزات الذكاء الاصطناعي','☁','teal')}
 <section class="backend-card lux-panel tone-cream">
   <div class="backend-status-row"><div><span class="mini-label">حالة الخادم</span><h3>${status==='online'?'متصل':status==='offline'?'غير متصل':'لم يتم الفحص'}</h3></div><span class="backend-dot ${status}"></span></div>
   <label class="backend-toggle"><input type="checkbox" ${db.backend.enabled?'checked':''} onchange="toggleBackend(this.checked)"><span>تفعيل Backend</span></label>
   <div class="field"><label>عنوان الخادم</label><input id="backendUrl" value="${esc(db.backend.url||'')}" placeholder="مثال: https://ruh-al-yassmin.vercel.app"></div>
   <small class="backend-help">اترك الحقل فارغًا إذا كان التطبيق نفسه منشورًا على Vercel. عند استخدام GitHub Pages ضع رابط مشروع Vercel هنا.</small>
   <div class="actions"><button class="primary" onclick="saveBackendUrl()">حفظ العنوان</button><button class="ghost" onclick="testBackend()">اختبار الخادم</button><button class="ghost" onclick="testOpenAIBackend()">اختبار OpenAI</button></div>
   <div id="backendTestResult"></div>
 </section>
 <section class="lux-panel tone-lilac"><b>ما الذي يستخدم Backend؟</b><p>التعرف على العطر من الصورة، البحث عن نوتاته على الإنترنت، والمساعد الذكي السحابي. إذا تعذر الاتصال يبقى المساعد المحلي متاحًا.</p></section>`
}
function backendBase(){
 if(!db.backend?.enabled)return '';
 const raw=String(db.backend.url||'').trim().replace(/\/$/,'');
 return raw;
}
function apiUrl(path){
 const base=backendBase();
 return base?base+path:path;
}
function toggleBackend(v){db.backend.enabled=!!v;save();renderKeepScroll()}
function saveBackendUrl(){const el=document.getElementById('backendUrl');db.backend.url=(el?.value||'').trim().replace(/\/$/,'');save();toast('تم حفظ عنوان Backend');testBackend()}
async function testBackend(){
 const box=document.getElementById('backendTestResult');if(box)box.innerHTML='<div class="ai-thinking">جاري فحص الخادم...</div>';
 try{
  const r=await fetch(apiUrl('/api/health'),{cache:'no-store'});
  if(!r.ok)throw new Error('offline');
  const data=await r.json();db.backend.lastStatus='online';save();
  if(box)box.innerHTML=`<div class="backend-ok">✓ الخادم يعمل ${data?.version?'• '+esc(data.version):''}</div>`;
 }catch(e){
  db.backend.lastStatus='offline';save();
  if(box)box.innerHTML='<div class="backend-bad">تعذر الوصول إلى Backend. تأكد من رابط Vercel ونشر المشروع.</div>';
 }
}
async function testOpenAIBackend(){
 const box=document.getElementById('backendTestResult');if(box)box.innerHTML='<div class="ai-thinking">جاري اختبار اتصال OpenAI فعليًا...</div>';
 try{
  const r=await fetch(apiUrl('/api/diagnostics'),{cache:'no-store'});
  const data=await r.json();
  if(data.ok){
    db.backend.lastStatus='online';save();
    if(box)box.innerHTML=`<div class="backend-ok">✓ OpenAI يعمل بنجاح • ${esc(data.model||'')}</div>`;
    return;
  }
  const code=String(data.code||'UNKNOWN');
  let arabic='فشل اتصال OpenAI: '+code;
  if(code==='credit_balance_exhausted'||code==='insufficient_quota')arabic='رصيد OpenAI API غير متوفر أو منتهي. أضف رصيدًا إلى حساب API.';
  else if(code.includes('spend_limit'))arabic='تم الوصول إلى حد الإنفاق في مشروع OpenAI.';
  else if(code==='invalid_api_key')arabic='مفتاح OpenAI غير صحيح أو لم يعد صالحًا.';
  else if(data.httpStatus===404)arabic='النموذج المحدد غير متاح لهذا المشروع.';
  if(box)box.innerHTML=`<div class="backend-bad"><b>${esc(arabic)}</b><small style="display:block;margin-top:6px">${esc(data.message||'')}</small></div>`;
 }catch(e){
  if(box)box.innerHTML='<div class="backend-bad">تعذر تشغيل اختبار OpenAI. أعد نشر آخر نسخة من المشروع على Vercel.</div>';
 }
}

function isConsumableSupply(item){return item.category==='زيوت ومواد عطرية'||item.id==='ethanol'}
function stockPercent(item){if(!item.bought)return 0;const cap=Number(item.capacity||item.qty||0);if(!cap)return 0;return Math.max(0,Math.min(100,Math.round((Number(item.remaining||0)/cap)*100)))}
function supplyBottle(item){
 if(!isConsumableSupply(item))return '';
 const p=stockPercent(item);
 const low=p<=20&&item.bought?' low':'';
 return `<div class="stock-bottle${low}" title="المتبقي ${formatSupplyAmount(item)}"><div class="bottle-neck"></div><div class="bottle-body"><div class="bottle-liquid" style="height:${p}%"></div><span>${p}%</span></div></div>`
}
function formatSupplyAmount(item){const r=Math.max(0,Number(item.remaining||0));return (item.unit==='L'?r.toFixed(3):r.toFixed(2))+' '+item.unit}
function supplies(){
 const categories=[...new Set(db.supplies.map(x=>x.category))];
 const bought=db.supplies.filter(x=>x.bought).length;
 return `${pageHero('تجهيز مختبري','مخزونك الشخصي مع متابعة الكمية المتبقية بعد كل عملية خلط','🧴','gold')}
 <section class="supply-summary"><div><span>تم الشراء</span><b>${bought}/${db.supplies.length}</b></div><div class="progress"><span style="width:${Math.round(bought/db.supplies.length*100)}%"></span></div></section>
 <div class="supply-note">عند تحديد الزيت أو الكحول بأنه تم شراؤه، تظهر الزجاجة ممتلئة حسب الكمية المسجلة. عند تنفيذ دفعة عطر من المختبر، يخصم التطبيق الاستهلاك تلقائيًا من المخزون.</div>
 ${categories.map(cat=>`<section class="supply-group"><div class="section-title"><h3>${cat}</h3><span>${db.supplies.filter(x=>x.category===cat).length} عناصر</span></div><div class="supply-list">${db.supplies.filter(x=>x.category===cat).map(item=>`<div class="supply-item ${item.bought?'done':''} ${isConsumableSupply(item)?'tracked':''}"><button class="supply-check" onclick="toggleSupply('${item.id}')">${item.bought?'✓':''}</button>${supplyBottle(item)}<div class="supply-copy"><b>${item.name}</b><small>${item.note}</small>${isConsumableSupply(item)&&item.bought?`<em class="remaining-text">المتبقي: ${formatSupplyAmount(item)} من ${item.capacity} ${item.unit}</em>`:''}</div><div class="supply-qty"><input type="number" min="0" step="${item.unit==='L'?'0.1':'1'}" value="${item.qty}" onchange="updateSupplyQty('${item.id}',this.value)"><span>${item.unit}</span></div></div>`).join('')}</div></section>`).join('')}
 ${db.usageHistory.length?`<section class="usage-history"><div class="section-title"><h3>آخر عمليات الخصم</h3><span>${db.usageHistory.length}</span></div>${db.usageHistory.slice(0,5).map(h=>`<div class="history-row"><div><b>${esc(h.name)}</b><small>${new Date(h.date).toLocaleString('ar-OM')}</small></div><span>${h.size} ml</span></div>`).join('')}</section>`:''}
 <div class="actions supply-actions"><button class="ghost" onclick="resetSupplies()">إعادة الكميات المقترحة</button><button class="primary" onclick="markAllSupplies(false)">إلغاء علامات الشراء</button></div>`}
function toggleSupply(id){
 const x=db.supplies.find(i=>i.id===id);if(!x)return;
 x.bought=!x.bought;
 if(x.bought){x.capacity=Number(x.qty)||0;x.remaining=Number(x.qty)||0}
 else{x.remaining=0}
 save();renderKeepScroll()
}
function updateSupplyQty(id,value){
 const x=db.supplies.find(i=>i.id===id);if(!x)return;
 const oldCap=Number(x.capacity||x.qty||0),oldRemaining=Number(x.remaining||0),next=Math.max(0,Number(value)||0);
 x.qty=next;x.capacity=next;
 if(x.bought){x.remaining=(Math.abs(oldRemaining-oldCap)<0.0001)?next:Math.min(oldRemaining,next)}
 save();renderKeepScroll()
}
function resetSupplies(){db.supplies=SUPPLY_DEFAULTS.map(x=>({...x,bought:false,remaining:0,capacity:x.qty}));db.usageHistory=[];save();render();toast('تمت إعادة قائمة التجهيز والمخزون')}
function markAllSupplies(value){db.supplies.forEach(x=>{x.bought=value;x.capacity=Number(x.qty)||0;x.remaining=value?(Number(x.qty)||0):0});save();renderKeepScroll()}

let cloneImageData='';
let cloneCandidates=[];
let createSearchCandidates=[];
function clonePerfume(){return `${pageHero('استنساخ عطر','صوّر الزجاجة أو اختر صورة، ثم حوّل نوتاتها إلى تركيبة مستوحاة قابلة للتعديل','📷','pink')}
<section class="clone-capture lux-panel tone-cream">
 <div class="panel-heading"><div><span class="mini-label">التعرف البصري</span><h3>صوّر العطر</h3></div><span class="panel-icon">📷</span></div>
 <div class="camera-drop"><span class="camera-icon">◎</span><b>أضف صورة العطر</b><small>يمكنك التصوير بالكاميرا أو اختيار صورة موجودة من استديو الصور</small><div class="media-pickers"><label class="picker-btn camera-btn" for="perfumeCamera">📷 التقاط صورة</label><input id="perfumeCamera" type="file" accept="image/*" capture="environment" onchange="previewPerfumePhoto(this)"><label class="picker-btn gallery-btn" for="perfumeGallery">🖼 اختيار من الاستديو</label><input id="perfumeGallery" type="file" accept="image/*" onchange="previewPerfumePhoto(this)"></div></div>
 <div id="clonePreview" class="clone-preview"></div>
 <div class="field clone-name"><label>اسم العطر — اختياري إذا كانت الصورة واضحة</label><input id="cloneName" placeholder="مثال: Dior Sauvage Elixir"></div>
 <button class="ai-main-btn" id="cloneAnalyzeBtn" onclick="analyzePerfumePhoto()">✦ تعرّف على العطر وابحث عن مكوناته</button>
 <div id="cloneResult" class="clone-result"></div>
</section>
<section class="clone-archive lux-panel tone-gold">
 <div class="panel-heading"><div><span class="mini-label">محفوظ تلقائيًا</span><h3>أرشيف الاستنساخ والبحث</h3></div><span class="panel-icon">🗂</span></div>
 ${cloneArchiveHTML()}
</section>
<section class="clone-info lux-panel tone-lilac"><b>مهم</b><p>المصادر العامة تنشر عادة النوتات والـaccords، وليس الصيغة التجارية الدقيقة. لذلك سيصنع لك روح الياسمين نسخة <strong>مستوحاة</strong> وقابلة للتعديل داخل مختبرك، وليس نسخة مصنع مطابقة.</p></section>`}
function previewPerfumePhoto(input){
 const file=input.files?.[0];if(!file)return;
 if(file.size>8*1024*1024)return toast('اختر صورة أصغر من 8 MB');
 const reader=new FileReader();
 reader.onload=()=>{cloneImageData=String(reader.result||'');const p=document.getElementById('clonePreview');if(p)p.innerHTML=`<img src="${cloneImageData}" alt="صورة العطر"><button onclick="clearClonePhoto()">×</button>`};
 reader.readAsDataURL(file);
}
function clearClonePhoto(){cloneImageData='';const cam=document.getElementById('perfumeCamera');const gal=document.getElementById('perfumeGallery');if(cam)cam.value='';if(gal)gal.value='';const p=document.getElementById('clonePreview');if(p)p.innerHTML=''}
function cloneEndpoint(){return window.RUH_YASMIN_PERFUME_API||apiUrl('/api/perfume-identify')}
async function analyzePerfumePhoto(){
 const manualName=document.getElementById('cloneName')?.value?.trim()||'';
 if(!cloneImageData&&!manualName)return toast('صوّر العطر أو اكتب اسمه أولاً');
 const btn=document.getElementById('cloneAnalyzeBtn'),box=document.getElementById('cloneResult');
 const isNameSearch=!!manualName&&!cloneImageData;
 if(btn){btn.disabled=true;btn.textContent=isNameSearch?'جاري البحث عن العطور المتشابهة...':'جاري التعرف والبحث...'}
 if(box)box.innerHTML='<div class="ai-thinking">✦ '+(isNameSearch?'أبحث عن الإصدارات والعطور التي تحمل هذا الاسم...':'أحلل الزجاجة وأبحث عن النوتات...')+'</div>';
 try{
   const res=await fetch(cloneEndpoint(),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({image:cloneImageData||null,name:manualName,mode:isNameSearch?'search':'identify'})});
   if(!res.ok)throw new Error('ONLINE_UNAVAILABLE');
   const data=await res.json();
   if(data.mode==='candidates'&&Array.isArray(data.candidates)&&data.candidates.length)showCloneCandidates(data.candidates,manualName);
   else showCloneResult(data);
 }catch(e){
   if(box)box.innerHTML='<div class="ai-error">تعذر البحث السحابي الآن. تحقق من Backend وOpenAI ثم حاول مرة أخرى.</div>';
 }finally{if(btn){btn.disabled=false;btn.textContent='✦ تعرّف على العطر وابحث عن مكوناته'}}
}
function showCloneCandidates(items,query,archive=true){
 cloneCandidates=items.slice(0,12);
 if(archive)saveCloneArchive({type:'search',query:String(query||''),candidates:structuredClone(cloneCandidates)});
 const box=document.getElementById('cloneResult');if(!box)return;
 let html='<div class="clone-candidate-wrap"><div class="clone-title"><span>نتائج البحث</span><h3>اختر العطر المقصود</h3><p>وجدت عدة نتائج قريبة من «'+esc(query)+'». اختر المنتج الصحيح قبل بناء التركيبة.</p></div><div class="clone-candidate-list">';
 html+=cloneCandidates.map((x,i)=>'<button class="clone-candidate" onclick="selectCloneCandidate('+i+')"><div><b>'+esc(x.product_name||'عطر')+'</b><span>'+esc(x.brand||'علامة غير محددة')+(x.concentration?' • '+esc(x.concentration):'')+(x.year?' • '+esc(x.year):'')+'</span></div><small>'+esc(x.disambiguation||x.description||'اضغط لاختيار هذا العطر')+'</small><strong>اختيار ←</strong></button>').join('');
 html+='</div></div>';box.innerHTML=html;
}
async function selectCloneCandidate(index){
 const item=cloneCandidates[index];if(!item)return;
 const box=document.getElementById('cloneResult');
 if(box)box.innerHTML='<div class="ai-thinking">✦ تم اختيار '+esc([item.brand,item.product_name].filter(Boolean).join(' — '))+'. أجلب النوتات الآن...</div>';
 try{
  const res=await fetch(cloneEndpoint(),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode:'identify',name:[item.brand,item.product_name,item.concentration,item.year].filter(Boolean).join(' '),selected:item})});
  if(!res.ok)throw new Error('DETAILS_FAILED');
  const data=await res.json();showCloneResult(data);
 }catch(e){if(box)box.innerHTML='<div class="ai-error">تعذر جلب تفاصيل العطر المختار. حاول مرة أخرى.</div>';}
}
function showCloneResult(data,archive=true){
 const box=document.getElementById('cloneResult');if(!box)return;
 if(archive)saveCloneArchive({type:'result',query:String(data?.product_name||''),data:structuredClone(data)});
 const notes=[...(data.top_notes||[]),...(data.heart_notes||[]),...(data.base_notes||[])];
 box.innerHTML=`<div class="clone-found">
   <div class="clone-title"><span>تم التعرف</span><h3>${esc([data.brand,data.product_name].filter(Boolean).join(' — ')||'العطر')}</h3></div>
   ${notes.length?`<div class="clone-notes">${notes.map(x=>`<span>${esc(x)}</span>`).join('')}</div>`:''}
   ${(data.accords||[]).length?`<p><b>الطابع:</b> ${esc(data.accords.join(' • '))}</p>`:''}
   <p>${esc(data.rationale||'سأحوّل النوتات المنشورة إلى تركيبة مستوحاة باستخدام مواد مختبر روح الياسمين.')}</p>
   ${Array.isArray(data.sources)&&data.sources.length?`<div class="clone-sources"><b>المصادر</b>${data.sources.slice(0,4).map(x=>`<a href="${esc(x.url||'#')}" target="_blank" rel="noopener">${esc(x.title||x.url||'مصدر')}</a>`).join('')}</div>`:''}
   <button class="primary wide-btn" onclick='useCloneFormula(${JSON.stringify(data.clone_notes||[]).replace(/'/g,"&#39;")},${JSON.stringify(data.product_name||'نسخة مستوحاة').replace(/'/g,"&#39;")})'>أنشئ نسختي في المختبر</button>
 </div>`;
}

function saveCloneArchive(entry){
 const item={id:crypto.randomUUID(),createdAt:new Date().toISOString(),...entry};
 db.cloneArchive.unshift(item);
 db.cloneArchive=db.cloneArchive.slice(0,100);
 save();
}
function cloneArchiveHTML(){
 if(!db.cloneArchive.length)return '<div class="empty">لا يوجد سجل بعد. أي بحث أو استنساخ جديد سيظهر هنا تلقائيًا.</div>';
 return '<div class="clone-archive-list">'+db.cloneArchive.map(x=>{
   const isResult=x.type==='result';
   const d=x.data||{};
   const title=isResult?([d.brand,d.product_name].filter(Boolean).join(' — ')||'عطر محفوظ'):(x.query||'بحث محفوظ');
   const sub=isResult?'تركيبة مستوحاة محفوظة':((x.candidates||[]).length+' نتيجة محفوظة');
   const date=new Date(x.createdAt).toLocaleDateString('ar-OM',{year:'numeric',month:'short',day:'numeric'});
   return '<div class="clone-archive-item"><button class="archive-open" onclick="openCloneArchive(\''+x.id+'\')"><div><b>'+esc(title)+'</b><small>'+esc(sub)+' • '+esc(date)+'</small></div><span>فتح ←</span></button><button class="archive-delete" onclick="deleteCloneArchive(\''+x.id+'\')" aria-label="حذف">×</button></div>';
 }).join('')+'</div>';
}
function openCloneArchive(id){
 const item=db.cloneArchive.find(x=>x.id===id);if(!item)return;
 if(item.type==='search'){
   const input=document.getElementById('cloneName');if(input)input.value=item.query||'';
   showCloneCandidates(item.candidates||[],item.query||'',false);
 }else{
   showCloneResult(item.data||{},false);
 }
 const box=document.getElementById('cloneResult');if(box)box.scrollIntoView({behavior:'smooth',block:'start'});
}
function deleteCloneArchive(id){
 db.cloneArchive=db.cloneArchive.filter(x=>x.id!==id);save();renderKeepScroll();toast('تم حذف السجل من الأرشيف');
}
function useCloneFormula(notes,name){
 const valid=(Array.isArray(notes)?notes:[]).filter(n=>MATERIALS.some(m=>m.id===n.id)).map(n=>({id:n.id,pct:Number(n.pct)||0}));
 if(!valid.length){
   const fallback=buildSmartPerfume(String(name||'عطر فاخر'));
   db.draft.notes=fallback.notes;db.draft.mood=fallback.mood;
 }else{
   const total=valid.reduce((a,n)=>a+n.pct,0)||1;
   db.draft.notes=valid.map(n=>({...n,pct:Math.round(n.pct/total*1000)/10}));
   const fix=100-db.draft.notes.reduce((a,n)=>a+n.pct,0);db.draft.notes[db.draft.notes.length-1].pct=Math.round((db.draft.notes[db.draft.notes.length-1].pct+fix)*10)/10;
 }
 db.draft.name='مستوحى من '+String(name||'عطر');
 save();setRoute('lab');toast('تم إنشاء نسخة مستوحاة داخل المختبر');
}

function assistant(){return `${pageHero('مساعد روح الياسمين','صف عطرك بكلماتك ودع الذكاء الاصطناعي يبني لك نقطة بداية قابلة للتعديل','✦','teal')}
<section class="ai-stage"><div class="ai-orb">✦</div><div><span class="mini-label">Ruh Al Yassmin AI</span><h3>ماذا تريد أن تصنع اليوم؟</h3><p>اكتب الإحساس، المناسبة، المواد التي تحبها أو ترفضها، والثبات أو الفوحان الذي تتوقعه.</p><div class="ai-status local">وضع احتياطي محلي فعال • الربط السحابي يحتاج Backend</div></div></section>
<section class="lux-panel tone-cream ai-console">
<div class="field"><label>وصف العطر</label><textarea id="aiPrompt" placeholder="مثال: أريد عطرًا فاخرًا نظيفًا للمساء، افتتاحيته حمضية خفيفة، قلبه ياسمين وهيل، وقاعدته خشبية مع مسك وثبات مرتفع."></textarea></div>
<div class="ai-shortcuts"><button class="chip" onclick="fillAI('عطر نظيف وفاخر بأجواء لوبي فندق راقٍ، خشبي ومسكي وغير حلو')">فندقي نظيف</button><button class="chip" onclick="fillAI('عطر شرقي فاخر للمساء، عود وزعفران وعنبر، قوي لكن متوازن')">شرقي فاخر</button><button class="chip" onclick="fillAI('عطر ياسمين أبيض منعش وناعم للاستخدام اليومي، غير سكري')">ياسمين منعش</button></div>
<button class="ai-main-btn" id="aiSendBtn" onclick="askPerfumeAI()">✦ أنشئ التركيبة بالذكاء الاصطناعي</button>
<div id="aiResult" class="ai-result"></div></section>`}
function fillAI(text){const el=document.getElementById('aiPrompt');if(el){el.value=text;el.focus()}}
function setAILoading(on){const b=document.getElementById('aiSendBtn');if(b){b.disabled=on;b.textContent=on?'جاري تحليل فكرتك...':'✦ أنشئ التركيبة بالذكاء الاصطناعي'}}
function aiContext(){return {name:db.draft.name||'',mood:db.draft.mood||'',occasion:db.draft.occasion||'',gender:db.draft.gender||'',current_notes:db.draft.notes.map(n=>({id:n.id,pct:Number(n.pct)}))}}
async function askPerfumeAI(customPrompt){
 const prompt=customPrompt||document.getElementById('aiPrompt')?.value?.trim();
 if(!prompt)return toast('اكتب وصف العطر أولاً');
 const box=document.getElementById('aiResult');
 setAILoading(true);
 if(box)box.innerHTML='<div class="ai-thinking">✦ روح الياسمين يحلل وصفك ويبني التركيبة...</div>';

 if(db.backend?.enabled){
   try{
     const res=await fetch(apiUrl('/api/ai'),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt,context:aiContext()})});
     if(res.ok){
       const data=await res.json();
       const valid=(data.notes||[]).filter(n=>MATERIALS.some(m=>m.id===n.id)).map(n=>({id:n.id,pct:Number(n.pct)||0}));
       if(valid.length){
         const total=valid.reduce((a,n)=>a+n.pct,0)||1;
         data.notes=valid.map(n=>({...n,pct:Math.round(n.pct/total*1000)/10}));
         const fix=100-data.notes.reduce((a,n)=>a+n.pct,0);
         data.notes[data.notes.length-1].pct=Math.round((data.notes[data.notes.length-1].pct+fix)*10)/10;
         applySmartPerfume(data);
         if(box)box.innerHTML=`<div class="ai-success"><b>${esc(data.name||'تركيبة ذكية')}</b><p>${esc(data.rationale||'تم إنشاء تركيبة قابلة للتعديل داخل المختبر.')}</p><div class="ai-note-tags">${data.notes.map(n=>{const m=MATERIALS.find(x=>x.id===n.id);return `<span>${m.name} ${n.pct}%</span>`}).join('')}</div><button class="primary wide-btn" onclick="setRoute('lab')">فتح التركيبة في المختبر</button></div>`;
         db.backend.lastStatus='online';save();setAILoading(false);toast('تم إنشاء التركيبة بالذكاء الاصطناعي السحابي');return;
       }
     }
     let detail='';
     try{const err=await res.json();detail=err?.details||err?.error||''}catch(_){}
     db.backend.lastStatus='offline';save();
     if(box&&detail)box.innerHTML=`<div class="ai-error">الخادم متصل لكن OpenAI رفض الطلب: ${esc(detail)}</div>`;
   }catch(e){db.backend.lastStatus='offline';save()}
 }

 await new Promise(r=>setTimeout(r,250));
 const result=buildSmartPerfume(prompt);
 applySmartPerfume(result);
 if(box)box.innerHTML=`<div class="ai-success"><b>${esc(result.name)}</b><p>${esc(result.rationale)}</p><div class="ai-note-tags">${result.notes.map(n=>{const m=MATERIALS.find(x=>x.id===n.id);return `<span>${m.name} ${n.pct}%</span>`}).join('')}</div><small class="backend-help">تم استخدام المحرك المحلي لأن Backend غير متاح.</small><button class="primary wide-btn" onclick="setRoute('lab')">فتح التركيبة في المختبر</button></div>`;
 setAILoading(false);
 toast('تم إنشاء التركيبة الذكية');
}
function buildSmartPerfume(text){
 const lower=String(text||'').toLowerCase();
 let ids=['bergamot','neroli','lavender','cedar','sandal','musk'];
 let weights=[18,12,14,18,18,20];
 let mood='نظيف',name='ردهة فاخرة',occasion=db.draft.occasion||'مسائي';
 let rationale='تركيبة متوازنة تبدأ بانتعاش حمضي ناعم، ثم قلب عطري نظيف، وتنتهي بقاعدة خشبية مسكية ثابتة.';
 if(/باتشولي|خشن|سبايسي|spicy|ترابي|فيتيفر|فلفل|دخاني|ناغارموثا|سيبريول/.test(lower)){
   ids=['blackpepper','cardamom','patchouli','vetiver','cypriol','oud','frankincense'];
   weights=[10,10,18,16,14,18,14];
   mood='خشبي سبايسي';name='خشب داكن';rationale='تركيبة خشنة وسبايسي بطابع ترابي ودخاني، يقودها الباتشولي والفيتيفر والسيبريول مع عود ولبان وفلفل أسود.';
 }else if(/عود|شرقي|زعفران|عنبر|بخور/.test(lower)){
   ids=['blackpepper','saffron','patchouli','oud','amber','frankincense'];weights=[10,10,18,24,20,18];
   mood='شرقي';name='ليل العنبر';rationale='بناء شرقي داكن يعتمد على العود والباتشولي والعنبر مع لبان ولمسة سبايسي لزيادة العمق والحضور.';
 }else if(/ياسمين|ورد|زهري|زهور/.test(lower)){
   ids=['bergamot','neroli','jasmine','rose','sandal','musk'];weights=[15,12,25,16,15,17];
   mood='زهري';name='ياسمين أبيض';rationale='قلب زهري واضح تقوده الياسمين والورد، مع افتتاحية نيرولي وبرغموت وقاعدة صندل ومسك للحفاظ على النعومة والثبات.';
 }else if(/جلد|جلدي|leather/.test(lower)){
   ids=['bergamot','cardamom','saffron','leather','oud','amber'];weights=[14,12,10,20,22,22];
   mood='جلدي';name='جلد وعنبر';rationale='تركيبة جلدية جافة وفاخرة، يخففها البرغموت والهيل ويثبتها العود والعنبر.';
 }else if(/حلو|فانيلا|سكري|دافئ/.test(lower)){
   ids=['bergamot','lavender','vanilla','amber','sandal','musk'];weights=[12,12,22,20,16,18];
   mood='حلو';name='دفء الفانيلا';rationale='حلاوة دافئة غير مباشرة؛ الفانيلا والعنبر في القاعدة مع صندل ومسك، وافتتاحية خفيفة تمنع التركيبة من أن تصبح ثقيلة.';
 }else if(/منعش|حمضي|صيف|نهاري|نظيف|فندق|مسك|خشبي/.test(lower)){
   ids=['bergamot','lemon','neroli','lavender','cedar','musk'];weights=[22,12,14,14,18,20];
   mood=/صيف|منعش|حمضي/.test(lower)?'منعش':'نظيف';name=/فندق|نظيف/.test(lower)?'ردهة فاخرة':'نسيم الياسمين';
   rationale='افتتاحية حمضية مشرقة مع قلب نظيف وقاعدة أرز ومسك تمنح ثباتًا وأناقة دون حلاوة زائدة.';
 }
 if(/قوي|فواح|فوحان/.test(lower)){weights[weights.length-1]+=3;weights[0]-=3}
 if(/ناعم|خفيف/.test(lower)){weights[0]+=3;weights[weights.length-1]-=3}
 const total=weights.reduce((a,b)=>a+b,0);
 const notes=ids.map((id,i)=>({id,pct:Math.round(weights[i]/total*1000)/10}));
 const fix=100-notes.reduce((a,n)=>a+n.pct,0);notes[notes.length-1].pct=Math.round((notes[notes.length-1].pct+fix)*10)/10;
 return {name,mood,occasion,rationale,notes};
}
function applySmartPerfume(result){
 db.draft.name=db.draft.name||result.name;
 db.draft.mood=result.mood;
 db.draft.occasion=result.occasion;
 db.draft.notes=result.notes.map(n=>({...n}));
 save();
}
function generateLocalAI(text,openLab=false){
 const result=buildSmartPerfume(text);
 applySmartPerfume(result);
 toast('تم إنشاء تركيبة أولية');
 if(openLab)setRoute('lab'); else render();
}
function askAIFromCreate(){const idea=document.getElementById('idea')?.value?.trim();db.draft.name=document.getElementById('fName')?.value||db.draft.name;db.draft.mood=document.getElementById('fMood')?.value||db.draft.mood;db.draft.occasion=document.getElementById('fOcc')?.value||db.draft.occasion;save();setRoute('assistant');if(idea)setTimeout(()=>{const p=document.getElementById('aiPrompt');if(p)p.value=idea;askPerfumeAI(idea)},30)}
function openAIReview(){const d=`راجع هذه التركيبة الحالية وطورها مع الحفاظ على فكرتها: ${db.draft.name||'بدون اسم'}، الطابع ${db.draft.mood}، الاستخدام ${db.draft.occasion}. المواد الحالية: ${db.draft.notes.map(n=>{const m=MATERIALS.find(x=>x.id===n.id);return m.name+' '+n.pct+'%'}).join('، ')}. أعطني نسخة أكثر توازنًا وثباتًا من نفس مواد المكتبة.`;setRoute('assistant');setTimeout(()=>{const p=document.getElementById('aiPrompt');if(p)p.value=d},30)}
function render(){view.innerHTML=({home,create,lab,materials,formulas,knowledge,favorites,profile,settings,backend:backendPage,supplies,clone:clonePerfume,assistant}[route]||home)();bindDraftInputs()}
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
let pendingPerformancePlan=null;
function currentLevelPct(level){
 return db.draft.notes.reduce((sum,n)=>{const m=MATERIALS.find(x=>x.id===n.id);return sum+(m?.level===level?Number(n.pct||0):0)},0)
}
function analyzePerformance(){
 if(!db.draft.notes.length)return toast('أضف مواد للتركيبة أولاً');
 const projection=document.getElementById('perfProjection')?.value||'medium';
 const longevity=Number(document.getElementById('perfLongevity')?.value||8);
 const concentration=Number(document.getElementById('perfConc')?.value||25);
 const top=currentLevelPct('افتتاحية'),heart=currentLevelPct('قلب'),base=currentLevelPct('قاعدة');
 const changes=[];const add=[];
 const has=id=>db.draft.notes.some(n=>n.id===id);
 const bump=(id,delta,reason)=>changes.push({id,delta,reason});
 if(projection==='strong'||projection==='very-strong'){
   if(has('bergamot'))bump('bergamot',projection==='very-strong'?3:2,'رفع الانطباع الأول والفوحان');
   else add.push({id:'bergamot',pct:projection==='very-strong'?5:3,reason:'افتتاحية واضحة تساعد على الانتشار'});
   if(has('cardamom'))bump('cardamom',2,'دعم الانتشار من القلب');
   else if(heart<25)add.push({id:'cardamom',pct:3,reason:'جسر عطري يعطي حضورًا أكبر'});
   if(top>35)changes.push({id:'__top_reduce',delta:-3,reason:'تقليل الافتتاحيات المتطايرة جدًا حتى لا يهبط الأداء سريعًا'});
 }
 if(longevity>=8){
   const strength=longevity>=12?5:longevity>=10?4:2;
   const fixes=(db.draft.mood||'').includes('خشبي')||db.draft.notes.some(n=>['oud','patchouli','vetiver','cypriol'].includes(n.id))?['patchouli','vetiver','amber']:['musk','sandal','amber'];
   for(const id of fixes.slice(0,longevity>=10?3:2)){
     if(has(id))bump(id,strength,id==='musk'?'دعم الأثر والثبات':id==='sandal'?'تثبيت القاعدة وتنعيمها':'زيادة عمق القاعدة');
     else add.push({id,pct:strength,reason:'مادة قاعدة مناسبة لرفع الثبات'});
   }
   if(base<35)add.push({id:has('cedar')?'cedar':'cedar',pct:longevity>=10?4:2,reason:'رفع نسبة القاعدة لتقليل الهبوط السريع'});
 }
 if(projection==='soft'){
   if(has('bergamot'))bump('bergamot',-2,'تقليل حدة الافتتاحية');
   if(has('musk'))bump('musk',2,'الحفاظ على هالة قريبة وناعمة');
 }
 const concAdvice=concentration>=35?'تركيز مرتفع جدًا؛ لا يعني بالضرورة فوحانًا أعلى، وقد يجعل الافتتاحية أثقل. ابدأ باختبار صغير.':concentration>=30?'تركيز قوي مناسب للثبات، ووازن القاعدة حتى لا تصبح التركيبة ثقيلة.':concentration>=25?'تركيز قوي ومتوازن لمعظم التركيبات.':'تركيز أخف؛ اعتمد أكثر على بنية القاعدة إذا أردت ثباتًا أطول.';
 pendingPerformancePlan={projection,longevity,concentration,changes,add};
 const box=document.getElementById('performanceResult');
 const rows=[
   ...changes.filter(x=>x.id!=='__top_reduce').map(x=>{const m=MATERIALS.find(y=>y.id===x.id);return `<div class="perf-suggestion"><span class="${x.delta>0?'up':'down'}">${x.delta>0?'↑':'↓'} ${Math.abs(x.delta)}%</span><div><b>${m?.name||x.id}</b><small>${x.reason}</small></div></div>`}),
   ...add.map(x=>{const m=MATERIALS.find(y=>y.id===x.id);return `<div class="perf-suggestion add"><span>+</span><div><b>أضف ${m?.name||x.id} ~ ${x.pct}%</b><small>${x.reason}</small></div></div>`})
 ];
 if(box)box.innerHTML=`<div class="performance-answer"><div class="perf-metrics"><span>افتتاحية <b>${top.toFixed(0)}%</b></span><span>قلب <b>${heart.toFixed(0)}%</b></span><span>قاعدة <b>${base.toFixed(0)}%</b></span></div><p>${concAdvice}</p>${rows.length?rows.join(''):'<div class="inventory-success">تركيبتك متوازنة مع الهدف الحالي، ولا تحتاج تعديلًا كبيرًا.</div>'}<button class="primary wide-btn" onclick="applyPerformancePlan()">طبّق التعديلات المقترحة</button><small class="safety-note">المدة والفوحان تقديريان ويتأثران بالمادة الخام والبشرة والطقس. راجع حدود IFRA وSDS لكل مادة قبل الاستخدام على الجلد.</small></div>`;
}
function applyPerformancePlan(){
 const p=pendingPerformancePlan;if(!p)return toast('حلل التركيبة أولاً');
 for(const c of p.changes){
   if(c.id==='__top_reduce'){
     const tops=db.draft.notes.filter(n=>MATERIALS.find(m=>m.id===n.id)?.level==='افتتاحية');
     if(tops.length){const each=Math.abs(c.delta)/tops.length;tops.forEach(n=>n.pct=Math.max(.1,Number(n.pct)-each))}
     continue;
   }
   const n=db.draft.notes.find(x=>x.id===c.id);
   if(n)n.pct=Math.max(.1,Number(n.pct)+c.delta);
 }
 for(const a of p.add){
   const n=db.draft.notes.find(x=>x.id===a.id);
   if(n)n.pct=Number(n.pct)+a.pct;else db.draft.notes.push({id:a.id,pct:a.pct});
 }
 const t=db.draft.notes.reduce((sum,n)=>sum+Number(n.pct||0),0);
 db.draft.notes=db.draft.notes.map(n=>({...n,pct:Math.round(n.pct/t*1000)/10}));
 const fix=100-db.draft.notes.reduce((sum,n)=>sum+n.pct,0);db.draft.notes[db.draft.notes.length-1].pct=Math.round((db.draft.notes[db.draft.notes.length-1].pct+fix)*10)/10;
 save();pendingPerformancePlan=null;render();toast('تم تطبيق اقتراحات الأداء على التركيبة');
}

let pendingBatch=null;
function materialSupplyId(materialId){return materialId+'-oil'}
function calcBatch(){
 const size=Number(document.getElementById('batchSize').value||50),conc=Number(document.getElementById('conc').value||25),oil=size*conc/100,carrier=size-oil;
 const items=db.draft.notes.map(n=>{const m=MATERIALS.find(x=>x.id===n.id);return {id:n.id,name:m.name,ml:oil*(n.pct/100)}});
 pendingBatch={size,conc,oil,carrier,items,name:db.draft.name||'دفعة عطر'};
 let html=`<div class="card batch-calculation" style="margin-top:10px"><p>الزيت العطري: <b>${oil.toFixed(2)} ml</b> • الكحول/القاعدة: <b>${carrier.toFixed(2)} ml</b></p>`;
 html+=items.map(i=>{const stock=db.supplies.find(x=>x.id===materialSupplyId(i.id));const remain=stock?.bought?formatSupplyAmount(stock):'غير مسجل';return `<p>${i.name}: <b>${i.ml.toFixed(2)} ml</b> <small>• المخزون: ${remain}</small></p>`}).join('');
 const alcohol=db.supplies.find(x=>x.id==='ethanol');html+=`<p>الكحول: <b>${carrier.toFixed(2)} ml</b> <small>• المخزون: ${alcohol?.bought?formatSupplyAmount(alcohol):'غير مسجل'}</small></p>`;
 html+=`<button class="inventory-use-btn" onclick="commitBatchUsage()">✓ تسجيل تنفيذ الدفعة وخصم المخزون</button><small class="inventory-hint">لن يتم خصم أي كمية إلا بعد الضغط على هذا الزر.</small></div>`;
 document.getElementById('batchResult').innerHTML=html
}
function getBatchShortages(batch){
 const issues=[];
 for(const item of batch.items){
  const s=db.supplies.find(x=>x.id===materialSupplyId(item.id));
  if(!s?.bought)issues.push(item.name+' غير مسجل كمشترى');
  else if(Number(s.remaining||0)+1e-9<item.ml)issues.push(item.name+' المتبقي '+formatSupplyAmount(s)+' والمطلوب '+item.ml.toFixed(2)+' ml');
 }
 const alcohol=db.supplies.find(x=>x.id==='ethanol');
 const alcoholNeedL=batch.carrier/1000;
 if(!alcohol?.bought)issues.push('الكحول غير مسجل كمشترى');
 else if(Number(alcohol.remaining||0)+1e-9<alcoholNeedL)issues.push('الكحول المتبقي '+formatSupplyAmount(alcohol)+' والمطلوب '+batch.carrier.toFixed(2)+' ml');
 return issues
}
function commitBatchUsage(){
 if(!pendingBatch)return toast('احسب الدفعة أولاً');
 const issues=getBatchShortages(pendingBatch);
 if(issues.length){modalContent.innerHTML=`<h3>المخزون غير كافٍ</h3><p>لا يمكن تسجيل تنفيذ الدفعة قبل معالجة التالي:</p><div class="shortage-list">${issues.map(x=>`<div>• ${esc(x)}</div>`).join('')}</div><button class="ghost wide-btn" onclick="modal.close();setRoute('supplies')">فتح تجهيز مختبري</button><button class="primary wide-btn" onclick="modal.close()">إغلاق</button>`;modal.showModal();return}
 for(const item of pendingBatch.items){const st=db.supplies.find(x=>x.id===materialSupplyId(item.id));st.remaining=Math.max(0,Number(st.remaining)-item.ml)}
 const alcohol=db.supplies.find(x=>x.id==='ethanol');alcohol.remaining=Math.max(0,Number(alcohol.remaining)-(pendingBatch.carrier/1000));
 db.usageHistory.unshift({id:crypto.randomUUID(),date:new Date().toISOString(),name:pendingBatch.name,size:pendingBatch.size,conc:pendingBatch.conc,items:pendingBatch.items.map(x=>({...x})),alcoholMl:pendingBatch.carrier});
 db.usageHistory=db.usageHistory.slice(0,50);save();toast('تم خصم مكونات الدفعة من المخزون');
 document.getElementById('batchResult').innerHTML='<div class="inventory-success">✓ تم تسجيل تنفيذ الدفعة وتحديث كميات الزجاجات.</div>';pendingBatch=null
}

function saveFormula(){if(!db.draft.notes.length)return toast('لا توجد مواد لحفظها');if(Math.abs(totalPct()-100)>0.2)return toast('وازن النسب إلى 100% أولاً');const same=db.formulas.filter(f=>f.baseName===(db.draft.name||'تركيبة خاصة'));const v=`V${same.length+1}`;db.formulas.unshift({id:crypto.randomUUID(),baseName:db.draft.name||'تركيبة خاصة',name:db.draft.name||'تركيبة خاصة',mood:db.draft.mood,occasion:db.draft.occasion,gender:db.draft.gender,notes:structuredClone(db.draft.notes),version:v,versionNotes:document.getElementById('versionNotes')?.value||'',createdAt:new Date().toISOString(),ratings:{projection:0,longevity:0,opening:0,drydown:0}});save();setRoute('formulas');toast(`تم حفظ ${v}`)}
function openFormula(id){const f=db.formulas.find(x=>x.id===id);if(!f)return;modalContent.innerHTML=`<h3>${esc(f.name)} — ${f.version}</h3><p style="color:var(--muted)">${esc(f.mood)} • ${esc(f.occasion)} • ${esc(f.gender)}</p>${f.notes.map(n=>{const m=MATERIALS.find(x=>x.id===n.id);return `<div class="note-row"><div><strong>${m.name}</strong><small style="display:block;color:var(--muted)">${m.level}</small></div><b>${n.pct}%</b><span></span></div>`}).join('')}<hr style="border:0;border-top:1px solid var(--line)"><p>${esc(f.versionNotes)||'لا توجد ملاحظات.'}</p><div class="actions"><button class="secondary" onclick="loadFormula('${f.id}')">استخدم كأساس لنسخة جديدة</button><button class="danger" onclick="deleteFormula('${f.id}')">حذف</button><button class="ghost" onclick="modal.close()">إغلاق</button></div>`;modal.showModal()}
function loadFormula(id){const f=db.formulas.find(x=>x.id===id);db.draft={name:f.name,mood:f.mood,occasion:f.occasion,gender:f.gender,notes:structuredClone(f.notes)};save();modal.close();setRoute('lab')}
function deleteFormula(id){db.formulas=db.formulas.filter(x=>x.id!==id);save();modal.close();render();toast('تم حذف التركيبة')}
function materialInfo(id){const m=MATERIALS.find(x=>x.id===id);modalContent.innerHTML=`<h3>${m.icon} ${m.name}</h3><p>${m.en}</p><div class="grid"><div class="card"><p>الطبقة</p><b>${m.level}</b></div><div class="card"><p>العائلة</p><b>${m.family}</b></div><div class="card"><p>القوة</p><b>${m.power}/10</b></div><div class="card"><p>الثبات</p><b>${m.life}/10</b></div></div><p style="margin-top:16px">يتناغم مع: ${m.pairs.map(x=>`<span class="tag">${x}</span>`).join('')}</p><button class="primary" onclick="addMaterial('${m.id}',5);modal.close()">أضف للمختبر</button> <button class="ghost" onclick="modal.close()">إغلاق</button>`;modal.showModal()}
function filterMaterials(q){q=q.trim().toLowerCase();const a=MATERIALS.filter(m=>[m.name,m.en,m.family,m.level].join(' ').toLowerCase().includes(q));document.getElementById('materialList').innerHTML=materialsHTML(a)}
if('serviceWorker' in navigator){
  window.addEventListener('load',async()=>{
    try{
      const regs=await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r=>r.unregister()));
      if('caches' in window){
        const keys=await caches.keys();
        await Promise.all(keys.filter(k=>k.startsWith('ruh-yasmin-')).map(k=>caches.delete(k)));
      }
    }catch(e){}
  });
}
render();