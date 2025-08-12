document.addEventListener('DOMContentLoaded', () => {
  console.log('JS loaded – hunting elements...');
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
  } else console.log('Cart elements locked in.');

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      console.log('Add to cart clicked.');
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
  const parallax = document.getElementById('background-parallax');
  if (parallax) window.addEventListener('scroll', () => parallax.style.transform = `translateY(${window.scrollY * 0.5}px)`);

  // Product Click for Detail
  document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-to-cart') || e.target.classList.contains('ar-btn')) return;
      console.log('Product clicked for detail.');
      const detailModal = document.getElementById('product-detail-modal');
      const detailName = document.getElementById('detail-name');
      const detailDesc = document.getElementById('detail-desc');
      const closeDetail = document.getElementById('close-detail');
      if (detailModal && detailName && detailDesc) {
        detailName.textContent = product.dataset.name;
        detailDesc.textContent = product.dataset.desc;
        detailModal.classList.remove('hidden');
        if (closeDetail) closeDetail.addEventListener('click', () => detailModal.classList.add('hidden'));
      } else console.error('Detail modal elements missing.');
    });
  });

  // AR Preview
  document.querySelectorAll('.ar-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      console.log('AR button clicked – activating...');
      const product = btn.parentElement;
      const preview = product.querySelector('.ar-preview');
      if (!preview) return console.error('AR preview div missing.');
      product.classList.add('ar-active');
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, preview.clientWidth / preview.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(preview.clientWidth, preview.clientHeight);
      preview.appendChild(renderer.domElement);
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(5, 5, 5);
      scene.add(light);
      camera.position.z = 5;
      function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      }
      animate();
      console.log('AR activated – check for spinning cube.');
    });
  });

  // AI Chat
  const aiBtn = document.getElementById('ai-chat-btn');
  const aiModal = document.getElementById('ai-modal');
  const aiInput = document.getElementById('ai-input');
  const aiResponse = document.getElementById('ai-response');
  const aiSubmit = document.getElementById('ai-submit');
  const closeAi = document.getElementById('close-ai');

  if (aiBtn && aiModal) {
    aiBtn.addEventListener('click', () => {
      console.log('AI button clicked – toggling modal.');
      aiModal.classList.toggle('hidden');
    });
  } else console.error('AI btn or modal missing.');
  if (closeAi) closeAi.addEventListener('click', () => aiModal.classList.add('hidden'));
  if (aiSubmit) aiSubmit.addEventListener('click', () => {
    console.log('AI query submitted.');
    if (!aiInput || !aiResponse) return console.error('AI input/response missing.');
    const query = aiInput.value.toLowerCase();
    let res = 'Querying the cosmos...';
    if (query.includes('cyber')) res = 'Dig the Cyberpunk Poster? AR spin it like a replicant!';
    else if (query.includes('tee')) res = 'StudioBooka Tee: Sustainable fabric, blockchain-tracked supply.';
    else if (query.includes('mug')) res = 'PM Mug: For advisors conquering the stars.';
    aiResponse.textContent = res;
  });
});
