const WHATSAPP_NUMBER="917588406001";
const deals=[
{brand:"PVR INOX",logo:"pvr-inox.webp",offer:"Up to 25% OFF",coupon:"GIFTKATTA25",desc:"Special cinema offer for selected bookings."},
{brand:"Jockey",logo:"jockey.webp",offer:"Up to 30% OFF",coupon:"JOCKEY30",desc:"Selected fashion and innerwear offers."},
{brand:"Puma",logo:"puma.webp",offer:"Up to 40% OFF",coupon:"PUMA40",desc:"Selected sportswear and footwear offer."},
{brand:"Foxtale",logo:"foxtale.webp",offer:"Up to 25% OFF",coupon:"FOXTale25",desc:"Selected skincare products offer."},
{brand:"Domino's",logo:"dominos.webp",offer:"Special Offer",coupon:"DOMINOS",desc:"Selected food offers."},
{brand:"EatSure",logo:"eatsure.webp",offer:"Up to 20% OFF",coupon:"EATSURE20",desc:"Selected meals and food offers."},
{brand:"BGMI by Swag",logo:"bgmi-by-swag.webp",offer:"Exclusive Offer",coupon:"BGMIKATTA",desc:"Selected BGMI by Swag offer."},
{brand:"Vijay Sales",logo:"vijay-sales.webp",offer:"Up to 15% OFF",coupon:"VS15",desc:"Selected electronics offers."}];

const bg=document.getElementById("brandsGrid"),dg=document.getElementById("dealsGrid");
deals.forEach((d,i)=>{
bg.innerHTML+=`<div class="brand"><img src="${d.logo}" alt="${d.brand} logo"><div>${d.brand}</div></div>`;
dg.innerHTML+=`<div class="card" onclick="openDeal(${i})"><div class="top"><img class="dealLogo" src="${d.logo}" alt="${d.brand}"><span class="active">● Active</span></div><h3>${d.brand}</h3><p>Selected offer</p><div class="offer">${d.offer}</div><div class="view">View Deal →</div></div>`;
});

let current=0;
function openDeal(i){
  current=i;
  const d=deals[i];
  if(!d)return;
  const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value;};
  set("detailCrumb",d.brand);
  set("mTitle",d.brand);
  set("mOffer",d.offer);
  set("detailOfferText",d.offer);
  set("ddSelectedOffer",d.offer);
  set("mCoupon",d.coupon);
  set("mDesc",d.desc);
  set("mAbout",`Gift Katta brings selected ${d.brand} offers directly to customers. Contact us on WhatsApp to confirm availability and complete your purchase.`);
  set("copied","");
  detailAdIndex=0;
  showDetailAd(0);
  const wa=document.getElementById("mWa");
  if(wa)wa.href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Gift Katta, I'm interested in the ${d.brand} offer (${d.offer}). Please confirm availability and tell me how I can complete payment on WhatsApp.`)}`;
  const recent=document.getElementById("recentDeals");
  if(recent){
    recent.innerHTML=deals.filter((_,x)=>x!==i).slice(0,4).map(x=>`<div class="recent-card" onclick="openDeal(${deals.indexOf(x)})"><img src="${x.logo}" alt="${x.brand} logo"><div><strong>${x.brand}</strong><br><small>${x.offer}</small></div></div>`).join("");
  }
  const modal=document.getElementById("modal");
  if(modal)modal.classList.add("open");
  document.body.style.overflow="hidden";
}
let detailAdIndex=0;
function showDetailAd(index){
  const slides=document.querySelectorAll(".detail-ad-slide");
  const dots=document.querySelectorAll(".detail-ad-dot");
  if(!slides.length)return;
  if(index<0)index=slides.length-1;
  if(index>=slides.length)index=0;
  slides.forEach((s,i)=>s.classList.toggle("active",i===index));
  dots.forEach((d,i)=>d.classList.toggle("active",i===index));
  detailAdIndex=index;
}
function changeDetailAd(direction){
  showDetailAd(detailAdIndex+direction);
}

function closeDeal(){document.getElementById("modal").classList.remove("open");document.body.style.overflow=""}
function copyCoupon(){navigator.clipboard.writeText(deals[current].coupon);document.getElementById("copied").textContent="✓ Coupon copied!"}

let currentAd=0;
const adSlides=document.querySelectorAll(".ad-slide");
const adDots=document.querySelectorAll(".ad-dot");
function showAd(index){
if(!adSlides.length)return;
adSlides[currentAd].classList.remove("active");
if(adDots[currentAd])adDots[currentAd].classList.remove("active");
currentAd=index;
adSlides[currentAd].classList.add("active");
if(adDots[currentAd])adDots[currentAd].classList.add("active");
}
function changeAd(direction){
let next=currentAd+direction;
if(next<0)next=adSlides.length-1;
if(next>=adSlides.length)next=0;
showAd(next);
}
if(adSlides.length>1)setInterval(()=>changeAd(1),5000);
