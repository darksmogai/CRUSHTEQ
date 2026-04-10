// ============================================
// PRODUCT DATA
// ============================================
const products = [
    {
        id: 1,
        name: "Jaw Crusher Plate",
        image: "https://via.placeholder.com/280x280?text=Jaw+Crusher+Plate",
        description: "High-quality jaw crusher plates designed for durability and high performance in heavy crushing applications."
    },
    {
        id: 2,
        name: "Cone Crusher Mantle",
        image: "https://via.placeholder.com/280x280?text=Cone+Crusher+Mantle",
        description: "Precision-engineered cone crusher mantles for optimal crushing efficiency and extended service life."
    },
    {
        id: 3,
        name: "Impact Crusher Blow Bar",
        image: "https://via.placeholder.com/280x280?text=Impact+Crusher+Blow+Bar",
        description: "Tough impact crusher blow bars engineered for extended service life in impact crushing applications."
    },
    {
        id: 4,
        name: "Crusher Toggle Plate",
        image: "https://via.placeholder.com/280x280?text=Crusher+Toggle+Plate",
        description: "Durable toggle plates for jaw crushers, designed to handle extreme crushing forces reliably."
    },
    {
        id: 5,
        name: "VSI Rotor Parts",
        image: "https://via.placeholder.com/280x280?text=VSI+Rotor+Parts",
        description: "High-performance VSI rotor parts for vertical shaft impact crushers with precision manufacturing."
    },
    {
        id: 6,
        name: "Conveyor Belt Rollers",
        image: "https://via.placeholder.com/280x280?text=Conveyor+Rollers",
        description: "Industrial-grade conveyor rollers for seamless material transport and efficient operation."
    },
    {
        id: 7,
        name: "Industrial Bearings",
        image: "https://via.placeholder.com/280x280?text=Industrial+Bearings",
        description: "Premium quality industrial bearings suitable for crusher machines and heavy equipment."
    },
    {
        id: 8,
        name: "Crusher Liners",
        image: "https://via.placeholder.com/280x280?text=Crusher+Liners",
        description: "Wear-resistant crusher liners for jaw and cone crushers, maximizing equipment longevity."
    },
    {
        id: 9,
        name: "Screen Mesh",
        image: "https://via.placeholder.com/280x280?text=Screen+Mesh",
        description: "Durable screen mesh for vibrating screens with excellent wear resistance and sieve accuracy."
    },
    {
        id: 10,
        name: "Gear Box Assembly",
        image: "https://via.placeholder.com/280x280?text=Gear+Box+Assembly",
        description: "Complete gear box assemblies for crusher machines with precision engineering and quality assurance."
    }
];

// ============================================
// MOBILE MENU TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// RENDER PRODUCTS
// ============================================
function inferCategory(name) {
    const n = (name || '').toLowerCase();
    if (n.includes('jaw')) return 'Jaw Crusher';
    if (n.includes('cone')) return 'Cone Crusher';
    if (n.includes('impact')) return 'Impact Crusher';
    if (n.includes('vsi')) return 'VSI';
    if (n.includes('conveyor')) return 'Conveyor';
    if (n.includes('bearing')) return 'Bearings';
    if (n.includes('screen')) return 'Screen Parts';
    if (n.includes('gear')) return 'Gearbox / Gears';
    if (n.includes('liner')) return 'Liners';
    return 'Crusher Spares';
}

function getProductsForPage() {
    return products.map(p => ({ ...p, category: p.category || inferCategory(p.name) }));
}

