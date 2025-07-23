// Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;
        
        themeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            const isDark = html.classList.contains('dark');
            themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
        
        // Check for saved theme preference
        if (localStorage.getItem('theme') === 'dark') {
            html.classList.add('dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (this.getAttribute('href') === '#') return;
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            });
        });
        
        // Animated counters
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;
        
        function animateCounters() {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-count');
                const count = +counter.innerText;
                const increment = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(animateCounters, 1);
                } else {
                    counter.innerText = target;
                }
            });
        }
        
        // Start counters when stats section is in view
        const statsSection = document.querySelector('.stats');
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.unobserve(statsSection);
            }
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
        
        // Scroll reveal animation
        const fadeElements = document.querySelectorAll('.fade-in');
        
        function checkScroll() {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }
        
        window.addEventListener('scroll', checkScroll);
        window.addEventListener('load', checkScroll);
        
        // Payment Modal
        const buyButtons = document.querySelectorAll('.buy-btn');
        const paymentModal = document.getElementById('paymentModal');
        const modalClose = document.getElementById('modalClose');
        const modalProjectTitle = document.getElementById('modalProjectTitle');
        const modalProjectPrice = document.getElementById('modalProjectPrice');
        const qrCodeImage = document.getElementById('qrCodeImage');
        const paymentMethods = document.querySelectorAll('.payment-method');
        const verifyPaymentBtn = document.getElementById('verifyPayment');
        const downloadBtn = document.getElementById('downloadBtn');
        const utrNumberInput = document.getElementById('utrNumber');
        const successMessage = document.getElementById('successMessage');
        
        // Open modal with project details
        buyButtons.forEach(button => {
            button.addEventListener('click', () => {
                const price = button.getAttribute('data-price');
                const title = button.getAttribute('data-title');
                
                modalProjectTitle.textContent = title;
                modalProjectPrice.textContent = `₹${price}`;
                qrCodeImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=at546714-1@okhdfcbank&pn=ProjectHub&am=${price}&cu=INR`;
                
                paymentModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal
        modalClose.addEventListener('click', () => {
            paymentModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            resetModal();
        });
        
        // Close modal when clicking outside
        paymentModal.addEventListener('click', (e) => {
            if (e.target === paymentModal) {
                paymentModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                resetModal();
            }
        });
        
        // Payment method selection
        paymentMethods.forEach(method => {
            method.addEventListener('click', () => {
                paymentMethods.forEach(m => m.classList.remove('active'));
                method.classList.add('active');
            });
        });
        
        // Verify payment (simulated)
        verifyPaymentBtn.addEventListener('click', () => {
            if (utrNumberInput.value.trim() === '') {
                alert('Please enter your UTR number');
                return;
            }
            
            // Simulate verification
            setTimeout(() => {
                successMessage.classList.add('active');
                verifyPaymentBtn.style.display = 'none';
                downloadBtn.classList.add('active');
            }, 1000);
        });
        
        // Download project files (simulated)
        downloadBtn.addEventListener('click', () => {
            alert('Project files download started! (This is a demo)');
            paymentModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            resetModal();
        });
        
        // Reset modal state
        function resetModal() {
            successMessage.classList.remove('active');
            verifyPaymentBtn.style.display = 'block';
            downloadBtn.classList.remove('active');
            utrNumberInput.value = '';
            paymentMethods.forEach(m => m.classList.remove('active'));
        }