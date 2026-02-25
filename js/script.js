// Sivamani Pittala - Personal Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initNavigation();
    initSmoothScroll();
    initScrollToTop();
    initFormValidation();
    initSkillAnimation();
    initTypingEffect();
    initCurrentYear();
    initMobileMenu();
    initCardEffects();
    initTableEffects();
    initHobbySearch();
    initTimetableFilters();
});

// Navigation active state highlighting
function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Scroll to top button
function initScrollToTop() {
    // Create scroll to top button
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.setAttribute('title', 'Scroll to top');
    document.body.appendChild(button);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });

    // Scroll to top on click
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add styles for the button
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            display: none;
            z-index: 1000;
            transition: background-color 0.3s, transform 0.3s;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        .scroll-to-top:hover {
            background-color: #2980b9;
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);
}

// Form validation
function initFormValidation() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        let isValid = true;
        let errors = [];

        // Name validation
        if (!name.value.trim()) {
            errors.push('Name is required');
            name.style.borderColor = 'red';
            isValid = false;
        } else {
            name.style.borderColor = '#ddd';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            errors.push('Email is required');
            email.style.borderColor = 'red';
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            errors.push('Please enter a valid email address');
            email.style.borderColor = 'red';
            isValid = false;
        } else {
            email.style.borderColor = '#ddd';
        }

        // Message validation
        if (!message.value.trim()) {
            errors.push('Message is required');
            message.style.borderColor = 'red';
            isValid = false;
        } else {
            message.style.borderColor = '#ddd';
        }

        if (isValid) {
            // Show success message
            showNotification('Message sent successfully!', 'success');
            form.reset();
        } else {
            showNotification(errors[0], 'error');
        }
    });
}

// Notification system
function showNotification(message, type) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.textContent = message;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 5px;
            color: white;
            z-index: 1001;
            animation: slideIn 0.3s ease-out;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        .notification.success {
            background-color: #27ae60;
        }
        .notification.error {
            background-color: #e74c3c;
        }
        @keyframes slideIn {
            from {
                transform: translateX(100%);
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
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('style[title="notification"]')) {
        style.setAttribute('title', 'notification');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Skill animation
function initSkillAnimation() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            tag.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Typing effect for header
function initTypingEffect() {
    const header = document.querySelector('header p');
    if (!header) return;

    const text = header.textContent;
    header.textContent = '';
    header.style.visibility = 'visible';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            header.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
}

// Current year in footer
function initCurrentYear() {
    const footer = document.querySelector('footer p');
    if (footer) {
        const year = new Date().getFullYear();
        footer.innerHTML = footer.innerHTML.replace('2025', year);
    }
}

// Card hover effects
function initCardEffects() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease-out';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Add click effect to social links
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add styles for ripple effect
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        .social-links a {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Table row highlighting
function initTableEffects() {
    document.querySelectorAll('table tr').forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0f0f0';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
}

// Mobile menu toggle (for smaller screens)
function initMobileMenu() {
    const nav = document.querySelector('nav');
    const navUl = nav.querySelector('ul');
    
    // Create mobile menu button
    const menuBtn = document.createElement('button');
    menuBtn.innerHTML = '☰';
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.setAttribute('aria-label', 'Toggle menu');
    nav.insertBefore(menuBtn, navUl);
    
    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 10px;
        }
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }
            nav ul {
                display: none;
                flex-direction: column;
                align-items: center;
            }
            nav ul.show {
                display: flex;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Toggle menu on click
    menuBtn.addEventListener('click', function() {
        navUl.classList.toggle('show');
    });
}

// Hobby search filter
function initHobbySearch() {
    const searchInput = document.getElementById('hobby-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Timetable filter functionality
function initTimetableFilters() {
    const programSelect = document.getElementById('program-select');
    const electiveOptions = document.getElementById('elective-options');
    const timetableTable = document.getElementById('timetable-table');
    const electiveSlots = document.querySelectorAll('.elective-slot');

    if (!timetableTable || !electiveOptions) return;

    const bins = electiveOptions.querySelectorAll('.elective-bin');

    function updateTimetable(e) {
        const checkedBins = Array.from(bins).filter(bin => bin.querySelector('.bin-check').checked);
        
        // Limit selection to exactly 4
        if (checkedBins.length > 4 && e && e.target && e.target.classList.contains('bin-check')) {
            e.target.checked = false;
            showNotification('You can select maximum 4 electives', 'error');
            return;
        }

        // Mapping of bin to selected subject
        const selection = {};
        bins.forEach(bin => {
            const checkbox = bin.querySelector('.bin-check');
            const select = bin.querySelector('.bin-select');
            const binId = checkbox.getAttribute('data-bin');
            
            if (checkbox.checked) {
                selection[binId] = select.value;
                bin.style.opacity = '1';
                bin.style.borderColor = '#3498db';
                select.disabled = false;
            } else {
                bin.style.opacity = '0.5';
                bin.style.borderColor = '#ddd';
                select.disabled = true;
            }
        });

        // Update each elective slot in the table
        electiveSlots.forEach(slot => {
            const binId = slot.getAttribute('data-slot'); // E1, E2, etc.
            if (selection[binId]) {
                // Remove underscores/extra spaces for cleaner display if needed
                slot.textContent = selection[binId];
                slot.style.backgroundColor = '#e8f4fd';
                slot.style.fontWeight = '600';
                slot.style.color = '#2c3e50';
            } else {
                slot.textContent = '-';
                slot.style.backgroundColor = '#f8f9fa';
                slot.style.fontWeight = 'normal';
                slot.style.color = '#95a5a6';
            }
        });

        // Check if exactly 4 are selected
        if (checkedBins.length < 4 && e && e.type === 'change') {
            // Just a reminder, don't block yet
            console.log('Please select exactly 4 electives');
        }
    }

    // Add event listeners
    bins.forEach(bin => {
        const checkbox = bin.querySelector('.bin-check');
        const select = bin.querySelector('.bin-select');
        
        checkbox.addEventListener('change', updateTimetable);
        select.addEventListener('change', updateTimetable);
    });

    if (programSelect) {
        programSelect.addEventListener('change', updateTimetable);
    }

    // Initial update
    updateTimetable();
}

// Console log for debugging
console.log('Sivamani Pittala - Personal Website loaded successfully!');

