// API URLs (Replace with your backend URLs)
const API_URL = "http://localhost:8000/api/";
const LOGIN_URL = API_URL + "login/";
const PRODUCTS_URL = API_URL + "products/";
const PROFILE_URL = API_URL + "profile/";
const CATALOGUE_URL = API_URL + "catalogues/";

// Check if user is logged in
const isLoggedIn = localStorage.getItem("token");

if (!isLoggedIn && !window.location.pathname.endsWith("login.html")) {
    window.location.href = "login.html";
}

// Login Functionality
const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(LOGIN_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Invalid credentials");
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);
            window.location.href = "index.html";
        } catch (error) {
            document.getElementById("login-error").textContent = error.message;
        }
    });
}

// Logout Functionality
const logoutButton = document.getElementById("logout");
if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "login.html";
    });
}

// Fetch and Display Products
async function fetchProducts() {
    try {
        const response = await fetch(PRODUCTS_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>MOQ:</strong> ${product.moq}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <button onclick="editProduct(${product.id})">Edit</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
        `;

        productList.appendChild(productCard);
    });
}

// Fetch and Display Profile
async function fetchProfile() {
    try {
        const response = await fetch(PROFILE_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch profile");
        }
        const profile = await response.json();
        displayProfile(profile);
    } catch (error) {
        console.error("Error fetching profile:", error);
    }
}

function displayProfile(profile) {
    const profileDetails = document.getElementById("profile-details");
    profileDetails.innerHTML = `
        <p><strong>Name:</strong> ${profile.name}</p>
        <p><strong>Email:</strong> ${profile.email}</p>
        <p><strong>Phone:</strong> ${profile.phone}</p>
        <p><strong>Address:</strong> ${profile.address}</p>
    `;
}

// Fetch and Display Catalogues
async function fetchCatalogues() {
    try {
        const response = await fetch(CATALOGUE_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch catalogues");
        }
        const catalogues = await response.json();
        displayCatalogues(catalogues);
    } catch (error) {
        console.error("Error fetching catalogues:", error);
    }
}

function displayCatalogues(catalogues) {
    const catalogueList = document.getElementById("catalogue-list");
    catalogueList.innerHTML = "";

    catalogues.forEach(catalogue => {
        const catalogueCard = document.createElement("div");
        catalogueCard.className = "catalogue-card";

        catalogueCard.innerHTML = `
            <h3>${catalogue.name}</h3>
            <p><strong>Description:</strong> ${catalogue.description}</p>
            <button onclick="editCatalogue(${catalogue.id})">Edit</button>
            <button onclick="deleteCatalogue(${catalogue.id})">Delete</button>
        `;

        catalogueList.appendChild(catalogueCard);
    });
}

// Load data when the dashboard page loads
if (window.location.pathname.endsWith("index.html")) {
    fetchProducts();
    fetchProfile();
    fetchCatalogues();
}