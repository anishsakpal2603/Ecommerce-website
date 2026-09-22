const products = [
  {id:1,name:"MacBook Air M5",cat:"laptop",price:"₹99,900",desc:"Thin, fast and built for all-day work.",img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=85",badge:"NEW"},
  {id:2,name:"Pixel Pro XL",cat:"smartphone",price:"₹89,999",desc:"Pro camera. Bright display. Serious speed.",img:"https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=85",badge:"TOP PICK"},
  {id:3,name:"AirSound Max",cat:"audio",price:"₹29,990",desc:"Immersive sound with adaptive noise control.",img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",badge:"94% MATCH"},
  {id:4,name:"Series X Watch",cat:"watch",price:"₹39,900",desc:"Health, fitness and notifications at a glance.",img:"https://images.unsplash.com/photo-1546868871-7041f2a55e6f?auto=format&fit=crop&w=700&q=85",badge:"POPULAR"},
  {id:5,name:"Studio Laptop Pro",cat:"laptop",price:"₹1,49,900",desc:"Desktop-class performance in a portable design.",img:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=85",badge:"BEST FOR WORK"},
  {id:6,name:"Nova Phone 12",cat:"smartphone",price:"₹59,999",desc:"Smooth performance with a flagship camera.",img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=85",badge:"NEW"},
  {id:7,name:"QuietBuds Pro",cat:"audio",price:"₹14,999",desc:"Small case. Big sound. Quiet when you need it.",img:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=700&q=85",badge:"BEST VALUE"},
  {id:8,name:"SmartFit Ultra",cat:"watch",price:"₹24,999",desc:"Training metrics, GPS and a bright always-on display.",img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85",badge:"92% MATCH"}
];

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const toast = document.getElementById("toast");
let currentCategory = "all";
let cart = 0;

function renderProducts(list = products){
  grid.innerHTML = "";
  if(!list.length){
    grid.innerHTML = `<div style="grid-column:1/-1;padding:60px;text-align:center;background:#fff;border-radius:24px;color:#777">
      <strong style="display:block;color:#171717;font-size:20px;margin-bottom:8px">No products found</strong>
      Try a different search or category.
    </div>`;
    return;
  }
  list.forEach((p,i)=>{
    const card = document.createElement("article");
    card.className = "product-card reveal";
    card.style.transitionDelay = `${i*45}ms`;
    card.innerHTML = `
      <div class="product-image">
        <span class="badge">${p.badge}</span>
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="price-row">
          <span class="price">${p.price}</span>
          <button class="add-btn" data-id="${p.id}" aria-label="Add ${p.name} to bag">+</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
  requestAnimationFrame(()=>grid.querySelectorAll(".reveal").forEach(el=>el.classList.add("visible")));
  grid.querySelectorAll(".add-btn").forEach(btn=>btn.addEventListener("click",()=>{
    cart++; document.getElementById("cartCount").textContent=cart; showToast("Added to bag");
  }));
}

function searchProducts(query){
  const q = query.trim().toLowerCase();
  const base = currentCategory==="all" ? products : products.filter(p=>p.cat===currentCategory);
  if(!q){ renderProducts(base); return; }
  renderProducts(base.filter(p => `${p.name} ${p.desc} ${p.cat} ${p.badge}`.toLowerCase().includes(q)));
  document.getElementById("latest").scrollIntoView({behavior:"smooth",block:"start"});
}

document.getElementById("searchForm").addEventListener("submit",e=>{e.preventDefault();searchProducts(searchInput.value)});
document.querySelectorAll("[data-query]").forEach(btn=>btn.addEventListener("click",()=>{
  searchInput.value=btn.dataset.query; searchProducts(btn.dataset.query);
}));

document.querySelectorAll(".category").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".category").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active"); currentCategory=btn.dataset.category;
  searchProducts(searchInput.value);
}));

document.getElementById("clearFilters").addEventListener("click",()=>{
  currentCategory="all";searchInput.value="";document.querySelectorAll(".category").forEach(x=>x.classList.toggle("active",x.dataset.category==="all"));renderProducts();
});

const overlay=document.getElementById("searchOverlay");
document.getElementById("openSearch").addEventListener("click",()=>{overlay.classList.add("open");document.getElementById("overlayInput").focus()});
document.getElementById("closeSearch").addEventListener("click",()=>overlay.classList.remove("open"));
overlay.addEventListener("click",e=>{if(e.target===overlay)overlay.classList.remove("open")});
document.getElementById("overlaySearchForm").addEventListener("submit",e=>{
  e.preventDefault(); const q=document.getElementById("overlayInput").value; searchInput.value=q; overlay.classList.remove("open"); searchProducts(q);
});
document.querySelectorAll(".search-suggestions button").forEach(btn=>btn.addEventListener("click",()=>{
  document.getElementById("overlayInput").value=btn.dataset.query;
}));

document.querySelectorAll("[data-pref]").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll("[data-pref]").forEach(x=>x.classList.remove("selected"));btn.classList.add("selected");
  const labels={performance:"We’ll prioritize high-performance laptops, phones and accessories.",value:"We’ll prioritize strong specs and ratings at the best price.",design:"We’ll prioritize premium design and standout products.",battery:"We’ll prioritize products with long battery life and efficient hardware."};
  document.getElementById("preferenceResult").textContent=labels[btn.dataset.pref];
}));
document.getElementById("personalizeBtn").addEventListener("click",()=>{
  document.getElementById("recommended").scrollIntoView({behavior:"smooth"});
  showToast("Recommendation preferences ready");
});
document.getElementById("cartBtn").addEventListener("click",()=>showToast(cart ? `${cart} item${cart>1?"s":""} in your bag` : "Your bag is empty"));

function showToast(text){toast.textContent=text;toast.classList.add("show");clearTimeout(window.__toast);window.__toast=setTimeout(()=>toast.classList.remove("show"),1800)}

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
renderProducts();
