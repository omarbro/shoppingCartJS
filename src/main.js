let shop=document.getElementById('shop');

let dumData=[
  {
    id: 'a1',
    name:'Formal Shirt',
    price: '€40',
    desc:'lorem ipsum muri kha , pagla shirt',
    img:'images/img-1.jpg'
  },
  {
    id: 'b1',
    name:'Casual Shirt',
    price: '€55',
    desc:'lorem ipsum adfaad kha , paadfafgla shirt',
    img:'images/img-2.jpg'
  },
  {
    id: 'c1',
    name:'T-Shirt',
    price: '€24',
    desc:'lorem iadfapsum muri kha , paadfala shirt',
    img:'images/img-3.jpg'
  },
  {
    id: 'd1',
    name:'Casual Suit',
    price: '€33',
    desc:'lorem ipadfadsum muri kha , pagadfala shirt',
    img:'images/img-4.jpg'
  }
];

let basket=JSON.parse(localStorage.getItem("shopping")) || [];

let showShopData = function(){
  return(
    shop.innerHTML= dumData.map(
      function(x){
        let {id, name, price, desc, img}=x;
        let search = basket.find((x)=>x.id === id) || [];
        return `
        <div class="item" id=pid:${id}>
          <img width="220" src= ${img} alt="image ${id}" style="border-radius: 8px">
          <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
              <h2>${price}</h2>
              <div class="buttons">
                <i onclick="decrement('${id}')" class="bi bi-dash-circle"></i>
                <div class="quantity" id='${id}'>
                ${search.quan === undefined? 0:search.quan}
                </div>
                <i onclick="increment('${id}')" class="bi bi-plus-circle"></i>
              </div>
            </div>
          </div>
        </div>
        `;
      }
    ).join("")
  );
}
showShopData();

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
  localStorage.setItem("shopping", JSON.stringify(basket));
  update(id);
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
  localStorage.setItem("shopping", JSON.stringify(basket));
};
let update =(id)=>{
  let searchId = basket.find((x)=>x.id === id);
  // console.log(searchId.quan);
  document.getElementById(id).innerHTML=searchId.quan;
  calcBasket();
};

let calcBasket=()=>{
  let cartAmount = document.getElementById('cartAmount');
  let amount= basket.map((x)=>x.quan).reduce((x,y)=>x+y,0);
  cartAmount.innerHTML=amount;
};
calcBasket();