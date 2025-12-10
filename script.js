// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
const floatingCta = document.getElementById('floatingCta');
const contactForm = document.getElementById('contactForm');

// ===== Navbar Scroll Effect =====
let lastScroll = 0;

function handleNavScroll() {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class when past hero
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show floating CTA after scrolling past hero
    if (currentScroll > window.innerHeight * 0.5) {
        floatingCta.classList.add('visible');
    } else {
        floatingCta.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
}

window.addEventListener('scroll', handleNavScroll);

// ===== Mobile Menu Toggle =====
mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== Contact Form Handling =====
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Success
        showNotification('Thank you! We\'ll contact you within 24 hours.', 'success');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Track conversion (for analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submission', {
                'event_category': 'lead',
                'event_label': 'contact_form'
            });
        }
    }, 1500);
});

// ===== Notification System =====
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <svg viewBox="0 0 24 24" fill="none">
                ${type === 'success' 
                    ? '<path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M22 4L12 14.01l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
                    : '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
                }
            </svg>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <svg viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </button>
    `;
    
    // Add styles
    const styles = `
        .notification {
            position: fixed;
            top: 100px;
            right: 24px;
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 16px 20px;
            background: #1a2234;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
            animation: slideIn 0.3s ease;
        }
        
        .notification.success {
            border-color: rgba(34, 197, 94, 0.3);
        }
        
        .notification.error {
            border-color: rgba(239, 68, 68, 0.3);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification-content svg {
            width: 24px;
            height: 24px;
        }
        
        .notification.success svg {
            color: #22c55e;
        }
        
        .notification.error svg {
            color: #ef4444;
        }
        
        .notification span {
            font-size: 0.95rem;
            color: #fff;
        }
        
        .notification-close {
            background: none;
            border: none;
            padding: 4px;
            cursor: pointer;
            opacity: 0.5;
            transition: opacity 0.2s;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
        
        .notification-close svg {
            width: 18px;
            height: 18px;
            color: #fff;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animateElements = document.querySelectorAll(
        '.service-card, .about-card, .contact-method, .trust-item'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Add animation class styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(animationStyles);

// ===== Phone Number Formatting =====
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 10) {
            value = value.substring(0, 10);
            value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
        } else if (value.length >= 6) {
            value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
        } else if (value.length >= 3) {
            value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
        }
        e.target.value = value;
    });
}

// ===== Service Card Click Tracking =====
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const serviceName = this.querySelector('h3').textContent;
        // Track service interest (for analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'service_click', {
                'event_category': 'engagement',
                'event_label': serviceName
            });
        }
    });
});

// ===== CTA Click Tracking =====
document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta, .floating-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const btnText = this.textContent.trim();
        // Track CTA clicks (for analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cta_click', {
                'event_category': 'conversion',
                'event_label': btnText
            });
        }
    });
});

// ===== Preload Critical Resources =====
window.addEventListener('load', () => {
    // Add loaded class for additional animations
    document.body.classList.add('loaded');
});

// ===== Handle Reduced Motion Preference =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-medium', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

// ===== Google Reviews Integration =====
// Configuration - Replace with your actual values
const GOOGLE_REVIEWS_CONFIG = {
    // To get your Place ID:
    // 1. Go to https://developers.google.com/maps/documentation/places/web-service/place-id
    // 2. Search for your business
    // 3. Copy the Place ID
    placeId: 'YOUR_GOOGLE_PLACE_ID', // Replace with your actual Place ID
    
    // To get an API key:
    // 1. Go to https://console.cloud.google.com/
    // 2. Create a project and enable Places API
    // 3. Create an API key with Places API access
    apiKey: 'YOUR_GOOGLE_API_KEY', // Replace with your actual API key
    
    // Your Google Business Profile URL for "Leave a Review" button
    reviewUrl: 'https://g.page/r/YOUR_BUSINESS_ID/review', // Replace with your review URL
    
    // Your Google Maps listing URL
    mapsUrl: 'https://maps.google.com/?cid=YOUR_CID' // Replace with your Maps URL
};

// Initialize Google Reviews
function initGoogleReviews() {
    // Update review links
    const googleLink = document.getElementById('googleLink');
    const leaveReviewBtn = document.getElementById('leaveReviewBtn');
    
    if (googleLink && GOOGLE_REVIEWS_CONFIG.mapsUrl !== 'https://maps.google.com/?cid=YOUR_CID') {
        googleLink.href = GOOGLE_REVIEWS_CONFIG.mapsUrl;
    }
    
    if (leaveReviewBtn && GOOGLE_REVIEWS_CONFIG.reviewUrl !== 'https://g.page/r/YOUR_BUSINESS_ID/review') {
        leaveReviewBtn.href = GOOGLE_REVIEWS_CONFIG.reviewUrl;
    }
    
    // Only fetch from API if configured
    if (GOOGLE_REVIEWS_CONFIG.apiKey !== 'YOUR_GOOGLE_API_KEY' && 
        GOOGLE_REVIEWS_CONFIG.placeId !== 'YOUR_GOOGLE_PLACE_ID') {
        fetchGoogleReviews();
    }
}

