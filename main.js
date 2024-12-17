// current inventory
let inventory = [
    {
        category: 'Fruits',
        products: [
            { product: 'Apples', quantity: 10 },
            { product: 'Bananas', quantity: 5 },
            { product: 'Oranges', quantity: 8 },
        ]
    },
    {
        category: 'Vegetables',
        products: [
            { product: 'Tomatoes', quantity: 15 },
            { product: 'Carrots', quantity: 12 },
            { product: 'Peppers', quantity: 9 },
        ]
    }
];

// global variables (available to all functions)
let categoryMenu = document.getElementById('categoryInput');
let productMenu = document.getElementById('productInput');
let shipment = [];
let order = [];

// display the inventory 
function displayInventory() {
    let inventoryDisplay = document.getElementById('inventoryDisplay');
    inventoryDisplay.innerHTML = '';
    inventory.forEach(category => {
        let itemGroup = document.createElement('div');
        itemGroup.innerHTML = "<strong>" + category.category + "</strong>";
        category.products.forEach(product => {
            itemGroup.innerHTML += "<div>" + product.product + ": " + product.quantity;
        });
        inventoryDisplay.appendChild(itemGroup);
    })
}

function createCategories() {
    inventory.forEach(category => {
        let categoryOption = document.createElement("option");
        categoryOption.value = category.category;
        categoryOption.textContent = category.category;
        categoryMenu.appendChild(categoryOption);
    });
}

function createProducts() {
    productMenu.innerHTML = '';
    let selectedCategory = inventory.find(category => category.category === categoryMenu.value);
    if (selectedCategory) {
        selectedCategory.products.forEach(product => {
            let productOption = document.createElement("option");
            productOption.value = product.product;
            productOption.text = product.product;
            productMenu.appendChild(productOption);
        });
    }
}
categoryMenu.addEventListener('change', createProducts);

function addNewCategory() {
    let newCategoryInput = document.getElementById('newCategoryInput').value;
    if (newCategoryInput) {
        inventory.push({
            category: newCategoryInput,
            products: []
        });
        let categoryOption = document.createElement('option');
        categoryOption.value = newCategoryInput;
        categoryOption.textContent = newCategoryInput;
        categoryMenu.appendChild(categoryOption);
        document.getElementById('newCategoryInput').value = '';
        displayInventory();
    }
}
document.getElementById('addCategoryButton').addEventListener('click', addNewCategory);

displayInventory();
createCategories();
createProducts();