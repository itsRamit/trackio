function scrollToSection() {
    const target = document.getElementById('target-section');
    target.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('track-button').addEventListener('click', function () {
    document.getElementById('email-form').classList.toggle('hidden');
});

document.getElementById('close-email-form').addEventListener('click', () => {
    document.getElementById('email-form').classList.add('hidden');

    const messageBox = document.getElementById('message-box');
    if (messageBox) {
        messageBox.innerText = "";
        messageBox.classList.remove("text-green-500", "text-red-500");
    }
});


function fetchPrices() {
    const flipkartUrl = document.getElementById("flipkartUrl").value.trim();
    const amazonUrl = document.getElementById("amazonUrl").value.trim();

    // Flipkart URL regex (matches product URLs)
    const flipkartRegex = /^https?:\/\/(www\.)?flipkart\.com\/.+/i;
    // Amazon URL regex (matches product URLs for multiple domains)
    const amazonRegex = /^https?:\/\/(www\.)?amazon\.(in|com|co\.uk|de|fr|ca|jp|sg|au|it|es|nl|mx|br)\/.+/i;

    if (!flipkartUrl && !amazonUrl) {
      alert("Please enter at least one URL before searching.");
      return;
    }

    if (flipkartUrl && !flipkartRegex.test(flipkartUrl)) {
      alert("Please enter a valid Flipkart product URL.");
      return;
    }

    if (amazonUrl && !amazonRegex.test(amazonUrl)) {
      alert("Please enter a valid Amazon product URL.");
      return;
    }
    const apiUrl = "https://trackio-erhcd6b7fvaxe3bv.centralindia-01.azurewebsites.net/api/scrape-product";
    const requestBody = {
        flipkartUrl: document.getElementById("flipkartUrl").value,
        amazonUrl: document.getElementById("amazonUrl").value
    };

    const loadingSpinner = document.getElementById("loading-spinner");
    const placeholderText = document.getElementById("placeholder-text");
    const productDetails = document.getElementById("product-details");

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

async function trackPrices(event) {
    event.preventDefault();
    const apiUrl = "https://trackio-erhcd6b7fvaxe3bv.centralindia-01.azurewebsites.net/api/track-product";

    const submitButton = document.getElementById("submit-button");
    submitButton.innerHTML = "Tracking...";
    submitButton.disabled = true;

    const requestBody = {
        flipkartUrl: document.getElementById("flipkartUrl")?.value || "",
        amazonUrl: document.getElementById("amazonUrl")?.value || "",
        emailId: document.getElementById("emailInput").value,
        thresholdPrice: document.getElementById("priceInput").value
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            showMessage("Tracking started successfully!", "text-green-500");
            document.getElementById("emailInput").value = "";
            document.getElementById("priceInput").value = "";
        } else {
            showMessage("Failed to track the product. Try again!", "text-red-500");
        }
    } catch (error) {
        showMessage("An error occurred. Please try again!", "text-red-500");
        console.error("Error:", error);
    } finally {
        submitButton.innerHTML = "Submit";
        submitButton.disabled = false;
    }
}


function showMessage(message, colorClass) {
    let messageBox = document.getElementById("message-box");

    if (!messageBox) {
        messageBox = document.createElement("p");
        messageBox.id = "message-box";
        messageBox.className = "mt-2 text-center font-semibold";
        document.getElementById("email-form").appendChild(messageBox);
    }

    messageBox.textContent = message;
    messageBox.className = `mt-2 text-center font-semibold ${colorClass}`;
}
document.getElementById("submit-button").addEventListener("click", trackPrices);



