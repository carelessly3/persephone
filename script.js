// API URL (Replace with your backend URL)
const API_URL = "http://localhost:8000/api/products/";

// Fetch products from the backend
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Display products on the page
function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Clear existing content

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p><strong>Company:</strong> ${product.company.name}</p>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>MOQ:</strong> ${product.moq}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Description:</strong> ${product.description}</p>
        `;

        productList.appendChild(productCard);
    });
}

// Fetch and display products when the page loads
document.addEventListener("DOMContentLoaded", fetchProducts);