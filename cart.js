// Simple total update and remove functionality
const items = document.querySelectorAll(".cart-item");
const totalDisplay = document.getElementById("cart-total");

function updateTotal() {
  let total = 0;
  items.forEach(item => {
    const price = parseFloat(item.querySelector(".price").textContent.replace("$", ""));
    const qty = parseInt(item.querySelector(".quantity").value);
    total += price * qty;
  });
  totalDisplay.textContent = `$${total}`;
}

items.forEach(item => {
  item.querySelector(".quantity").addEventListener("input", updateTotal);
  item.querySelector(".remove-btn").addEventListener("click", () => {
    item.remove();
    updateTotal();
  });
});

updateTotal();
