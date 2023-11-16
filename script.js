import {products} from "./items.js";

// Toggle shopping cart
const shoppingCart = document.getElementById("shoppingCart");
const closeCart = document.getElementById("closeCart");

const itemContainer = document.getElementById('itemContainer');
const cartContainer = document.getElementById("cartContainer");
const eachCartItemContainer = document.getElementById("eachCartItemContainer");
const totalItem = document.getElementById("totalItem");

const cartTitle = document.getElementById("cartTitle")
const totalPrice = document.getElementById("totalPrice");
const totalPriceContainer = document.getElementById("totalPriceContainer");

const storedItems = localStorage.getItem("cartItems") 
const cartItems = storedItems !== null 
               ?storedItems.split(",")
               :[]


totalItem.innerText = cartItems.length !== null
                        ? cartItems.length - 1
                        :0

// Iterate card
for(let index=0; index<products.length; index++){
    const {id,productName,productPrice,productImg} = products[index]
    itemContainer.innerHTML +=
           ` <div class="card">`+
           ` <article class="cardImg">`+
              ` <img src="./img/${productImg}" alt="">`+
           `</article> `+
          ` <div class="itemDescContainer">`+
               `<article class="itemDesc">`+
                   `<h1 class="itemName">${productName}</h1>`+
                   `<p class="itemPrice">${productPrice}$</p>`+
              ` </article> ` +
              `<div class="addtocart" id="addtocart${id}")'>`+
                 `<i class="fa-solid fa-cart-shopping cart"></i>`+
              ` </div>`+
          ` </div>`+
       `</div>`    
}

// Add click event listener for card Item
for(let index=1; index<=products.length; index++){
    document.getElementById(`addtocart${index}`).onclick = () => {
        if(cartItems.includes(index) === false){
            totalItem.innerText = cartItems.length;
            cartItems.unshift(index)
            localStorage.setItem("cartItems",cartItems)
        }
    }
}

shoppingCart.onclick = () => {
        cartContainer.classList.add("showCartContainer");
        displayItemInCart();
}

closeCart.onclick = () => {
    cartContainer.classList.remove("showCartContainer");
}

// AddClickEvent for button
const displayItemInCart = () => {
    cartTitle.innerText = `${cartItems.length - 1} Item In cart`;
    eachCartItemContainer.innerHTML="";
    if(localStorage.getItem("cartItems")){
        const  cartArray = localStorage.getItem("cartItems").split(",");
        totalPrice.innerText="";
        totalPriceContainer.style.display="block"
        products.map((item)=>{
            const {id,productName,productPrice,productImg} = item
            if(cartArray.includes(id)){
                totalPrice.innerHTML = (Number(totalPrice.innerText) + Number(productPrice)).toFixed(2);

               return eachCartItemContainer.innerHTML += 
               `<div class="eachCart">`+
              ` <img src="./img/${productImg}" class="cartImg" alt="">`+
               `<div class="cartDesc">`+
                   `<h1 class="cartItemName">${productName}</h1>`+
                   `<p class="cartItemPrice">${productPrice}$</p>`+
                   `<button class="remove" id="remove${id}">Remove</button>`+
               `</div>`+
            `</div>`
            }
        })
    }else{
        cartTitle.innerText = 'No Item'
        totalPriceContainer.style.display="none"
    }
    onRemoveButton();

}

const onRemoveButton = () => {
    const itemInCart = localStorage.getItem("cartItems");
    const itemInCartArray = itemInCart.split(",");
      
    for(let index=0; index<itemInCartArray.length;index++){
        const removedItem =  itemInCartArray[index]
        document.getElementById(`remove${removedItem}`).onclick=()=>{
            const Itemindex = itemInCartArray.indexOf(removedItem)
            cartItems.splice(Itemindex,1)
            localStorage.setItem("cartItems",cartItems)
            totalItem.innerText = cartItems.length - 1;
            displayItemInCart();
        }
    }
}


