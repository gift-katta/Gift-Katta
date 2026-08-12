const WHATSAPP_NUMBER="917588406001";
const deals=[
{brand:"PVR INOX",logo:"images/pvr-inox.webp",offer:"Up to 25% OFF",coupon:"GIFTKATTA25",desc:"Special cinema offer for selected bookings."},
{brand:"Jockey",logo:"images/jockey.webp",offer:"Up to 30% OFF",coupon:"JOCKEY30",desc:"Selected fashion and innerwear offers."},
{brand:"Puma",logo:"images/puma.webp",offer:"Up to 40% OFF",coupon:"PUMA40",desc:"Selected sportswear and footwear offer."},
{brand:"Foxtale",logo:"images/foxtale.webp",offer:"Up to 25% OFF",coupon:"FOXTale25",desc:"Selected skincare products offer."},
{brand:"Domino's",logo:"images/dominos.webp",offer:"Special Offer",coupon:"DOMINOS",desc:"Selected food offers."},
{brand:"EatSure",logo:"images/eatsure.webp",offer:"Up to 20% OFF",coupon:"EATSURE20",desc:"Selected meals and food offers."},
{brand:"BGMI by Swag",logo:"images/bgmi-by-swag.webp",offer:"Exclusive Offer",coupon:"BGMIKATTA",desc:"Selected BGMI by Swag offer."},
{brand:"Vijay Sales",logo:"images/vijay-sales.webp",offer:"Up to 15% OFF",coupon:"VS15",desc:"Selected electronics offers."}];
const bg=document.getElementById("brandsGrid"),dg=document.getElementById("dealsGrid");
deals.forEach((d,i)=>{bg.innerHTML+=`<div class="brand"><img src="${d.logo}" alt="${d.brand} logo"><div>${d.brand}</div></div>`;dg.innerHTML+=`<div class="card" onclick="openDeal(${i})"><div class="top"><img class="dealLogo" src="${d.logo}" alt="${d.brand}"><span class="active">● Active</span></div><h3>${d.brand}</h3><p>Selected offer</p><div class="offer">${d.offer}</div><div class="view">View Deal →</div></div>`});
let current=0;
function openDeal(i){current=i;const d=deals[i];document.getElementById("mTitle").textContent=d.brand;document.getElementById("mOffer").textContent=d.offer;document.getElementById("mDesc").textContent=d.desc;document.getElementById("mCoupon").textContent=d.coupon;document.getElementById("modalAd").innerHTML=`<img src="${d.logo}" alt="${d.brand} logo"><span>${d.brand} — ${d.offer}</span>`;document.getElementById("mWa").href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Gift Katta, I'm interested in the ${d.brand} offer (${d.offer}). Please help me redeem it.`)}`;document.getElementById("modal").classList.add("open");document.body.style.overflow="hidden"}
function closeDeal(){document.getElementById("modal").classList.remove("open");document.body.style.overflow=""}
function copyCoupon(){navigator.clipboard.writeText(deals[current].coupon);document.getElementById("copied").textContent="✓ Coupon copied!"}
let s=0,ads=document.querySelectorAll(".ad");setInterval(()=>{ads[s].classList.remove("active");s=(s+1)%ads.length;ads[s].classList.add("active")},4000);