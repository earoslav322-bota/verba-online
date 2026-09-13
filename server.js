const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
app.use(express.static(path.join(__dirname, 'public')));

const ADMIN_KEY = 'verba150admin';
const PROMOS = { 'gifts228': { coins: 100000, money: 0 } };
const LICENSE = 15000, INSURANCE = 25000, HOSPITAL = 1000;
const PHONE_KIT = 3000, CALL_MIN = 50;

const RARITIES = {
  common:{name:'Обычная',color:'#9aa0a6'},uncommon:{name:'Необычная',color:'#4caf50'},
  rare:{name:'Редкая',color:'#2196f3'},epic:{name:'Эпическая',color:'#9c27b0'},
  legendary:{name:'Легендарная',color:'#ff9800'},mythic:{name:'Мифическая',color:'#f44336'}
};
const CARDS = [
  {id:'c1',name:'Кот',rarity:'common',price:20},{id:'c2',name:'Собака',rarity:'common',price:25},
  {id:'c3',name:'Пицца',rarity:'common',price:30},{id:'c4',name:'Мяч',rarity:'common',price:15},
  {id:'u1',name:'Дракончик',rarity:'uncommon',price:80},{id:'u2',name:'Единорог',rarity:'uncommon',price:100},
  {id:'u3',name:'Пингвин',rarity:'uncommon',price:70},{id:'r1',name:'Тигр',rarity:'rare',price:400},
  {id:'r2',name:'Волк',rarity:'rare',price:350},{id:'r3',name:'Орёл',rarity:'rare',price:450},
  {id:'e1',name:'Феникс',rarity:'epic',price:2000},{id:'e2',name:'Грифон',rarity:'epic',price:2500},
  {id:'l1',name:'Космический кит',rarity:'legendary',price:8000},{id:'l2',name:'Золотой лев',rarity:'legendary',price:10000},
  {id:'m1',name:'Бог Грома',rarity:'mythic',price:50000},{id:'m2',name:'Тёмный Лорд',rarity:'mythic',price:75000}
];
const CARS = [
  {id:'car1',name:'Лада 2107',price:25000,emoji:'🚗',speed:180},
  {id:'car2',name:'ВАЗ 2110',price:50000,emoji:'🚙',speed:200},
  {id:'car3',name:'BMW M5',price:250000,emoji:'🚘',speed:260},
  {id:'car4',name:'Mercedes G-Class',price:400000,emoji:'🚙',speed:240},
  {id:'car5',name:'Audi R8',price:800000,emoji:'🏎️',speed:300},
  {id:'car6',name:'Porsche 911',price:1000000,emoji:'🏎️',speed:310},
  {id:'car7',name:'Ferrari 488',price:2000000,emoji:'🏎️',speed:330},
  {id:'car8',name:'Lamborghini Huracan',price:3000000,emoji:'🏎️',speed:340},
  {id:'car9',name:'McLaren 720S',price:4500000,emoji:'🏎️',speed:350},
  {id:'car10',name:'Bugatti Chiron',price:9000000,emoji:'🏎️',speed:400}
];
const CASES = [
  {id:'case1',name:'Обычный',price:50,emoji:'📦',weights:{common:70,uncommon:25,rare:5,epic:0,legendary:0,mythic:0}},
  {id:'case2',name:'Редкий',price:200,emoji:'🎁',weights:{common:40,uncommon:35,rare:20,epic:5,legendary:0,mythic:0}},
  {id:'case3',name:'Эпический',price:800,emoji:'💎',weights:{common:10,uncommon:30,rare:35,epic:20,legendary:5,mythic:0}},
  {id:'case4',name:'Легендарный',price:3000,emoji:'👑',weights:{common:0,uncommon:10,rare:30,epic:40,legendary:18,mythic:2}},
  {id:'case5',name:'Мифический',price:12000,emoji:'🔥',weights:{common:0,uncommon:0,rare:20,epic:40,legendary:30,mythic:10}}
];
const LEVELS = [
  {level:1,exp:0,title:'Новичок'},{level:2,exp:200,title:'Стажёр'},
  {level:3,exp:600,title:'Работник'},{level:4,exp:1500,title:'Специалист'},
  {level:5,exp:3500,title:'Мастер'},{level:6,exp:7000,title:'Профи'},
  {level:7,exp:15000,title:'Эксперт'},{level:8,exp:30000,title:'Босс'},
  {level:9,exp:60000,title:'Магнат'},{level:10,exp:120000,title:'Легенда'}
];
const TASKS = [
  {id:'t1',name:'Первый кейс',desc:'Открой 1 кейс',exp:50,money:500,coins:0,check:p=>p.stats.casesOpened>=1},
  {id:'t2',name:'Первая машина',desc:'Купи машину',exp:100,money:5000,coins:0,check:p=>p.cars.length>=1},
  {id:'t3',name:'Права',desc:'Получи права',exp:150,money:3000,coins:0,check:p=>p.hasLicense},
  {id:'t4',name:'Страховка',desc:'Оформи страховку',exp:100,money:3000,coins:0,check:p=>p.hasInsurance},
  {id:'t5',name:'Дорога',desc:'Доедь до Киева',exp:200,money:5000,coins:5,check:p=>p.stats.visitedKyiv},
  {id:'t6',name:'Мойщик',desc:'Помой 5 машин',exp:300,money:5000,coins:0,check:p=>p.stats.washes>=5},
  {id:'t7',name:'Водитель',desc:'3 рейса автобусом',exp:400,money:10000,coins:10,check:p=>p.stats.reys>=3},
  {id:'t8',name:'Бизнесмен',desc:'Купи бизнес',exp:500,money:20000,coins:20,check:p=>p.businesses.length>=1},
  {id:'t9',name:'Тюнинг',desc:'Stage 1 на машину',exp:250,money:10000,coins:5,check:p=>Object.values(p.tuning||{}).some(t=>t.stage>=1)},
  {id:'t10',name:'Телефон',desc:'Купи телефон + SIM',exp:100,money:2000,coins:0,check:p=>!!p.phone}
];
const MENU = [
  {id:'m1',name:'Картошка фри',emoji:'🍟',food:15,price:50},
  {id:'m2',name:'Хот-дог',emoji:'🌭',food:20,price:50},
  {id:'m3',name:'Бургер',emoji:'🍔',food:30,price:50},
  {id:'m4',name:'Пицца',emoji:'🍕',food:40,price:50},
  {id:'m5',name:'Кола',emoji:'🥤',food:10,price:50},
  {id:'m6',name:'Мороженое',emoji:'🍦',food:12,price:50}
];
const FOOD_SHOPS = [
  {id:'f1',name:'Столовая',x:350,y:800,emoji:'🍲'},
  {id:'f2',name:'Кафе',x:650,y:600,emoji:'☕'},
  {id:'f3',name:'Ресторан',x:1200,y:450,emoji:'🍔'},
  {id:'f4',name:'Киев-Фуд',x:1500,y:350,emoji:'🍕'}
];
const BUSINESSES = [
  {id:'b1',name:'Кафе',price:150000,income:500,emoji:'☕'},
  {id:'b2',name:'Автомойка',price:350000,income:1500,emoji:'💦'},
  {id:'b3',name:'СТО',price:800000,income:4000,emoji:'🔧'},
  {id:'b4',name:'Автосалон',price:2500000,income:15000,emoji:'🏪'}
];
const HOUSES = [
  {id:'h1',name:'Квартира',emoji:'🏚️',price:200000,income:500,tax:2000},
  {id:'h2',name:'Дом',emoji:'🏠',price:800000,income:2000,tax:8000},
  {id:'h3',name:'Особняк',emoji:'🏡',price:2500000,income:6000,tax:25000},
  {id:'h4',name:'Вилла',emoji:'🏰',price:8000000,income:20000,tax:80000}
];
const FINE_TYPES = {
  no_license:{label:'Езда без прав',amount:5000,emoji:'📜'},
  no_insurance:{label:'Нет страховки',amount:8000,emoji:'🛡️'},
  speeding:{label:'Превышение скорости',amount:3000,emoji:'⚡'},
  red_light:{label:'Проезд на красный',amount:2500,emoji:'🚦'},
  accident:{label:'Авария',amount:15000,emoji:'💥'}
};
const TUNING = {
  colors:[
    {id:'red',name:'Красный',hex:'#e53935',price:5000},{id:'blue',name:'Синий',hex:'#1e88e5',price:5000},
    {id:'green',name:'Зелёный',hex:'#43a047',price:5000},{id:'yellow',name:'Жёлтый',hex:'#fdd835',price:5000},
    {id:'black',name:'Чёрный',hex:'#212121',price:8000},{id:'white',name:'Белый',hex:'#fafafa',price:8000},
    {id:'purple',name:'Фиолетовый',hex:'#8e24aa',price:40000},{id:'pink',name:'Розовый',hex:'#ec407a',price:40000},
    {id:'chrome',name:'Хром',hex:'#c0c0c0',price:25000},{id:'matte',name:'Матовый',hex:'#424242',price:30000},
    {id:'gold',name:'Золотой',hex:'#ffd700',price:35000},{id:'neon',name:'Неон',hex:'#00e5ff',price:50000}
  ],
  bodyKits:[
    {id:'front',name:'Передний бампер',price:30000},{id:'rear',name:'Задний бампер',price:25000},
    {id:'spoiler',name:'Спойлер',price:20000},{id:'skirts',name:'Пороги',price:15000},{id:'hood',name:'Капот',price:35000}
  ],
  stages:[
    {id:1,name:'Stage 1',speedBonus:50,price:100000},
    {id:2,name:'Stage 2',speedBonus:120,price:350000},
    {id:3,name:'Stage 3',speedBonus:220,price:900000}
  ],
  camber:[
    {id:'light',name:'Лёгкий -15°',value:-15,price:15000},
    {id:'medium',name:'Средний -25°',value:-25,price:35000},
    {id:'hard',name:'Жёсткий -35°',value:-35,price:60000}
  ],
  vinyls:[
    {id:'stripes',name:'Полосы',price:10000},{id:'police',name:'Полиция',price:20000},
    {id:'jdm',name:'JDM',price:20000},{id:'flames',name:'Огонь',price:25000},
    {id:'camo',name:'Камуфляж',price:30000},{id:'rainbow',name:'Радуга',price:40000},
    {id:'anime',name:'Аниме',price:45000},{id:'dragon',name:'Дракон',price:60000}
  ]
};
const SPEED_CAMERAS = [
  {id:'cam1',x:500,y:780,limit:60},{id:'cam2',x:750,y:650,limit:80},
  {id:'cam3',x:1000,y:500,limit:110},{id:'cam4',x:1250,y:400,limit:110},
  {id:'cam5',x:1450,y:320,limit:60},{id:'cam6',x:1100,y:700,limit:80},
  {id:'cam7',x:900,y:850,limit:60},{id:'cam8',x:1300,y:600,limit:110}
];
const BUS_STOPS = [
  {x:400,y:800},{x:700,y:650},{x:1000,y:500},{x:1300,y:350},
  {x:1500,y:300},{x:1200,y:700},{x:800,y:900},{x:500,y:1000}
];
const PLACES = {
  carWash:{x:900,y:750}, tuning:{x:950,y:620},
  police:{x:700,y:820}, bank:{x:450,y:620}, hospital:{x:600,y:900},
  phoneShop:{x:550,y:720},
  parking:[{x:400,y:850},{x:750,y:700},{x:1100,y:500},{x:1400,y:350},{x:1550,y:250}]
};
const EVENTS = [
  {type:'money',emoji:'💰',w:30},{type:'food',emoji:'🍔',w:25},
  {type:'health',emoji:'💊',w:25},{type:'police',emoji:'🚔',w:20}
];

