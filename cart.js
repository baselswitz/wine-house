function renderCart() {
  const tbody = document.querySelector("#cartTable tbody");
  const totalDisplay = document.getElementById("cartTotal");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  tbody.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.image}" alt="${item.name}"></td>
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td><input type="number" min="1" value="${item.quantity}" class="qty" data-index="${index}"></td>
      <td>$${itemTotal.toFixed(2)}</td>
      <td><button class="remove" data-index="${index}">✕</button></td>
    `;
    tbody.appendChild(row);
  });

  totalDisplay.textContent = total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  // Update quantity
  document.querySelector("#cartTable").addEventListener("change", e => {
    if (e.target.classList.contains("qty")) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      const index = e.target.dataset.index;
      const newQty = parseInt(e.target.value);
      if (newQty > 0) {
        cart[index].quantity = newQty;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      }
    }
  });

  // Remove item
  document.querySelector("#cartTable").addEventListener("click", e => {
    if (e.target.classList.contains("remove")) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      cart.splice(e.target.dataset.index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  });

  // Checkout button
  document.getElementById("checkoutBtn").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Thank you for your purchase! 🥂");
    localStorage.removeItem("cart");
    renderCart();
  });
});
