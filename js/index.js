// Shopping Cart Data Structure
let shoppingCart = [];

// Function to fetch and display products
function fetchAndDisplayProducts() {
  fetch('./data/products.json')
    .then(response => response.json())
    .then(data => {
      // Display Available Products For Sale
      const productGrid = document.getElementById('product-container');

      data.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-item'); // Add the product-item class
        productElement.innerHTML = `
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p>Price: Ksh ${product.price.toFixed(2)}</p>
          <img src="${product.image}" alt="${product.name}">
        `;

        // Create an "Add to Cart" button for each product
        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.classList.add('add-to-cart-button');
        addToCartButton.setAttribute('data-product-id', product.id);
        addToCartButton.setAttribute('data-product-name', product.name);
        addToCartButton.setAttribute('data-product-price', product.price);

        // Append the button to the product element
        productElement.appendChild(addToCartButton);

        // Add an event listener to each "Add to Cart" button
        addToCartButton.addEventListener('click', addToCart);

        // Append the product to the grid
        productGrid.appendChild(productElement);
      });
    })
    .catch(error => {
      console.error('Error loading JSON data: ', error);
    });
}

// Function to update the cart display
function updateCartDisplay() {
  const cartItems = document.querySelector('.cart-items');
  cartItems.innerHTML = ''; // Clear previous cart items

  let total = 0;

  shoppingCart.forEach(item => {
    // Create a list item for each cart item
    const cartItem = document.createElement('li');
    cartItem.classList.add('cart-item'); // Apply CSS class for styling
    cartItem.textContent = `${item.name} x${item.quantity} - Ksh ${(item.price * item.quantity).toFixed(2)}`;

    // Create a "Remove" button for each cart item
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-button');
    removeButton.setAttribute('data-product-id', item.id);
    removeButton.addEventListener('click', removeFromCart);

    cartItem.appendChild(removeButton);
    cartItems.appendChild(cartItem);

    total += item.price * item.quantity;
  });

  // Update the total price
  const cartTotal = document.getElementById('cart-total');
  cartTotal.textContent = total.toFixed(2);
}

// Function to handle adding products to the cart
function addToCart(event) {
  // Get product information from the clicked button's data attributes
  const productId = event.target.getAttribute('data-product-id');
  const productName = event.target.getAttribute('data-product-name');
  const productPrice = parseFloat(event.target.getAttribute('data-product-price'));

  // Check if the product is already in the cart
  const existingProduct = shoppingCart.find(item => item.id === productId);

  if (existingProduct) {
    // If the product is already in the cart, increase its quantity
    existingProduct.quantity++;
  } else {
    // If it's a new product, add it to the cart
    shoppingCart.push({
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1,
    });
  }

  // Display a confirmation message 
  alert(`${productName} Added to the cart`);

  // Update the cart display
  updateCartDisplay();
}

// Function to remove items from the cart
function removeFromCart(event) {
  const productId = event.target.getAttribute('data-product-id');
  const itemIndex = shoppingCart.findIndex(item => item.id === productId);

  if (itemIndex !== -1) {
    shoppingCart.splice(itemIndex, 1);
    updateCartDisplay();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Call the fetchAndDisplayProducts function to fetch and display products
  fetchAndDisplayProducts();

  // Define modalElement outside the event listener
  const modalElement = document.getElementById('cartModal');
  const customModal = new bootstrap.Modal(modalElement, {
    backdrop: false, // Remove the backdrop
  });

  const viewCartModal = new bootstrap.Modal(document.getElementById("cartModal"));

  // Add a click event listener to the "View Cart" button
  const viewCartButton = document.getElementById('view-cart-button');
  viewCartButton.addEventListener('click', function() {
    // Call the updateCartDisplay function to update the cart content
    updateCartDisplay();

    // Show the modal
    customModal.show();




  });

  // Add a click event listener to the checkout buttons
  const checkoutButton1 = document.getElementById("checkoutButton1");
  const checkoutButton2 = document.getElementById("checkoutButton2");

  checkoutButton1.addEventListener("click", function() {
    handleCheckout();
    // Close the cart modal
    const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
    cartModal.hide();
  });

  checkoutButton2.addEventListener("click", function() {
    handleCheckout();
    // Close the cart modal
    const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
    cartModal.hide();
  });


// Check the cart total value
const cartTotal = parseFloat(document.getElementById("cart-total").textContent);
    
// Select the buttons and the email input modal
const emailModal = new bootstrap.Modal(document.getElementById("emailModal"));
const sendEmailButton = document.getElementById("sendEmailButton");
const emailInput = document.getElementById("emailInput");

// Create a function to handle the checkout process
function handleCheckout() {
  const cartTotalText = document.getElementById("cart-total").textContent;
  const cartTotalValue = parseFloat(cartTotalText.replace('Ksh ', '').replace(/,/g, '')); // Remove 'Ksh ' and parse to a float

  if (cartTotalValue === 0) {
    alert("Please add an item to the cart.");
  } else {
        
        // Reset the shoppingCart and update the display
        shoppingCart = [];
        updateCartDisplay();

        // Add this code to clear the email input field when the email modal is shown
emailModal.show();

// Clear the email input field
emailInput.value = '';
        
        // Open the email input modal
        emailModal.show();
  }
}

// Add a click event listener to the send email button
sendEmailButton.addEventListener("click", function() {
  const emailAddress = emailInput.value;
  // Add your logic to send the download link to the entered email address
  // You can use AJAX or a server-side script for this.

  // Close the email input modal
  emailModal.hide();

  // Show the "Thank You" modal
  const thankYouModal = new bootstrap.Modal(document.getElementById("thankYouModal"));
  thankYouModal.show();
});

// Add an event listener to the "OK" button in the "Thank You" modal
const okButton = document.getElementById("okButton");
okButton.addEventListener("click", function() {
  // Close the "Thank You" modal
  const thankYouModal = new bootstrap.Modal(document.getElementById("thankYouModal"));
  thankYouModal.hide();
});
});