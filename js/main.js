// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// Smooth scroll for anchor links
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

// Newsletter form submission with EmailJS
document.getElementById('newsletter-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    const button = this.querySelector('button[type="submit"]');
    const originalButtonText = button.textContent;
    
    // Show loading state
    button.disabled = true;
    button.innerHTML = '<span class="spinner inline-block"></span>';
    
    emailjs.init("mMR0HKDiMJIwwW0ZC");
    
    emailjs.send("service_id", "template_id", {
        email: email,
        to_name: "Admin"
    }).then(
        function(response) {
            showAlert('success', 'Thank you for subscribing!');
            document.getElementById('newsletter-form').reset();
        },
        function(error) {
            showAlert('error', 'Sorry, something went wrong. Please try again later.');
        }
    ).finally(() => {
        button.disabled = false;
        button.textContent = originalButtonText;
    });
});

// Scroll to top button
const scrollToTopButton = document.createElement('button');
scrollToTopButton.classList.add('scroll-to-top');
scrollToTopButton.innerHTML = `
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
    </svg>
`;
document.body.appendChild(scrollToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.classList.add('visible');
    } else {
        scrollToTopButton.classList.remove('visible');
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Custom alert function
function showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', `alert-${type}`, 'fixed', 'top-4', 'right-4', 'z-50', 'animate-fadeInUp');
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.opacity = '0';
        setTimeout(() => {
            alertDiv.remove();
        }, 300);
    }, 3000);
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

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
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

// Custom Video Player Controls
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('homeVideo');
    const playButton = document.getElementById('playButton');

    if (video && playButton) {
        // Play/Pause functionality
        playButton.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playButton.classList.add('hidden');
            } else {
                video.pause();
                playButton.classList.remove('hidden');
            }
        });

        // Show play button when video ends
        video.addEventListener('ended', () => {
            playButton.classList.remove('hidden');
        });

        // Show play button when video is paused
        video.addEventListener('pause', () => {
            playButton.classList.remove('hidden');
        });

        // Hide play button when video is playing
        video.addEventListener('play', () => {
            playButton.classList.add('hidden');
        });

        // Click on video to toggle play/pause
        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playButton.classList.add('hidden');
            } else {
                video.pause();
                playButton.classList.remove('hidden');
            }
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
                            playButton.classList.add('hidden');
                        } else {
                            video.pause();
                            playButton.classList.remove('hidden');
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
    }
}); 