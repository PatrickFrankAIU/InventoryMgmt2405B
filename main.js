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

function addShipment() {
    let categoryInput = document.getElementById('categoryInput').value;
    let productInput = document.getElementById('productInput').value;
    let quantityInput = parseInt(document.getElementById('quantityInput').value);
    
    let category = inventory.find(cat => cat.category === categoryInput); // important
    // see if this code is being used
    if (!category) {
        category = {category: categoryInput, products: []};
        inventory.push(category);
    }

    let product = category.products.find(prod => prod.product === productInput);
    if (product) {
        product.quantity += quantityInput;
    } else {
        // not sure if this line does anything currently
        category.products.push({product: productInput, quantity: quantityInput});
    }

    let shipCategory = shipment.find(cat => cat.category === categoryInput);
    if (!shipCategory) {
        shipCategory = {category: categoryInput, products: []}; // ?
        shipment.push(shipCategory);
    }

    let shipProduct = shipCategory.products.find(prod => prod.product === productInput);
    if (shipProduct) {
        shipProduct.quantity += quantityInput;
    } else {
        shipCategory.products.push({product: productInput, quantity: quantityInput});
    }

    displayInventory();
    displayShipment();
}

function displayShipment() {
    let shipmentDisplay = document.getElementById('shipmentDisplay');
    shipmentDisplay.innerHTML = '';
    shipment.forEach(category => {
        let categoryEl = document.createElement('div');
        categoryEl.innerHTML = '<strong>' + category.category + '</strong>';
        category.products.forEach(product => {
            categoryEl.innerHTML += '<div>' + product.product + ': ' 
                + product.quantity + '</div>';
        });
        shipmentDisplay.appendChild(categoryEl);
    });
}

function addOrder() {
    let categoryInput = document.getElementById('categoryInput').value;
    let productInput = document.getElementById('productInput').value;
    let quantityInput = parseInt(document.getElementById('quantityInput').value);

    let category = inventory.find(cat => cat.category === categoryInput);
    if (!category) {
        category = {category: categoryInput, products: []};
    }

    let product = category.products.find(prod => prod.product === productInput);
    if (product) {
        product.quantity -= quantityInput;
    } else {
        category.products.push({product: productInput, quantity: -quantitInput});
    }

    let orderCategory = order.find(cat => cat.category === categoryInput);
    if (!orderCategory) {
        orderCategory = {category: categoryInput, products: []};
        order.push(orderCategory);
    }

    let orderProduct = orderCategory.products.find(prod => prod.product === productInput);
    if (orderProduct) {
        orderProduct.quantity += quantityInput;
    } else {
        orderCategory.products.push({product: productInput, quantity: quantityInput});
    }

    displayInventory();
    displayOrder();
}

function displayOrder() {
    let orderDisplay = document.getElementById('orderDisplay');
    orderDisplay.innerHTML = '';
    order.forEach(category => {
        let categoryEl = document.createElement('div');
        category.products.forEach(product => {
            categoryEl.innerHTML += '<div>' + product.product + ': ' + product.quantity + '</div>';
        });
        orderDisplay.appendChild(categoryEl);
    });
}

displayInventory();
createCategories();
createProducts();