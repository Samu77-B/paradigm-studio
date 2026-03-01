// Component loader for reusable HTML components
class ComponentLoader {
    static async loadComponent(componentPath, targetElementId) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            const targetElement = document.getElementById(targetElementId);
            if (targetElement) {
                targetElement.innerHTML = html;
            } else {
                console.error(`Target element with id '${targetElementId}' not found`);
            }
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
        }
    }

    static async loadHeader() {
        await this.loadComponent('components/header.html', 'header-component');
        // Initialize hamburger menu after header is loaded
        this.initializeHamburgerMenu();
        // Initialize smooth scrolling after header is loaded
        this.initializeSmoothScrolling();
    }

    static initializeHamburgerMenu() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        if (hamburger && navLinks) {
            // Reset animation when menu is closed
            function resetMenuAnimation() {
                const menuItems = navLinks.querySelectorAll('li');
                menuItems.forEach(item => {
                    item.style.animation = 'none';
                    item.offsetHeight; // Trigger reflow
                    item.style.animation = null;
                });
            }

            // Close menu with animation
            function closeMenu() {
                if (navLinks.classList.contains('mobile-active')) {
                    hamburger.classList.remove('active');
                    
                    // First animate the items out
                    navLinks.classList.add('closing');
                    
                    // After items finish animating, slide the panel out
                    setTimeout(() => {
                        // Remove mobile-active to trigger panel slide out
                        navLinks.classList.remove('mobile-active');
                        
                        // Wait for panel to slide out, then clean up
                        setTimeout(() => {
                            navLinks.classList.remove('closing');
                            resetMenuAnimation();
                        }, 400); // Panel slide duration
                    }, 300); // Item animation duration
                }
            }

            hamburger.addEventListener('click', function() {
                if (navLinks.classList.contains('mobile-active')) {
                    // Menu is open, close it with animation
                    closeMenu();
                } else {
                    // Menu is closed, open it
                    hamburger.classList.add('active');
                    navLinks.classList.add('mobile-active');
                    
                    // Reset animation when opening
                    setTimeout(() => {
                        resetMenuAnimation();
                    }, 10);
                }
            });

            // Close mobile menu when clicking on a link
            navLinks.addEventListener('click', function(e) {
                if (e.target.tagName === 'A') {
                    closeMenu();
                }
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                    closeMenu();
                }
            });
        }
    }

    static initializeSmoothScrolling() {
        // Enhanced smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    // Get the target position with offset for navbar
                    const navbarHeight = 80; // Approximate navbar height
                    const targetPosition = target.offsetTop - navbarHeight;
                    
                    // Smooth scroll with custom easing
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = Math.min(Math.abs(distance) / 2, 1200); // Dynamic duration based on distance
                    let start = null;

                    function easeInOutCubic(t) {
                        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                    }

                    function animation(currentTime) {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const progress = Math.min(timeElapsed / duration, 1);
                        
                        window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
                        
                        if (progress < 1) {
                            requestAnimationFrame(animation);
                        }
                    }
                    
                    requestAnimationFrame(animation);
                }
            });
        });
    }

    static async loadFooter() {
        await this.loadComponent('components/footer.html', 'footer-component');
        // Update the current year after footer is loaded
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    static async loadAllComponents() {
        await Promise.all([
            this.loadHeader(),
            this.loadFooter()
        ]);
    }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    ComponentLoader.loadAllComponents();
});
