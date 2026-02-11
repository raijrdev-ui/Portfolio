// ==================== MOBILE MENU ==================== //
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
        hamburger.classList.remove('active');
    });
});

// ==================== SMOOTH SCROLLING ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
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

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;

    // Simple validation
    if (!name.trim() || !email.trim() || !message.trim()) {
        showAlert('Please fill in all fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email', 'error');
        return;
    }

    // Here you would normally send the form data to a server
    // For now, we'll just show a success message
    showAlert('Message sent successfully! I will get back to you soon.', 'success');

    // Reset form
    this.reset();

    // In a real application, you would send this data to a backend
    console.log('Form Data:', {
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toISOString()
    });
});

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

// ==================== DOWNLOAD RESUME ==================== //
function downloadResume() {
    // Create a simple resume PDF or document
    // For now, we'll create a text file that users can download
    const resumeContent = `
MY PROFESSIONAL RESUME

===============================================================================
CONTACT INFORMATION
===============================================================================
Email: your.email@example.com
Phone: +55 (11) 99999-9999
LinkedIn: linkedin.com/in/yourprofile
GitHub: github.com/yourprofile

===============================================================================
PROFESSIONAL SUMMARY
===============================================================================
Experienced and passionate developer with strong skills in frontend and backend
development. Committed to creating high-quality solutions and continuous improvement.

===============================================================================
TECHNICAL SKILLS
===============================================================================
Languages: JavaScript, HTML, CSS, Python, Java, SQL
Frontend: React, Vue.js, HTML5, CSS3, Responsive Design
Backend: Node.js, Express.js, REST APIs
Databases: MongoDB, MySQL, PostgreSQL
Tools: Git, GitHub, VS Code, Webpack, Docker
Platforms: AWS, Linux

===============================================================================
PROFESSIONAL EXPERIENCE
===============================================================================

SENIOR DEVELOPER
Tech Company Inc. | 2023 - Present
• Led development of modern web applications using React and Node.js
• Mentored junior developers and implemented best practices
• Improved application performance by 35%

FULL STACK DEVELOPER
Digital Solutions Ltd. | 2021 - 2023
• Developed and maintained multiple web applications
• Improved application performance by 40% through optimization
• Collaborated with cross-functional teams

JUNIOR DEVELOPER
Startup Hub | 2020 - 2021
• Built responsive websites with HTML, CSS, and JavaScript
• Collaborated with UX team on user interface improvements
• Contributed to various projects from conception through deployment

===============================================================================
EDUCATION
===============================================================================

Bachelor of Science in Computer Science
University of Technology | 2019 - 2020
• Focused on web development and software engineering
• Graduated with honors

===============================================================================
CERTIFICATIONS & ACHIEVEMENTS
===============================================================================
• Web Development Certification
• React.js Advanced Course
• Cloud Computing Fundamentals
• Recognition for Outstanding Performance (2023)

===============================================================================
LANGUAGES
===============================================================================
Portuguese: Native
English: Fluent
Spanish: Intermediate

===============================================================================
ADDITIONAL INFORMATION
===============================================================================
• Available for remote work and relocation
• Open to full-time, part-time, and freelance opportunities
• Continuous learner with passion for new technologies

Generated on: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
    `;

    // Create a blob and download
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'My-Resume.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    showAlert('Resume downloaded successfully!', 'success');
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

// Observe skill cards and resume items
document.querySelectorAll('.skill-card, .resume-item, .tech-category, .contact-item').forEach(el => {
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

// ==================== KEYBOARD SHORTCUTS ==================== //
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
