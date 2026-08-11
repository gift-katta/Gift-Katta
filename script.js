const WHATSAPP_NUMBER = "917588406001"; // Replace with your WhatsApp number, country code included.

const deals = [
  {brand:"PVR INOX", short:"PVR", offer:"Up to 25% OFF", coupon:"GIFTKATTA25", desc:"Special cinema offer for selected bookings.", color:"Cinema"},
  {brand:"Jockey", short:"J", offer:"Up to 30% OFF", coupon:"JOCKEY30", desc:"Selected fashion and innerwear offers.", color:"Fashion"},
  {brand:"Puma", short:"P", offer:"Up to 40% OFF", coupon:"PUMA40", desc:"Selected sportswear and footwear offer.", color:"Sports"},
  {brand:"Foxtale", short:"F", offer:"Up to 25% OFF", coupon:"FOXTale25", desc:"Selected skincare products offer.", color:"Beauty"},
  {brand:"Domino's", short:"D", offer:"Special Offer", coupon:"DOMINOS", desc:"Selected food offers. Check availability on WhatsApp.", color:"Food"},
  {brand:"EatSure", short:"ES", offer:"Up to 20% OFF", coupon:"EATSURE20", desc:"Selected meals and food offers.", color:"Food"},
  {brand:"BGMI by Swag", short:"BG", offer:"Exclusive Offer", coupon:"BGMIKATTA", desc:"Selected BGMI by Swag offer.", color:"Gaming"},
  {brand:"Vijay Sales", short:"VS", offer:"Up to 15% OFF", coupon:"VS15", desc:"Selected electronics offers.", color:"Electronics"}
];

const grid = document.getElementById("dealGrid");
const strip = document.getElementById("brandStrip");

deals.forEach((d,i)=>{
  strip.innerHTML += `<div class="brand-chip"><div><div class="brand-logo">${d.short}</div>${d.brand}</div></div>`;
  grid.innerHTML += `<article class="deal" onclick="openDeal(${i})">
    <div class="deal-top"><div class="logo-box">${d.short}</div><span class="active-dot">● Active</span></div>
    <h3>${d.brand}</h3><p>${d.color} · Selected offer</p>
    <div class="discount">${d.offer}</div>
    <div class="view">View Deal →</div>
  </article>`;
});

let current = 0;

function openDeal(i){
  current=i;
  const d=deals[i];
  document.getElementById("modalTitle").textContent=d.brand;
  document.getElementById("modalOffer").textContent=d.offer;
  document.getElementById("modalDesc").textContent=d.desc;
  document.getElementById("modalCoupon").textContent=d.coupon;
  document.getElementById("modalAd").textContent=`${d.brand} — ${d.offer}`;
  document.getElementById("waButton").href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Gift Katta, I'm interested in the ${d.brand} offer (${d.offer}). Please help me redeem it.`)}`;
  document.getElementById("modalRedeem").innerHTML=`<li>Copy the coupon code.</li><li>Tap “Get Deal on WhatsApp”.</li><li>Confirm the offer with Gift Katta.</li><li>Follow the brand-specific redemption instructions.</li>`;
  document.getElementById("modalTerms").innerHTML=`<li>Offer is subject to availability.</li><li>Validity may change without notice.</li><li>Coupon use is subject to applicable brand terms.</li><li>Gift Katta does not process payment on this website.</li>`;
  document.getElementById("recentDeals").innerHTML=deals.filter((_,x)=>x!==i).slice(0,3).map((x)=>`<div class="recent-card" onclick="openDeal(${deals.indexOf(x)})"><span><strong>${x.brand}</strong><br><small>${x.offer}</small></span><b>→</b></div>`).join("");
  document.getElementById("copyNote").textContent="";
  document.getElementById("dealModal").classList.add("open");
  document.getElementById("dealModal").setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closeDeal(){
  document.getElementById("dealModal").classList.remove("open");
  document.getElementById("dealModal").setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}
function copyCoupon(){
  navigator.clipboard.writeText(deals[current].coupon).then(()=>{
    document.getElementById("copyNote").textContent="✓ Coupon copied!";
  });
}
function openWhatsApp(subject){
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Gift Katta, I want to know more about ${subject}.`)}`,"_blank");
}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeDeal()});

let slide=0;
const ads=document.querySelectorAll(".ad"), dots=document.querySelectorAll(".dot");
setInterval(()=>{
  ads[slide].classList.remove("active"); dots[slide].classList.remove("active");
  slide=(slide+1)%ads.length;
  ads[slide].classList.add("active"); dots[slide].classList.add("active");
},4000);
dots.forEach((dot,i)=>dot.onclick=()=>{ads[slide].classList.remove("active");dots[slide].classList.remove("active");slide=i;ads[slide].classList.add("active");dot.classList.add("active")});
