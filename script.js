// Existing cart logic...

// Parallax
window.addEventListener('scroll', () => {
  const parallax = document.getElementById('background-parallax');
  parallax.style.transform = `translateY(${window.scrollY * 0.5}px)`;
});

// AR Preview (Three.js)
document.querySelectorAll('.ar-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const preview = btn.parentElement.querySelector('.ar-preview');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, preview.clientWidth / preview.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(preview.clientWidth, preview.clientHeight);
    preview.appendChild(renderer.domElement);
    // Load GLB model (use THREE.GLTFLoader via CDN if needed)
    // Mock: Add a spinning cube for demo
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

// AI Chat (Mock Grok)
const aiBtn = document.getElementById('ai-chat-btn');
const aiModal = document.getElementById('ai-modal');
const aiInput = document.getElementById('ai-input');
const aiResponse = document.getElementById('ai-response');
const aiSubmit = document.getElementById('ai-submit');
const closeAi = document.getElementById('close-ai');

aiBtn.addEventListener('click', () => aiModal.classList.toggle('hidden'));
closeAi.addEventListener('click', () => aiModal.classList.add('hidden'));
aiSubmit.addEventListener('click', () => {
  const query = aiInput.value.toLowerCase();
  let res = 'Querying the cosmos...';
  if (query.includes('cyber')) res = 'Dig the Cyberpunk Poster? AR spin it like a replicant!';
  else if (query.includes('tee')) res = 'StudioBooka Tee: Sustainable fabric, blockchain-tracked supply.';
  // Add more logic for personalization
  aiResponse.textContent = res;
});

// Blockchain Mock on Complete Purchase
completePurchase.addEventListener('click', () => {
  alert('Purchase beamed via Mock Ethereum! Tx: 0xade... – Transparent like xAI\'s ledger.');
  // Clear cart...
});
