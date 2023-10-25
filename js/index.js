// Fetch the JSON data
fetch('./data/products.json')
  .then(response => response.json())
  .then(data => {
    
    
    // Display Available Products For Sale

    const productContainer = document.getElementById('product-container');

    // Assuming 'data' contains your JSON product data
    data.forEach(product => {
      const productElement = document.createElement('div');
      productElement.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Price: Ksh ${product.price.toFixed(2)}</p>
        <img src="${product.image}" alt="${product.name}">
      `;
      productContainer.appendChild(productElement);
    });
  })

  .catch(error => {
    console.error('Error loading JSON data: ', error);
  });
