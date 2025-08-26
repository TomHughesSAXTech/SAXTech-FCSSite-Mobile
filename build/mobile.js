// Mobile JavaScript - Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const menuToggle = document.getElementById('menuToggle');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const themeToggle = document.getElementById('themeToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const fabButton = document.getElementById('fabButton');
    const body = document.body;

    // Initialize theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Sidebar Toggle
    function toggleSidebar() {
        const isActive = mobileSidebar.classList.contains('active');
        
        if (isActive) {
            closeSidebarMenu();
        } else {
            openSidebarMenu();
        }
    }

    function openSidebarMenu() {
        mobileSidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        menuToggle.classList.add('active');
        body.classList.add('no-scroll');
    }

    function closeSidebarMenu() {
        mobileSidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        menuToggle.classList.remove('active');
        body.classList.remove('no-scroll');
    }

    // Event Listeners for Sidebar
    menuToggle.addEventListener('click', toggleSidebar);
    closeSidebar.addEventListener('click', closeSidebarMenu);
    sidebarOverlay.addEventListener('click', closeSidebarMenu);

    // Close sidebar when navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Close sidebar on mobile
            closeSidebarMenu();

            // Smooth scroll to section
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerHeight = document.querySelector('.mobile-header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 10;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Theme Toggle
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Add animation effect
        this.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });

    // Floating Action Button
    if (fabButton) {
        fabButton.addEventListener('click', function() {
            // Open chat in desktop mode
            startChat();
        });

        // Show/hide FAB on scroll
        let lastScrollTop = 0;
        let isScrolling;

        window.addEventListener('scroll', function() {
            clearTimeout(isScrolling);
            
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                fabButton.style.transform = 'translateY(100px)';
            } else {
                // Scrolling up
                fabButton.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;

            // Set a timeout to run after scrolling ends
            isScrolling = setTimeout(function() {
                // Show FAB after scroll stops
                fabButton.style.transform = 'translateY(0)';
            }, 150);
        });
    }

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            
            // Show loading state
            const submitBtn = this.querySelector('.primary-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Show success message
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.backgroundColor = 'var(--accent-color)';
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                    submitBtn.style.backgroundColor = '';
                }, 2000);
            }, 1500);
        });
    }

    // Touch gesture support for sidebar
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipeGesture();
    });

    function handleSwipeGesture() {
        const swipeDistanceX = touchEndX - touchStartX;
        const swipeDistanceY = Math.abs(touchEndY - touchStartY);
        
        // Only handle horizontal swipes
        if (swipeDistanceY < 100) {
            if (swipeDistanceX > 50 && touchStartX < 30) {
                // Swipe right from left edge - open sidebar
                openSidebarMenu();
            } else if (swipeDistanceX < -50 && mobileSidebar.classList.contains('active')) {
                // Swipe left - close sidebar
                closeSidebarMenu();
            }
        }
    }

    // Highlight active section on scroll
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        rootMargin: '-50% 0px -50% 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Service Worker Registration (for PWA capabilities)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // Uncomment when you have a service worker file
            // navigator.serviceWorker.register('/sw.js')
            //     .then(registration => console.log('SW registered'))
            //     .catch(err => console.log('SW registration failed'));
        });
    }

    // iOS specific adjustments
    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
        // Add iOS class for specific styling if needed
        document.body.classList.add('ios-device');
        
        // Fix viewport height on iOS
        function setViewportHeight() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
    }

    // Performance optimization - lazy load images if any
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.primary-btn, .secondary-btn, .nav-link');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add pull-to-refresh functionality
    let pullToRefreshStartY = 0;
    let isPulling = false;

    document.addEventListener('touchstart', (e) => {
        if (window.scrollY === 0) {
            pullToRefreshStartY = e.touches[0].clientY;
            isPulling = true;
        }
    });

    document.addEventListener('touchmove', (e) => {
        if (!isPulling) return;
        
        const pullDistance = e.touches[0].clientY - pullToRefreshStartY;
        
        if (pullDistance > 0 && window.scrollY === 0) {
            // Visual feedback for pull to refresh
            document.body.style.transform = `translateY(${Math.min(pullDistance * 0.5, 80)}px)`;
        }
    });

    document.addEventListener('touchend', (e) => {
        if (!isPulling) return;
        
        const pullDistance = e.changedTouches[0].clientY - pullToRefreshStartY;
        
        if (pullDistance > 100 && window.scrollY === 0) {
            // Trigger refresh
            document.body.style.transform = 'translateY(80px)';
            
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } else {
            // Reset position
            document.body.style.transform = '';
        }
        
        isPulling = false;
    });

    console.log('Ask Foreman Mobile - Initialized');
});

// Ask Foreman specific functions
function startChat() {
    // Open the mobile chat interface
    window.location.href = '/mobile-chat.html';
}

function uploadDocs() {
    // For mobile, show a message that upload isn't available on mobile
    alert('Document upload is not available on the mobile version. Please use the desktop site at askforeman.saxtechnology.com to upload documents.');
}
