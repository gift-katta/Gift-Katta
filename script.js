const WHATSAPP_NUMBER="917588406001";
const deals = [
  {brand:"PVR INOX", offer:"10% OFF", prices:[500, 750, 1000, 2000, 2500, 5000], logo:"pvr-inox.webp", desc:"PVR INOX selected offers.", dealAd:"pvr-inox-deal.webp", discount:10},
  {brand:"Jockey", offer:"9% OFF", prices:"custom", logo:"jockey.webp", desc:"Jockey selected offers.", dealAd:"jockey-deal.webp", discount:9},
  {brand:"Puma", offer:"8% OFF", prices:[500, 1000, 1500, 2000, 5000], logo:"puma.webp", desc:"Puma selected offers.", dealAd:"puma-deal.webp", discount:8},
  {brand:"Foxtale", offer:"14% OFF", prices:[100, 250, 500, 1000, 1500, 2000, 2500, 5000], logo:"foxtale.webp", desc:"Foxtale selected offers.", dealAd:"foxtale-deal.webp", discount:14},
  {brand:"Domino's", offer:"12% OFF", prices:[250, 500, 100, 1500, 2500, 2000, 5000], logo:"dominos.webp", desc:"Domino's selected offers.", dealAd:"dominos-deal.webp", discount:12},
  {brand:"EatSure", offer:"9% OFF", prices:"custom", logo:"eatsure.webp", desc:"EatSure selected offers.", dealAd:"eatsure-deal.webp", discount:9},
  {brand:"BGMI by Swag", offer:"8% OFF", prices:[15, 30, 75, 380, 750, 1900], logo:"bgmi-by-swag.webp", desc:"BGMI by Swag selected offers.", dealAd:"bgmi-by-swag-deal.webp", discount:8},
  {brand:"Vijay Sales", offer:"2% OFF", prices:[100, 500, 1000, 1100, 1500, 2000, 2500, 3000], logo:"vijay-sales.webp", desc:"Vijay Sales selected offers.", dealAd:"vijay-sales-deal.webp", discount:2}
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

  const dealAd=document.getElementById("detailDealAd");
  if(dealAd){
    dealAd.src=d.dealAd;
    dealAd.alt=`${d.brand} Gift Katta offer`;
  }

  const priceBox=document.getElementById("priceOptions");
  if(priceBox){
    if(Array.isArray(d.prices)){
      priceBox.innerHTML=d.prices.map((v,n)=>`<button type="button" class="price-option${n===0?" active":""}" onclick="selectPrice(${v},this)">₹${v.toLocaleString("en-IN")}</button>`).join("");
      set("pointValues",`Available values: ${d.prices.map(v=>"₹"+v.toLocaleString("en-IN")).join(", ")}.`);
    }else{
      priceBox.innerHTML=`<div class="custom-price"><label for="customAmount">Enter coupon amount</label><div class="custom-price-row"><span>₹</span><input id="customAmount" type="number" min="1" step="1" placeholder="Enter amount" oninput="selectCustomPrice(this.value)"></div><small>Enter your amount and continue through WhatsApp.</small></div>`;
      set("pointValues","Custom amount available. Enter the amount you want and confirm availability on WhatsApp.");
    }
  }

  selectedPrice=Array.isArray(d.prices)?d.prices[0]:null;
  if(Array.isArray(d.prices)) selectPrice(d.prices[0],document.querySelector(".price-option"));
  updatePayable();

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
  updatePayable();
}
function selectCustomPrice(value){
  selectedPrice=value?Number(value):null;
  updatePayable();
}
function updatePayable(){
  const d=deals[current];
  if(!d)return;

  const amount=Number(selectedPrice);
  const payableEl=document.getElementById("payableAmount");
  const savingEl=document.getElementById("savingAmount");

  if(amount>0){
    const discount=Number(d.discount)||0;
    const saving=Math.round(amount*discount)/100;
    const payable=Math.round((amount-saving)*100)/100;

    if(payableEl){
      payableEl.textContent=`₹${payable.toLocaleString("en-IN",{minimumFractionDigits:payable%1?2:0,maximumFractionDigits:2})}`;
    }
    if(savingEl){
      savingEl.textContent=`You save ₹${saving.toLocaleString("en-IN",{minimumFractionDigits:saving%1?2:0,maximumFractionDigits:2})}`;
    }
  }else{
    if(payableEl)payableEl.textContent="—";
    if(savingEl)savingEl.textContent="Enter a coupon amount to see your final price";
  }

  updateWhatsAppLink();
}
function updateFinalPrice(){
  const d = deals[current];
  const el = document.getElementById("finalPrice");
  if(!el || !d || !selectedPrice){
    if(el) el.innerHTML = "";
    return;
  }
  const discount = parseFloat(String(d.offer).replace(/[^0-9.]/g,"")) || 0;
  const value = Number(selectedPrice);
  const saving = Math.round(value * discount / 100);
  const payable = value - saving;
  el.innerHTML =
    `<strong>You pay only ₹${payable.toLocaleString("en-IN")}</strong>` +
    ` <span>You save ₹${saving.toLocaleString("en-IN")}</span>`;
}

function updateWhatsAppLink(){
  const d=deals[current],wa=document.getElementById("mWa");
  if(!wa||!d)return;
  const amount=Number(selectedPrice);
  let valueText=" I would like a custom coupon amount.";
  if(amount>0){
    const payable=Math.round((amount-(amount*d.discount/100))*100)/100;
    valueText=` Coupon value: ₹${amount.toLocaleString("en-IN")}. Final payable amount: ₹${payable.toLocaleString("en-IN")}.`;
  }
  wa.href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Gift Katta, I'm interested in the ${d.brand} offer (${d.offer}).${valueText} Please confirm availability and tell me how I can complete payment on WhatsApp.`)}`;
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