const players = new Map();
let listings = [], lid = 1;
let activeEvents = [], eid = 1;
const calls = new Map(); let cid = 1;

function pickCard(c){
  const r=Math.random()*100; let a=0,r2='common';
  for(const[k,w]of Object.entries(c.weights)){a+=w;if(r<a){r2=k;break;}}
  const pool = CARDS.filter(x=>x.rarity===r2);
  return pool[Math.floor(Math.random()*pool.length)];
}
function weighted(list){
  const t=list.reduce((s,x)=>s+x.w,0); let r=Math.random()*t;
  for(const x of list){r-=x.w;if(r<=0)return x;} return list[0];
}
function genPhone(){
  const used = new Set([...players.values()].filter(p=>p.phone).map(p=>p.phone));
  for(let i=0;i<500;i++){const n=String(1000+Math.floor(Math.random()*9000));if(!used.has(n))return n;}
  return String(Date.now()).slice(-4);
}
function makeP(id,name,admin){
  return {
    id,name,isAdmin:admin,
    money:admin?50000:5000, coins:admin?4000:50, uetolko:admin?150000000000:0,
    inventory:[],cars:[],wins:0,
    hasLicense:false,hasInsurance:false,promosUsed:[],
    activeCar:null,pos:{x:250,y:900},angle:0,
    color:'#'+Math.floor(Math.random()*0xffffff).toString(16).padStart(6,'0'),
    hp:100,hunger:100,distance:0,lastPos:{x:250,y:900},
    exp:0,level:1,doneTasks:[],businesses:[],
    tuning:{},job:null,busRoute:null,
    phone:null,currentCall:null,
    fines:[],houses:[],taxDebt:0,finesPaid:0,timesArrested:0,
    lastCameraHit:{},
    stats:{casesOpened:0,washes:0,reys:0,visitedKyiv:false},
    _lastTaxTick:0
  };
}
function pub(p){
  const nl = LEVELS.find(L=>L.level===p.level+1);
  return {
    id:p.id,name:p.name,isAdmin:p.isAdmin,
    money:p.money,coins:p.coins,uetolko:p.uetolko,wins:p.wins,
    inventory:p.inventory,cars:p.cars,
    hasLicense:p.hasLicense,hasInsurance:p.hasInsurance,
    activeCar:p.activeCar,pos:p.pos,angle:p.angle,color:p.color,
    hp:p.hp,hunger:p.hunger,
    exp:p.exp,level:p.level,nextExp:nl?nl.exp:p.exp,
    doneTasks:p.doneTasks,businesses:p.businesses,
    tuning:p.tuning,job:p.job,busRoute:p.busRoute,
    phone:p.phone,currentCall:p.currentCall,
    fines:p.fines,houses:p.houses,taxDebt:p.taxDebt,
    finesPaid:p.finesPaid,timesArrested:p.timesArrested,
    lastCameraHit:p.lastCameraHit,stats:p.stats
  };
}
function castPlayers(){ io.emit('players',[...players.values()].map(pub)); }
function castListings(){ io.emit('listings', listings); }
function castEvents(){ io.emit('events', activeEvents); }
function castAll(){ castPlayers(); castListings(); castEvents(); }

