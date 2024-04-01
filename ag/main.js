//for above-arrow
let arrowbtn = document.getElementById("arrow");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || 
    document.documentElement.scrollTop > 20) {
    arrowbtn.style.display = "block";
  } else {
    arrowbtn.style.display = "none";
  }
}
function topFunction() {
  document.documentElement.scrollTop = 0; 
}
/*---------------------------------*/
   let searchForm=document.querySelector('.search-form');
   document.querySelector('#search-btn').onclick=()=>{
    searchForm.classList.toggle('active');
    loginForm.classList.remove('active');
    cart.classList.remove('active');
    navbar.classList.remove('active');
   }                                    
 
   let loginForm=document.querySelector('.login-form');
   document.querySelector('#login-btn').onclick=()=>{
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    cart.classList.remove('active');
    navbar.classList.remove('active');
   }

   let navbar=document.querySelector('.navbar');
   document.querySelector('#menu-btn').onclick=()=>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cart.classList.remove('active');
    loginForm.classList.remove('active');
   
   }
   window.onscroll = () =>{
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
    // cart.classList.remove('active');
   }
   
/*------------------------------------*/
let preveiwContainer = document.querySelector('.products-preview');
let previewBox = preveiwContainer.querySelectorAll('.preview');

document.querySelectorAll('.container-inner .view-detail').forEach(product =>{
  product.onclick = () =>{
    preveiwContainer.style.display = 'flex';
    let name = product.getAttribute('data-name');
    previewBox.forEach(preview =>{
      let target = preview.getAttribute('data-target');
      if(name == target){
        preview.classList.add('active');
      }
    });
  };
});

previewBox.forEach(close =>{
  close.querySelector('.fa-times').onclick = () =>{
    close.classList.remove('active');
    preveiwContainer.style.display = 'none';
  };
});

/*------------------------------------*/
var swiper=new Swiper(".review-slider",{
  spaceBetween:30,
  centeredSlides:true,
  autoplay:{
    delay:7500,
    disableOnInteraction:false,
  },
  loop:true,
  breakpoints:{
    0:{
      slidesPerView:1,
    },
    768:{
      slidesPerView:2,
    },
    991:{
      slidesPerView:3,
    },
  },
})
/*------------------------------------*/
const btnCart=document.querySelector('.fa-shopping-cart');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{
  cart.classList.add('active');
  loginForm.classList.remove('active');
  searchForm.classList.remove('active');
  navbar.classList.remove('active');
});

btnClose.addEventListener('click',()=>{
  cart.classList.remove('active');
});
/*---------------------*/
document.addEventListener('DOMContentLoaded',LoadProduct);

function LoadProduct(){
  loadContent();
}
function loadContent(){
  //Remove Product Items  From Cart
  let btnRemove=document.querySelectorAll('#cart-remove');
  btnRemove.forEach((btn)=>{
    btn.addEventListener('click',removeItem);
  });
   //Product Item Change Event
   let qtyElements=document.querySelectorAll('.cart-quantity');
   qtyElements.forEach((input)=>{
     input.addEventListener('change',changeQty);
   });
 
   //Product Cart
   
   let cartBtns=document.querySelectorAll('.add-cart');
   cartBtns.forEach((btn)=>{
     btn.addEventListener('click',addCart);
   });
 
   updateTotal();
}
//Remove Item
function removeItem(){
  if(confirm('Are Your Sure to Remove')){
    let title=this.parentElement.querySelector('.cart-product-title').innerHTML;
    itemList=itemList.filter(el=>el.title!=title);
    this.parentElement.remove();
    loadContent();
  }
}

//Change Quantity
function changeQty(){
  if(isNaN(this.value) || this.value<1){
    this.value=1;
  }
  loadContent();
}
/*-----------------------------*/
let itemList=[];

// Add Cart
function addCart(){
  let product=this.parentElement;
  let title=product.querySelector('.product-title').innerHTML;
  let price=product.querySelector('.product-price').innerHTML;
  let imgSrc=product.querySelector('.product-img').src;
  //console.log(title,price,imgSrc);
  
  let newProduct={title,price,imgSrc}
 
  //Check Product already Exist in Cart
  if(itemList.find((el)=>el.title==newProduct.title)){
   alert("Product Already added in Cart");
   return;
  }else{
   itemList.push(newProduct);
  }
  let newProductElement= createCartProduct(title,price,imgSrc);
let element=document.createElement('div');
element.innerHTML=newProductElement;
let cartBasket=document.querySelector('.cart-content');
cartBasket.append(element);
loadContent();

}

function createCartProduct(title,price,imgSrc){

  return `
  <div class="cart-box">
  <img src="${imgSrc}" class="cart-img">
  <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="price-box">
      <div class="cart-price">${price}</div>
       <div class="cart-amt">${price}</div>
   </div>
    <input type="number" value="1" class="cart-quantity">
  </div>
  <i class="fa-solid fa-trash-can" id="cart-remove"></i>
</div>
  `;
}

function updateTotal()
{
  const cartItems=document.querySelectorAll('.cart-box');
  const totalValue=document.querySelector('.total-price');

  let total=0;

  cartItems.forEach(product=>{
    let priceElement=product.querySelector('.cart-price');
    let price=parseInt(priceElement.innerHTML.replace("MMK  ",""));
    let qty=product.querySelector('.cart-quantity').value;
    total+=(price*qty);
    product.querySelector('.cart-amt').innerText="MMK  "+(price*qty);

  });

  totalValue.innerHTML='MMK  '+total;


  // Add Product Count in Cart Icon

  const cartCount=document.querySelector('.badge');
  let count=itemList.length;
  cartCount.innerHTML=count;

  if(count==0){
    cartCount.style.display='none';
  }else{
    cartCount.style.display='block';
  }
}
/*-----------------------------------*/