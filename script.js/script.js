console.log('js connected');

// getting catagories name  from catagories api

const loadCatagories = () =>{
    // const catagoriesUrl = "https://openapi.programming-hero.com/api/categories";
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data =>displayCatagories(data.categories))
}
loadCatagories();

// display catagories data in the screen

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
                            <button class="btn btn-soft btn-success text-black text-left btn-block px-0 ">${catagory.category_name}</button>
                        </div>
        `
        // 4.append the child in the catagoreisNameContainer 
        catagoriesNameContainer.append(catagoryDiv);
    }
}

// Getting all the plants data from allplant api

const allPlants = ()=>{
    const plantUrl = "https://openapi.programming-hero.com/api/plants"
    fetch(plantUrl)
    .then(res=> res.json())
    .then(json=>displayPlant(json.plants))
}
allPlants();

// display allPlant data in the screen the screen
const displayPlant =(plants)=>{
    // 1.get the container and empty container
    const treeDetails = document.getElementById('tree-details');
    treeDetails.innerHTML = '';
    // 2.get every catagory name from api
    for(const plant of plants){
        const plantCart = document.createElement('div');
        plantCart.innerHTML =`
        
        <div class="tress bg-white  border border-2 border-yellow-600 p-4">
                            <div class="mb-3">
                                <img class="h-50 w-full" src="${plant.image}" alt="">
                            </div>
                            
                            
                            <div class="mb-3">
                                <h3 class="font-bold text-xl">${plant.name}</h3>
                                <p class="line-clamp-2">${plant.description}</p>

                                <div class="flex justify-between">
                                    <button class="bg-[#DCFCE7] text-[#15803D] rounded-full p-2 font-semibold">${plant.name}</button>
                                    <p class="font-semibold "> <i class="fa-solid fa-bangladeshi-taka-sign"></i> ${plant.price}</p>
                                </div>

                            </div>
                            
                            <div>
                                <button class="bg-[#15803D] rounded-full w-full font-bold text-center py-3 text-white">Add to the cart</button>
                            </div>
                        </div>
        
        `

        treeDetails.append(plantCart);
    }
}

