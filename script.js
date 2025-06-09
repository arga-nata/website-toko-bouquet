const buyButton = document.getElementById("buyButton");
const orderPopupOverlay = document.getElementById("orderPopupOverlay");
const cancelOrderBtn = document.getElementById("cancelOrderBtn");
const confirmOrderBtn = document.getElementById("confirmOrderBtn");
const orderForm = document.getElementById("orderForm");
const deliveryDateInput = document.getElementById("deliveryDate");

// Function to show the pop-up
function showPopup() {
  orderPopupOverlay.classList.add("show");
  // Set default delivery date to today
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months start at 0!
  const dd = String(today.getDate()).padStart(2, "0");
  deliveryDateInput.value = `${yyyy}-${mm}-${dd}`;
}

// Function to hide the pop-up
function hidePopup() {
  orderPopupOverlay.classList.remove("show");
}

// Event listener for the "Beli Sekarang" button
buyButton.addEventListener("click", showPopup);

// Event listener for the "Batal" button
cancelOrderBtn.addEventListener("click", hidePopup);

// Event listener for form submission (Konfirmasi Pesanan)
orderForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission to keep pop-up open for now

  // You can add logic here to retrieve data from the form
  const quantity = document.getElementById("orderQuantity").value;
  const deliveryDate = document.getElementById("deliveryDate").value;
  const deliveryOption = document.querySelector(
    'input[name="deliveryOption"]:checked'
  ).value;
  const message = document.getElementById("orderMessage").value;

  // For demonstration, log the data to the console
  console.log("Detail Pesanan:", {
    jumlah: quantity,
    tanggalPengiriman: deliveryDate,
    opsiPengiriman: deliveryOption,
    pesan: message,
  });

  // After data is processed, hide the pop-up
  hidePopup();
  // Provide feedback to the user (instead of alert)
  // You could use a custom modal for this too, or update a part of the page
  const messageBox = document.createElement("div");
  messageBox.textContent =
    "Pesanan Anda telah dikonfirmasi! Lihat detail di konsol browser.";
  messageBox.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #4CAF50; /* Green */
                color: white;
                padding: 15px 25px;
                border-radius: 8px;
                z-index: 1100;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                opacity: 0;
                transition: opacity 0.5s ease;
            `;
  document.body.appendChild(messageBox);

  setTimeout(() => {
    messageBox.style.opacity = "1";
  }, 50); // Small delay for transition

  setTimeout(() => {
    messageBox.style.opacity = "0";
    messageBox.addEventListener("transitionend", () => messageBox.remove());
  }, 3000); // Hide after 3 seconds
});

// Hide pop-up if clicking on the overlay outside the pop-up
orderPopupOverlay.addEventListener("click", (event) => {
  if (event.target === orderPopupOverlay) {
    hidePopup();
  }
});

// Prevent pop-up from closing when clicking inside the popup-container itself
document
  .querySelector(".popup-container")
  .addEventListener("click", (event) => {
    event.stopPropagation(); // Stop click event from bubbling up to the overlay
  });
