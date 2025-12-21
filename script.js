let cartCount = 0;
const cartDisplay = document.getElementById('cart-count');

// Mobile menu toggle
document.querySelector('.menu-toggle').addEventListener('click', () => {
document.querySelector('.nav-links').classList.toggle('show');
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
button.addEventListener('click', () => {
cartCount++;
cartDisplay.textContent = cartCount;
button.textContent = 'Added!';
button.style.background = '#28a745';
setTimeout(() => {
button.textContent = 'Add to Cart';
button.style.background = '';
}, 2000);
});
});
