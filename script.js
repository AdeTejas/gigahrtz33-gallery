document.addEventListener('DOMContentLoaded', () => {
  console.log('JS loaded – checking elements...');
  const cart = [];
  // Previous cart logic...

  // Parallax
  const parallax = document.getElementById('background-parallax');
  if (parallax) {
    console.log('Parallax found.');
    window.addEventListener('scroll', () => parallax.style.transform = `translateY(${window.scrollY * 0.5}px)`);
  } else console.error('Parallax missing.');

  // Product Click for Detail
  document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-to-cart') || e.target.classList.contains('ar-btn')) return;
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
      console.log('AR clicked.');
      const product = btn.parentElement;
      const preview = product.querySelector('.ar-preview');
      const img = product.querySelector('.product-img');
      if (!preview) return console.error('AR preview div missing.');
      product.classList.add('ar-active'); // Swap visibility
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
    });
  });

  // AI Chat
  const aiBtn = document.getElementById('ai-chat-btn');
  if (aiBtn) {
    console.log('AI btn found.');
    aiBtn.addEventListener('click', () => {
      const aiModal = document.getElementById('ai-modal');
      if (aiModal) aiModal.classList.toggle('hidden');
      else console.error('AI modal missing.');
    });
  } else console.error('AI btn missing.');
  // Previous AI submit logic...
});
