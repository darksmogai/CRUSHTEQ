// ============================================
// PRODUCT DATA
// ============================================
const products = [
    {
        id: 1,
        name: "Bolt",
        image: "/img/Bolt.jpeg",
        images: [
            "/img/Bolt.jpeg"
        ],
        description: "High-strength industrial bolts for heavy-duty applications."
    },
    {
        id: 2,
        name: "T-Bolt",
        image: "/img/T bolt.jpeg",
        images: [
            "/img/T bolt.jpeg"
        ],
        description: "Precision-engineered T-bolts used in clamping and machine assemblies."
    },
    {
        id: 3,
        name: "Breather",
        image: "/img/Breather.jpeg",
        images: [
            "/img/Breather.jpeg"
        ],
        description: "Durable breather components for industrial machinery ventilation."
    },
    {
        id: 4,
        name: "Mountain Pad",
        image: "/img/Mountain pad.jpeg",
        images: [
            "/img/Mountain pad.jpeg",
            "/img/Mountain pad1.jpeg",
            "/img/Mountain pad2.jpeg"
        ],
        description: "Strong and reliable mounting pads for vibration control."
    },
    {
        id: 5,
        name: "Oil Filter",
        image: "/img/Oil filter.jpeg",
        images: [
            "/img/Oil filter.jpeg",
            "/img/Oil filter1.jpeg"
        ],
        description: "High-efficiency oil filters for industrial equipment."
    },
    {
        id: 6,
        name: "Pump",
        image: "/img/pump.jpeg",
        images: [
            "/img/pump.jpeg",
            "/img/pump1.jpeg"
        ],
        description: "Industrial-grade pumps for heavy machinery operations."
    },
    {
        id: 7,
        name: "Crusher Filter Replacement",
        image: "/img/Replacement for crusher filter.jpeg",
        images: [
            "/img/Replacement for crusher filter.jpeg",
            "/img/Replacement for crusher filter1.jpeg",
            "/img/Replacement for crusher filter2.jpeg",
            "/img/Replacement for crusher filter3.jpeg",
            "/img/Replacement for crusher filter4.jpeg",
            "/img/Replacement for crusher filter5.jpeg"
        ],
        description: "Premium replacement filters for crusher machines."
    },
    {
        id: 8,
        name: "Rubber Pad",
        image: "/img/Rubber pad.jpeg",
        images: [
            "/img/Rubber pad.jpeg",
            "/img/Rubber pad1.jpeg"
        ],
        description: "Durable rubber pads for industrial support and cushioning."
    },
    {
        id: 9,
        name: "Rubber Support",
        image: "/img/Rubber support.jpeg",
        images: [
            "/img/Rubber support.jpeg",
            "/img/Rubber support1.jpeg",
            "/img/Rubber support3.jpeg"
        ],
        description: "Heavy-duty rubber supports for machinery stability."
    }
];

