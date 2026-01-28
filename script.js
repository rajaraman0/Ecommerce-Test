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
// Enhanced form submission with dataLayer push
document.getElementById('feedback-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Capture form values
    const formData = {
        name: document.getElementById('name').value,
        rating: document.getElementById('rating').value,
        comments: document.getElementById('comments').value,
        formType: 'customer_feedback',
        timestamp: new Date().toISOString()
    };
    
    // Push to dataLayer (GTM ready)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'feedback_submit',
        'feedback_name': formData.name,
        'feedback_rating': formData.rating,
        'feedback_comments': formData.comments,
        'form_type': formData.formType
    });
    
    // User feedback
    const message = document.getElementById('form-message');
    message.textContent = 'Thank you! Feedback submitted.';
    message.style.color = 'green';
    message.style.display = 'block';
    this.reset();
    setTimeout(() => { message.style.display = 'none'; }, 5000);
});



