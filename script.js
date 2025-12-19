// Configuration
const CONFIG = {
    // ⚠️ UPDATE LINK INI dengan link download APK Anda
    downloadLink: 'https://expo.dev/accounts/sirana/projects/sirana-indonesia/builds/216eeef4-3988-4f07-8d12-db2c5474a6eb',
    
    appVersion: '1.0.0',
    minAndroidVersion: '5.0',
    apkSize: '~50 MB'
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initDownloadButton();
    initFAQ();
    initScrollAnimations();
    initStatsCounter();
});

// Download Button Handler
function initDownloadButton() {
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (downloadBtn) {
        // Update download link
        downloadBtn.href = CONFIG.downloadLink;
        
        // Add click tracking
        downloadBtn.addEventListener('click', function(e) {
            // Track download (optional - integrate with analytics)
            console.log('Download initiated');
            
            // Show loading state
            const originalText = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Download...';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                downloadBtn.innerHTML = originalText;
            }, 2000);
            
            // Optional: Show download instructions
            showDownloadInstructions();
        });
    }
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.feature-card, .step, .faq-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Animated Stats Counter
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = target.textContent;
                
                // Check if it's a number
                if (value.includes('+')) {
                    const num = parseInt(value.replace(/\D/g, ''));
                    animateCounter(target, 0, num, 2000);
                } else if (!isNaN(parseFloat(value))) {
                    const num = parseFloat(value);
                    animateCounter(target, 0, num, 2000, 1);
                }
                
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, start, end, duration, decimals = 0) {
    const startTime = performance.now();
    const suffix = element.textContent.includes('+') ? '+' : '';
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (end - start) * easeOutQuad(progress);
        element.textContent = current.toFixed(decimals) + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function easeOutQuad(t) {
    return t * (2 - t);
}

// Show Download Instructions Modal (Optional)
function showDownloadInstructions() {
    // You can implement a modal here if needed
    console.log('Download started - instructions can be shown here');
}

// Smooth Scroll for anchor links
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

// Track page visibility (optional - for analytics)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});

// Check if user is on mobile device
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Show appropriate message based on device
if (isMobileDevice()) {
    console.log('Mobile device detected');
    // You can show mobile-specific instructions here
} else {
    console.log('Desktop device detected');
    // You can show QR code for mobile download here
}

// Optional: Add QR Code for desktop users
function generateQRCode() {
    // You can use a QR code library like qrcode.js
    // This is just a placeholder
    const qrContainer = document.createElement('div');
    qrContainer.className = 'qr-code-container';
    qrContainer.innerHTML = `
        <div class="qr-code">
            <p>Scan QR code to download on mobile</p>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(CONFIG.downloadLink)}" alt="QR Code">
        </div>
    `;
    
    // Add to page if on desktop
    if (!isMobileDevice()) {
        // You can append this to download section
        console.log('QR code can be displayed for desktop users');
    }
}

// Optional: Check for updates
async function checkForUpdates() {
    // Implement version checking logic here
    console.log('Checking for updates...');
    // Compare current version with latest version from API
}

// Error handling for download
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
});

// Console welcome message
console.log('%c🌿 SIRANA Indonesia ', 'color: #7D3740; font-size: 24px; font-weight: bold;');
console.log('%cSistem Pelaporan Lingkungan', 'color: #1E6B5C; font-size: 14px;');
console.log('%cVersion: ' + CONFIG.appVersion, 'color: #666; font-size: 12px;');