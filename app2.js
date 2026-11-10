/* ===== State ===== */
const S=(()=>{try{return JSON.parse(localStorage.getItem('pp')||'{}')}catch(e){return{}}})();
S.name=S.name||'Rahul Kumar';S.upi=S.upi||'8080038461@ibl';S.bal=S.bal??24850.5;S.pin=S.pin||'1234';S.sound=S.sound??true;
if(S.tx)txs.splice(0,txs.length,...S.tx);
const save=()=>{try{localStorage.setItem('pp',JSON.stringify({...S,tx:txs}))}catch(e){}};
const CON=[['Amit Sharma','amit@ybl','#e8506b'],['Sneha Rao','sneha@okaxis','#2e9e6f'],['Mom','9845012345@paytm','#e59a1c'],['Vikram Singh','vikram@oksbi','#2f7de1'],['Priya Nair','priya@ibl','#8a4bd6'],['Ravi Kumar','ravi@upi','#0d8a9c']];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const inr=n=>'₹'+Number(n).toLocaleString('en-IN',{minimumFractionDigits:n%1?2:0,maximumFractionDigits:2});
const now=()=>new Date().toLocaleString('en-IN',{day:'2-digit',month:'short',year:'numeric',hour:'numeric',minute:'2-digit',hour12:true});
const rnd=n=>Array.from({length:n},()=>Math.floor(Math.random()*10)).join('');
const ph=document.querySelector('.phone');
/* clock */
const clk=()=>document.querySelector('.status span').textContent=new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:false});
clk();setInterval(clk,10000);
/* sound (original chime) */
function chime(ok=true){if(!S.sound)return;try{const a=new(window.AudioContext||webkitAudioContext)();(ok?[[659,0],[880,.13],[1175,.27]]:[[300,0],[220,.15]]).forEach(([f,t])=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f;o.connect(g);g.connect(a.destination);const s=a.currentTime+t;g.gain.setValueAtTime(0,s);g.gain.linearRampToValueAtTime(.28,s+.02);g.gain.exponentialRampToValueAtTime(.001,s+.55);o.start(s);o.stop(s+.6)})}catch(e){}}
/* ===== Sheet ===== */
let stream,raf;
function closeSheet(){const o=document.getElementById('ov');if(o)o.remove();cancelAnimationFrame(raf);if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}}
function sheet(title,html,cls='',nohdr=false){closeSheet();const d=document.createElement('div');d.id='ov';d.className='ov'+(nohdr?' nohdr':'');d.innerHTML=`<div class="ovh"><button onclick="closeSheet()" aria-label="Back">←</button><b>${title}</b></div><div class="ovb ${cls}">${html}</div>`;ph.appendChild(d);return d}
const av=(n,c)=>`<div class="av" style="background:${c||'#6f3fc0'}">${esc(n[0]||'?').toUpperCase()}</div>`;
/* ===== History render ===== */
function render(q=''){
  q=q.toLowerCase();const L=txs.filter(x=>(x.n+x.t+x.a).toLowerCase().includes(q));
  document.getElementById('txList').innerHTML=L.length?L.map(x=>`<li>${x.i==='D'?'<div class="ti d">D</div>':`<div class="ti" data-ic="${x.i}"></div>`}<div class="t1">${esc(x.t)}</div><div class="amt">${esc(x.a)}</div><div class="t2">${esc(x.n)}</div><span></span><div class="bank"><span>${esc(x.d)}</span><b>${x.k} <i></i></b></div></li>`).join(''):'<li><div class="t2" style="grid-column:1/-1;text-align:center">No transactions found</div></li>';
  icons(document.getElementById('txList'));
  const tot=txs.filter(x=>x.k==='Debited from').reduce((s,x)=>s+parseFloat(x.a.replace(/[₹,]/g,'')),0);
  document.querySelector('.mr b').textContent=inr(tot);
}
const sb=document.querySelector('.search');sb.innerHTML='<span data-ic="search"></span><input id="q" placeholder="Search by name, number or UPI ID" aria-label="Search transactions">';icons(sb);
document.getElementById('q').oninput=e=>render(e.target.value);
render();
/* ===== Contacts / pay ===== */
function contacts(title){
  const d=sheet(title,'<input class="field" id="cs" placeholder="Search name, number or UPI ID" autocomplete="off"><div class="h2">People</div><div id="cl" style="display:grid;gap:8px"></div>');
  const draw=()=>{const v=cs.value.trim().toLowerCase();let h='';
    if(v&&(/^\d{10}$/.test(v)||/@/.test(v)))h+=`<button class="crow" data-n="${esc(v)}" data-u="${esc(v)}">${av('+','#5d2a9c')}<div><b>Pay ${esc(v)}</b><small>New payee</small></div></button>`;
    CON.filter(c=>(c[0]+c[1]).toLowerCase().includes(v)).forEach(c=>h+=`<button class="crow" data-n="${c[0]}" data-u="${c[1]}" data-c="${c[2]}">${av(c[0],c[2])}<div><b>${c[0]}</b><small>${c[1]}</small></div></button>`);
    cl.innerHTML=h||'<div class="empty">No match</div>';cl.querySelectorAll('button').forEach(b=>b.onclick=()=>payForm({n:b.dataset.n,u:b.dataset.u,c:b.dataset.c}))};
  cs.oninput=draw;draw();
}
function payForm(p,amt='',note=''){
  sheet('Send money',`<div class="payee">${av(p.n,p.c)}<h3>${esc(p.n)}</h3><small>${esc(p.u)}</small></div>
  <div class="amtbox"><span>₹</span><input id="am" inputmode="decimal" placeholder="0" value="${esc(amt)}" aria-label="Amount"></div>
  <input class="field" id="nt" placeholder="${p.bill?'Consumer / mobile number':'Add a note (optional)'}" value="${esc(note)}">
  <div class="h2" style="text-align:center">Paying from SBI ••4821 · Balance ${inr(S.bal)}</div>
  <button class="cta" id="go2">Proceed to Pay</button>`);
  am.oninput=()=>am.value=am.value.replace(/[^\d.]/g,'').replace(/(\..*)\./g,'$1');
  go2.onclick=()=>{const a=parseFloat(am.value);if(!a||a<=0)return toast('Enter an amount');if(a>S.bal)return fail(p,a,'Insufficient balance');pin('Enter UPI PIN to pay '+inr(a),()=>process(p,a,nt.value))};
  am.focus();
}
function pin(title,ok){
  let v='';sheet('UPI PIN',`<p style="text-align:center;margin-top:10px">${esc(title)}</p><div class="dots2" id="dt"><i></i><i></i><i></i><i></i></div><small style="text-align:center;color:var(--mut)">Demo PIN: ${S.pin}</small><div class="pad">${[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map(k=>`<button data-k="${k}">${k}</button>`).join('')}</div>`);
  const upd=()=>dt.querySelectorAll('i').forEach((e,i)=>e.classList.toggle('f',i<v.length));
  document.querySelectorAll('.pad button').forEach(b=>b.onclick=()=>{const k=b.dataset.k;if(k==='⌫')v=v.slice(0,-1);else if(k!==''&&v.length<4)v+=k;upd();
    if(v.length===4){if(v===S.pin)ok();else{dt.classList.add('bad');chime(false);setTimeout(()=>{v='';dt.classList.remove('bad');upd();toast('Incorrect PIN')},400)}}});
}
function process(p,a,note){
  sheet('',`<div class="spin"></div><p style="text-align:center">Processing payment…</p>`,'ok',true);
  setTimeout(()=>success(p,a,note),1500);
}
function success(p,a,note){
  S.bal-=a;const when=now(),id='T'+Date.now().toString().slice(-12);
  txs.unshift({t:p.bill?'Paid to':(p.u.startsWith('self')?'Transfer to':'Paid to'),n:p.n,a:inr(a),d:when,k:'Debited from',i:'out'});save();render();chime(true);
  const d=sheet('',`<div class="tick2">✓</div><h2>Payment Successful</h2><div style="font-size:42px;font-weight:700">${inr(a)}</div><div>Paid to <b>${esc(p.n)}</b></div><small>${esc(p.u)}</small>
  <div class="rcpt"><div><span>Date &amp; time</span><b>${when}</b></div><div><span>Transaction ID</span><b>${id}</b></div><div><span>UTR</span><b>${rnd(12)}</b></div><div><span>Debited from</span><b>SBI ••4821</b></div>${note?`<div><span>Note</span><b>${esc(note)}</b></div>`:''}</div>
  <button class="cta ghost" onclick="closeSheet()">Done</button><div class="wm">DEMO<br>NOT A REAL PAYMENT</div>`,'ok',true);
}
function fail(p,a,why){chime(false);sheet('',`<div class="tick2" style="color:#d33">✕</div><h2>Payment Failed</h2><div style="font-size:36px;font-weight:700">${inr(a)}</div><p>${why}</p><button class="cta ghost" style="color:#d33" onclick="closeSheet()">Close</button><div class="wm">DEMO</div>`,'ok',true);document.querySelector('.ovb.ok').style.background='#c94040'}
/* ===== Scanner ===== */
function decode(src,w,h){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(src,0,0,w,h);return window.jsQR?jsQR(x.getImageData(0,0,w,h).data,w,h):null}
async function scan(){
  sheet('Scan any QR','<div class="vf"><video id="vid" playsinline muted></video><i class="ln"></i></div><p id="sm">Point your camera at a UPI QR code</p><label class="pill big">Upload QR image<input type="file" accept="image/*" id="qf" hidden></label>','dark');
  qf.onchange=e=>{const f=e.target.files[0];if(!f)return;const im=new Image();im.onload=()=>{const r=decode(im,im.width,im.height);r?onQR(r.data):sm.textContent='No QR found in that image'};im.src=URL.createObjectURL(f)};
  try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});vid.srcObject=stream;await vid.play();(function loop(){if(vid.readyState>=2&&vid.videoWidth){const r=decode(vid,vid.videoWidth,vid.videoHeight);if(r&&r.data)return onQR(r.data)}raf=requestAnimationFrame(loop)})()}
  catch(e){sm.textContent='Camera not available ('+(e.name||'error')+'). Open via https or localhost, allow camera access, or upload a QR image.'}
}
function onQR(t){chime(true);closeSheet();
  if(/^upi:\/\//i.test(t)){const q=new URLSearchParams(t.split('?')[1]||'');const u=q.get('pa')||'';if(u)return payForm({n:q.get('pn')||u,u,c:'#5d2a9c'},q.get('am')||'',q.get('tn')||'')}
  toast('Not a UPI QR: '+t.slice(0,40));
}
/* ===== Other screens ===== */
function checkBal(){pin('Enter UPI PIN to check balance',()=>sheet('Bank balance',`<div class="balcard">SBI ••4821<b>${inr(S.bal)}</b><small>Available balance · ${now()}</small></div><button class="cta" onclick="closeSheet()">Done</button>`))}
function account(){
  sheet('Profile & settings',`<div class="payee"><img src="img/avatar.png" alt="" style="width:72px;height:66px;object-fit:contain;background:#5d2a9c;border-radius:12px"><h3>${esc(S.name)}</h3><small>${esc(S.upi)}</small></div>
  <input class="field" id="nm" value="${esc(S.name)}" aria-label="Name">
  <div class="crow"><div style="flex:1"><b>UPI ID</b><small>${esc(S.upi)}</small></div><button class="pill" id="cp">Copy</button></div>
  <div class="crow"><div><b>SBI ••4821</b><small>Primary account · ${inr(S.bal)}</small></div></div>
  <label class="tg"><span>Payment sound</span><input type="checkbox" id="sn" ${S.sound?'checked':''}></label>
  <button class="crow" id="cpn"><b>Change UPI PIN</b></button><button class="crow" id="rs"><b style="color:#c94040">Reset demo data</b></button>`);
  nm.onchange=()=>{S.name=nm.value.trim()||S.name;save();toast('Name saved')};
  cp.onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(S.upi);toast('UPI ID copied')};
  sn.onchange=()=>{S.sound=sn.checked;save();if(S.sound)chime(true)};
  cpn.onclick=()=>pin('Enter current PIN',()=>{const n=prompt('New 4-digit PIN');if(/^\d{4}$/.test(n||'')){S.pin=n;save();closeSheet();toast('PIN changed')}else{closeSheet();toast('PIN must be 4 digits')}});
  rs.onclick=()=>{try{localStorage.removeItem('pp')}catch(e){}location.reload()};
}
function notifs(){sheet('Notifications',txs.slice(0,6).map(x=>`<div class="crow"><div><b>${esc(x.t)} ${esc(x.n)}</b><small>${esc(x.a)} · ${esc(x.d)}</small></div></div>`).join('')+'<div class="crow"><div><b>Welcome</b><small>Demo app · no real money moves</small></div></div>')}
function info(t,m){sheet(t,`<div class="empty" style="margin:40px auto;text-align:center">${m}</div>`)}
function rewards(){sheet('Rewards',`<div class="sc" id="sc">Tap to scratch</div><p class="h2" style="text-align:center">Scratch card from your last payment</p>`);
  sc.onclick=()=>{if(sc.classList.contains('open'))return;const a=Math.ceil(Math.random()*50);sc.classList.add('open');sc.textContent='You won '+inr(a)+'!';S.bal+=a;txs.unshift({t:'Received from',n:'Cashback reward',a:inr(a),d:now(),k:'Credited to',i:'inn'});save();render();chime(true)}}
