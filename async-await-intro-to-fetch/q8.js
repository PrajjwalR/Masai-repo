 const productContainer = document.getElementById("product-container");
    const errorMessage = document.getElementById("error-message");
    const totalPriceDisplay = document.getElementById("total-price");

    async function fetchProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const products = await response.json();

        products.forEach(product => {
          const card = document.createElement("div");
          card.classList.add("product-card");

          card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" />
            <h3>${product.title}</h3>
            <p class="price">$${product.price}</p>
            <button>View Details</button>
          `;

          productContainer.appendChild(card);
        });

        const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
        totalPriceDisplay.textContent = `Total Price: $${totalPrice.toFixed(2)}`;

      } catch (error) {
        errorMessage.textContent = "Failed to fetch products. Please try again later.";
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();