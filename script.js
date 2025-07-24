document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    
    if (mobileMenuBtn && navbar) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navbar.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuBtn && navbar) {
                mobileMenuBtn.classList.remove('active');
                navbar.classList.remove('active');
            }
        });
    });

    // Theme Toggle
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    
    if (themeSwitch) {
        // Check for saved theme preference
        if (localStorage.getItem('theme') === 'dark') {
            themeSwitch.checked = true;
            body.setAttribute('data-theme', 'dark');
        }
        
        themeSwitch.addEventListener('change', function() {
            if (this.checked) {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Typewriter Effect
    const typewriterElement = document.querySelector('.typewriter');
    
    if (typewriterElement) {
        const text = "Welcome to Abhay Major Project Selling";
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                typewriterElement.textContent = text.substring(0, i + 1);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Add blinking cursor after typing is complete
                const cursor = document.createElement('span');
                cursor.className = 'cursor';
                cursor.textContent = '|';
                typewriterElement.appendChild(cursor);
                
                // Blinking animation
                setInterval(() => {
                    cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
                }, 500);
            }
        }
        
        // Clear any existing content
        typewriterElement.textContent = '';
        // Start typing after 1 second
        setTimeout(typeWriter, 1000);
    }

    // Rotating Text
    const rotatingText = document.querySelector('.rotating-text');
    
    if (rotatingText) {
        const texts = ["100% Working Projects", "Documentation Included", "Ready to Submit", "Source Code Provided"];
        
        // Clear any existing content
        rotatingText.innerHTML = '';
        
        texts.forEach((text, index) => {
            const span = document.createElement('span');
            span.textContent = text;
            span.style.position = 'absolute';
            span.style.width = '100%';
            span.style.height = '100%';
            span.style.top = '0';
            span.style.left = '0';
            span.style.opacity = '0';
            span.style.animation = `rotateWords 12s linear infinite ${index * 3}s`;
            rotatingText.appendChild(span);
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 80;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Reveal Animation
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-title, .section-subtitle, .project-card, .feature-card, .testimonial-card, .contact-form, .info-card');
        
        elements.forEach(element => {
            if (element.classList.contains('animated')) return;
            
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                if (element.classList.contains('section-title')) {
                    element.classList.add('slide-in-left', 'animated');
                } else if (element.classList.contains('section-subtitle')) {
                    element.classList.add('fade-in', 'animated');
                } else if (element.classList.contains('project-card') || element.classList.contains('feature-card')) {
                    element.classList.add('slide-in-up', 'animated');
                } else if (element.classList.contains('testimonial-card')) {
                    element.classList.add('slide-in-right', 'animated');
                } else {
                    element.classList.add('fade-in', 'animated');
                }
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Scroll to Top Button
    const scrollTopBtn = document.querySelector('.float-scroll-top');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    // Payment Modal
    const payNowBtn = document.getElementById('pay-now-btn');
    const buyNowBtns = document.querySelectorAll('.buy-now-btn');
    const paymentModal = document.getElementById('payment-modal');
    const closeModal = document.querySelector('.close-modal');
    const selectedProjectName = document.getElementById('selected-project-name');
    const paymentOptions = document.querySelectorAll('.payment-option');
    const paymentDetails = document.querySelectorAll('.payment-details');
    const verifyPaymentBtn = document.getElementById('verify-payment');
    const downloadSection = document.querySelector('.download-section');
    const downloadBtn = document.getElementById('download-project');
    const utrInput = document.getElementById('utr-number');
    const paymentTimeInput = document.getElementById('payment-time');
    
    if (paymentModal) {
        function resetPaymentForm() {
            if (utrInput) utrInput.value = '';
            if (paymentTimeInput) paymentTimeInput.value = '';
            if (verifyPaymentBtn) {
                verifyPaymentBtn.textContent = 'Verify Payment';
                verifyPaymentBtn.style.backgroundColor = '';
                verifyPaymentBtn.disabled = false;
            }
            if (downloadSection) downloadSection.style.display = 'none';
            
            // Reset to UPI payment by default
            paymentOptions[0]?.click();
        }
        
        function openModal(projectName) {
            if (projectName && selectedProjectName) {
                selectedProjectName.textContent = projectName;
            }
            paymentModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            resetPaymentForm();
        }
        
        function closeModalFunc() {
            paymentModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        if (payNowBtn) {
            payNowBtn.addEventListener('click', () => openModal('Custom Project'));
        }
        
        buyNowBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const projectName = this.getAttribute('data-project');
                openModal(projectName);
            });
        });
        
        if (closeModal) {
            closeModal.addEventListener('click', closeModalFunc);
        }
        
        // Close modal when clicking outside
        paymentModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModalFunc();
            }
        });
        
        // Payment method toggle
        paymentOptions.forEach(option => {
            option.addEventListener('click', function() {
                const method = this.getAttribute('data-method');
                
                paymentOptions.forEach(opt => opt.classList.remove('active'));
                paymentDetails.forEach(detail => detail.style.display = 'none');
                
                this.classList.add('active');
                const detailsElement = document.querySelector(`.${method}-details`);
                if (detailsElement) detailsElement.style.display = 'block';
            });
        });
        
        // Mock payment verification
        if (verifyPaymentBtn) {
            verifyPaymentBtn.addEventListener('click', function() {
                const utrNumber = utrInput?.value;
                const paymentTime = paymentTimeInput?.value;
                
                if (!utrNumber || !paymentTime) {
                    alert('Please enter UTR number and payment time');
                    return;
                }
                
                // Mock validation - in a real app, you would verify with your backend
                if (utrNumber.length >= 10) {
                    // Show success and download section
                    if (downloadSection) downloadSection.style.display = 'block';
                    
                    // Scroll to download section
                    downloadSection?.scrollIntoView({ behavior: 'smooth' });
                    
                    // Change button text
                    this.textContent = 'Payment Verified';
                    this.style.backgroundColor = '#00b894';
                    
                    // Disable button
                    this.disabled = true;
                } else {
                    alert('Please enter a valid UTR number (at least 10 characters)');
                }
            });
        }
        
        // Mock download
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function() {
                alert('Project bundle downloaded successfully!');
                closeModalFunc();
            });
        }
    }

    // Form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value;
            const email = document.getElementById('email')?.value;
            const message = document.getElementById('message')?.value;
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would typically send the form data to a server
            console.log({ name, email, message });
            
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Animated form labels
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        const underline = group.querySelector('.underline');
        
        if (!input || !label || !underline) return;
        
        // Check if input has value on page load (for browser autofill)
        if (input.value) {
            label.style.top = '-1.2rem';
            label.style.fontSize = '0.8rem';
            label.style.color = 'var(--primary-color)';
            underline.style.width = '100%';
        }
        
        input.addEventListener('focus', () => {
            label.style.top = '-1.2rem';
            label.style.fontSize = '0.8rem';
            label.style.color = 'var(--primary-color)';
            underline.style.width = '100%';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                label.style.top = '0.8rem';
                label.style.fontSize = '1rem';
                label.style.color = 'var(--text-light)';
                underline.style.width = '0';
            }
        });
    });
});