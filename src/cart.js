let basket = JSON.parse(localStorage.getItem("shopping")) || [];
let billingLabel=document.getElementById('label');
let cartItems=document.getElementById('shopping-cart');

let calcBasket=()=>{
  let cartAmount=document.getElementById('cartAmount');
  let amount = basket.map((x)=>x.quan).reduce((x,y)=>x+y,0);
  cartAmount.innerHTML=amount;
}
calcBasket();

let generateCartItems = ()=>{
  if(basket.length !== 0){
    return(cartItems.innerHTML = basket.map((x)=>{
      let { id, quan}=x;
      let search = dumData.find((y)=> y.id === x.id) || [];
      return `
        <div class="cart-items">
          <img width="100" src=${search.img}>
          <div class="title-price-x">
            <h4 class="price-title">
              <p>${search.name}</p>
              <p class="cart-price"> ${search.price}</p>
            </h4>
            <i class="bi bi-x-lg"></i>
          </div>

          <div class="cart-button">
         
          </div>

          <h2></h2>
        </div>
      `;
    }).join(''));

  }else{
    billingLabel.innerHTML = `
      <h2 >Your Cart is Empty !</h2>
      <a href="index.html" >
      <button class="HomeButton">Back to Home </>
      </a>
    `;
  }
}
generateCartItems();