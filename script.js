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

// ===== Email Validation =====
function validateEmail(email) {
    email = email.toLowerCase().trim();
    
    // Basic format check (stricter regex)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address.';
    }
    
    const [localPart, domain] = email.split('@');
    const domainParts = domain.split('.');
    const tld = domainParts[domainParts.length - 1];
    
    // Check minimum lengths
    if (localPart.length < 2) {
        return 'Email address seems too short.';
    }
    if (tld.length < 2) {
        return 'Please enter a valid email domain.';
    }
    
    // Block disposable/temporary email domains
    const disposableDomains = [
        'tempmail.com', 'throwaway.email', 'guerrillamail.com', 'mailinator.com',
        'temp-mail.org', '10minutemail.com', 'fakeinbox.com', 'trashmail.com',
        'yopmail.com', 'getnada.com', 'maildrop.cc', 'dispostable.com',
        'mailnesia.com', 'tempr.email', 'discard.email', 'tmpmail.org',
        'tmpmail.net', 'mohmal.com', 'tempail.com', 'emailondeck.com',
        'temp.email', 'spamgourmet.com', 'mintemail.com', 'tempinbox.com',
        'sharklasers.com', 'spam4.me', 'grr.la', 'guerrillamailblock.com',
        'pokemail.net', 'emlpro.com', 'crazymailing.com', 'mailcatch.com'
    ];
    if (disposableDomains.includes(domain)) {
        return 'Please use a permanent email address, not a temporary one.';
    }
    
    // Common typo corrections for popular domains
    const typoMap = {
        'gmial.com': 'gmail.com', 'gmal.com': 'gmail.com', 'gamil.com': 'gmail.com',
        'gnail.com': 'gmail.com', 'gmail.co': 'gmail.com', 'gmaill.com': 'gmail.com',
        'hotmal.com': 'hotmail.com', 'hotmai.com': 'hotmail.com', 'hotmial.com': 'hotmail.com',
        'homail.com': 'hotmail.com', 'hotmail.co': 'hotmail.com',
        'yahooo.com': 'yahoo.com', 'yaho.com': 'yahoo.com', 'tahoo.com': 'yahoo.com',
        'uahoo.com': 'yahoo.com', 'yahoo.co': 'yahoo.com',
        'outloo.com': 'outlook.com', 'outlok.com': 'outlook.com', 'outlookk.com': 'outlook.com',
        'iclod.com': 'icloud.com', 'icoud.com': 'icloud.com', 'icloud.co': 'icloud.com'
    };
    if (typoMap[domain]) {
        return `Did you mean ${localPart}@${typoMap[domain]}?`;
    }
    
    // Block obviously fake TLDs
    const fakeTLDs = ['fake', 'test', 'invalid', 'example', 'asdf', 'qwerty', 'abc', 'xyz123'];
    if (fakeTLDs.includes(tld) || /^\d+$/.test(tld)) {
        return 'Please enter a real email address.';
    }
    
    // Block repeated characters (like aaa@aaa.aaa)
    if (/^(.)\1+$/.test(localPart) || /^(.)\1+$/.test(domainParts[0])) {
        return 'Please enter a valid email address.';
    }
    
    return null; // Email is valid
}

// ===== Area Code Validation =====
function validateAreaCode(areaCode) {
    // Valid North American area codes (US & Canada)
    // This list includes all active NANP area codes
    const validAreaCodes = [
        // US Area Codes
        '201','202','203','205','206','207','208','209','210','212','213','214','215','216','217','218','219',
        '220','223','224','225','228','229','231','234','239','240','248','251','252','253','254','256','260',
        '262','267','269','270','272','274','276','281','283','301','302','303','304','305','307','308','309',
        '310','312','313','314','315','316','317','318','319','320','321','323','325','326','327','330','331',
        '332','334','336','337','339','340','341','346','347','351','352','360','361','364','369','380','385',
        '386','401','402','404','405','406','407','408','409','410','412','413','414','415','417','419','423',
        '424','425','430','432','434','435','440','442','443','445','447','458','463','469','470','475','478',
        '479','480','484','501','502','503','504','505','507','508','509','510','512','513','515','516','517',
        '518','520','530','531','534','539','540','541','551','559','561','562','563','564','567','570','571',
        '573','574','575','580','585','586','601','602','603','605','606','607','608','609','610','612','614',
        '615','616','617','618','619','620','623','626','628','629','630','631','636','641','646','650','651',
        '657','659','660','661','662','667','669','678','680','681','682','689','701','702','703','704','706',
        '707','708','712','713','714','715','716','717','718','719','720','724','725','726','727','731','732',
        '734','737','740','743','747','754','757','760','762','763','764','765','769','770','772','773','774',
        '775','779','781','785','786','801','802','803','804','805','806','808','810','812','813','814','815',
        '816','817','818','820','828','830','831','832','835','838','839','840','843','845','847','848','850',
        '854','856','857','858','859','860','862','863','864','865','870','872','878','901','903','904','906',
        '907','908','909','910','912','913','914','915','916','917','918','919','920','925','928','929','930',
        '931','934','936','937','938','940','941','943','945','947','949','951','952','954','956','959','970',
        '971','972','973','975','978','979','980','984','985','986','989',
        // Canada Area Codes
        '204','226','236','249','250','289','306','343','365','403','416','418','431','437','438','450','506',
        '514','519','548','579','581','587','604','613','639','647','672','705','709','778','780','782','807',
        '819','825','867','873','902','905',
        // US Territories
        '340','670','671','684','787','939','868'
    ];
    
    // Check if area code starts with 0 or 1 (invalid in NANP)
    if (areaCode.startsWith('0') || areaCode.startsWith('1')) {
        return 'Area code cannot start with 0 or 1. Please check your number.';
    }
    
    // Check if area code is valid
    if (!validAreaCodes.includes(areaCode)) {
        return `Area code (${areaCode}) is not valid. Please check your phone number.`;
    }
    
    return null; // Area code is valid
}

