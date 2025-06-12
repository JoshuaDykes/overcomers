// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS with enhanced settings
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: false,
        mirror: true,
        offset: 100,
        delay: 100
    });

    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Close mobile menu if open
                    if (mobileMenu) {
                        mobileMenu.classList.add('hidden');
                        document.body.classList.remove('overflow-hidden');
                    }
                    
                    // Smooth scroll to target
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without page reload
                    history.pushState(null, null, href);
                }
            }
        });
    });

    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Newsletter form submission with Web3Forms
    const newsletterForm = document.querySelector('form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const button = this.querySelector('button[type="submit"]');
            const originalButtonText = button.textContent;
            
            // Show loading state
            button.disabled = true;
            button.innerHTML = '<span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span> Sending...';
            
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    showAlert('success', 'Thank you for subscribing!');
                    newsletterForm.reset();
                } else {
                    showAlert('error', 'Something went wrong. Please try again.');
                }
            } catch (error) {
                showAlert('error', 'Sorry, something went wrong. Please try again later.');
            } finally {
                button.disabled = false;
                button.textContent = originalButtonText;
            }
        });
    }

    // Custom Video Player Controls
    const video = document.getElementById('homeVideo');
    const playButton = document.getElementById('playButton');

    if (video && playButton) {
        // Play/Pause functionality
        playButton.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playButton.style.opacity = '0';
                setTimeout(() => {
                    playButton.style.display = 'none';
                }, 300);
            } else {
                video.pause();
                playButton.style.display = 'flex';
                setTimeout(() => {
                    playButton.style.opacity = '1';
                }, 10);
            }
        });

        // Show play button when video ends
        video.addEventListener('ended', () => {
            playButton.style.display = 'flex';
            setTimeout(() => {
                playButton.style.opacity = '1';
            }, 10);
        });

        // Show play button when video is paused
        video.addEventListener('pause', () => {
            playButton.style.display = 'flex';
            setTimeout(() => {
                playButton.style.opacity = '1';
            }, 10);
        });

        // Hide play button when video is playing
        video.addEventListener('play', () => {
            playButton.style.opacity = '0';
            setTimeout(() => {
                playButton.style.display = 'none';
            }, 300);
        });

        // Click on video to toggle play/pause
        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    }
    
    // Scroll to top functionality
    const scrollToTopButton = document.getElementById('scrollToTop');
    
    if (scrollToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopButton.classList.add('opacity-100');
                scrollToTopButton.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                scrollToTopButton.classList.add('opacity-0', 'pointer-events-none');
                scrollToTopButton.classList.remove('opacity-100');
            }
        });
        
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroImage = heroSection.querySelector('img');
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrolled * 0.4}px)`;
            }
        });
    }
    
    // Add intersection observer for custom animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                } else {
                    entry.target.classList.remove('animated');
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
});

// Custom alert function
function showAlert(type, message) {
    // Check if there's already an alert container
    let alertContainer = document.getElementById('alert-container');
    
    // If not, create one
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.id = 'alert-container';
        alertContainer.classList.add(
            'fixed', 'top-0', 'left-0', 'right-0', 'z-50',
            'flex', 'flex-col', 'items-center', 'p-4',
            'pointer-events-none'
        );
        document.body.appendChild(alertContainer);
    }
    
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.classList.add(
        'max-w-md', 'w-full', 'mb-3',
        'p-4', 'rounded-lg', 'shadow-lg', 
        'transform', 'transition-all', 'duration-300',
        'translate-y-0', 'opacity-0',
        'pointer-events-auto'
    );
    
    // Set alert type styles
    if (type === 'success') {
        alertDiv.classList.add('bg-green-100', 'text-green-800', 'border-l-4', 'border-green-500');
    } else if (type === 'error') {
        alertDiv.classList.add('bg-red-100', 'text-red-800', 'border-l-4', 'border-red-500');
    } else if (type === 'info') {
        alertDiv.classList.add('bg-blue-100', 'text-blue-800', 'border-l-4', 'border-blue-500');
    }
    
    // Create content
    alertDiv.innerHTML = `
        <div class="flex items-center">
            <div class="flex-shrink-0">
                ${type === 'success' 
                    ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
                    : type === 'error'
                        ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
                        : '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
                }
            </div>
            <div class="ml-3 flex-grow">
                <p class="text-sm font-medium">${message}</p>
            </div>
            <div class="ml-auto pl-3">
                <button class="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    // Add to container
    alertContainer.appendChild(alertDiv);
    
    // Animate in
    setTimeout(() => {
        alertDiv.classList.remove('translate-y-0', 'opacity-0');
        alertDiv.classList.add('translate-y-4', 'opacity-100');
    }, 10);
    
    // Add close button functionality
    const closeButton = alertDiv.querySelector('button');
    closeButton.addEventListener('click', () => {
        removeAlert();
    });
    
    // Auto remove after 5 seconds
    const timeout = setTimeout(() => {
        removeAlert();
    }, 5000);
    
    function removeAlert() {
        clearTimeout(timeout);
        alertDiv.classList.remove('translate-y-4', 'opacity-100');
        alertDiv.classList.add('translate-y-0', 'opacity-0');
        
        setTimeout(() => {
            alertDiv.remove();
            
            // If no more alerts, remove the container
            if (alertContainer.children.length === 0) {
                alertContainer.remove();
            }
        }, 300);
    }
}

// Image lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
});

// Add intersection observer for fade-in animations
const fadeElems = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

fadeElems.forEach(elem => {
    appearOnScroll.observe(elem);
});

// Handle form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        if (!form.id === 'newsletter-form') {
            e.preventDefault();
            
            // Add loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner inline-block"></span>';
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                showAlert('success', 'Thank you for your submission!');
                form.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 1500);
        }
    });
});

// Add tooltip functionality
document.querySelectorAll('.tooltip').forEach(tooltip => {
    const text = tooltip.getAttribute('data-tooltip');
    if (text) {
        const tooltipText = document.createElement('span');
        tooltipText.classList.add('tooltip-text');
        tooltipText.textContent = text;
        tooltip.appendChild(tooltipText);
    }
});

// Handle video modal
document.querySelectorAll('[data-video]').forEach(button => {
    button.addEventListener('click', () => {
        const videoUrl = button.getAttribute('data-video');
        const modal = document.createElement('div');
        modal.classList.add('fixed', 'inset-0', 'bg-black/75', 'flex', 'items-center', 'justify-center', 'z-50');
        modal.innerHTML = `
            <div class="relative w-full max-w-4xl mx-4">
                <button class="absolute -top-10 right-0 text-white text-xl">&times; Close</button>
                <div class="aspect-video">
                    <iframe src="${videoUrl}" class="w-full h-full" frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        modal.querySelector('button').addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = '';
        });
    });
});

// Add keyboard controls
document.addEventListener('keydown', (e) => {
    if (document.activeElement === video) {
        switch (e.key.toLowerCase()) {
            case ' ':
            case 'k':
                e.preventDefault();
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
                break;
            case 'arrowleft':
                e.preventDefault();
                video.currentTime = Math.max(0, video.currentTime - 5);
                break;
            case 'arrowright':
                e.preventDefault();
                video.currentTime = Math.min(video.duration, video.currentTime + 5);
                break;
        }
    }
}); 