function refer(){const m='Join me on this demo payments app and get ₹100!';sheet('Refer & Get ₹100',`<div class="empty" style="text-align:center;margin:30px auto">${m}</div><button class="cta" id="sh">Share invite</button>`);sh.onclick=()=>navigator.share?navigator.share({text:m}).catch(()=>{}):(navigator.clipboard&&navigator.clipboard.writeText(m),toast('Invite text copied'))}
function bills(){sheet('My Bills',['Airtel Postpaid','BESCOM Electricity','ACT Fibernet'].map(b=>`<button class="crow" data-b="${b}"><div><b>${b}</b><small>Tap to pay</small></div></button>`).join(''));document.querySelectorAll('#ov [data-b]').forEach(b=>b.onclick=()=>payForm({n:b.dataset.b,u:'bill@ppbill',bill:true,c:'#5d2a9c'}))}
/* ===== Wiring ===== */
document.querySelectorAll('#home button').forEach(b=>{const t=b.textContent.replace(/\s+/g,' ').trim();b.onclick=()=>{
  if(/^To Mobile/.test(t))contacts('Pay to mobile number');else if(/^To Bank/.test(t))contacts('Pay to bank / UPI ID');
  else if(/^To Self/.test(t))payForm({n:'My HDFC ••7731',u:'self@hdfc',c:'#2f7de1'});
  else if(/^Check Bank/.test(t))checkBal();else if(/^UPI ID/.test(t))account();
  else if(/Wallet/.test(t))info('PhonePe Wallet','Wallet balance ₹0<br><small>Demo only</small>');
  else if(/Rewards/.test(t))rewards();else if(/Refer/.test(t))refer();
  else if(/TRY NOW/.test(t)){S.lite=1;save();toast('UPI Lite activated')}
  else if(/My Bills/.test(t))bills();else if(/See All/.test(t))info('All services','More services coming soon');
  else payForm({n:t.replace(/Popular/,'').trim(),u:'bill@ppbill',bill:true,c:'#5d2a9c'})}});
document.querySelector('.hdr .pic').onclick=account;
document.querySelector('.hdr [data-ic=qr]').onclick=scan;document.querySelector('.hdr [data-ic=bell]').onclick=notifs;
document.querySelector('.hdr [data-ic=help]').onclick=()=>info('Help','Tap Scan QR to pay, or use Transfer Money.<br>Demo PIN: '+S.pin);
document.getElementById('scanqr').onclick=scan;
document.querySelectorAll('#nav button:not([data-s])').forEach(b=>b.onclick=()=>info(b.textContent.trim(),'This section is not part of the demo'));
