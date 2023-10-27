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

// Add event listeners for product addition and modal display
document.addEventListener('DOMContentLoaded', function () {
  // Call the fetchAndDisplayProducts function to fetch and display products
  fetchAndDisplayProducts();

  // Add a click event listener to the "View Cart" button
  const viewCartButton = document.getElementById('view-cart-button');
  viewCartButton.addEventListener('click', function() {
    // Call the updateCartDisplay function to update the cart content
    updateCartDisplay();

    // Open the modal using Bootstrap's modal method
    const modal = new bootstrap.Modal(document.getElementById('cartModal'));
    const customModal = new bootstrap.Modal(modalElement, {
      backdrop: false, // Remove the backdrop
    });
    modal.show();
  });
});
