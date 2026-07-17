document.addEventListener('DOMContentLoaded', () => {
    // 1. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        questionBtn.addEventListener('click', () => {
            // Check if the current item is already active
            const isActive = questionBtn.classList.contains('active');

            // Close all items first
            document.querySelectorAll('.faq-question').forEach(btn => {
                btn.classList.remove('active');
                btn.nextElementSibling.style.maxHeight = null;
                btn.nextElementSibling.style.paddingTop = '0px';
            });

            // If it wasn't active, open it
            if (!isActive) {
                questionBtn.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 40 + "px"; // Adding padding space
                answer.style.paddingTop = '10px';
            }
        });
    });

    // 2. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Simple animation on scroll (Intersection Observer)
    const animateElements = document.querySelectorAll('.pain-card, .feature-item, .benefit-card, .included-card, .testimonial-card');
    
    // Initial state: slightly opaque and moved down
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    animateElements.forEach(el => observer.observe(el));

    // 4. Facebook Pixel - Track InitiateCheckout on CTA button clicks
    const ctaButtons = document.querySelectorAll('a.cta-button[href*="kiwify"]');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (typeof fbq === 'function') {
                fbq('track', 'InitiateCheckout', {
                    content_name: 'Kit Bíblico Infantil Completo',
                    content_category: 'E-book',
                    value: 19.90,
                    currency: 'BRL'
                });
            }
        });
    });

    // 5. Facebook Pixel - Track ViewContent when user scrolls to pricing section
    const pricingBox = document.querySelector('.pricing-box');
    if (pricingBox) {
        const pricingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (typeof fbq === 'function') {
                        fbq('track', 'ViewContent', {
                            content_name: 'Kit Bíblico Infantil - Página de Preço',
                            content_type: 'product',
                            value: 19.90,
                            currency: 'BRL'
                        });
                    }
                    pricingObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        pricingObserver.observe(pricingBox);
    }
});
