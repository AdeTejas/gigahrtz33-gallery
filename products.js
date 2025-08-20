// products.js
// Simple product data + renderer. Add images into /images and a new product object here to show it.
//
// Image fallback: if an image fails to load, we switch to images/placeholder.png.

const products = [
  { id: 1, name: "Cyberpunk Poster", price: 20.00, img: "images/cyberpunk-poster.jpg", rating: "★★★★☆ (42 reviews)" },
  { id: 2, name: "StudioBooka Tee", price: 15.00, img: "images/studiobooka-tee.jpg", rating: "★★★★★ (35 reviews)" },
  { id: 3, name: "PM Advisors Mug", price: 10.00, img: "images/pm-advisors-mug.jpg", rating: "★★★★☆ (28 reviews)" },
  { id: 4, name: "Neon Hoodie", price: 45.00, img: "images/neon-hoodie.jpg", rating: "★★★★★ (50 reviews)" },
  { id: 5, name: "Futuristic Glasses", price: 80.00, img: "images/futuristic-glasses.jpg", rating: "★★★★☆ (62 reviews)" },
  { id: 6, name: "Sustainable Tote", price: 25.00, img: "images/sustainable-tote.jpg", rating: "★★★★★ (45 reviews)" },
  { id: 7, name: "Dystopian Cap", price: 18.00, img: "images/dystopian-cap.jpg", rating: "★★★★☆ (30 reviews)" },
  { id: 8, name: "Neon Wallet", price: 30.00, img: "images/neon-wallet.jpg", rating: "★★★★★ (55 reviews)" },
  { id: 9, name: "Eco Laptop Sleeve", price: 35.00, img: "images/eco-laptop-sleeve.jpg", rating: "★★★★☆ (40 reviews)" }
];

function renderProducts() {
  const container = document.getElementById('products-grid');
  container.innerHTML = '';
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product cursor-pointer bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition duration-300 border border-silver';
    div.dataset.id = p.id;
    div.innerHTML = `
      <img class="product-img w-full h-64 object-cover rounded-t-lg" src="${p.img}" alt="${escapeHtml(p.name)}"
           onerror="this.onerror=null;this.src='images/placeholder.png';console.warn('Image failed, using placeholder: ${p.img}')">
      <h2 class="text-xl font-bold mt-2">${escapeHtml(p.name)}</h2>
      <p class="text-gold">$${p.price.toFixed(2)} <span class="text-emerald ml-2">Carbon Neutral</span></p>
      <div class="reviews text-yellow-300 text-sm">${escapeHtml(p.rating)}</div>
      <button class="add-to-cart bg-gold text-midnight px-4 py-2 rounded mt-2 w-full hover:bg-yellow-400 shadow-glow">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

// simple helper to avoid XSS if product data ever comes from user input
function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, function (m) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m];
  });
}

// run on load
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
});
