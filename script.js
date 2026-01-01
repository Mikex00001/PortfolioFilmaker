// Configurações iniciais
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initHeaderScroll();
    updateCopyrightYear();
    initSmoothScroll();
    initScrollAnimations();
    initLazyLoading();
    initWhatsAppButtons();
});

// Navegação
function initNavigation() {
    const menuBtn = document.querySelector('.menu-btn');
    const sideNav = document.querySelector('.side-nav');
    const closeNav = document.querySelector('.close-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Abrir menu
    menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        sideNav.classList.toggle('active');
        document.body.style.overflow = sideNav.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Fechar menu
    closeNav.addEventListener('click', function() {
        menuBtn.classList.remove('active');
        sideNav.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Fechar menu ao clicar em link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuBtn.classList.remove('active');
            sideNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Fechar menu ao clicar fora (opcional)
    sideNav.addEventListener('click', function(e) {
        if (e.target === sideNav) {
            menuBtn.classList.remove('active');
            sideNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Atualizar ano no copyright
function updateCopyrightYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Scroll suave para âncoras
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animações no scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observar elementos
    document.querySelectorAll('.portfolio-item, .about-content, .contact-content').forEach(el => {
        observer.observe(el);
    });
}

// Lazy loading de imagens
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(function(img) {
            imageObserver.observe(img);
        });
    }
}

// Configurar todos os botões WhatsApp
function initWhatsAppButtons() {
    const defaultMessage = encodeURIComponent('Olá! Gostaria de solicitar um orçamento para um projeto.');
    
    // Botão do Hero
    const heroBtn = document.querySelector('.btn-whatsapp');
    if (heroBtn) {
        heroBtn.href = `https://wa.me/5511949733636?text=${defaultMessage}`;
    }
    
    // Botão no Menu
    const menuBtn = document.querySelector('.menu-whatsapp-btn');
    if (menuBtn) {
        menuBtn.href = `https://wa.me/5511949733636?text=${defaultMessage}`;
    }
    
    // Botões nos projetos (já configurados no HTML com mensagens específicas)
    
    // Botão de Contato
    const contactBtn = document.querySelector('.contact-whatsapp-btn');
    if (contactBtn) {
        contactBtn.href = `https://wa.me/5511949733636?text=${defaultMessage}`;
    }
    
    // Botão no Footer
    const footerBtn = document.querySelector('.footer-whatsapp-btn');
    if (footerBtn) {
        footerBtn.href = `https://wa.me/5511949733636?text=${defaultMessage}`;
    }
    
    // Botão Fixo
    const fixedBtn = document.querySelector('.whatsapp-fixed');
    if (fixedBtn) {
        fixedBtn.href = `https://wa.me/5511949733636?text=${defaultMessage}`;
    }
}

// Preload de fontes (opcional)
if ('fonts' in document) {
    Promise.all([
        document.fonts.load('300 1em "Inter"'),
        document.fonts.load('300 1em "Space Grotesk"')
    ]).then(function() {
        document.body.classList.add('fonts-loaded');
    });
}

// Adicionar efeito de clique nos botões
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-whatsapp, .menu-whatsapp-btn, .project-whatsapp-btn, .contact-whatsapp-btn, .footer-whatsapp-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Efeito de clique visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Tracking (opcional)
            console.log('Botão WhatsApp clicado:', this.textContent.trim());
        });
    });
});