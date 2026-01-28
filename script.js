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

// Track Google Forms iframe submission
(function() {
    const iframe = document.querySelector('iframe[src*="google.com/forms"]'); // Your Google Form iframe
    
    if (!iframe) return;
    
    let originalHeight = iframe.offsetHeight;
    let submitDetected = false;
    
    // Watch for iframe changes (submit success)
    const observer = new MutationObserver(() => {
        if (submitDetected) return;
        
        const newHeight = iframe.offsetHeight;
        const heightChange = Math.abs((newHeight - originalHeight) / originalHeight * 100);
        
        // Submit detected (height changes 30%+)
        if (heightChange > 30 || !iframe.contentWindow) {
            submitDetected = true;
            observer.disconnect();
            
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'google_forms_submit',
                'form_type': 'iframe_customer_feedback',
                'timestamp': new Date().toISOString()
            });
            
            console.log('✅ Google Forms submit tracked!');
        }
    });
    
    observer.observe(iframe, { attributes: true, childList: true, subtree: true });
    
    // Also detect iframe removal (redirect)
    const checkIframeGone = setInterval(() => {
        if (!document.body.contains(iframe) && !submitDetected) {
            clearInterval(checkIframeGone);
            window.dataLayer.push({
                'event': 'google_forms_submit',
                'form_type': 'iframe_customer_feedback',
                'detection_method': 'iframe_removed'
            });
        }
    }, 500);
    
})();



