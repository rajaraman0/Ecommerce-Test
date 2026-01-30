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
let currentFormUrl = '';
setInterval(() => {
    const iframe = document.querySelector('iframe[src*="google.com/forms"]');
    if (iframe && iframe.src !== currentFormUrl) {
        currentFormUrl = iframe.src;
        
        // Thank-you page = success! (contains /viewform → /submitted)
        if (iframe.src.includes('submitted') || iframe.src.includes('formResponse')) {
            window.dataLayer.push({
                'event': 'google_forms_submit',
                'form_type': 'iframe_success'
            });
        }
    }
}, 1000);
// Detect thank-you page height increase
const iframe = document.querySelector('iframe[src*="google.com/forms"]');
let initialHeight = iframe ? iframe.offsetHeight : 0;

setInterval(() => {
    if (iframe && iframe.offsetHeight > initialHeight * 1.3) { // 30% taller
        window.dataLayer.push({'event': 'google_forms_submit'});
    }
}, 500);
window.addEventListener('message', (event) => {
    if (event.origin.includes('google.com') && 
        (event.data === 'submit' || event.data.formSubmitted)) {
        window.dataLayer.push({'event': 'google_forms_submit'});
    }
});