/** Home page: legacy grouped cards (same products as catalog) */
const HOME_PRODUCT_GROUPS = [
    { title: "Fasteners & Mounts", ids: [1, 2, 4] },
    { title: "Filters & Breathers", ids: [3, 5, 7] },
    { title: "Pumps & Rubber Parts", ids: [6, 8, 9] }
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
// STICKY HEADER OFFSET (header-bar + navbar)
// ============================================
function updateHeaderBarOffset() {
    const headerBar = document.querySelector('.header-bar');
    const h = headerBar ? headerBar.getBoundingClientRect().height : 0;
    document.documentElement.style.setProperty('--header-bar-offset', `${Math.round(h)}px`);
}

document.addEventListener('DOMContentLoaded', updateHeaderBarOffset);
window.addEventListener('resize', updateHeaderBarOffset);

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

function getProductImages(product) {
    const imgs = Array.isArray(product?.images) ? product.images.filter(Boolean) : [];
    if (imgs.length > 0) return imgs;
    if (product?.image) return [product.image];
    return [];
}

function ensureMediaModal() {
    if (document.getElementById('mediaModal')) return;
    const modal = document.createElement('div');
    modal.id = 'mediaModal';
    modal.className = 'media-modal';
    modal.hidden = true;
    modal.innerHTML = `
        <div class="media-modal__backdrop" data-media-close></div>
        <div class="media-modal__dialog" role="dialog" aria-modal="true" aria-label="Product image viewer">
            <button class="media-modal__close" type="button" aria-label="Close" data-media-close>✕</button>
            <button class="media-modal__nav prev" type="button" aria-label="Previous image" data-media-prev>‹</button>
            <div class="media-modal__stage">
                <img class="media-modal__img" alt="">
            </div>
            <button class="media-modal__nav next" type="button" aria-label="Next image" data-media-next>›</button>
            <div class="media-modal__meta">
                <div class="media-modal__title" data-media-title></div>
                <div class="media-modal__count" data-media-count></div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

const mediaModalState = {
    open: false,
    images: [],
    index: 0,
    title: ''
};

function openMediaModal({ images, index = 0, title = '' }) {
    ensureMediaModal();
    const modal = document.getElementById('mediaModal');
    if (!modal) return;

    mediaModalState.open = true;
    mediaModalState.images = Array.isArray(images) ? images : [];
    mediaModalState.index = Math.max(0, Math.min(Number(index) || 0, mediaModalState.images.length - 1));
    mediaModalState.title = String(title || '');

    modal.hidden = false;
    document.body.classList.add('media-modal-open');
    renderMediaModal();
}

function closeMediaModal() {
    const modal = document.getElementById('mediaModal');
    if (!modal) return;
    mediaModalState.open = false;
    modal.hidden = true;
    document.body.classList.remove('media-modal-open');
}

function stepMediaModal(delta) {
    if (!mediaModalState.open) return;
    const total = mediaModalState.images.length;
    if (total <= 1) return;
    mediaModalState.index = (mediaModalState.index + delta + total) % total;
    renderMediaModal();
}

function renderMediaModal() {
    const modal = document.getElementById('mediaModal');
    if (!modal) return;
    const imgEl = modal.querySelector('.media-modal__img');
    const titleEl = modal.querySelector('[data-media-title]');
    const countEl = modal.querySelector('[data-media-count]');
    if (!imgEl || !titleEl || !countEl) return;

    const total = mediaModalState.images.length;
    const idx = mediaModalState.index;
    const src = mediaModalState.images[idx] || '';
    imgEl.src = src;
    imgEl.alt = mediaModalState.title ? `${mediaModalState.title} - image ${idx + 1}` : `Image ${idx + 1}`;
    titleEl.textContent = mediaModalState.title;
    countEl.textContent = total > 0 ? `${idx + 1} / ${total}` : '';
}

function observeProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        if (card.dataset.observed === '1') return;
        card.dataset.observed = '1';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

function buildFeaturedHomeCardHtml(product) {
    const category = product.category || inferCategory(product.name);
    const waText = `Hello CRUSHTEQ INTERNATIONAL, I need a quote for: ${product.name}`;
    const waLink = `https://wa.me/919599653962?text=${encodeURIComponent(waText)}`;
    const images = getProductImages(product);
    const slidesHtml = images.map((src, i) => `
            <button class="product-gallery__slide" type="button" data-gallery-open data-index="${i}" aria-label="Open image ${i + 1} in full screen">
                <img src="${escapeHtml(src)}" alt="${escapeHtml(product.name)} image ${i + 1}" loading="lazy">
            </button>
        `).join("");
    const galleryExtras = images.length > 1
        ? `
                        <button class="product-gallery__nav prev" type="button" aria-label="Previous image" data-gallery-prev>‹</button>
                        <button class="product-gallery__nav next" type="button" aria-label="Next image" data-gallery-next>›</button>
                        <div class="product-gallery__dots" aria-hidden="true">
                            ${images.map((_, i) => `<span class="product-gallery__dot${i === 0 ? " active" : ""}" data-dot="${i}"></span>`).join("")}
                        </div>`
        : `
                        <div class="product-gallery__hint" aria-hidden="true">Full screen</div>`;
    const desc = String(product.description || "");
    const spec2 = desc.length > 90 ? `${desc.slice(0, 87)}…` : desc;

    return `
                    <div class="featured-product-item">
                        <div class="product-image">
                            <div class="product-gallery" data-gallery data-title="${escapeHtml(product.name)}" data-images="${escapeHtml(JSON.stringify(images))}" data-index="0">
                                <div class="product-gallery__track" data-gallery-track>
                                    ${slidesHtml}
                                </div>
                                ${galleryExtras}
                            </div>
                        </div>
                        <div class="product-content">
                            <h4>${escapeHtml(product.name)}</h4>
                            <p class="price">Best price <span>on request</span></p>
                            <div class="specs">
                                <span class="spec">${escapeHtml(category)}</span>
                                <span class="spec">${escapeHtml(spec2)}</span>
                            </div>
                            <div class="product-actions">
                                <a href="tel:+919599653962" class="btn btn-primary btn-sm">Call Us</a>
                                <a href="${waLink}" class="btn btn-whatsapp btn-sm" target="_blank" rel="noopener"><span class="wa-icon"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.817 9.817 0 01-1.473-5.165c0-5.433 4.395-9.834 9.802-9.834 2.62 0 5.07.967 6.911 2.714a9.695 9.695 0 012.881 6.904c0 5.433-4.395 9.834-9.802 9.834M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.892-11.893C24.001 5.335 18.668.001 12.05 0"/></svg><span>WhatsApp</span></span></a>
                            </div>
                        </div>
                    </div>`;
}

function renderHomeFeaturedProducts() {
    const root = document.getElementById("homeProductsLegacy");
    if (!root) return;

    const byId = Object.fromEntries(products.map(p => [p.id, p]));
    const parts = [];

    HOME_PRODUCT_GROUPS.forEach((group) => {
        const cards = group.ids
            .map((id) => byId[id])
            .filter(Boolean)
            .map((p) => buildFeaturedHomeCardHtml(p))
            .join("\n");

        parts.push(`
            <div class="home-products-group">
                <div class="group-head">
                    <h3>${escapeHtml(group.title)}</h3>
                    <a href="products.html" class="group-link">View More →</a>
                </div>
                <div class="featured-products-list">
${cards}
                </div>
            </div>`);
    });

    root.innerHTML = parts.join("\n");
}

function renderProductCategories() {
    const root = document.getElementById("productCategoriesGrid");
    if (!root) return;

    const categoryProducts = products.slice(0, 8);
    const cards = categoryProducts.map(product => `
        <div class="category-card">
            <div class="category-image">
                <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy">
            </div>
            <h4>${escapeHtml(product.name)}</h4>
            <p>${escapeHtml(product.description)}</p>
            <a href="products.html" class="category-link">View Product →</a>
        </div>
    `).join("\n");

    root.innerHTML = cards;
}

function renderProducts(list, containerId = 'productsContainer') {
    const productsContainer = document.getElementById(containerId);
    if (!productsContainer) return;

    const isCatalog = containerId === 'productsContainer';
    const countEl = isCatalog ? document.getElementById('productCount') : null;
    const emptyEl = isCatalog ? document.getElementById('productsEmpty') : null;

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
        const images = getProductImages(product);
        const slidesHtml = images.map((src, i) => `
            <button class="product-gallery__slide" type="button" data-gallery-open data-index="${i}" aria-label="Open image ${i + 1} in full screen">
                <img src="${escapeHtml(src)}" alt="${escapeHtml(product.name)} image ${i + 1}" loading="lazy">
            </button>
        `).join('');
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <span class="product-pill">${escapeHtml(category)}</span>
            <div class="product-image">
                <div class="product-gallery" data-gallery data-title="${escapeHtml(product.name)}" data-images="${escapeHtml(JSON.stringify(images))}" data-index="0">
                    <div class="product-gallery__track" data-gallery-track>
                        ${slidesHtml}
                    </div>
                    ${images.length > 1 ? `
                        <button class="product-gallery__nav prev" type="button" aria-label="Previous image" data-gallery-prev>‹</button>
                        <button class="product-gallery__nav next" type="button" aria-label="Next image" data-gallery-next>›</button>
                        <div class="product-gallery__dots" aria-hidden="true">
                            ${images.map((_, i) => `<span class="product-gallery__dot${i === 0 ? ' active' : ''}" data-dot="${i}"></span>`).join('')}
                        </div>
                    ` : `
                        <div class="product-gallery__hint" aria-hidden="true">Full screen</div>
                    `}
                </div>
            </div>
            <div class="product-info">
                <h3>${escapeHtml(product.name)}</h3>
                <p>${escapeHtml(product.description)}</p>
                <div class="product-actions">
                    <a href="tel:+919599653962" class="btn btn-primary">Call Us</a>
                    <a href="${waLink}" class="btn btn-whatsapp" target="_blank" rel="noopener">
                        <span class="wa-icon"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.817 9.817 0 01-1.473-5.165c0-5.433 4.395-9.834 9.802-9.834 2.62 0 5.07.967 6.911 2.714a9.695 9.695 0 012.881 6.904c0 5.433-4.395 9.834-9.802 9.834M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.892-11.893C24.001 5.335 18.668.001 12.05 0"/></svg><span>WhatsApp</span></span>
                    </a>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });

    observeProductCards();
}

