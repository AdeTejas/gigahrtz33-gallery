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

  if (!cartItems || !cartTotal || !cartCount) {
    console.error('Cart elements missing—check HTML IDs.');
    return;
  }

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const product = button.parentElement;
      const id = product.dataset.id;
      const name = product.dataset.name;
      const price = parseFloat(product.dataset.price);
      const item = cart.find(i => i.id === id);
      if (item) item.quantity++;
      else cart.push({ id, name, price, quantity: 1 });
      updateCart();
    });
  });

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

  if (cartBtn) cartBtn.addEventListener('click', () => cartModal.classList.toggle('hidden'));
  if (closeCart) closeCart.addEventListener('click', () => cartModal.classList.add('hidden'));
  if (checkoutBtn) checkoutBtn.addEventListener('click', () => {
    cartModal.classList.add('hidden');
    checkoutModal.classList.remove('hidden');
  });
  if (closeCheckout) closeCheckout.addEventListener('click', () => checkoutModal.classList.add('hidden'));
  if (completePurchase) completePurchase.addEventListener('click', () => {
    alert('Purchase beamed via Mock Ethereum! Tx: 0xade... – Transparent like xAI\'s ledger. (Demo only)');
    cart.length = 0;
    updateCart();
    checkoutModal.classList.add('hidden');
  });

  // Parallax
  window.addEventListener('scroll', () => {
    const parallax = document.getElementById('background-parallax');
    if (parallax) parallax.style.transform = `translateY(${window.scrollY * 0.5}px)`;
  });

  // AR Preview
  document.querySelectorAll('.ar-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const preview = btn.parentElement.querySelector('.ar-preview');
      if (!preview) return console.error('AR preview div missing.');
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, preview.clientWidth / preview.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(preview.clientWidth, preview.clientHeight);
      preview.appendChild(renderer.domElement);
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      camera.position.z = 5;
      function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      }
      animate();
    });
  });

  // AI Chat
  const aiBtn = document.getElementById('ai-chat-btn');
  const aiModal = document.getElementById('ai-modal');
  const aiInput = document.getElementById('ai-input');
  const aiResponse = document.getElementById('ai-response');
  const aiSubmit = document.getElementById('ai-submit');
  const closeAi = document.getElementById('close-ai');

  if (aiBtn) aiBtn.addEventListener('click', () => aiModal.classList.toggle('hidden'));
  if (closeAi) closeAi.addEventListener('click', () => aiModal.classList.add('hidden'));
  if (aiSubmit) aiSubmit.addEventListener('click', () => {
    if (!aiInput || !aiResponse) return console.error('AI elements missing.');
    const query = aiInput.value.toLowerCase();
    let res = 'Querying the cosmos...';
    if (query.includes('cyber')) res = 'Dig the Cyberpunk Poster? AR spin it like a replicant!';
    else if (query.includes('tee')) res = 'StudioBooka Tee: Sustainable fabric, blockchain-tracked supply.';
    else if (query.includes('mug')) res = 'PM Mug: For advisors conquering the stars.';
    aiResponse.textContent = res;
  });
});
