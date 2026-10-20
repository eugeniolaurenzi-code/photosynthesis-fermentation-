(() => {
  const revealAt = Date.parse('2026-10-30T22:00:00+01:00'); // Rome is CET on Oct 30
  const countdown = document.getElementById('countdown');
  const waiting = document.getElementById('waiting');
  const revealed = document.getElementById('revealed');
  const pending = document.getElementById('pending');
  const pad = n => String(n).padStart(2, '0');
  let fetching = false;
  async function checkReveal(){
    if(fetching) return;
    fetching=true;
    try{
      const res=await fetch('/.netlify/functions/reveal',{cache:'no-store'});
      if(!res.ok) throw new Error('Network error');
      const data=await res.json();
      if(data.revealed && data.address && data.mapsUrl){
        waiting.hidden=true;pending.hidden=true;revealed.hidden=false;
        document.getElementById('address').textContent=data.address;
        document.getElementById('directions').href=data.mapsUrl;
      } else if(Date.now()>=revealAt){waiting.hidden=true;pending.hidden=false;revealed.hidden=true;}
    }catch(e){if(Date.now()>=revealAt){waiting.hidden=true;pending.hidden=false;}}
    finally{fetching=false;}
  }
  function tick(){
    const delta=Math.max(0,revealAt-Date.now());
    const days=Math.floor(delta/86400000),hours=Math.floor(delta/3600000)%24,mins=Math.floor(delta/60000)%60,secs=Math.floor(delta/1000)%60;
    countdown.textContent=`${pad(days)} : ${pad(hours)} : ${pad(mins)} : ${pad(secs)}`;
    if(delta===0) checkReveal();
  }
  tick();checkReveal();setInterval(tick,1000);setInterval(checkReveal,30000);
})();
