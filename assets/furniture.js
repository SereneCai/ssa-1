//Fetch JSON to HTML page
//Insert JSON items to paragraph with #cards id

function addProductPage(){
    fetch('../assets/furniture.json')
    .then((response) => response.json())
    .then((json) => {
        // console.log(json);
        const cards = json;
        let output = "";
        // for (let i = 0; i < json.length; i++) {
        const products = JSON.stringify(json);
        var itemsInLocal= localStorage.setItem('products', products);
        var itemsInStore = localStorage.getItem('products');
        var productInStore = JSON.parse(itemsInStore); //resonate products
        for (let i = 0; i < 4; i++) {
            output +=

    `<div class="card p-1">
        <img class="card-img-top animate__animated animate__fadeIn" src="${productInStore[i].image}" alt="">
        <div class="card-body">
            <h5 class="card-title">${productInStore[i].name}</h5>
            <p class="card-text">$${productInStore[i].price}</p>
            <button id="addToCart" type="button" class="btn btn-warning">Add to cart</button>
        </div>
    </div>`
        document.getElementById("cards").innerHTML = output;
        
     
    }

    var carts = document.querySelectorAll('#addToCart'); 
    for(let i =0; i< carts.length; i++){
        carts[i].addEventListener('click', () =>{
        cartNumbers(productInStore[i]);
            })
               
    }
    //cartNmber starts
    function cartNumbers(productInStore){
        let productNumbers = localStorage.getItem('cartNumbers');
        productNumbers = parseInt(productNumbers);
        if(productNumbers){
            localStorage.setItem('cartNumbers', productNumbers + 1)
        } else {
            localStorage.setItem('cartNumbers', 1);
        }
        setItems(productInStore);

    }
    //cartNumber ends

    //setitem start
    function setItems(productInStore){
        var cartItems = localStorage.getItem('itemsInCart');
        cartItems = JSON.parse(cartItems);
        if(cartItems != null){
            if(cartItems[productInStore.name] == undefined){
                cartItems = {
                    ...cartItems,
                    [productInStore.name]: productInStore
                }
            }
            cartItems[productInStore.name].inCart +=1
        } else {
            productInStore.inCart = 1;
            cartItems = {
                [productInStore.name]: productInStore
            }
        }
       
        localStorage.setItem('itemsInCart', JSON.stringify(cartItems));
        calCost(productInStore);

    }
    
    //setitem end

    //price starts
    function calCost(productInStore){
        let cartCost = localStorage.getItem("totalCost");
        
        if (cartCost != null){
            cartCost = parseInt(cartCost); //conversion required for math
            localStorage.setItem("totalCost", cartCost+= productInStore.price);
        }else{
            localStorage.setItem("totalCost", productInStore.price);
        }
    }
    //price ends

    
    })

    
}


    


addProductPage();
displayItems();

function displayItems(){
    let cartItems = localStorage.getItem('itemsInCart');
    cartItems = JSON.parse(cartItems);
    cartItems = Object.values(cartItems);
    let totalPrice = localStorage.getItem('totalCost');
    totalPrice = JSON.parse(totalPrice);
    var itemContainer = document.getElementById("items-container");
    var itemDisplay = document.querySelector('.item-image');
    var itemName = document.querySelector('.item-name');
if(cartItems && itemContainer){
       for (let i = 0; i < cartItems.length; i++) {
        itemContainer.innerHTML += 
        `<div class="card">
        <img class="card-img-top animate__animated animate__fadeIn" src="${cartItems[i].image}" alt="">
        <div class="card-body">
            <h5 class="card-title">${cartItems[i].name}</h5>
            <p class="card-text">$${cartItems[i].price}</p>
            <p class="card-text">Quantity: ${cartItems[i].inCart}</p>
        </div>
    </div>`
       }
    var totalPricePage = document.querySelector('.totalPrice');
       totalPricePage.innerHTML +=  
       `<p class="card-text">Total Price: $${totalPrice}</p>`
    }
        
   }
   