function addExp(p,n){
  p.exp+=n;
  let nl=p.level;
  for(const L of LEVELS){if(p.exp>=L.exp)nl=L.level;}
  if(nl>p.level){
    p.level=nl;
    const title=LEVELS.find(L=>L.level===nl).title;
    const m=nl*5000,c=nl*3;
    p.money+=m;p.coins+=c;
    io.to(p.id).emit('levelUp',{level:nl,title,money:m,coins:c});
    io.emit('chat',{system:true,text:`⭐ ${p.name} — ур.${nl} (${title})!`});
  }
}
function checkTasks(p){
  for(const t of TASKS){
    if(p.doneTasks.includes(t.id)) continue;
    if(t.check(p)){
      p.doneTasks.push(t.id);
      p.money+=t.money;
      if(t.coins>0)p.coins+=t.coins;
      addExp(p,t.exp);
      io.to(p.id).emit('taskComplete',{name:t.name,money:t.money,coins:t.coins,exp:t.exp});
      io.emit('chat',{system:true,text:`📋 ${p.name}: «${t.name}»`});
    }
  }
}
function issueFine(p,type,label2,amount2){
  const ft = FINE_TYPES[type];
  p.fines.push({
    id:'fn_'+Date.now()+'_'+Math.floor(Math.random()*1000),
    type,label:label2||(ft?ft.label:type),emoji:ft?ft.emoji:'🚔',
    amount:amount2||(ft?ft.amount:3000),
    issuedAt:Date.now(),paid:false
  });
  const amtShow = (amount2||(ft?ft.amount:3000));
  io.to(p.id).emit('toast',`🚔 Штраф: ${label2||(ft?ft.label:'Нарушение')} — ${amtShow.toLocaleString('ru-RU')} ₴`,'bad');
  io.to(p.id).emit('me',pub(p));
  io.emit('chat',{system:true,text:`🚔 ${p.name} оштрафован`});
}
function newBusRoute(p){
  const a=BUS_STOPS[Math.floor(Math.random()*BUS_STOPS.length)];
  let b; do{b=BUS_STOPS[Math.floor(Math.random()*BUS_STOPS.length)];}while(b.x===a.x&&b.y===a.y);
  p.busRoute={pickup:{x:a.x,y:a.y},drop:{x:b.x,y:b.y},stage:'pickup'};
}
function aiReply(t,p){
  t=t.toLowerCase();const n=p.name;
  if(/привет|хай|здаров/.test(t))return `Привет, ${n}! Спроси про работу, тюнинг, телефон, штрафы, жильё, кейсы.`;
  if(/тюнинг|покрас|обвес|стейдж|stage|развал|винил|диск/.test(t))return '🔧 Тюнинг-Центр 🛠️ на карте. Покраска, обвесы, стейджи 1/2/3, развал, винилы. Всё за грн.';
  if(/телефон|сим|sim|звонок/.test(t))return `📱 Комплект «Телефон + SIM» — ${PHONE_KIT.toLocaleString('ru-RU')} ₴. Магазин «Электроника» на карте. Звонок — ${CALL_MIN} ₴/мин.`;
  if(/работ|автобус|мойк/.test(t))return '💼 Работа: 🚌 автобус (с 2 ур., 800–2500 ₴) и 💦 мойка (300–800 ₴). Вкладка 💼.';
  if(/бизнес|пассив/.test(t))return '🏢 Бизнесы: Кафе 150к, Автомойка 350к, СТО 800к, Автосалон 2.5кк. Доход в минуту.';
  if(/еда|голод/.test(t))return '🍟 Еда во всех магазинах по 50 ₴: картошка +15, хот-дог +20, бургер +30, пицца +40, кола +10, мороженое +12.';
  if(/права/.test(t))return `📜 Права — ${LICENSE.toLocaleString('ru-RU')} ₴.`;
  if(/страхов/.test(t))return `🛡️ Страховка — ${INSURANCE.toLocaleString('ru-RU')} ₴.`;
  if(/штраф|гаи|полиц/.test(t))return '🚔 Полиция 🚔 на карте — оплата штрафов со скидкой 20%. В банке 🏦 — без скидки. Неоплаченные растут +5%/мин, через 10 мин списание ×2.';
  if(/камер|радар/.test(t))return '📸 8 камер с лимитами 60/80/110 км/ч. Превысил — штраф 2–8к ₴.';
  if(/банк/.test(t))return '🏦 Банк — оплата штрафов, налогов, покупка жилья.';
  if(/больниц|лечен/.test(t))return `🏥 Больница — лечение за ${HOSPITAL.toLocaleString('ru-RU')} ₴ (100 HP + еда).`;
  if(/жиль|дом|квартир/.test(t))return '🏠 Жильё: квартира 200к, дом 800к, особняк 2.5кк, вилла 8кк. Доход каждую минуту, налог 1% стоимости.';
  if(/коин|премиум/.test(t))return '🪙 Коины — премиум. Слоты, кейсы, задания, промокод.';
  if(/спасиб/.test(t))return `Пожалуйста, ${n}! 🚀`;
  return 'Спроси про работу, тюнинг, телефон, штрафы, жильё, кейсы.';
}

