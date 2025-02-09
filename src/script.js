function scrollToSection() {
    const target = document.getElementById('target-section');
    target.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('track-button').addEventListener('click', function () {
    document.getElementById('email-form').classList.toggle('hidden');
});

document.getElementById('close-email-form').addEventListener('click', () => {
    document.getElementById('email-form').classList.add('hidden');
});

function fetchPrices() {
    const apiUrl = "http://localhost:3001/api/get-product";
    const requestBody = {
        flipkartUrl: document.getElementById("flipkartUrl").value,
        amazonUrl: document.getElementById("amazonUrl").value
    };

    const loadingSpinner = document.getElementById("loading-spinner");
    const placeholderText = document.getElementById("placeholder-text");
    const productDetails = document.getElementById("product-details");

    // Show loader & keep placeholder text visible
    loadingSpinner.classList.remove("hidden");
    placeholderText.classList.remove("hidden");
    productDetails.classList.add("hidden");

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        if (!data || data.status !== "success") {
            placeholderText.textContent = "No product details found.";
            return;
        }

        updateProductDetails(data);
    })
    .catch(error => {
        console.error("Error:", error);
        placeholderText.textContent = "Failed to fetch product details.";
    })
    .finally(() => {
        loadingSpinner.classList.add("hidden");
    });
}

function updateProductDetails(data) {
    const amazonData = data.products.find(product => product.source === "Amazon")?.data || {};
    const flipkartData = data.products.find(product => product.source === "Flipkart")?.data || {};

    document.getElementById("product-image").src = amazonData.image || flipkartData.image || "src/images/monitor.webp";
    document.getElementById("product_description").textContent = amazonData.title || flipkartData.title || "Product Title Unavailable";
    
    document.getElementById("flipkart-price").textContent = flipkartData.price > 0 ? `₹${flipkartData.price}` : "Not Available";
    document.getElementById("amazon-price").textContent = amazonData.price > 0 ? `₹${amazonData.price}` : "Not Available";

    document.getElementById("placeholder-text").classList.add("hidden");
    document.getElementById("product-details").classList.remove("hidden");
}

document.getElementById("search-button").addEventListener("click", fetchPrices);


