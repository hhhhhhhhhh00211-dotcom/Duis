document.addEventListener("DOMContentLoaded", ()=>{

// LOGIN
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');

if(loginBtn){
  loginBtn.onclick = ()=> loginModal.classList.add('active');
  closeModal.onclick = ()=> loginModal.classList.remove('active');
  window.onclick = (e)=>{
    if(e.target === loginModal){
      loginModal.classList.remove('active');
    }
  }
}

// CART
function addToCart(product){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("✅ تمت الإضافة إلى العربة");
}

// زر السلة
const cartBtns = document.querySelectorAll(".icon-btn");
if(cartBtns.length >= 3){
  cartBtns[2].onclick = ()=>{
    window.location.href = "cart.html";
  }
}

// المنتجات الثابتة
document.querySelectorAll(".card").forEach((card)=>{
  const title = card.querySelector("h4")?.innerText || "منتج";
  const price = card.querySelector(".price-tag")?.innerText.replace(/[^\d]/g,"");

  const btn = card.querySelector("button");
  if(btn){
    btn.onclick = ()=>{
      addToCart({title, price});
    }
  }
});

// API
fetch('/api/products')
  .then(res => res.json())
  .then(products => {
    const store = document.querySelector('.store');

    products.forEach(p => {
      const article = document.createElement("article");
      article.className = "card";

      article.innerHTML = `
        <div class="product-media">
          <img src="${p.image}" style="width:100%">
          <div class="price-tag">ريال ${p.price}</div>
        </div>
        <h4>${p.title}</h4>
        <p>${p.description}</p>
        <p>المقاسات: ${p.sizes ? p.sizes.join(", ") : ""}</p>
        <div class="meta">
          <span class="tag">${p.tag || ""}</span>
          <button class="btn-outline">أضف إلى العربة</button>
        </div>
      `;

      article.querySelector("button").onclick = ()=>{
        addToCart(p);
      };

      store.appendChild(article);
    });
  })
  .catch(()=>{
    console.log("❌ السيرفر فيه مشكلة");
  });

});