// Fetch reviews from Google Places API
async function fetchGoogleReviews() {
    try {
        // Note: Direct API calls from browser require CORS handling
        // For production, you should use a server-side proxy
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_REVIEWS_CONFIG.placeId}&fields=name,rating,reviews,user_ratings_total&key=${GOOGLE_REVIEWS_CONFIG.apiKey}`;
        
        // For client-side, you'll need to use the Places Library from Google Maps JavaScript API
        // This is a simplified example - in production use the official library
        
        // If using a proxy server:
        // const response = await fetch(`/api/google-reviews?placeId=${GOOGLE_REVIEWS_CONFIG.placeId}`);
        // const data = await response.json();
        // updateReviewsDisplay(data.result);
        
        console.log('Google Reviews: Configure your API key and Place ID to fetch live reviews');
        
    } catch (error) {
        console.error('Error fetching Google reviews:', error);
    }
}

// Update the reviews display with API data
function updateReviewsDisplay(placeData) {
    if (!placeData) return;
    
    // Update rating score
    const avgRating = document.getElementById('avgRating');
    const totalReviews = document.getElementById('totalReviews');
    const avgStars = document.getElementById('avgStars');
    
    if (avgRating && placeData.rating) {
        avgRating.textContent = placeData.rating.toFixed(1);
    }
    
    if (totalReviews && placeData.user_ratings_total) {
        totalReviews.innerHTML = `<strong>${placeData.user_ratings_total}</strong> Reviews`;
    }
    
    // Update star display based on rating
    if (avgStars && placeData.rating) {
        updateStarDisplay(avgStars, placeData.rating);
    }
    
    // Update testimonial cards with real reviews
    if (placeData.reviews && placeData.reviews.length > 0) {
        renderGoogleReviews(placeData.reviews);
    }
}

// Render Google reviews into the testimonials grid
function renderGoogleReviews(reviews) {
    const grid = document.getElementById('testimonialsGrid');
    if (!grid || !reviews.length) return;
    
    // Clear existing testimonials
    grid.innerHTML = '';
    
    // Sort by rating (highest first) and take top reviews
    const sortedReviews = reviews
        .filter(review => review.rating >= 4) // Only show 4+ star reviews
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6);
    
    sortedReviews.forEach((review, index) => {
        const card = createReviewCard(review, index === 0);
        grid.appendChild(card);
    });
}

// Create a review card element
function createReviewCard(review, isFeatured = false) {
    const card = document.createElement('div');
    card.className = `testimonial-card${isFeatured ? ' featured-testimonial' : ''}`;
    
    // Generate stars HTML
    const starsHtml = generateStarsHtml(review.rating);
    
    // Get profile photo or generate avatar
    const photoUrl = review.profile_photo_url || 
        `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author_name)}&background=c9a227&color=0a0f1c&size=80&font-size=0.4`;
    
    // Truncate long reviews
    const maxLength = 300;
    let reviewText = review.text || '';
    if (reviewText.length > maxLength) {
        reviewText = reviewText.substring(0, maxLength).trim() + '...';
    }
    
    // Format the relative time
    const timeAgo = review.relative_time_description || 'Recently';
    
    card.innerHTML = `
        <div class="testimonial-header">
            <div class="testimonial-avatar">
                <img src="${photoUrl}" alt="${review.author_name}" loading="lazy">
            </div>
            <div class="testimonial-author">
                <h4>${review.author_name}</h4>
                <span>${timeAgo}</span>
            </div>
            <div class="testimonial-rating">
                ${starsHtml}
            </div>
        </div>
        <p class="testimonial-text">${reviewText}</p>
        <div class="testimonial-footer">
            <svg class="google-icon" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Posted on Google</span>
        </div>
    `;
    
    return card;
}

// Generate star SVGs based on rating
function generateStarsHtml(rating) {
    let html = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            // Full star
            html += '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
        } else if (i === fullStars && hasHalfStar) {
            // Half star
            html += '<svg viewBox="0 0 24 24" fill="currentColor" style="opacity: 0.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
        } else {
            // Empty star
            html += '<svg viewBox="0 0 24 24" fill="currentColor" style="opacity: 0.2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
        }
    }
    
    return html;
}

// Update star display element
function updateStarDisplay(container, rating) {
    container.innerHTML = generateStarsHtml(rating);
}

// Initialize reviews on page load
document.addEventListener('DOMContentLoaded', initGoogleReviews);

// ===== Testimonials Infinite Scroll =====
function initTestimonialsReel() {
    const track = document.querySelector('.testimonials-track');
    if (!track) return;
    
    // Clone all cards to create seamless infinite scroll
    const cards = track.querySelectorAll('.testimonial-card');
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
}

// Initialize testimonials reel on page load
document.addEventListener('DOMContentLoaded', initTestimonialsReel);

// ===== Console Message =====
console.log('%c🛡️ Guard Security Company', 'font-size: 24px; font-weight: bold; color: #c9a227;');
console.log('%cYour Safety is Our Priority', 'font-size: 14px; color: #94a3b8;');

