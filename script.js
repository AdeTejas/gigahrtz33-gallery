document.addEventListener('DOMContentLoaded', () => {
  const cart = [];
  const cartBtn = document.getElementById('cart-btn');
  const cartModal = document.getElementById('cart-modal');
  const checkoutModal = document.getElementById('checkout-modal');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');
  const closeCart = document.getElementById('close-cart');
  const checkoutBtn = document.getElementById('checkout-btn');
  const closeCheckout = document.getElementById('close-checkout');
  const completePurchase = document.getElementById('complete-purchase');

  // Add to cart
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const product = button.parentElement;
      const id = product.dataset.id;
      const name = product.dataset.name;
      const price = parseFloat(product.dataset.price);
      const item = cart.find(i => i.id === id);
      if (item) {
        item.quantity++;
      } else {
        cart.push({ id, name, price, quantity: 1 });
      }
      updateCart();
    });
  });

  // Update cart display
  function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
      const li = document.createElement('li');
      li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
      cartItems.appendChild(li);
    });
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Toggle modals
  cartBtn.addEventListener('click', () => cartModal.classList.toggle('hidden'));
  closeCart.addEventListener('click', () => cartModal.classList.add('hidden'));
  checkoutBtn.addEventListener('click', () => {
    cartModal.classList.add('hidden');
    checkoutModal.classList.remove('hidden');
  });
  closeCheckout.addEventListener('click', () => checkoutModal.classList.add('hidden'));
  completePurchase.addEventListener('click', () => {
    alert('Purchase complete! (Just kidding, this is a demo.)');
    cart.length = 0; // Clear cart
    updateCart();
    checkoutModal.classList.add('hidden');
  });
});
