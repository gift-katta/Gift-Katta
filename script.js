const WHATSAPP_NUMBER="917588406001";
const deals = [
  {brand:"PVR INOX", offer:"10% OFF", prices:[500, 750, 1000, 2000, 2500, 5000], logo:"pvr-inox.webp", desc:"PVR INOX selected offers."},
  {brand:"Jockey", offer:"9% OFF", prices:"custom", logo:"jockey.webp", desc:"Jockey selected offers."},
  {brand:"Puma", offer:"8% OFF", prices:[500, 1000, 1500, 2000, 5000], logo:"puma.webp", desc:"Puma selected offers."},
  {brand:"Foxtale", offer:"14% OFF", prices:[100, 250, 500, 1000, 1500, 2000, 2500, 5000], logo:"foxtale.webp", desc:"Foxtale selected offers."},
  {brand:"Domino's", offer:"12% OFF", prices:[250, 500, 100, 1500, 2500, 2000, 5000], logo:"dominos.webp", desc:"Domino's selected offers."},
  {brand:"EatSure", offer:"9% OFF", prices:"custom", logo:"eatsure.webp", desc:"EatSure selected offers."},
  {brand:"BGMI by Swag", offer:"8% OFF", prices:[15, 30, 75, 380, 750, 1900], logo:"bgmi-by-swag.webp", desc:"BGMI by Swag selected offers."},
  {brand:"Vijay Sales", offer:"2% OFF", prices:[100, 500, 1000, 1100, 1500, 2000, 2500, 3000], logo:"vijay-sales.webp", desc:"Vijay Sales selected offers."}
];

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
  set("detailCrumb",d.brand); set("mTitle",d.brand); set("mOffer",d.offer);
  set("mAbout",`Gift Katta brings selected ${d.brand} offers directly to customers. Choose an available coupon value and contact us on WhatsApp to confirm availability and complete payment.`);
  const priceBox=document.getElementById("priceOptions");
  if(priceBox){
    if(Array.isArray(d.prices)){
      priceBox.innerHTML=d.prices.map((v,n)=>`<button type="button" class="price-option${n===0?" active":""}" onclick="selectPrice(${v},this)">₹${v.toLocaleString("en-IN")}</button>`).join("");
      set("pointValues",`Available values: ${d.prices.map(v=>"₹"+v.toLocaleString("en-IN")).join(", ")}.`);
    }else{
      priceBox.innerHTML=`<div class="custom-price"><label for="customAmount">Enter coupon amount</label><div class="custom-price-row"><span>₹</span><input id="customAmount" type="number" min="1" step="1" placeholder="Enter amount" oninput="selectCustomPrice(this.value)"></div><small>Choose your custom amount and continue through WhatsApp.</small></div>`;
      set("pointValues","Custom amount available. Enter the amount you want and confirm availability on WhatsApp.");
    }
  }
  selectedPrice=Array.isArray(d.prices)?d.prices[0]:null;
  if(Array.isArray(d.prices)) selectPrice(d.prices[0],document.querySelector(".price-option")); else updateWhatsAppLink();
  const recent=document.getElementById("recentDeals");
  if(recent) recent.innerHTML=deals.filter((_,x)=>x!==i).slice(0,4).map(x=>`<div class="recent-card" onclick="openDeal(${deals.indexOf(x)})"><img src="${x.logo}" alt="${x.brand} logo"><div><strong>${x.brand}</strong><br><small>${x.offer}</small></div></div>`).join("");
  const modal=document.getElementById("modal");
  if(modal)modal.classList.add("open");
  document.body.style.overflow="hidden";
}
let selectedPrice=null;
function selectPrice(value,button){
  selectedPrice=value;
  document.querySelectorAll(".price-option").forEach(x=>x.classList.remove("active"));
  if(button)button.classList.add("active");
  updateWhatsAppLink();
}
function selectCustomPrice(value){
  selectedPrice=value?Number(value):null;
  updateWhatsAppLink();
}
function updateWhatsAppLink(){
  const d=deals[current],wa=document.getElementById("mWa");
  if(!wa||!d)return;
  const valueText=selectedPrice?` Coupon value: ₹${Number(selectedPrice).toLocaleString("en-IN")}.`:" I would like a custom coupon amount.";
  wa.href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Gift Katta, I'm interested in the ${d.brand} offer (${d.offer}).${valueText} Please confirm availability and tell me how I can complete payment on WhatsApp.`)}`;
}
let detailAdIndex=0;
function showDetailAd(index){
  const slides=document.querySelectorAll(".detail-ad-slide"),dots=document.querySelectorAll(".detail-ad-dot");
  if(!slides.length)return;
  if(index<0)index=slides.length-1;if(index>=slides.length)index=0;
  slides.forEach((x,i)=>x.classList.toggle("active",i===index));
  dots.forEach((x,i)=>x.classList.toggle("active",i===index));
  detailAdIndex=index;
}
function changeDetailAd(direction){showDetailAd(detailAdIndex+direction);}

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
