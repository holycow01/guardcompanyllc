# Guard Security Company Website

A high-converting, modern website for Guard Security Company - professional security solutions provider.

## 🌐 Live Pages

- `index.html` - Main landing page
- `blog.html` - Blog listing page
- `blog-post-1.html` to `blog-post-6.html` - Individual blog articles

## ✨ Features

- **Modern, Professional Design** - Dark navy theme with gold/burgundy accents from company logo
- **High-Converting Layout** - Multiple CTAs, lead capture form, and floating call button
- **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations** - Subtle animations and hover effects
- **Auto-Scrolling Testimonials** - Infinite scrolling review reel
- **Blog Section** - Separate blog page with individual article pages
- **SEO Optimized** - Proper meta tags and semantic HTML structure
- **Fast Loading** - No heavy dependencies, optimized CSS and JS

## 📄 Page Sections (Main Site)

1. **Hero Section** - Eye-catching headline with logo and dual CTAs
2. **Trust Banner** - Credentials that build confidence
3. **Services** - All 6 services showcased with hover effects
4. **CTA Banner** - Mid-page conversion opportunity
5. **Testimonials** - Auto-scrolling review reel with Google integration ready
6. **About Section** - Company story and values
7. **Contact Section** - Form + contact info for lead generation
8. **Footer** - Quick links, contact details, and blog link

## 🚀 Quick Start

Simply open `index.html` in a web browser to view the site locally.

### For Local Development

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 📁 File Structure

```
guardcompanyllc/
├── index.html          # Main landing page
├── blog.html           # Blog listing page
├── blog-post-1.html    # Blog: Business Security Measures
├── blog-post-2.html    # Blog: Holiday Home Security
├── blog-post-3.html    # Blog: Event Security Guide
├── blog-post-4.html    # Blog: Retail Security
├── blog-post-5.html    # Blog: Construction Site Security
├── blog-post-6.html    # Blog: Hotel Security
├── styles.css          # All styles
├── script.js           # JavaScript functionality
├── GCS+2.png           # Company logo
└── README.md           # This file
```

## 🎨 Customization

### Colors (from Company Logo)
Edit CSS variables in `styles.css`:
```css
:root {
    /* Navy Blue backgrounds */
    --color-bg-primary: #0f1521;
    --color-bg-secondary: #151d2c;
    
    /* Gold accents */
    --color-accent-gold: #d4a84b;
    --color-accent-gold-light: #e8c878;
    
    /* Burgundy accents */
    --color-accent-burgundy: #8b3a3a;
    
    /* Olive green accents */
    --color-accent-olive: #4a5d3a;
}
```

### Contact Information
Update in `index.html`, `blog.html`, and blog post files:
- Phone: Search for `+15122901071`
- Email: Search for `gaurdcompanyllc@gmail.com`
- Hours: Search for `8 AM - 7 PM`

### Logo
Replace `GCS+1.png` with your logo file and update references in HTML files.

## 📝 Blog Management

### Adding a New Blog Post

1. **Copy an existing blog post file:**
   ```bash
   cp blog-post-1.html blog-post-7.html
   ```

2. **Edit the new file** (`blog-post-7.html`):
   - Update the `<title>` tag
   - Update the `<meta name="description">` tag
   - Change the category badge text
   - Update the `<h1>` title
   - Update the date and read time in `.blog-post-meta`
   - Replace all content in `.blog-post-content`

3. **Add a card to `blog.html`:**
   Copy this template and add it inside `.blog-grid`:
   ```html
   <article class="blog-card">
       <div class="blog-image">
           <div class="blog-image-placeholder">
               <svg viewBox="0 0 24 24" fill="none">
                   <!-- Add an appropriate icon SVG here -->
                   <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2"/>
               </svg>
           </div>
           <span class="blog-category">Category Name</span>
       </div>
       <div class="blog-content">
           <div class="blog-meta">
               <span class="blog-date">December 15, 2024</span>
               <span class="blog-read">5 min read</span>
           </div>
           <h3>Your Blog Post Title Here</h3>
           <p>A brief description or excerpt of your blog post content...</p>
           <a href="blog-post-7.html" class="blog-link">
               Read More
               <svg viewBox="0 0 24 24" fill="none">
                   <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
               </svg>
           </a>
       </div>
   </article>
   ```

### Updating an Existing Blog Post

1. Open the blog post file (e.g., `blog-post-1.html`)
2. Find the `.blog-post-content` section
3. Edit the content using these HTML elements:
   - `<h2>` for main headings
   - `<h3>` for subheadings
   - `<p>` for paragraphs
   - `<ul><li>` for bullet lists
   - `<strong>` for bold text
   - `<a href="...">` for links

### Adding Images to Blog Posts

Replace the placeholder icon with an actual image:
```html
<!-- Change this: -->
<div class="blog-image">
    <div class="blog-image-placeholder">
        <svg>...</svg>
    </div>
    <span class="blog-category">Category</span>
</div>

<!-- To this: -->
<div class="blog-image">
    <img src="your-image.jpg" alt="Description">
    <span class="blog-category">Category</span>
</div>
```

### Blog Categories Used
- Security Tips
- Residential
- Events
- Commercial
- Construction
- Hospitality

## 📧 Form Handling

The contact form currently simulates submission. To connect to a real backend:

### Option A - Email Service (Recommended)
- [Formspree](https://formspree.io) - Free tier available
- [Netlify Forms](https://www.netlify.com/products/forms/) - If hosting on Netlify
- [EmailJS](https://www.emailjs.com/) - Send emails from JavaScript

### Option B - Custom Backend
Replace the form handler in `script.js` with your API endpoint.

## 🔗 Google Reviews Integration

The testimonials section can connect with Google Business Profile:

1. **Get your Place ID** from [Google's Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)

2. **Get an API Key** from [Google Cloud Console](https://console.cloud.google.com/) (enable Places API)

3. **Update `script.js`:**
```javascript
const GOOGLE_REVIEWS_CONFIG = {
    placeId: 'YOUR_GOOGLE_PLACE_ID',
    apiKey: 'YOUR_GOOGLE_API_KEY',
    reviewUrl: 'https://g.page/r/YOUR_BUSINESS_ID/review',
    mapsUrl: 'https://maps.google.com/?cid=YOUR_CID'
};
```

## 📊 Analytics

Add Google Analytics by inserting before `</head>` in all HTML files:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🌍 Deployment

### Option 1: Netlify (Recommended)
1. Create account at [netlify.com](https://netlify.com)
2. Drag & drop the folder to deploy
3. Get free SSL certificate automatically

### Option 2: GitHub Pages
1. Push to GitHub repository
2. Go to Settings → Pages
3. Select main branch as source

### Option 3: Traditional Hosting
Upload all files to your web server via FTP.

## 🖥️ Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📱 Responsive Breakpoints

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

## 🏷️ Credits

Website crafted by [Novex Studio](https://novexstudio.com)

## 📄 License

© 2024 Guard Security Company. All rights reserved.
