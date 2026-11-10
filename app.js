const P={
qr:'<path d="M4 9V5a1 1 0 0 1 1-1h4M15 4h4a1 1 0 0 1 1 1v4M20 15v4a1 1 0 0 1-1 1h-4M9 20H5a1 1 0 0 1-1-1v-4"/><rect x="8" y="8" width="3" height="3"/><rect x="13" y="8" width="3" height="3"/><rect x="8" y="13" width="3" height="3"/><path d="M13 13h3v3"/>',
bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20a2 2 0 0 0 4 0"/>',
help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01"/>',
person:'<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-4 3-6 7-6s7 2 7 6z"/>',
bank:'<path d="M3 9l9-5 9 5zM5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
clock:'<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2M4 12H2m2 0 1.5-2"/>',
building:'<path d="M3 9l9-5 9 5zM5 20V10m4.5 10V10m5 10V10M19 20V10M3 20h18"/>',
wallet:'<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M16 14h2"/>',
gift:'<rect x="4" y="9" width="16" height="11" rx="1"/><path d="M3 9h18M12 9v11M12 9c-3-4-6-3-5 0 1 1 5 0 5 0zm0 0c3-4 6-3 5 0-1 1-5 0-5 0z"/>',
mega:'<path d="M4 10v4h3l8 4V6L7 10zM18 9a4 4 0 0 1 0 6"/>',
phone:'<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M12.5 7l-2 4h3l-2 4"/>',
metro:'<rect x="5" y="4" width="14" height="12" rx="3"/><path d="M8 20l2-4m6 4l-2-4M9 12h.01M15 12h.01M5 9h14"/>',
dish:'<path d="M5 5a10 10 0 0 0 10 10zM12 12l5-5M14 20h6"/>',
bulb:'<path d="M9 17h6M10 20h4M12 3a6 6 0 0 0-3.5 10.9c.4.4.5.8.5 1.1h6c0-.3.1-.7.5-1.1A6 6 0 0 0 12 3z"/>',
home:'<path d="M4 11l8-7 8 7v9H4zM10 20v-6h4v6"/>',
cyl:'<rect x="6" y="8" width="12" height="12" rx="3"/><path d="M9 8V5h6v3M12 12v4"/>',
plug:'<rect x="5" y="9" width="14" height="11" rx="2"/><path d="M12 9V4M9 4h6M12 13v3"/>',
more:'<path d="M5 12h.01M12 12h.01M19 12h.01" stroke-width="3"/>',
home2:'<path d="M4 11l8-7 8 7v9H4zM10 20v-6h4v6"/>',
rupee:'<circle cx="12" cy="12" r="9"/><path d="M8.5 8h7M8.5 11h7M9 8c4 0 4 5 0 5l5 3.5"/>',
shield:'<path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
compass:'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
swap:'<path d="M5 8h13l-3-3M19 16H6l3 3"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
filter:'<path d="M4 5h16l-6 8v6l-4-2v-4z"/>',
dl:'<path d="M12 4v11m-4-4l4 4 4-4M5 20h14"/>',
inn:'<path d="M17 7L7 17m0-8v8h8"/>',
out:'<path d="M7 17L17 7m-8 0h8v8"/>',
tr:'<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>'
};
function icons(root=document){
  root.querySelectorAll('[data-ic]').forEach(e=>{ if(!e.firstChild||e.dataset.done!=='1'){ e.insertAdjacentHTML('afterbegin',`<svg viewBox="0 0 24 24">${P[e.dataset.ic]||''}</svg>`); e.dataset.done='1'; }});
}
const $=id=>document.getElementById(id);
const txs=[
 {t:'Received from',n:'Anita Rao @Infosys',a:'₹1,000',d:'13 Apr 2024',k:'Credited to',i:'inn'},
 {t:'Paid to',n:'Naturals Hinjawadi',a:'₹160',d:'09 Apr 2024',k:'Debited from',i:'out'},
 {t:'Paid to',n:'Swiss delights',a:'₹350',d:'07 Apr 2024',k:'Debited from',i:'out'},
 {t:'Transfer to',n:'XXXXXXX0691',a:'₹5,000',d:'04 Apr 2024',k:'Debited from',i:'tr'},
 {t:'Paid to',n:'DMART READY',a:'₹3,680',d:'03 Apr 2024',k:'Debited from',i:'D'}
];
$('txList').innerHTML=txs.map(x=>`<li>
 ${x.i==='D'?'<div class="ti d">D</div>':`<div class="ti" data-ic="${x.i}"></div>`}
 <div class="t1">${x.t}</div><div class="amt">${x.a}</div>
 <div class="t2">${x.n}</div><span></span>
 <div class="bank"><span>${x.d}</span><b>${x.k} <i></i></b></div></li>`).join('');
icons();
function go(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('active',s.id===id));
  document.querySelectorAll('#nav button[data-s]').forEach(b=>b.classList.toggle('on',b.dataset.s===id));
  document.querySelectorAll('#nav button:not([data-s])').forEach(b=>b.classList.remove('on'));
  $('scanqr').style.display=id==='home'?'flex':'none';
}
document.querySelectorAll('#nav button').forEach(b=>b.onclick=()=>b.dataset.s?go(b.dataset.s):toast(b.textContent.trim()+' (demo)'));
let tt;function toast(m){const t=$('toast');t.textContent=m;t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),2000);}
