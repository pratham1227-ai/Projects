// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const themeToggle = document.querySelector('.theme-toggle');
    const scrollToTop = document.querySelector('.scroll-to-top');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const skillItems = document.querySelectorAll('.skill-item');
    const contactForm = document.getElementById('contactForm');
    
    // Initialize AOS (Animate on Scroll)
    initializeSkillBars();
    
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        // Update icon
        if (document.body.classList.contains('dark-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Scroll event for header and scroll-to-top button
    window.addEventListener('scroll', () => {
        // Header shadow on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Show/hide scroll-to-top button
        if (window.scrollY > 500) {
            scrollToTop.classList.add('active');
        } else {
            scrollToTop.classList.remove('active');
        }
        
        // Activate nav links based on scroll position
        activateNavOnScroll();
        
        // Animate skill bars when in viewport
        animateSkillBarsOnScroll();
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Project filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            // Filter projects
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 200);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
    
    // Contact form validation and submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Validate inputs
            let isValid = true;
            
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            } else {
                clearError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            } else {
                clearError(emailInput);
            }
            
            if (subjectInput.value.trim() === '') {
                showError(subjectInput, 'Subject is required');
                isValid = false;
            } else {
                clearError(subjectInput);
            }
            
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required');
                isValid = false;
            } else {
                clearError(messageInput);
            }
            
            // If form is valid, submit it (in a real application, you would send the data to a server)
            if (isValid) {
                // Show success message
                const formGroups = contactForm.querySelectorAll('.form-group');
                formGroups.forEach(group => group.style.display = 'none');
                
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.style.display = 'none';
                
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for contacting me. I'll get back to you soon.</p>
                `;
                
                contactForm.appendChild(successMessage);
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    contactForm.reset();
                    successMessage.remove();
                    formGroups.forEach(group => group.style.display = 'block');
                    submitBtn.style.display = 'block';
                }, 5000);
            }
        });
    }
    
    // Helper Functions
    
    // Show error message
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.form-error');
        
        input.classList.add('error');
        errorElement.textContent = message;
    }
    
    // Clear error message
    function clearError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.form-error');
        
        input.classList.remove('error');
        errorElement.textContent = '';
    }
    
    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Initialize skill bars with width 0
    function initializeSkillBars() {
        skillItems.forEach(item => {
            const progressBar = item.querySelector('.progress-bar');
            progressBar.style.width = '0';
        });
    }
    
    // Animate skill bars when in viewport
    function animateSkillBarsOnScroll() {
        skillItems.forEach(item => {
            if (isInViewport(item)) {
                const progressBar = item.querySelector('.progress-bar');
                const percentage = item.getAttribute('data-percentage');
                progressBar.style.width = percentage + '%';
            }
        });
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Activate nav link based on scroll position
    function activateNavOnScroll() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + header.offsetHeight + 50;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Typing effect for hero section
    const typingElement = document.querySelector('.hero-content h1');
    if (typingElement) {
        const text = typingElement.innerHTML;
        typingElement.innerHTML = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typingElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Uncomment to enable typing effect
        // typeWriter();
    }
});