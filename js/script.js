// ==================== MOBILE MENU ==================== //
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Alterna o menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fecha o menu ao clicar em um link (apenas no mobile)
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});
// ==================== SMOOTH SCROLLING (CORRIGIDO) ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        // Só executa o preventDefault se o href for apenas "#" ou um ID válido
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== NAVBAR BACKGROUND ON SCROLL ==================== //
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ==================== FORM SUBMISSION ==================== //
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // 1. Validation Logic (Keeping your logic)
        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const message = this.querySelector('textarea[name="message"]').value;

        if (!name.trim() || !email.trim() || !message.trim()) {
            alert('Please fill in all fields'); // Or use your showAlert function
            return;
        }

        // 2. Visual Feedback
        const button = this.querySelector('.submit-btn');
        const originalText = button.innerText;
        button.innerText = "Sending...";
        button.disabled = true;

        // 3. The Actual Send (Using Fetch to Formspree)
        try {
            const formData = new FormData(this);
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                alert('Message sent successfully! I will get back to you soon.');
                this.reset();
            } else {
                alert('Oops! There was a problem sending your message.');
            }
        } catch (error) {
            alert('Error connecting to the server. Please try again later.');
        } finally {
            // 4. Reset Button State
            button.innerText = originalText;
            button.disabled = false;
        }
    });
}
// ==================== ALERT FUNCTION ==================== //
function showAlert(message, type) {
    // Create alert element
    const alert = document.createElement('div');
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    alert.textContent = message;

    document.body.appendChild(alert);

    // Remove alert after 4 seconds
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            alert.remove();
        }, 300);
    }, 4000);
}



// ==================== ANIMATIONS ON SCROLL ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards, the new resume button, and other items
document.querySelectorAll('.skill-card, .btn-resume, .tech-category, .contact-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==================== ACTIVE NAV LINK ==================== //
window.addEventListener('scroll', () => {
    let current = '';

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = '';
        }
    });
});

// ==================== KEYBOARD SHORTCUTS ===================
document.addEventListener('keydown', (e) => {
    // Press '/' to focus contact form
    if (e.key === '/' && e.ctrlKey) {
        e.preventDefault();
        const emailInput = document.querySelector('.contact-form input[type="email"]');
        if (emailInput) {
            emailInput.focus();
        }
    }
});

// ==================== CONSOLE WELCOME MESSAGE ==================== //
console.log('%c👋 Welcome to my portfolio!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cLet\'s work together! Feel free to reach out.', 'font-size: 14px; color: #64748b;');
console.log('%cEmail: your.email@example.com', 'font-size: 12px; color: #64748b;');

// ==================== ADD STYLES FOR ANIMATIONS ==================== //
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(10px, 10px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
`;
document.head.appendChild(style);

// ==================== DARK MODE TOGGLE (Optional Feature) ==================== //
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function toggleDarkMode() {
    const isDark = document.body.style.backgroundColor === 'rgb(15, 23, 42)';
    
    if (isDark) {
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
    } else {
        document.body.style.backgroundColor = '#0f172a';
        document.body.style.color = '#f8fafc';
    }
}

// You can add a keyboard shortcut for dark mode
document.addEventListener('keydown', (e) => {
    if (e.key === 'D' && e.ctrlKey) {
        e.preventDefault();
        toggleDarkMode();
    }
});
// ==================== SCROLL TO TOP BUTTON ==================== //
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    // Show button when user scrolls down 400px
    if (window.scrollY > 400) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
