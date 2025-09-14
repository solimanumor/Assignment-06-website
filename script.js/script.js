console.log('js connected');

// getting catagories name  from catagories API

const loadCatagories = () =>{
    const catagoriesUrl = "https://openapi.programming-hero.com/api/categories"
    const catagoryUrl = ""

    fetch(catagoriesUrl)
    .then(res => res.json())
    .then(data =>displayCatagories(data.categories))

}
loadCatagories();

// ---------------------------------------------------------------------

// display catagories data in the screen from catagories API

const displayCatagories = (catagories) =>{

    // 1.get the container and empty container
    const catagoriesNameContainer = document.getElementById("catagory-name-container");
    catagoriesNameContainer.innerHTML = '';

    // 2.get every catagory name from api
    for(const catagory of catagories){
        
        // 3.create Element for catagories
        const catagoryDiv = document.createElement('div')
        catagoryDiv.innerHTML =`
        
        <div class="container ">
                            
                            <button id="btn-catagories-${catagory.id}" onclick="loadPlantByCatagory(${catagory.id})" class="btn btn-soft btn-success text-black text-left btn-block px-0 catagories-btn">${catagory.category_name}</button>
                        </div>
        `
        // 4.append the child in the catagoreisNameContainer 

        catagoriesNameContainer.append(catagoryDiv);
    }
}
// -------------------------------------------------------------------

// Getting all the plants data from allplant API

const allPlants = ()=>{
    const plantUrl = "https://openapi.programming-hero.com/api/plants"
    fetch(plantUrl)
    .then(res=> res.json())
    .then(json=>displayPlant(json.plants))
}
allPlants();

// ------------------------------------------------------------------------------

// display allPlant data in the screen from allplant API

const displayPlant =(plants)=>{
    // console.log(plants);
    
    // 1.get the container and empty container
    const treeDetails = document.getElementById('tree-details');
    treeDetails.innerHTML = '';
    // 2.get every catagory name from api
    for(const plant of plants){
        const plantCart = document.createElement('div');
        plantCart.innerHTML =`
        
        <div class="tress bg-white   p-4">
                            <div class="mb-3">
                                <img class="h-50 w-full" src="${plant.image}" alt="">
                            </div>
                            
                            
                            <div class="mb-3">
                                <h3  class="font-bold text-xl">${plant.name}</h3>
                                <p class="line-clamp-2">${plant.description}</p>

                                <div class="flex justify-between">
                                    <button onClick="loadPlantDetails(${plant.id})" class="bg-[#DCFCE7] text-[#15803D] rounded-full p-2 font-semibold">${plant.name}</button>
                                    <p class="font-semibold "> <i class="fa-solid fa-bangladeshi-taka-sign"></i> ${plant.price}</p>
                                </div>

                            </div>
                            
                            <div>
                                <button onClick="addToCart('${plant.name}','${plant.price}, ${plant.id}')" class="bg-[#15803D] rounded-full w-full font-bold text-center py-3 text-white">Add to the cart</button>
                            </div>
                        </div>
        
        `

        treeDetails.append(plantCart);
    }
}
// --------------------------------------------------------------------------------

// getting all the plant details data from plant details API
const loadPlantDetails =(plantId)=>{
    const IdUrl = `https://openapi.programming-hero.com/api/plant/${plantId}`
    console.log(IdUrl);
    fetch(IdUrl)
    .then(res=>res.json())
    .then(res=>displayDetails(res.plants))
    
}

// -------------------------------------------------------

// showing pland details on modal plant details API
const displayDetails =(planted)=>{
    console.log(planted);
    const modalBox = document.getElementById('details-box');
    modalBox.innerHTML = `<img src="${planted.image}" alt="">
        <h3 class="text-xl font-bold">name: ${planted.name}</h3>
        <p>${planted.description}</p>
        <p class="text-xl font-bold">catagory: ${planted.category}</p>
        <p class="text-xl font-bold"> price: ${planted.price}</p>`
    document.getElementById('plant-modal').showModal()
    
}

// -------------------------------------------------------------------------

// getting data from all plant catagory API

