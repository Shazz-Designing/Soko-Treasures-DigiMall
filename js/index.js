// Fetch the JSON data
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

      // Append the product to the grid
      productGrid.appendChild(productElement);
    });
    
    // Add event listeners to the "Add to Cart" buttons after creating them
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', addToCart);
    });
  })
  
  .catch(error => {
    console.error('Error loading JSON data: ', error);
  });


    // Shopping Cart Data Structure
    let shoppingCart = [];

    // Add an Event Listener
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
        addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Create the addToCart Function
    function addToCart(event) {
        // Get product information from the clicked button's data attributes or other sources
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
    
    }

    function updateCartDisplay() {
        const cartItems = document.querySelector('.cart-items');
        cartItems.innerHTML = ''; // Clear previous cart items
    
        let total = 0;
    
        shoppingCart.forEach(item => {
            // Create a list item for each cart item
            const cartItem = document.createElement('li');
            cartItem.classList.add('cart-item'); // Apply CSS class for styling
            cartItem.textContent = `${item.name} x${item.quantity} - Ksh ${(item.price * item.quantity).toFixed(2)}`;
            cartItems.appendChild(cartItem);
    
            total += item.price * item.quantity;
        });
    
        // Update the total price
        const cartTotal = document.getElementById('cart-total');
        cartTotal.textContent = total.toFixed(2);
    }
    
    