// ===== Inline Field Error Functions =====
function showFieldError(fieldName, message) {
    const input = document.getElementById(fieldName);
    const errorSpan = document.getElementById(`${fieldName}-error`);
    
    if (input) {
        input.classList.add('error');
    }
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.classList.add('visible');
    }
}

function clearFieldErrors() {
    // Clear all error states
    const errorInputs = document.querySelectorAll('.form-group input.error, .form-group select.error, .form-group textarea.error');
    errorInputs.forEach(input => input.classList.remove('error'));
    
    // Clear all error messages
    const errorSpans = document.querySelectorAll('.field-error');
    errorSpans.forEach(span => {
        span.textContent = '';
        span.classList.remove('visible');
    });
}

// Clear error on input focus
document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea').forEach(field => {
    field.addEventListener('focus', function() {
        this.classList.remove('error');
        const errorSpan = document.getElementById(`${this.id}-error`);
        if (errorSpan) {
            errorSpan.textContent = '';
            errorSpan.classList.remove('visible');
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
    
    // Clear previous errors
    clearFieldErrors();
    
    // Collect all validation errors
    let hasErrors = false;
    
    // Name validation
    const nameClean = data.name ? data.name.trim() : '';
    if (!nameClean) {
        showFieldError('name', 'Full name is required.');
        hasErrors = true;
    } else if (nameClean.length < 3) {
        showFieldError('name', 'Name must be at least 3 characters.');
        hasErrors = true;
    } else if (/\d/.test(nameClean)) {
        showFieldError('name', 'Name should not contain numbers.');
        hasErrors = true;
    }
    
    // Email validation
    if (!data.email) {
        showFieldError('email', 'Email is required.');
        hasErrors = true;
    } else {
        const emailError = validateEmail(data.email);
        if (emailError) {
            showFieldError('email', emailError);
            hasErrors = true;
        }
    }
    
    // Phone validation
    const phoneDigits = data.phone ? data.phone.replace(/\D/g, '') : '';
    if (!phoneDigits) {
        showFieldError('phone', 'Phone number is required.');
        hasErrors = true;
    } else if (phoneDigits.length < 10) {
        showFieldError('phone', 'Enter a complete 10-digit number.');
        hasErrors = true;
    } else {
        const areaCodeError = validateAreaCode(phoneDigits.substring(0, 3));
        if (areaCodeError) {
            showFieldError('phone', areaCodeError);
            hasErrors = true;
        }
    }
    
    // Stop if there are errors
    if (hasErrors) {
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;
    
    // ====== FORMSPREE CONFIGURATION ======
    // Replace 'YOUR_FORMSPREE_ID' with your actual Formspree form ID
    // Get your ID at: https://formspree.io (create account → new form → copy ID)
    const FORMSPREE_ID = 'maqwgokp';
    const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;
    // =====================================
    
    // Send to Formspree
    fetch(FORMSPREE_URL, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Success
            showNotification('Thank you! We\'ll contact you within 24 hours.', 'success');
            this.reset();
            
            // Track conversion (for analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    'event_category': 'lead',
                    'event_label': 'contact_form'
                });
            }
        } else {
            response.json().then(data => {
                if (data.errors) {
                    showNotification(data.errors.map(e => e.message).join(', '), 'error');
                } else {
                    showNotification('Oops! There was a problem. Please try again.', 'error');
                }
            });
        }
    })
    .catch(error => {
        showNotification('Network error. Please check your connection.', 'error');
    })
    .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
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
        const input = e.target;
        const selectionStart = input.selectionStart;
        const previousValue = input.value;
        
        // Get only digits
        let digits = input.value.replace(/\D/g, '');
        
        // Limit to 10 digits
        if (digits.length > 10) {
            digits = digits.substring(0, 10);
        }
        
        // Format based on digit count
        let formatted = '';
        if (digits.length === 0) {
            formatted = '';
        } else if (digits.length < 3) {
            formatted = `(${digits}`;
        } else if (digits.length === 3) {
            formatted = `(${digits})`;
        } else if (digits.length <= 6) {
            formatted = `(${digits.substring(0, 3)}) ${digits.substring(3)}`;
        } else {
            formatted = `(${digits.substring(0, 3)}) ${digits.substring(3, 6)}-${digits.substring(6)}`;
        }
        
        // Only update if value changed (prevents cursor jump on backspace)
        if (formatted !== previousValue) {
            input.value = formatted;
            
            // Restore cursor position intelligently
            if (e.inputType === 'deleteContentBackward') {
                // On backspace, put cursor where it was minus formatting chars removed
                const digitsBeforeCursor = previousValue.substring(0, selectionStart).replace(/\D/g, '').length;
                let newPosition = 0;
                let digitCount = 0;
                for (let i = 0; i < formatted.length && digitCount < digitsBeforeCursor; i++) {
                    if (/\d/.test(formatted[i])) {
                        digitCount++;
                    }
                    newPosition = i + 1;
                }
                input.setSelectionRange(newPosition, newPosition);
            }
        }
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

