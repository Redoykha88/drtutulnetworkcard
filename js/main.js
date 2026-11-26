(function(){
  var NAME="DR TUTUL Network", PHONE="+8809638488627", EMAIL="drtutulnetwork@gmail.com", URL_="https://www.drtutulnetwork.com";
  var lang='bn';
  var T={
    bn:{ig:'ইনস্টাগ্রাম আইডি কপি হয়েছে: @drtutulnetwork',pers:' (পার্সোনাল)',copied:'নম্বর কপি হয়েছে',copyFail:'কপি করা যায়নি',manual:'নম্বরটি চেপে ধরে কপি করুন',vcf:'কন্টাক্ট ফাইল ডাউনলোড হচ্ছে',link:'লিংক কপি হয়েছে'},
    en:{ig:'Instagram ID copied: @drtutulnetwork',pers:' (Personal)',copied:'Number copied',copyFail:'Could not copy',manual:'Long-press the number to copy',vcf:'Downloading contact file',link:'Link copied'}
  };
  var toastEl=document.getElementById('toast'), t;
  function toast(m){toastEl.textContent=m;toastEl.classList.add('show');clearTimeout(t);t=setTimeout(function(){toastEl.classList.remove('show')},1800)}

  var btns=document.querySelectorAll('.pm'), detail=document.getElementById('detail'),
      dn=document.getElementById('d-name'), dnum=document.getElementById('d-num'), current='', currentName='';
  function renderDetail(){ if(currentName) dn.textContent=currentName+T[lang].pers; }
  btns.forEach(function(b){
    b.addEventListener('click',function(){
      btns.forEach(function(x){x.setAttribute('aria-pressed','false')});
      b.setAttribute('aria-pressed','true');
      current=b.dataset.num; currentName=b.dataset.name;
      dnum.textContent=current; renderDetail();
      var q=b.dataset.qr;document.getElementById('qrbox').classList.toggle('show',!!q);document.getElementById('qr1').style.display=q==='1'?'block':'none';document.getElementById('qr2').style.display=q==='m'?'block':'none';
      detail.classList.add('show');
    });
  });
  document.getElementById('copy').addEventListener('click',function(){
    if(navigator.clipboard){navigator.clipboard.writeText(current).then(function(){toast(T[lang].copied)},function(){toast(T[lang].copyFail)})}
    else{toast(T[lang].manual)}
  });
  document.getElementById('save').addEventListener('click',function(){
    var v="BEGIN:VCARD\nVERSION:3.0\nFN:"+NAME+"\nORG:"+NAME+"\nTITLE:INTERNET SERVICE PROVIDER\nTEL:"+PHONE+"\nEMAIL:"+EMAIL+"\nURL:"+URL_+"\nEND:VCARD";
    var a=document.createElement('a');
    a.href=URL.createObjectURL(new Blob([v],{type:'text/vcard'}));
    a.download='contact.vcf';document.body.appendChild(a);a.click();a.remove();
    toast(T[lang].vcf);
  });
  var sheet=document.getElementById('sheet'), sg=document.getElementById('sg');
  function pageUrl(){return location.href.split('#')[0]}
  function copyLink(){
    var u=pageUrl();
    if(navigator.clipboard){navigator.clipboard.writeText(u).then(function(){toast(T[lang].link)},function(){toast(T[lang].manual)})}
    else{toast(T[lang].manual)}
  }
  function openSheet(){
    var u=encodeURIComponent(pageUrl()), txt=encodeURIComponent(NAME+' - INTERNET SERVICE PROVIDER'), both=encodeURIComponent(NAME+' - INTERNET SERVICE PROVIDER\n'+pageUrl());
    var items=[
      ['WhatsApp','#1fa855','https://wa.me/?text='+both],
      ['Facebook','#1877f2','https://www.facebook.com/sharer/sharer.php?u='+u],
      ['Telegram','#2a9fd8','https://t.me/share/url?url='+u+'&text='+txt],
      ['X','#111','https://twitter.com/intent/tweet?text='+txt+'&url='+u],
      ['Email','#6b7a99','mailto:?subject='+txt+'&body='+both],
      ['SMS','#e08a1e','sms:?&body='+both]
    ];
    sg.innerHTML='';
    items.forEach(function(it){
      var a=document.createElement('a');a.textContent=it[0];a.style.background=it[1];a.href=it[2];
      if(it[2].indexOf('http')===0){a.target='_blank';a.rel='noopener'}
      sg.appendChild(a);
    });
    var c=document.createElement('button');c.style.background='#14213d';c.textContent=lang==='bn'?'লিংক কপি':'Copy link';
    c.addEventListener('click',function(){copyLink();sheet.hidden=true});
    sg.appendChild(c);
    sheet.hidden=false;
  }
  document.getElementById('sclose').addEventListener('click',function(){sheet.hidden=true});
  sheet.addEventListener('click',function(e){if(e.target===sheet)sheet.hidden=true});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')sheet.hidden=true});
  document.getElementById('share').addEventListener('click',function(){
    if(navigator.share){
      navigator.share({title:NAME,text:NAME+' - INTERNET SERVICE PROVIDER',url:pageUrl()}).catch(function(err){
        if(!err||err.name!=='AbortError') openSheet();
      });
    } else { openSheet(); }
  });

  document.getElementById('ig').addEventListener('click',function(e){
    e.preventDefault();
    if(navigator.clipboard){navigator.clipboard.writeText('@drtutulnetwork').then(function(){toast(T[lang].ig)},function(){toast(T[lang].copyFail)})}
    else{toast(T[lang].manual)}
  });

  function setLang(l){
    lang=l;
    document.documentElement.lang=l;
    document.querySelectorAll('[data-bn]').forEach(function(el){el.textContent=el.getAttribute('data-'+l)});
    document.getElementById('l-bn').setAttribute('aria-pressed',l==='bn');
    document.getElementById('l-en').setAttribute('aria-pressed',l==='en');
    renderDetail();
    try{localStorage.setItem('card-lang',l)}catch(e){}
  }
  document.getElementById('l-bn').addEventListener('click',function(){setLang('bn')});
  document.getElementById('l-en').addEventListener('click',function(){setLang('en')});
  try{var s=localStorage.getItem('card-lang'); if(s==='en') setLang('en');}catch(e){}
})();
