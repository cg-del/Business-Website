var cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price, imageUrl) {
    var existingItem = cart.find(function(item) {
        return item.name === name;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: name, price: price, imageUrl: imageUrl, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = "cart.html";
    updateCart();
}

function decrementItem(itemName) {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var item = cart.find(function(i) { return i.name === itemName; });
    if (item && item.quantity > 1) {
        item.quantity--;
    } else if (item && item.quantity === 1) {
        cart = cart.filter(function(i) { return i.name !== itemName; });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload();
}

function removeFromCart(itemName) {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(function(i) { return i.name !== itemName; });
    localStorage.setItem('cart', JSON.stringify(cart))
    window.location.href = "cart.html";
    window.location.reload();
}

window.onload = function() {
    // Load the cart data from localStorage.
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Get the cart items element.
    var cartItemsElement = document.getElementById('cart-items');

    // Clear the cart items element.
    cartItemsElement.innerHTML = '';

    // Add each item in the cart to the cart items element.
    cart.forEach(function(item) {
        var itemElement = document.createElement('div');
        itemElement.style.display = 'flex';
        itemElement.style.alignItems = 'center'; 
        itemElement.style.justifyContent = 'space-around';
        itemElement.style.padding = '10px';
        itemElement.style.width = '100%';

        var imgElement = document.createElement('img');
        imgElement.src = item.imageUrl;
        imgElement.alt = item.name;
        imgElement.style.width = '100px'; 
        imgElement.style.margin = '5px';
        imgElement.style.left = '0px';
        imgElement.style.height = '100px';
        itemElement.appendChild(imgElement);

        var textElement = document.createElement('span');
        textElement.textContent = item.name + ': $' + item.price.toFixed(2) + ' x ' + item.quantity;
        textElement.style.textAlign = 'center'; 
        textElement.style.fontSize = '25px';
        itemElement.appendChild(textElement);

        var addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.style.fontSize = '25px';
        addButton.style.padding = '20px';
        addButton.addEventListener('click', function() {
            addToCart(item.name);
        });
        itemElement.appendChild(addButton);

        var decrementButton = document.createElement('button');
        decrementButton.textContent = '-';
        decrementButton.style.fontSize = '25px';
        decrementButton.style.padding = '20px';
        decrementButton.addEventListener('click', function() {
            decrementItem(item.name);
        });
        itemElement.appendChild(decrementButton);

        var removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.style.fontSize = '25px';
        removeButton.style.padding = '20px';
        removeButton.addEventListener('click', function() {
            removeFromCart(item.name);
        });
        itemElement.appendChild(removeButton);

        cartItemsElement.appendChild(itemElement);
    });

    // Calculate the total cost of the items in the cart.
    var totalCost = cart.reduce(function(sum, item) {
        return sum + item.price * item.quantity;
    }, 0);

    // Display the total cost.
    document.getElementById('total-cost').textContent = totalCost.toFixed(2);
};

document.getElementById('continue-browsing').addEventListener('click', function() {
    window.location.href = 'shop.html'; // replace 'shop.html' with the actual URL of your shop page
});

function updateCart() {
    // Get the cart element from the DOM.
    var cartElement = document.getElementById('cart');

    // Load the cart data from localStorage.
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear the current cart display.
    cartElement.innerHTML = '';

    // Add each item in the cart to the cart display.
    cart.forEach(function(item) {
        var itemElement = document.createElement('div');
        itemElement.textContent = item.name + ': $' + item.price.toFixed(2) + ' x ' + item.quantity;
        cartElement.appendChild(itemElement);
    });
}

document.getElementById('pay-button').addEventListener('click', function() {
    // Calculate the total cost of the items in the cart.
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Cart:', cart); // Debugging line
    var totalCost = cart.reduce(function(sum, item) {
        return sum + item.price * item.quantity;
    }, 0);
    if (totalCost > 0) {
        // Clear the cart in localStorage.
        localStorage.setItem('cart', JSON.stringify([])); // Clearing the cart
        alert('Payment successful! Total cost: $' + totalCost.toFixed(2));

        // Update the cart display.
        updateCart();
    } else {
        alert('Cart is empty, no payment required.');
    }
});

