let basket = JSON.parse(localStorage.getItem("shopping")) || [];
let billingLabel=document.getElementById('label');
let cartItems=document.getElementById('shopping-cart');

let calcBasket=()=>{
  let cartAmount=document.getElementById('cartAmount');
  let amount = basket.map((x)=>x.quan).reduce((x,y)=>x+y,0);
  cartAmount.innerHTML=amount;
};
calcBasket();

let generateCartItems = () => {
  // Clear the cartItems container first to avoid rendering overlaps
  cartItems.innerHTML = '';

  if (basket.length !== 0) {
    cartItems.innerHTML = basket
      .map((x) => {
        let { id, quan } = x;
        let search = dumData.find((y) => y.id === x.id) || [];
        if (!search.id) return '';
        return `
          <div class="cart-items">
            <img width="100" src=${search.img}>
            <div class="cart-details">
              <div class="title-price-x">
                <h4 class="price-title">
                <p>${search.name}</p>
                <p class="cart-price"> $ ${search.price}</p>
                </h4>
                <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
              </div>

              <div class="cart-buttons">
                  <i onclick="decrement('${id}')" class="bi bi-dash-circle"></i>
                  <div class="quantity" id='${id}'>
                    ${quan}
                  </div>
                  <i onclick="increment('${id}')" class="bi bi-plus-circle"></i>
              </div>

              <h4> $ ${quan * search.price}</h4>
            </div>
          </div>
        `;
      })
      .join('');
  } else {
    billingLabel.innerHTML = `
      <h2>Your Cart is Empty!</h2>
      <a href="index.html">
        <button class="HomeButton">Back to Home</button>
      </a>
    `;
  }
};

generateCartItems();

let increment=(id)=>{
  let searchId = basket.find((x)=>x.id === id);
  if(!searchId){
    basket.push({
      id:id,
      quan:1
    });
  }else{
    searchId.quan += 1;
  }
  generateCartItems();
  localStorage.setItem("shopping", JSON.stringify(basket));
  update(id);
  calcTotalAmount();
};


let decrement=(id)=>{
  let searchId = basket.find((x)=>x.id === id);
  if(searchId === undefined){
    return;
  }
  if(searchId.quan === 0 ) return;
  
  searchId.quan -= 1;
  update(id);
  basket = basket.filter((x)=> x.quan !== 0);
  generateCartItems();
  calcTotalAmount();
  localStorage.setItem("shopping", JSON.stringify(basket));
};

let update =(id)=>{
  let searchId = basket.find((x)=>x.id === id);
  // console.log(searchId.quan);
  document.getElementById(id).innerHTML=searchId.quan;
  calcBasket();
};

let removeItem = (id)=>{
  let selectedItem = id;
  basket=basket.filter((x)=> x.id !== selectedItem.id);
  generateCartItems();
  calcTotalAmount();
  calcBasket();
  localStorage.setItem("shopping", JSON.stringify(basket));
};

let clearAll= ()=>{
  basket=[];
  generateCartItems();
  calcTotalAmount();
  calcBasket();

  localStorage.setItem("shopping", JSON.stringify(basket));
}

generateCartItems();

let calcTotalAmount = ()=>{
  if(basket.length !== 0){
    let amount = basket.map((x)=>{
      let {id, quan}=x;
      let search= dumData.find((y)=> y.id === x.id) || [];
      return quan*search.price;
    }).reduce((a,b)=> a+b, 0);
    billingLabel.innerHTML=`
    <h2> Total Bill : $ ${amount}</h2>
    <button class="checkOut">Check Out</button>
    <button onClick= "clearAll()" class="clearAll">Clear All</button>
    `;
    
  }
  else{
    return;
  }
};

calcTotalAmount();