function escapeHtml(str) {
    return String(str)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function renderProducts(list) {
    const productsContainer = document.getElementById('productsContainer');
    if (!productsContainer) return;

    const countEl = document.getElementById('productCount');
    const emptyEl = document.getElementById('productsEmpty');

    productsContainer.innerHTML = '';

    if (!list || list.length === 0) {
        if (countEl) countEl.textContent = '0';
        if (emptyEl) emptyEl.hidden = false;
        return;
    }

    if (emptyEl) emptyEl.hidden = true;
    if (countEl) countEl.textContent = String(list.length);

    list.forEach(product => {
        const category = product.category || inferCategory(product.name);
        const waText = `Hello CRUSHTEQ INTERNATIONAL, I need a quote for: ${product.name}`;
        const waLink = `https://wa.me/919599653962?text=${encodeURIComponent(waText)}`;
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <span class="product-pill">${escapeHtml(category)}</span>
            <div class="product-image">
                <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy">
            </div>
            <div class="product-info">
                <h3>${escapeHtml(product.name)}</h3>
                <p>${escapeHtml(product.description)}</p>
                <div class="product-actions">
                    <a href="contact.html" class="btn btn-primary">Get Quote</a>
                    <a href="${waLink}" class="btn btn-whatsapp" target="_blank" rel="noopener">
                        <span class="wa-icon" aria-hidden="true">WhatsApp</span>
                    </a>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

function initProductsPageControls() {
    const searchEl = document.getElementById('productSearch');
    const categoryEl = document.getElementById('productCategory');
    const sortEl = document.getElementById('productSort');
    const clearBtn = document.getElementById('clearFilters');

    // If controls don't exist, we're not on the products page UI.
    if (!searchEl || !categoryEl || !sortEl || !clearBtn) {
        renderProducts(getProductsForPage());
        return;
    }

    const all = getProductsForPage();
    const categories = Array.from(new Set(all.map(p => p.category))).sort((a, b) => a.localeCompare(b));
    categoryEl.innerHTML = `<option value="all">All categories</option>` + categories.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');

    function apply() {
        const q = (searchEl.value || '').trim().toLowerCase();
        const cat = categoryEl.value || 'all';
        const sort = sortEl.value || 'popular';

        let filtered = all.filter(p => {
            const hay = `${p.name} ${p.description} ${p.category}`.toLowerCase();
            const matchQ = !q || hay.includes(q);
            const matchCat = cat === 'all' || p.category === cat;
            return matchQ && matchCat;
        });

        if (sort === 'name-asc') filtered = filtered.slice().sort((a, b) => a.name.localeCompare(b.name));
        if (sort === 'name-desc') filtered = filtered.slice().sort((a, b) => b.name.localeCompare(a.name));

        renderProducts(filtered);
    }

    searchEl.addEventListener('input', apply);
    categoryEl.addEventListener('change', apply);
    sortEl.addEventListener('change', apply);
    clearBtn.addEventListener('click', () => {
        searchEl.value = '';
        categoryEl.value = 'all';
        sortEl.value = 'popular';
        apply();
    });

    apply();
}

// Call renderProducts when page loads
document.addEventListener('DOMContentLoaded', initProductsPageControls);

// ============================================
// FORM VALIDATION & SUBMISSION
// ============================================
const enquiryForm = document.getElementById('enquiryForm');

if (enquiryForm) {
    enquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (!name || !phone || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Phone validation (basic)
        const phoneRegex = /^[0-9\-\+\s]{10,}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number.');
            return;
        }

        // Success message
        alert(`Thank you, ${name}! Your enquiry has been submitted. We will contact you soon at ${phone}.`);

        // Reset form
        enquiryForm.reset();

        // Log form data (for demonstration)
        console.log('Enquiry submitted:', {
            name,
            phone,
            email,
            message,
            timestamp: new Date().toLocaleString()
        });
    });
}

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or the link is for mobile menu toggle
        if (href === '#' || this.id === 'mobileToggle') return;

        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// ACTIVE NAVIGATION HIGHLIGHT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href === '#home' && currentPage === 'index.html') {
            link.style.color = 'var(--accent-orange)';
        } else if (href === currentPage) {
            link.style.color = 'var(--accent-orange)';
        }
    });
});

// ============================================
// HOME BANNER SLIDER
// ============================================
function initBannerSlider() {
    const slider = document.getElementById('bannerSlider');
    if (!slider) return;

    const track = slider.querySelector('.banner-track');
    const slides = Array.from(slider.querySelectorAll('.banner-slide'));
    const dotsWrap = slider.querySelector('[data-banner-dots]');
    const prevBtn = slider.querySelector('[data-banner-prev]');
    const nextBtn = slider.querySelector('[data-banner-next]');

    if (!track || slides.length === 0 || !dotsWrap) return;

    let index = 0;
    let timer = null;
    const delayMs = 4500;

    dotsWrap.innerHTML = slides.map((_, i) => `<button class="banner-dot${i === 0 ? ' active' : ''}" type="button" aria-label="Go to slide ${i + 1}" data-dot="${i}"></button>`).join('');
    const dots = Array.from(dotsWrap.querySelectorAll('.banner-dot'));

    function goTo(i) {
        index = (i + slides.length) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((d, di) => d.classList.toggle('active', di === index));
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function start() {
        stop();
        timer = window.setInterval(next, delayMs);
    }

    function stop() {
        if (timer) window.clearInterval(timer);
        timer = null;
    }

    dotsWrap.addEventListener('click', (e) => {
        const btn = e.target.closest('.banner-dot');
        if (!btn) return;
        const i = Number(btn.getAttribute('data-dot'));
        if (!Number.isFinite(i)) return;
        goTo(i);
        start();
    });

    if (nextBtn) nextBtn.addEventListener('click', () => { next(); start(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); start(); });

    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

    goTo(0);
    start();
}

document.addEventListener('DOMContentLoaded', initBannerSlider);

// ============================================
// PRODUCT CARD ANIMATION
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ============================================
// UTILITY: GET QUERY PARAMETERS
// ============================================
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Log page load
    console.log('CRUSHTEQ INTERNATIONAL - Page loaded successfully');
    
    // Add any additional initialization here
});
