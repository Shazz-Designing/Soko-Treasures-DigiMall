// Fetch the JSON data
fetch('products.json')
  .then(response => response.json())
  .then(data => {
  })
  .catch(error => {
    console.error('Error loading JSON data: ', error);
  });