function initProductsPageControls() {
    renderHomeFeaturedProducts();

    const searchEl = document.getElementById('productSearch');
    const categoryEl = document.getElementById('productCategory');
    const sortEl = document.getElementById('productSort');
    const clearBtn = document.getElementById('clearFilters');

    // If controls don't exist, we're not on the products page UI.
    if (!searchEl || !categoryEl || !sortEl || !clearBtn) {
        renderProducts(getProductsForPage(), 'productsContainer');
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
document.addEventListener('DOMContentLoaded', () => {
    initProductsPageControls();
    renderProductCategories();
});

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
// PRODUCT CARD ANIMATION + GALLERY HANDLERS
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
    observeProductCards();

    document.addEventListener('click', (e) => {
        const prevBtn = e.target.closest('[data-gallery-prev]');
        const nextBtn = e.target.closest('[data-gallery-next]');
        const openBtn = e.target.closest('[data-gallery-open]');

        const gallery = e.target.closest('[data-gallery]');
        if (!gallery) return;

        const track = gallery.querySelector('[data-gallery-track]');
        if (!track) return;

        const imagesJson = gallery.getAttribute('data-images') || '[]';
        let images = [];
        try { images = JSON.parse(imagesJson); } catch { images = []; }

        const total = Array.isArray(images) ? images.length : 0;
        const currentIndex = Math.max(0, Math.min(Number(gallery.getAttribute('data-index')) || 0, Math.max(0, total - 1)));

        function setIndex(newIndex) {
            const idx = Math.max(0, Math.min(newIndex, Math.max(0, total - 1)));
            gallery.setAttribute('data-index', String(idx));
            const slideWidth = track.clientWidth || 1;
            track.scrollTo({ left: idx * slideWidth, behavior: 'smooth' });
            const dots = Array.from(gallery.querySelectorAll('.product-gallery__dot'));
            dots.forEach((d, di) => d.classList.toggle('active', di === idx));
        }

        if (prevBtn) {
            e.preventDefault();
            if (total > 1) setIndex((currentIndex - 1 + total) % total);
            return;
        }

        if (nextBtn) {
            e.preventDefault();
            if (total > 1) setIndex((currentIndex + 1) % total);
            return;
        }

        if (openBtn) {
            e.preventDefault();
            const idx = Math.max(0, Math.min(Number(openBtn.getAttribute('data-index')) || 0, Math.max(0, total - 1)));
            openMediaModal({ images, index: idx, title: gallery.getAttribute('data-title') || '' });
            return;
        }
    }, { passive: false });

    document.addEventListener('scroll', (e) => {
        const track = e.target instanceof Element ? e.target.closest('.product-gallery__track') : null;
        if (!track) return;
        const gallery = track.closest('[data-gallery]');
        if (!gallery) return;
        const slideWidth = track.clientWidth || 1;
        const idx = Math.round(track.scrollLeft / slideWidth);
        if (Number(gallery.getAttribute('data-index')) !== idx) {
            gallery.setAttribute('data-index', String(idx));
            const dots = Array.from(gallery.querySelectorAll('.product-gallery__dot'));
            dots.forEach((d, di) => d.classList.toggle('active', di === idx));
        }
    }, true);

    ensureMediaModal();
    const modal = document.getElementById('mediaModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.closest('[data-media-close]')) {
                e.preventDefault();
                closeMediaModal();
                return;
            }
            if (e.target.closest('[data-media-prev]')) {
                e.preventDefault();
                stepMediaModal(-1);
                return;
            }
            if (e.target.closest('[data-media-next]')) {
                e.preventDefault();
                stepMediaModal(1);
                return;
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!mediaModalState.open) return;
        if (e.key === 'Escape') closeMediaModal();
        if (e.key === 'ArrowLeft') stepMediaModal(-1);
        if (e.key === 'ArrowRight') stepMediaModal(1);
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
