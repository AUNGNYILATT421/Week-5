const cartItems = [];
const cartItemsDiv = document.getElementById("cart-items");
const totalElement = document.getElementById("total");

// Add an item to the cart
function addItem() {
  const itemName = document.getElementById("item-name").value.trim();
  const itemPrice = parseFloat(document.getElementById("item-price").value);
  const itemQuantity = parseInt(document.getElementById("item-quantity").value);

  if (!itemName || isNaN(itemPrice) || itemQuantity < 1) {
    alert("Please enter valid item details.");
    return;
  }

  // Add item to the cart
  cartItems.push({ name: itemName, price: itemPrice, quantity: itemQuantity });

  // Clear input fields
  document.getElementById("item-name").value = "";
  document.getElementById("item-price").value = "";
  document.getElementById("item-quantity").value = 1;

  // Update the cart display
  displayCartItems();
}

// Apply a discount to the total
function applyDiscount() {
  const discount = parseFloat(document.getElementById("discount").value);
  if (isNaN(discount) || discount < 0 || discount > 100) {
    alert("Please enter a valid discount percentage (0-100).");
    return;
  }

  // Calculate the discounted total
  const total = calculateTotal();
  const discountedTotal = total - total * (discount / 100);
  totalElement.innerText = discountedTotal.toFixed(2);
}

// Display all items in the cart
function displayCartItems() {
  cartItemsDiv.innerHTML = "";

  cartItems.forEach((item, index) => {
    // Create the item row
    const itemDiv = document.createElement("div");
    itemDiv.className = "task";

    const itemText = document.createElement("span");
    itemText.textContent = `${item.name} - $${item.price.toFixed(2)} x ${
      item.quantity
    }`;

    // Create the remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeItem(index);

    itemDiv.appendChild(itemText);
    itemDiv.appendChild(removeButton);
    cartItemsDiv.appendChild(itemDiv);
  });

  // Update the total display
  const total = calculateTotal();
  totalElement.innerText = total.toFixed(2);
}

// Calculate the total price of all items in the cart
function calculateTotal() {
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Remove an item from the cart
function removeItem(index) {
  cartItems.splice(index, 1);
  displayCartItems();
}