io.on('connection', socket => {
  socket.on('join', ({name,adminKey})=>{
    if(!name) return;
    name = String(name).slice(0,20);
    const p = makeP(socket.id,name,adminKey===ADMIN_KEY);
    players.set(socket.id,p);
    socket.emit('me',pub(p));
    socket.emit('catalog',{CARDS,CARS,CASES,RARITIES,LICENSE,INSURANCE,HOSPITAL,PHONE_KIT,CALL_MIN,
      FOOD_SHOPS,BUSINESSES,BUS_STOPS,houses:HOUSES,LEVELS,MENU,TASKS:TASKS.map(t=>({id:t.id,name:t.name,desc:t.desc,exp:t.exp,money:t.money,coins:t.coins})),
      TUNING,PLACES,SPEED_CAMERAS,FINE_TYPES});
    socket.emit('listings',listings);
    socket.emit('events',activeEvents);
    castPlayers();
    io.emit('chat',{system:true,text:`${name} зашёл`});
  });

  socket.on('spin',({bet})=>{
    const p = players.get(socket.id); if(!p) return;
    bet = Math.max(10,Math.min(5000,Math.floor(bet||10)));
    if(p.coins<bet) return socket.emit('error','Мало коинов');
    p.coins -= bet;
    const S=['🍀','💎','⭐','👑','🍒','🔔'],M={'🍀':10,'💎':20,'⭐':50,'👑':100,'🍒':5,'🔔':8};
    const r=[0,1,2].map(()=>S[Math.floor(Math.random()*S.length)]);
    let win=0;const[a,b,c]=r;
    if(a===b&&b===c)win=bet*(M[a]||5);else if(a===b||b===c||a===c)win=bet*2;
    p.coins+=win; if(win>0){p.wins+=win;addExp(p,Math.floor(win/10)+5);}
    io.emit('spinResult',{playerId:p.id,name:p.name,bet,results:r,win});
    socket.emit('me',pub(p)); castPlayers();
  });

  socket.on('openCase',({caseId})=>{
    const p = players.get(socket.id); if(!p) return;
    const c = CASES.find(x=>x.id===caseId);
    if(!c||p.coins<c.price) return socket.emit('error','Мало коинов');
    p.coins -= c.price;
    const card = pickCard(c); p.inventory.push(card.id);
    p.stats.casesOpened++;
    addExp(p,20);
    socket.emit('caseResult',{card,caseName:c.name});
    socket.emit('me',pub(p)); checkTasks(p); castPlayers();
  });

  socket.on('buyCar',({carId})=>{
    const p = players.get(socket.id); if(!p) return;
    const c = CARS.find(x=>x.id===carId);
    if(!c||p.money<c.price) return socket.emit('error','Мало денег');
    p.money -= c.price; p.cars.push(c.id);
    addExp(p,50);
    socket.emit('me',pub(p)); checkTasks(p); castPlayers();
  });
  socket.on('selectCar',({carId})=>{
    const p = players.get(socket.id); if(!p) return;
    if(!p.cars.includes(carId)) return;
    p.activeCar = carId;
    socket.emit('me',pub(p)); castPlayers();
  });
  socket.on('sellItem',({type,itemId})=>{
    const p = players.get(socket.id); if(!p) return;
    if(type==='card'){
      const i = p.inventory.indexOf(itemId); if(i<0) return;
      const card = CARDS.find(x=>x.id===itemId);
      p.inventory.splice(i,1); p.coins += Math.floor(card.price*0.7);
    } else if(type==='car'){
      const i = p.cars.indexOf(itemId); if(i<0) return;
      const c = CARS.find(x=>x.id===itemId);
      p.cars.splice(i,1); p.money += Math.floor(c.price*0.7);
      if(p.activeCar===itemId) p.activeCar=null;
      listings = listings.filter(l=>!(l.sellerId===p.id&&l.carId===itemId));
      castListings();
    }
    socket.emit('me',pub(p)); castPlayers();
  });

  socket.on('buyLicense',()=>{
    const p = players.get(socket.id); if(!p||p.hasLicense) return;
    if(p.money<LICENSE) return socket.emit('error','Мало денег');
    p.money -= LICENSE; p.hasLicense = true; addExp(p,30);
    socket.emit('me',pub(p)); checkTasks(p); castPlayers();
  });
  socket.on('buyInsurance',()=>{
    const p = players.get(socket.id); if(!p||p.hasInsurance) return;
    if(p.money<INSURANCE) return socket.emit('error','Мало денег');
    p.money -= INSURANCE; p.hasInsurance = true; addExp(p,30);
    socket.emit('me',pub(p)); checkTasks(p); castPlayers();
  });

  socket.on('buyTuning',({carId,type,id})=>{
    const p = players.get(socket.id); if(!p) return;
    if(!p.cars.includes(carId)) return socket.emit('error','Нет машины');
    const near = Math.hypot(p.pos.x-PLACES.tuning.x, p.pos.y-PLACES.tuning.y) < 130;
    if(!near) return socket.emit('error','Подъедь к Тюнинг-Центру 🛠️');
    p.tuning = p.tuning || {};
    const t = p.tuning[carId] = p.tuning[carId] || {};
    let price = 0, msg = '';
    if(type==='color'){
      const c = TUNING.colors.find(x=>x.id===id); if(!c) return;
      if(t.color===c.id) return socket.emit('error','Уже этот цвет');
      price = c.price; msg = `🎨 ${c.name}`;
      if(p.money<price) return socket.emit('error','Мало денег');
      t.color = c.id; t.colorHex = c.hex;
    } else if(type==='bodyKit'){
      const k = TUNING.bodyKits.find(x=>x.id===id); if(!k) return;
      t.bodyKits = t.bodyKits||[];
      if(t.bodyKits.includes(k.id)) return socket.emit('error','Уже стоит');
      price = k.price; msg = `🔩 ${k.name}`;
      if(p.money<price) return socket.emit('error','Мало денег');
      t.bodyKits.push(k.id);
    } else if(type==='stage'){
      const s = TUNING.stages.find(x=>x.id===id); if(!s) return;
      const cur = t.stage||0;
      if(cur>=s.id) return socket.emit('error','Этот стейдж уже стоит');
      if(s.id!==cur+1) return socket.emit('error',`Сначала Stage ${cur+1}`);
      price = s.price; msg = `⚙️ ${s.name} (+${s.speedBonus} км/ч)`;
      if(p.money<price) return socket.emit('error','Мало денег');
      t.stage = s.id;
      addExp(p,100*s.id);
    } else if(type==='camber'){
      const c = TUNING.camber.find(x=>x.id===id); if(!c) return;
      if(t.camber===c.id) return socket.emit('error','Уже стоит');
      price = c.price; msg = `🛞 ${c.name}`;
      if(p.money<price) return socket.emit('