const loadPlantByCatagory =(catagoryId)=>{
    const catagoryUrl = `https://openapi.programming-hero.com/api/category/${catagoryId}`
    // console.log(text);
    fetch(catagoryUrl)
    .then(res=> res.json())
    .then(json=>{
        removeActive();
        const clickBtn = document.getElementById(`btn-catagories-${catagoryId}`)
        // console.log(clickBtn);
        clickBtn.classList.add('active');
        displayPlantByCatagory(json.plants)
    })
    
}

// ----------------------------------------------------------------------------

// Showing plant by their catagory

const displayPlantByCatagory = (plantsCatagory)=>{

   // 1.get the container and empty container
    const plantDetailsByCatagory = document.getElementById('tree-details');
    plantDetailsByCatagory.innerHTML = '';
    // 2.get every catagory name from api
    for(const catagory of plantsCatagory){
        const plantCatagoryCart = document.createElement('div');
        plantCatagoryCart.innerHTML =`
        
        <div class="tress bg-white   p-4">
                            <div class="mb-3">
                                <img class="h-50 w-full" src="${catagory.image}" alt="">
                            </div>
                            
                            
                            <div class="mb-3">
                                <h3  class="font-bold text-xl">${catagory.name}</h3>
                                <p class="line-clamp-2">${catagory.description}</p>

                                <div class="flex justify-between">
                                    <button onClick="loadPlantDetails(${catagory.id})" class="bg-[#DCFCE7] text-[#15803D] rounded-full p-2 font-semibold">${catagory.name}</button>
                                    <p class="font-semibold "> <i class="fa-solid fa-bangladeshi-taka-sign"></i> ${catagory.price}</p>
                                </div>

                            </div>
                            
                            <div>
                                <button onClick="addToCart('${catagory.name}','${catagory.price}')" class="bg-[#15803D] rounded-full w-full font-bold text-center py-3 text-white">Add to the cart</button>
                            </div>
                        </div>
        
        `

        plantDetailsByCatagory.append(plantCatagoryCart);
    }

}

// Adding to the cart

const addToCart= (plantName, plantPrice)=>{
    console.log(plantName, plantPrice);
    const CartContainer = document.getElementById('CartHistory')
    // CartContainer.innerHTML = '';
    const paymentCart = document.createElement('div')
        paymentCart.innerHTML =`
        
        <div id="paymentCard" class="cart-price-container flex justify-between items-center bg-[#DCFCE7] rounded-lg p-2 mb-2">
            <div class="">
                <h4 class="text-xl font-semibold">${plantName}</h4>
                <p class="text-lg"><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${plantPrice} x 1</p>
            </div>
                <button onClick="removePayment()"><i class="fa-solid fa-x"></i></button>
         </div>
        
        
        `;
    CartContainer.append(paymentCart)
    totalBIll(plantPrice)
 
}

//  Remove from cart 

const removePayment = (id)=>{

    const getContainer = document.getElementById('paymentCard')
    // console.log(getContainer);

    
        getContainer.remove();
   
}

// Adding to the total bill

const totalBIll = (price)=>{
    let currentTotal = 0; // keep track of the total globally


    const priceContainer = document.getElementById('total-bill');
    if (!priceContainer) {
        console.error("Element with id 'total-bill' not found.");
        return;
    }

    // Add new price to the existing total
    currentTotal += price;

    // Update the HTML
    priceContainer.innerHTML = `
        <div class="flex justify-between">
            <p class="text-xl font-semibold">Total:</p>
            <p class="text-xl">
                <i class="fa-solid fa-bangladeshi-taka-sign"></i>${currentTotal}
            </p>
        </div>
    `;
//   priceContainer.append(priceContainerTwo)


}

// remove highlights color

const removeActive=()=>{
    const catagoriesButtons = document.querySelectorAll('.catagories-btn')
    catagoriesButtons.forEach(btn=>btn.classList.remove('active'))
}

// adding spinner

const manageSpinner= (status)=>{
    if(status==true){
        document.getElementById('spinner').classList.remove('hidden');
    }else{
                document.getElementById('spinner').classList.add('hidden');

    }
}