const whatsappNumber = "917260904685";
let products = [];
const categories = [
  ["LED Bulbs","💡"],["Tube Lights","▰"],["Panel Lights","◉"],["Downlights","✦"],
  ["Flood Lights","☼"],["Street Lights","☀"],["Fancy & Outdoor Lights","✧"],
  ["Garden Lights","🌿"],["Decorative Lights","✺"],["Jhumar","✧"]
];
const categoryGrid=document.getElementById("categoryGrid");
const categorySelect=document.getElementById("categorySelect");
const productGrid=document.getElementById("productGrid");
function waLink(p){const msg=`Hello GlowTech, I am interested in ${p.name} (${p.variant}). Please share details and availability.`;return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;}
function renderCategories(){
  categories.forEach(([name,icon])=>{
    const count=products.filter(p=>p.category===name).length;
    const card=document.createElement("a");card.className="category-card";card.href="#products";
    card.innerHTML=`<span class="cat-icon">${icon}</span><b>${name}</b><small>${count} listed products · View products →</small>`;
    card.addEventListener("click",()=>{categorySelect.value=name;renderProducts();});
    categoryGrid.appendChild(card);
    const option=document.createElement("option");option.value=name;option.textContent=name;categorySelect.appendChild(option);
  });
}
function renderProducts(){
  const term=document.getElementById("searchInput").value.trim().toLowerCase();
  const category=categorySelect.value;
  const filtered=products.filter(p=>(category==="All"||p.category===category)&&`${p.name} ${p.variant} ${p.category}`.toLowerCase().includes(term));
  productGrid.innerHTML="";
  document.getElementById("emptyState").hidden=filtered.length>0;
  filtered.forEach(p=>{
    const card=document.createElement("article");card.className="product-card";
    const price=p.price===null?"Ask for price":`₹${Number(p.price).toLocaleString("en-IN")}`;
    const note=p.priceNote?`<small> · ${p.priceNote}</small>`:"";
    card.innerHTML=`<div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
      <div class="product-info"><span class="category-label">${p.category}</span><h3>${p.name}</h3>
      <div class="variant">${p.variant||""}</div><div class="price">${price}${note}</div>
      <div class="product-actions"><a href="${waLink(p)}" target="_blank" rel="noopener">WhatsApp Enquiry</a><a class="secondary" href="#contact">Contact</a></div></div>`;
    productGrid.appendChild(card);
  });
}
fetch("products.json").then(r=>{if(!r.ok)throw new Error("Could not load products.json");return r.json();})
.then(data=>{products=data;renderCategories();renderProducts();})
.catch(err=>{productGrid.innerHTML="<p>Product list could not be loaded. Please check products.json.</p>";console.error(err);});
document.getElementById("searchInput").addEventListener("input",renderProducts);
categorySelect.addEventListener("change",renderProducts);
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
