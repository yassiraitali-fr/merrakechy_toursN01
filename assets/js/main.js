/*
==============================================
Main JavaScript for Merrakechy Tour
All interactive functionality in one file
==============================================
*/


document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // DOM Elements
    const header = document.querySelector('.site-header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const menuOverlay = document.querySelector('.menu-overlay');
    const backToTopButton = document.getElementById('backToTop');

    // Testimonials Elements
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');

    // Forms
    const newsletterForm = document.querySelector('.newsletter-form');
    const footerNewsletterForm = document.querySelector('.footer-newsletter-form');
    const quickBookingForm = document.querySelector('.quick-booking-form');

    // Animation Elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

    // Date Picker
    const datePicker = document.getElementById('travel-date');

    /*
     * Mobile Menu Functionality
     */
    if (mobileMenuToggle && mainNav) {
        // Toggle mobile menu
        mobileMenuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');

            // Toggle menu overlay
            if (menuOverlay) {
                menuOverlay.classList.toggle('active');
            }

            // Prevent body scrolling when menu is open
            document.body.classList.toggle('menu-open');
            if (document.body.classList.contains('menu-open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on overlay
        if (menuOverlay) {
            menuOverlay.addEventListener('click', function () {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                this.classList.remove('active');
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
            });
        }

        // Close menu when clicking on nav links
        const navLinks = mainNav.querySelectorAll('.nav-links a');
        if (navLinks.length > 0) {
            navLinks.forEach(link => {
                link.addEventListener('click', function () {
                    mobileMenuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    if (menuOverlay) menuOverlay.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    document.body.style.overflow = '';
                });
            });
        }
    }

    /*
     * Sticky Header
     */
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
                if (backToTopButton) backToTopButton.classList.add('active');
            } else {
                header.classList.remove('sticky');
                if (backToTopButton) backToTopButton.classList.remove('active');
            }
        });
    }

    /*
     * Back to Top Button
     */
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /*
     * Testimonials Slider
     */
    if (testimonialItems && testimonialItems.length > 0) {
        let currentIndex = 0;

        // Function to show a specific testimonial
        function showTestimonial(index) {
            // Handle index bounds
            if (index < 0) index = testimonialItems.length - 1;
            if (index >= testimonialItems.length) index = 0;

            // Update current index
            currentIndex = index;

            // Hide all testimonials
            testimonialItems.forEach(item => {
                item.classList.remove('active');
            });

            // Show current testimonial
            testimonialItems[currentIndex].classList.add('active');

            // Update dots
            if (dots && dots.length > 0) {
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
            }
        }

        // Initialize first testimonial
        // First item already has active class in HTML

        // Set up dot navigation
        if (dots && dots.length > 0) {
            dots.forEach((dot, i) => {
                dot.addEventListener('click', () => {
                    showTestimonial(i);
                });
            });
        }

        // Set up arrow navigation
        if (prevArrow) {
            prevArrow.addEventListener('click', () => {
                showTestimonial(currentIndex - 1);
            });
        }

        if (nextArrow) {
            nextArrow.addEventListener('click', () => {
                showTestimonial(currentIndex + 1);
            });
        }

        // Auto rotate testimonials every 5 seconds
        setInterval(() => {
            showTestimonial(currentIndex + 1);
        }, 5000);
    }

    /*
     * Form Submissions
     */

    // Newsletter Form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');

            if (emailInput && emailInput.value.trim() !== '') {
                // In a real application, you would send this to your backend or a service
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }

    // Footer Newsletter Form
    if (footerNewsletterForm) {
        footerNewsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');

            if (emailInput && emailInput.value.trim() !== '') {
                // In a real application, you would send this to your backend or a service
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }

    // Quick Booking Form
    if (quickBookingForm) {
        quickBookingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form elements with null checks
            const activityType = this.querySelector('#activity-type');
            const destination = this.querySelector('#destination');
            const travelDate = this.querySelector('#travel-date');
            const guests = this.querySelector('#guests');

            // Basic validation
            

            if (!destination || !destination.value) {
                alert('Please select a destination.');
                return;
            }

            if (!travelDate || !travelDate.value) {
                alert('Please select a travel date.');
                return;
            }

            // All validations passed
        });
    }

    /*
     * Animation on Scroll
     */
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Function to handle scroll animations
    function handleScrollAnimations() {
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('animate');
            }
        });
    }

    // Initial check for elements that might be in viewport on load
    if (animatedElements.length > 0) {
        // Slight delay to ensure DOM is fully rendered
        setTimeout(() => {
            handleScrollAnimations();
        }, 100);

        // Add scroll event handler
        window.addEventListener('scroll', handleScrollAnimations);
    }

    /*
     * Date Picker Enhancement
     */
    if (datePicker) {
        // Set minimum date to today
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();

        datePicker.min = yyyy + '-' + mm + '-' + dd;

        // Add a listener to ensure the selected date is not in the past
        datePicker.addEventListener('change', function () {
            const selectedDate = new Date(this.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset hours to compare dates only

            if (selectedDate < today) {
                alert('Please select a future date.');
                this.value = ''; // Clear the invalid date
            }
        });
    }

    /*
     * Smooth Scrolling for Anchor Links
     */
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    if (anchorLinks.length > 0) {
        anchorLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;

                    window.scrollTo({
                        top: offsetTop - 100, // Offset for fixed header
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /*
     * Image Lazy Loading Enhancement
     */
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        // Create intersection observer
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

        // Observe each image
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    /*
     * Hover Animation Effects
     */
    // Activity cards hover effect
    const activityCards = document.querySelectorAll('.activity-card');
    if (activityCards.length > 0) {
        activityCards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });
    }

    // Destination cards hover effect
    const destinationCards = document.querySelectorAll('.destination-card');
    if (destinationCards.length > 0) {
        destinationCards.forEach(card => {
            const btn = card.querySelector('.btn');

            card.addEventListener('mouseenter', function () {
                if (btn) btn.style.opacity = '1';
            });

            card.addEventListener('mouseleave', function () {
                if (btn) btn.style.opacity = '';
            });
        });
    }

    // Initialize any third-party scripts here if needed
});

// Prevent errors in older browsers
function handleErrors() {
    window.onerror = function (message, source, line, column, error) {
        console.log('Error: ' + message);
        return true; // Prevent default error handling
    };
}
handleErrors();

// Preloader
window.addEventListener('load', function () {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('fade-out');

        // Remove preloader from DOM after animation completes
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Hero Slider Functionality
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let slideInterval;

    // Function to show a specific slide (safe checks)
    function showSlide(index) {
        if (!slides || slides.length === 0) return;

        // Normalize index
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        // Reset current slide
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Reset dots if present
        if (dots && dots.length > 0) {
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
        }

        // Activate selected slide and dot (if exists)
        const slideEl = slides[index];
        if (slideEl) slideEl.classList.add('active');
        if (dots && dots[index]) dots[index].classList.add('active');

        // Update current slide index
        currentSlide = index;
    }

    // Function to show next slide
    function nextSlide() {
        if (!slides || slides.length === 0) return;
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Start automatic slideshow
    function startSlideshow() {
        if (!slides || slides.length === 0) return;
        // Prevent multiple intervals
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    }


    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval); // Stop auto slideshow when manually changing
            showSlide(index);
            startSlideshow(); // Restart slideshow
        });
    });

    // Initialize slideshow
    startSlideshow();
});

// For local form testing
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    // Check if we're on localhost or 127.0.0.1
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (contactForm && isLocalhost) {
        // For local testing only
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent actual form submission

            // Show a loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate form processing delay
            setTimeout(function () {
                // Redirect to thank you page
                window.location.href = 'thank-you.html';
            }, 1500);
        });

        // Log that we're in local test mode
        console.log('Form is in local test mode - redirects will be handled by JavaScript');
    }

    // When you're ready to deploy to production, remove or comment out this code
});

// Improved counter animation with intersection observer
document.addEventListener('DOMContentLoaded', function () {
    // Counter Animation with Intersection Observer
    const counters = document.querySelectorAll('.counter');
    const counterSuffixes = document.querySelectorAll('.counter-suffix');
    let counted = false;

    // Function to animate counting
    function startCounting() {
        if (counted) return;
        counted = true;

        // Add animation class to counter elements and suffixes
        counterSuffixes.forEach(suffix => {
            suffix.classList.add('animate');
        });

        counters.forEach(counter => {
            counter.classList.add('animate');

            const target = parseInt(counter.getAttribute('data-target'));
            let count = 0;
            const duration = 2000; // 2 seconds
            const frameDuration = 1000 / 60; // 60fps
            const totalFrames = Math.round(duration / frameDuration);
            const increment = target / totalFrames;

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };

            requestAnimationFrame(updateCount);
        });
    }

    // Setup Intersection Observer to trigger counting when stats section is visible
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounting();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    }

    // Activities Tabs
    const activityTabs = document.querySelectorAll('.activity-tab');
    const activityContents = document.querySelectorAll('.activity-content');

    activityTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            activityTabs.forEach(t => t.classList.remove('active'));
            activityContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Show corresponding content
            const activity = tab.getAttribute('data-activity');
            document.getElementById(activity).classList.add('active');
        });
    });

    // Ensure at least one activity tab is active
    if (activityTabs.length > 0 && activityContents.length > 0) {
        const firstTab = activityTabs[0];
        const firstContent = activityContents[0];

        if (!document.querySelector('.activity-tab.active')) {
            firstTab.classList.add('active');
        }

        if (!document.querySelector('.activity-content.active')) {
            firstContent.classList.add('active');
        }
    }
});

// gallery filtering JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Gallery Filtering - Fixed version
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentFilter = 'all'; // Track the current filter

    // Function to apply filtering without animation conflicts
    const applyFilter = (filterValue) => {
        // Skip if clicking the same filter again
        if (filterValue === currentFilter) return;

        // Update current filter
        currentFilter = filterValue;

        // Reset all items first - make sure all items have proper styling
        galleryItems.forEach(item => {
            item.style.opacity = '';
            item.style.transform = '';
            item.style.display = '';
            item.classList.remove('hidden');
        });

        // Apply the actual filtering
        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            if (filterValue === 'all' || itemCategory === filterValue) {
                item.classList.remove('hidden');
                item.style.display = 'block';
                // Slight delay for smooth appearance
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.classList.add('hidden');
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                // Hide after fade out
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });

        // Update load more button visibility
        updateLoadMoreButton();
    };

    // Add click handlers for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state on buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Get and apply the filter
            const filterValue = button.getAttribute('data-filter');
            applyFilter(filterValue);

            // Reset the items to show count when changing filters
            itemsToShow = initialItems;
        });
    });

    // Load More Functionality
    const loadMoreBtn = document.getElementById('load-more-btn');
    const initialItems = 12; // Number of items to show initially
    let itemsToShow = initialItems;

    // Function to update load more button visibility
    const updateLoadMoreButton = () => {
        const visibleItems = Array.from(galleryItems).filter(
            item => !item.classList.contains('hidden')
        );

        if (visibleItems.length <= itemsToShow) {
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        } else {
            if (loadMoreBtn) loadMoreBtn.style.display = 'block';
        }

        // Update which items are visible based on the current count
        visibleItems.forEach((item, index) => {
            if (index < itemsToShow) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    };

    // Initialize gallery display
    const initializeGallery = () => {
        // Hide items beyond initial count
        galleryItems.forEach((item, index) => {
            if (index >= initialItems) {
                item.style.display = 'none';
            }
        });

        updateLoadMoreButton();
    };

    // Load more button click handler
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            itemsToShow += 6; // Show 6 more items
            updateLoadMoreButton();
        });
    }

    // Initialize gallery
    initializeGallery();

    // Rest of your gallery.js code (video modal, etc.)
    // ...
});

// services.js - JavaScript for the Services Page
document.addEventListener('DOMContentLoaded', function () {
    // Sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-menu li a');
    const contentSections = document.querySelectorAll('.content-section');

    // Function to set active section
    const setActiveSection = (sectionId) => {
        // Remove active class from all links and sections
        sidebarLinks.forEach(link => {
            link.parentElement.classList.remove('active');
        });

        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        // Add active class to clicked link
        const activeLink = document.querySelector(`.sidebar-menu li a[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.parentElement.classList.add('active');
        }

        // Show the selected section
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.add('active');
        }

        // Update URL hash
        window.location.hash = sectionId;

        setTimeout(() => {
            initializeEventListeners();
        }, 100);
    };

    // Click event for sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            setActiveSection(sectionId);
        });
    });

    // Check for URL hash on page load
    const checkUrlHash = () => {
        if (window.location.hash) {
            const sectionId = window.location.hash.substring(1);
            setActiveSection(sectionId);
        } else {
            // Set first section as active by default
            const firstSection = document.querySelector('.content-section');
            if (firstSection) {
                setActiveSection(firstSection.id);
            }
        }
    };

    // Initialize hash check
    checkUrlHash();

    // Service data (would likely come from a database in a real application)
    const serviceDetails = {

        'camel-trek': {
            title: 'Desert Camel Trek',
            description: `<p>Experience the magic of the Sahara Desert with our guided camel trek. This immersive desert adventure takes you through rolling golden dunes as the sun paints the landscape in vibrant colors.</p>
                         <p>Led by experienced local guides, you'll learn about desert life and nomadic traditions while enjoying the peaceful rhythm of camel travel - a method of transport used for centuries across the Saharan expanse.</p>
                         <p>This activity is suitable for all ages and provides excellent photo opportunities of Morocco's iconic desert landscapes. After your trek, relax with traditional mint tea while watching the sunset over the dunes.</p>`,
            duration: '3 hours',
            location: 'Merzouga, Morocco',
            price: 45,
            groupSize: '1-10 people',
            includes: [
                'Professional local guide',
                'Camel ride',
                'Safety equipment',
                'Traditional Moroccan refreshments',
                'Photo stops at scenic viewpoints'
            ],

            schedule: 'Daily departures at sunrise and 2 hours before sunset',
            difficulty: 'Easy - suitable for all fitness levels',
            whatToBring: [
                'Comfortable clothing',
                'Sunscreen and sunglasses',
                'Hat or head covering',
                'Camera',
                'Water bottle'
            ],
            image: '../assets/images/services/camel-trek-large.jpg',
            rating: 4.7,
            reviews: 128
        },
        'quad-biking': {
            title: 'Quad Biking Adventure',
            description: `<p>Get your adrenaline pumping with our guided quad biking adventure through the unique terrain of the Agafay Desert. Navigate thrilling trails across a lunar-like landscape just outside Marrakech.</p>
                          <p>After a thorough safety briefing and practice session, you'll follow your experienced guide through varied terrain - from rocky paths to small dunes and open plains. Stop at panoramic viewpoints to capture stunning photographs of the Atlas Mountains in the distance.</p>
                          <p>This exciting activity combines adventure with natural beauty, giving you a unique perspective on Morocco's diverse landscapes. No previous quad biking experience is necessary, making it accessible to beginners while still thrilling for experienced riders.</p>`,
            duration: '2 hours',
            location: 'Agafay Desert, near Marrakech',
            price: 65,
            groupSize: '1-8 people',
            includes: [
                'Quad bike rental and fuel',
                'Safety equipment (helmet, goggles, gloves)',
                'Professional guide',
                'Safety briefing and practice session',
                'Bottled water',
                'Hotel pickup and drop-off (Marrakech area)'
            ],
            schedule: 'Multiple daily departures',
            difficulty: 'Easy to moderate - no previous experience required',
            whatToBring: [
                'Closed shoes',
                'Sunglasses',
                'Bandana or scarf (for dust)',
                'Long pants recommended',
                'Sunscreen'
            ],
            image: '../assets/images/services/quad-biking-large.jpg',
            rating: 4.9,
            reviews: 95
        },
        'hot-air-balloon': {
            title: 'Hot Air Balloon Ride',
            description: `<p>Soar above the Atlas Mountains with breathtaking views on a dawn hot air balloon flight. This unforgettable experience begins in the early morning as you watch the balloon inflation before gently rising into the sky.</p>
                         <p>As the sun rises, you'll drift peacefully over traditional Berber villages, mountains, and desert landscapes. Your pilot will point out significant landmarks and share stories about the region while you capture stunning photographs from this unique aerial perspective.</p>
                         <p>After landing, enjoy a traditional Berber breakfast in a local tent, complete with mint tea and freshly baked bread. You'll receive a flight certificate before returning to your accommodation with memories to last a lifetime.</p>`,
            duration: '4 hours (approx. 1 hour in the air)',
            location: 'Atlas Mountains region, near Marrakech',
            price: 195,
            groupSize: 'Up to 16 people per balloon',
            includes: [
                'Hotel pickup and return',
                'Hot air balloon flight',
                'Professional pilot',
                'Light breakfast before flight',
                'Traditional Berber breakfast after landing',
                'Flight certificate'
            ],
            schedule: 'Daily departures at dawn (weather permitting)',
            difficulty: 'Easy - no physical requirements',
            whatToBring: [
                'Warm clothing (mornings can be cool)',
                'Camera',
                'Sunglasses',
                'Hat'
            ],
            image: '../assets/images/services/hot-air-balloon-large.jpg',
            rating: 4.3,
            reviews: 62
        },
        'cooking-class': {
            title: 'Moroccan Cooking Class',
            description: `<p>Discover the secrets of Moroccan cuisine with our immersive cooking class in Marrakech. This culinary experience begins with a guided visit to a traditional market (souk) where you'll learn about local ingredients and spices that form the foundation of Moroccan cooking.</p>
                          <p>Back at our cooking school, located in a traditional riad, our expert chef will guide you through preparing several authentic Moroccan dishes such as tagine, couscous, salads, and pastries. You'll learn traditional techniques handed down through generations while enjoying a relaxed, hands-on experience.</p>
                          <p>After the class, sit down to enjoy the delicious meal you've prepared in the beautiful setting of the riad. You'll receive recipe cards to take home so you can recreate these authentic dishes and impress friends and family with your new culinary skills.</p>`,
            duration: '4 hours',
            location: 'Marrakech Medina',
            price: 75,
            groupSize: '2-12 people',
            includes: [
                'Market tour with ingredient shopping',
                'All ingredients and cooking equipment',
                'Hands-on preparation of multiple dishes',
                'Full meal of your own creation',
                'Recipe cards to take home',
                'Tea and refreshments throughout'
            ],
            schedule: 'Morning class (9:30am) and afternoon class (3:30pm)',
            difficulty: 'Easy - suitable for all, including beginners',
            whatToBring: [
                'Appetite',
                'Camera',
                'Notepad (if you wish to take additional notes)'
            ],
            image: '../assets/images/services/cooking-class-large.jpg',
            rating: 4.8,
            reviews: 156
        },
        // Add data for all other services - tours, transportation, etc.
        'sahara-tour': {
            title: '2-Day Zagora Desert Tour – A Saharan Adventure from Marrakech',
            description: `<p>Embark on an unforgettable journey from Marrakech for a unique experience in the heart of the Zagora Desert. Whether in a small group or private setting, you’ll cross the spectacular landscapes of the High Atlas Mountains via the legendary Tizi n’Tichka pass, which peaks at 2,260 meters above sea level. Along the way, visit the famous UNESCO-listed Aït Ben Haddou Kasbah and stop in Ouarzazate, known as "the gateway to the desert."

                   By late afternoon, you'll arrive in Zagora, where a camel awaits to take you on a ride through the dunes, perfectly timed with the sunset. You’ll then reach a Berber campsite for a magical evening under the stars, featuring a traditional dinner, campfire, and authentic Saharan ambiance.

                   The next morning, after breakfast in the desert, the journey back to Marrakech begins with scenic stops along the way to admire mud-brick villages, lush palm groves, and the unique valleys of southern Morocco.

                   This tour is ideal for travelers looking to experience the spirit of the Sahara in a short time—blending culture, landscapes, and tradition.</p>`,
            duration: '2 days, 1 nights',
            location: 'Marrakech to Zagora Desert',
            price: 295,
            groupSize: '2-16 people',
            includes: [
                'Transportation in 4x4 vehicle or minibus',
                'English/French speaking driver/guide',
                'Accommodation (1 night in desert camp, 1 night in hotel)',
                'Breakfast and dinner daily',
                'Camel trekking in the desert',
                'Cultural experiences and photo stops'
            ],
            schedule: 'Departures every day',
            difficulty: 'Easy to moderate - some walking required',
            whatToBring: [
                'Comfortable clothing and walking shoes',
                'Warm clothes for desert nights',
                'Hat and sunscreen',
                'Personal toiletries',
                'Camera'
            ],
            image: '../assets/images/services/sahara-tour-large.jpg',
            rating: 4.9,
            reviews: 243
        },
        'marrakech-tour': {
            title: 'Ourika Valley Excursion',
            description: `<p>Discover the Ourika Valley, one of the closest natural gems to Marrakech. Nestled at the foot of the Atlas Mountains, this lush valley is renowned for its breathtaking scenery, traditional Berber villages, and refreshing waterfalls.
                  Your day includes a visit to a local souk, a traditional Berber home, and a hike to the Setti-Fatma waterfalls, all accompanied by a professional driver. Enjoy a peaceful lunch by the river in the heart of nature.
                  An ideal getaway to escape the city and immerse yourself in the authenticity of the Moroccan countryside..</p>`,
            duration: '1 day (6-7 hours)',
            location: 'Marrakech',
            price: 55,
            groupSize: '2-12 people',
            includes: [
                'Professional certified guide',
                'Entry fees to monuments',
                'Hotel pickup and drop-off',
                'Bottled water',
                'Traditional Moroccan tea break'
            ],
            schedule: 'Daily departures at 9:00 AM',
            difficulty: 'Easy - moderate walking required',
            whatToBring: [
                'Comfortable walking shoes',
                'Sun protection',
                'Camera',
                'Small amount of cash for souvenirs'
            ],
            image: '../assets/images/services/marrakech-tour-large.jpg',
            rating: 4.7,
            reviews: 189
        },
        'chefchaouen-tour': {
            title: 'Imlil and the High Atlas Excursion – An Immersive Journey into Berber Mountain Life',
            description: `<p>Set off to discover Imlil, a charming village nestled at the foot of Mount Toubkal, the highest peak in North Africa. Just 1.5 hours from Marrakech, this excursion offers a peaceful and authentic experience in the heart of the High Atlas.
                With a local guide, explore mountain trails, pass through Berber villages clinging to the valley slopes, and take in terraced orchards, clear rivers, and breathtaking landscapes. Enjoy a tea break with a local family or a traditional lunch in a Berber home for a warm and genuine cultural exchange.
                Accessible to everyone, this day trip combines nature, culture, and gentle hiking—an invigorating escape from the city's hustle and bustle.</p>`,
            duration: '1 day (6-7 hours)',
            location: 'Imlil',
            price: 55,
            groupSize: '2-12 people',
            includes: [
                'Professional certified guide',
                'Entry fees to monuments',
                'Hotel pickup and drop-off',
                'Bottled water',
                'Traditional Moroccan tea break'
            ],
            schedule: 'Daily departures at 9:00 AM',
            difficulty: 'Easy - moderate walking required',
            whatToBring: [
                'Comfortable walking shoes',
                'Sun protection',
                'Camera',
                'Small amount of cash for souvenirs'
            ],
            image: '../assets/images/services/marrakech-tour-large.jpg',
            rating: 4.7,
            reviews: 189
        },
        'atlas-tour': {
            title: 'Berber Adventure – Full-Day Excursion to the 3 Valleys from Marrakech',
            description: `<p>Set out to explore Imlil, a charming village nestled at the foot of Mount Toubkal, the highest peak in North Africa. Just 1.5 hours from Marrakech, this excursion immerses you in the peaceful and authentic atmosphere of the High Atlas Mountains.
                    Guided by a local expert, hike along scenic mountain trails, pass through Berber villages perched on valley slopes, and take in terraced orchards, clear rivers, and breathtaking landscapes. Enjoy a tea break with a local family or a traditional lunch in a Berber home—an unforgettable moment of connection and warmth.
                    Accessible to everyone, this day of gentle hiking, nature, and cultural discovery is a refreshing escape from the bustle of the city.</p>`,
            duration: '1 day (6-7 hours)',
            location: 'Marrakech',
            price: 55,
            groupSize: '2-12 people',
            includes: [
                'Professional certified guide',
                'Entry fees to monuments',
                'Hotel pickup and drop-off',
                'Bottled water',
                'Traditional Moroccan tea break'
            ],
            schedule: 'Daily departures at 9:00 AM',
            difficulty: 'Easy - moderate walking required',
            whatToBring: [
                'Comfortable walking shoes',
                'Sun protection',
                'Camera',
                'Small amount of cash for souvenirs'
            ],
            image: '../assets/images/services/marrakech-tour-large.jpg',
            rating: 4.7,
            reviews: 189
        },
        'airport-transfer': {
            title: 'Airport Transfer Service',
            description: `<p>Our reliable airport transfer service provides seamless transportation between any Moroccan airport and your accommodation. Travel in comfort with our professional drivers who will track your flight and wait for you even if it's delayed.</p>
                <p>Skip the taxi queues and avoid the stress of navigating public transportation in an unfamiliar city. Our drivers will meet you at the arrivals hall with a name sign and help with your luggage.</p>
                <p>We offer a range of vehicles from standard cars to luxury vehicles and minivans, all well-maintained and air-conditioned for your comfort. Flat rates with no hidden fees mean you can budget with confidence.</p>`,
            duration: 'Varies by location',
            location: 'All Moroccan airports',
            price: 25,
            groupSize: '1-6 people (larger groups available)',
            includes: [
                'Professional English-speaking driver',
                'Flight tracking',
                'Meet & greet service',
                'Door-to-door service',
                'Waiting time (60 minutes for international, 30 minutes for domestic)',
                'Bottled water'
            ],
            schedule: '24/7 service, 365 days a year',
            difficulty: 'Easy - no effort required',
            whatToBring: [
                'Your flight details',
                'Accommodation address',
                'Phone number for contact',
                'Passport/ID'
            ],
            image: '../assets/images/services/airport-transfer-large.jpg',
            rating: 4.8,
            reviews: 320
        },
        'private-driver': {
            title: 'Private Driver & Car',
            description: `<p>Explore Morocco at your own pace with our private driver service. Whether you're visiting for a day or several weeks, having a dedicated driver gives you the freedom to customize your itinerary while enjoying the comfort and convenience of private transportation.</p>
                <p>Our professional drivers are not just chauffeurs but knowledgeable locals who can offer insights about the country, suggest hidden gems, and help navigate cultural nuances. They're trained to prioritize your safety and comfort throughout your journey.</p>
                <p>Choose from our fleet of comfortable sedans, spacious SUVs, or luxury vehicles depending on your preferences and group size. All vehicles are well-maintained, air-conditioned, and equipped with amenities for a pleasant journey.</p>`,
            duration: 'Half-day to multi-day options',
            location: 'Available throughout Morocco',
            price: 85,
            groupSize: '1-4 people (larger vehicles available)',
            includes: [
                'Professional licensed driver',
                'Fuel and vehicle costs',
                'Bottled water',
                'Air-conditioned vehicle',
                'Flexible itinerary',
                'Local recommendations'
            ],
            schedule: 'Available daily, advance booking recommended',
            difficulty: 'Easy - no effort required',
            whatToBring: [
                'Itinerary ideas',
                'Comfortable clothing',
                'Sun protection',
                'Camera'
            ],
            image: '../assets/images/services/private-driver-large.jpg',
            rating: 4.9,
            reviews: 175
        },
        'group-transfer': {
            title: 'Group Transfer Service',
            description: `<p>Our economical shared transfer service connects major Moroccan cities and tourist destinations. This is an ideal option for budget-conscious travelers who don't mind sharing transportation with other visitors.</p>
                <p>Our comfortable minivans and small buses run on regular schedules between popular destinations like Marrakech, Fes, Casablanca, Essaouira, and Chefchaouen. Enjoy air-conditioned vehicles and professional drivers at a fraction of the cost of private transfers.</p>
                <p>While group transfers follow set schedules and routes, we ensure convenient pickup and drop-off points in city centers or directly from major hotels. This service balances affordability with comfort and reliability.</p>`,
            duration: 'Varies by route',
            location: 'Between major Moroccan cities',
            price: 15,
            groupSize: 'Up to 16 people',
            includes: [
                'Shared air-conditioned vehicle',
                'Professional driver',
                'Luggage allowance (1 large bag + 1 small bag)',
                'Rest stops on longer journeys',
                'Hotel pickup in some cities'
            ],
            schedule: 'Daily departures on popular routes',
            difficulty: 'Easy - minimal walking required',
            whatToBring: [
                'Small bag for essentials',
                'Snacks for longer journeys',
                'Entertainment (book, music, etc.)',
                'Contact details of accommodation'
            ],
            image: '../assets/images/services/group-transfer-large.jpg',
            rating: 4.6,
            reviews: 208
        },
        'luxury-transport': {
            title: 'Luxury Transport Service',
            description: `<p>Experience Morocco in ultimate comfort with our premium transportation service. Our luxury vehicles and VIP treatment ensure you travel in style, whether for a special occasion, business trip, or simply to add an extra touch of elegance to your Moroccan adventure.</p>
                <p>Choose from our fleet of high-end vehicles including luxury sedans, SUVs, and Mercedes V-Class vans. All vehicles feature premium leather interiors, climate control, and amenities to make your journey comfortable and memorable.</p>
                <p>Our drivers are specially trained to provide discreet, professional service with attention to detail. From helping with luggage to maintaining privacy, they ensure your journey is smooth and enjoyable. Additional services like refreshments, Wi-Fi, and customized routes are available upon request.</p>`,
            duration: 'Flexible - hourly, daily, or weekly',
            location: 'Available throughout Morocco',
            price: 150,
            groupSize: 'Varies by vehicle (1-7 people)',
            includes: [
                'Premium vehicle with professional driver',
                'Complimentary premium bottled water',
                'Wi-Fi in vehicle',
                'Leather interior and climate control',
                'Personalized meet & greet',
                'Flexible scheduling'
            ],
            schedule: 'Available 24/7 with advance booking',
            difficulty: 'Easy - door-to-door service',
            whatToBring: [
                'Just your personal items',
                'Specific requests for your journey'
            ],
            image: '../assets/images/services/luxury-transport-large.jpg',
            rating: 5.0,
            reviews: 87
        }
    };


    // Make serviceDetails globally available
    window.serviceDetails = serviceDetails;

    // Destination data
    const destinationDetails = {
        marrakech: {
            title: 'Marrakech',
            subtitle: 'The Red City',
            description: `<p>Marrakech, known as the "Red City" for its distinctive terracotta buildings, is a vibrant cultural hub that combines ancient traditions with modern luxuries. Founded in 1062, this imperial city has been a center of trade, culture, and religious significance for centuries.</p>
                          <p>The heart of Marrakech is its historic medina, a UNESCO World Heritage site, where you can lose yourself in a maze of narrow alleyways filled with souks (markets) selling everything from intricate handicrafts to aromatic spices. At its center lies the famous Jemaa el-Fnaa square, which transforms from a bustling marketplace by day to an open-air entertainment venue by night.</p>
                          <p>Beyond the medina walls, modern Marrakech offers upscale resorts, world-class restaurants, and contemporary art galleries. The city's unique blend of Berber, Arab, and French influences creates an unforgettable cultural experience that captivates travelers from around the world.</p>`,
            highlights: [
                {
                    title: 'Jemaa el-Fnaa',
                    description: 'The bustling main square filled with food stalls, performers, and vendors',
                    icon: 'fas fa-map-marker'
                },
                {
                    title: 'Bahia Palace',
                    description: 'A stunning 19th-century palace showcasing Moroccan architecture and gardens',
                    icon: 'fas fa-monument'
                },
                {
                    title: 'Majorelle Garden',
                    description: 'Botanical garden with vibrant blue buildings and exotic plants',
                    icon: 'fas fa-leaf'
                },
                {
                    title: 'Medina Souks',
                    description: 'Traditional markets selling crafts, spices, textiles, and more',
                    icon: 'fas fa-shopping-basket'
                }
            ],
            image: '../assets/images/destinations/marrakech-large.jpg'
        },
        fes: {
            title: 'Fes',
            subtitle: 'Morocco\'s Cultural Capital',
            description: `<p>Fes (or Fez) is Morocco's oldest imperial city and a remarkable living museum. Founded in the 9th century, it houses the world's oldest university, the University of Al Quaraouiyine, established in 859 CE. The city's historical significance and well-preserved medieval architecture make it a UNESCO World Heritage site.</p>
                          <p>The ancient medina of Fes el-Bali is the largest car-free urban area in the world, with over 9,000 winding streets and alleyways that challenge visitors' sense of direction but reward exploration with hidden treasures at every turn. Here, traditional artisans still practice centuries-old crafts using techniques passed down through generations.</p>
                          <p>Fes represents the spiritual and cultural heart of Morocco, where religious institutions, architectural marvels, and traditional ways of life coexist in a fascinating blend of past and present. The city's atmospheric streets, historic monuments, and authentic character offer a profound journey into Moroccan heritage.</p>`,
            highlights: [
                {
                    title: 'Al-Qarawiyyin Mosque and University',
                    description: 'The oldest operating university in the world, founded in 859 CE',
                    icon: 'fas fa-university'
                },
                {
                    title: 'Chouara Tannery',
                    description: 'Traditional leather tanneries operating since medieval times',
                    icon: 'fas fa-fill-drip'
                },
                {
                    title: 'Bou Inania Madrasa',
                    description: 'A 14th-century theological college with stunning Islamic architecture',
                    icon: 'fas fa-mosque'
                },
                {
                    title: 'Bab Boujloud',
                    description: 'The famous "Blue Gate" entrance to the medina',
                    icon: 'fas fa-archway'
                }
            ],
            image: '../assets/images/destinations/fes-large.jpg'
        },
        chefchaouen: {
            title: 'Chefchaouen',
            subtitle: 'The Blue Pearl of Morocco',
            description: `<p>Nestled in the Rif Mountains of northwest Morocco, Chefchaouen is instantly recognizable for its striking blue-washed buildings that create a dreamlike atmosphere. Founded in 1471 as a small fortress to fight Portuguese invasions, the city has transformed into one of Morocco's most picturesque and photogenic destinations.</p>
                         <p>There are several theories about why the buildings are painted blue - some say it was introduced by Jewish refugees in the 1930s, others that the color repels mosquitoes, or that it symbolizes the sky and heaven. Whatever the reason, the result is an enchanting azure labyrinth of narrow streets and alleyways that captivates visitors.</p>
                         <p>Beyond its famous blue hues, Chefchaouen offers a relaxed atmosphere, stunning mountain views, and a unique blend of Moroccan and Andalusian influences in its architecture and culture. It's also a gateway to the beautiful landscapes of the Rif Mountains, perfect for hiking and nature exploration.</p>`,
            highlights: [
                {
                    title: 'Blue Medina',
                    description: 'The famous blue-painted old town with countless photo opportunities',
                    icon: 'fas fa-paint-brush'
                },
                {
                    title: 'Kasbah Museum',
                    description: 'A 15th-century fortress and ethnographic museum in the city center',
                    icon: 'fas fa-landmark'
                },
                {
                    title: 'Plaza Uta el-Hammam',
                    description: 'The main square with cafes and restaurants under fig trees',
                    icon: 'fas fa-coffee'
                },
                {
                    title: 'Ras El Ma',
                    description: 'A natural spring and washing point at the edge of town',
                    icon: 'fas fa-water'
                }
            ],
            image: '../assets/images/destinations/chefchaouen-large.jpg'
        },
        sahara: {
            title: 'Sahara Desert',
            subtitle: 'The Great Desert',
            description: `<p>The Moroccan Sahara offers one of the world's most awe-inspiring landscapes - endless golden dunes stretching to the horizon under an immense sky. This portion of the world's largest hot desert provides visitors with an unforgettable experience of natural beauty and silence broken only by the whisper of shifting sands.</p>
                         <p>The gateway towns of Merzouga and M'Hamid serve as starting points for desert excursions, where travelers can ride camels over the dunes, spend nights in traditional desert camps under star-filled skies, and witness spectacular sunrises and sunsets that paint the landscape in dramatic colors.</p>
                         <p>Beyond its natural splendor, the Sahara is home to nomadic Berber tribes who have adapted to this harsh environment over centuries. Visitors have the opportunity to learn about their unique way of life and culture, adding a human dimension to this otherworldly landscape.</p>`,
            highlights: [
                {
                    title: 'Erg Chebbi',
                    description: 'Spectacular sand dunes reaching heights of up to 150 meters',
                    icon: 'fas fa-mountain'
                },
                {
                    title: 'Desert Camps',
                    description: 'Traditional Berber camps offering overnight stays under the stars',
                    icon: 'fas fa-campground'
                },
                {
                    title: 'Camel Treks',
                    description: 'The traditional way to explore the desert landscape',
                    icon: 'fas fa-horse'
                },
                {
                    title: 'Stargazing',
                    description: 'Unparalleled views of the night sky without light pollution',
                    icon: 'fas fa-star'
                }
            ],
            image: '../assets/images/destinations/desert-large.jpg'
        },
        essaouira: {
            title: 'Essaouira',
            subtitle: 'Windswept Coastal Charm',
            description: `<p>Essaouira (formerly Mogador) is a fortified coastal town on Morocco's Atlantic coast that blends Moroccan and European influences. Its whitewashed buildings with blue details, protected by 18th-century seafront ramparts, create a picturesque setting that has attracted artists and musicians for decades.</p>
                         <p>The town's medina is a UNESCO World Heritage site, known for its well-preserved Portuguese fortifications and layout. Unlike other Moroccan medinas, Essaouira's streets are organized in a grid pattern, making it relatively easy to navigate. The bustling port provides not only fresh seafood to the city's restaurants but also a fascinating glimpse into traditional fishing practices.</p>
                         <p>Constant trade winds have earned Essaouira the nickname "Wind City of Africa," making it a premier destination for windsurfing and kitesurfing. The combination of history, culture, and natural beauty creates a laid-back atmosphere that offers a refreshing contrast to Morocco's imperial cities.</p>`,
            highlights: [
                {
                    title: 'Skala de la Ville',
                    description: 'Historic sea bastion with cannons and views of the Atlantic',
                    icon: 'fas fa-fort-awesome'
                },
                {
                    title: 'Medina',
                    description: 'UNESCO-listed old town with arts, crafts, and seafood restaurants',
                    icon: 'fas fa-map'
                },
                {
                    title: 'Port of Essaouira',
                    description: 'Working fishing port with blue boats and seafood market',
                    icon: 'fas fa-anchor'
                },
                {
                    title: 'Essaouira Beach',
                    description: 'Wide sandy beach popular for kitesurfing and windsurfing',
                    icon: 'fas fa-wind'
                }
            ],
            image: '../assets/images/destinations/essaouira-large.jpg'
        },
        atlas: {
            title: 'Atlas Mountains',
            subtitle: 'Majestic Highland Landscapes',
            description: `<p>The Atlas Mountains form a magnificent natural barrier separating the Mediterranean and Atlantic coastlines from the Sahara Desert. This vast mountain range spans Morocco, Algeria, and Tunisia, with its highest peaks found in central Morocco. The tallest mountain in North Africa, Jebel Toubkal (4,167m), is a challenging but rewarding trek for hikers.</p>
                         <p>Beyond the stunning landscapes of snow-capped peaks, lush valleys, and dramatic gorges, the Atlas Mountains are home to Berber villages where traditional ways of life continue much as they have for centuries. These communities offer visitors insight into rural Moroccan culture, traditional architecture, and hospitality.</p>
                         <p>The region provides countless opportunities for outdoor adventure – from multi-day treks and mountain biking to more leisurely day hikes and cultural experiences. Throughout the changing elevations, diverse ecosystems support a rich variety of flora and fauna, including some rare and endangered species.</p>`,
            highlights: [
                {
                    title: 'Toubkal National Park',
                    description: 'Home to North Africa\'s highest peak and spectacular trekking routes',
                    icon: 'fas fa-hiking'
                },
                {
                    title: 'Berber Villages',
                    description: 'Traditional communities offering authentic cultural experiences',
                    icon: 'fas fa-home'
                },
                {
                    title: 'Ourika Valley',
                    description: 'Lush river valley with waterfalls and scenic landscapes',
                    icon: 'fas fa-tree'
                },
                {
                    title: 'Aït Benhaddou',
                    description: 'Ancient fortified village and UNESCO World Heritage site',
                    icon: 'fas fa-castle'
                }
            ],
            image: '../assets/images/destinations/atlas-large.jpg'
        }

    };

    // Function to initialize all event listeners
    function initializeEventListeners() {
        console.log("Initializing event listeners");

        // Service Details Modal
        const serviceDetailBtns = document.querySelectorAll('.service-details-btn');
        const serviceModal = document.getElementById('serviceDetailModal');

        if (!serviceModal) {
            console.error('Service modal element not found!');
            return;
        }

        const serviceModalWrapper = serviceModal.querySelector('.service-modal-wrapper');
        const serviceModalClose = serviceModal.querySelector('.modal-close');

        // Open service detail modal
        serviceDetailBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Service details button clicked');
                const serviceId = btn.getAttribute('data-service');
                console.log('Service ID:', serviceId);
                const serviceData = serviceDetails[serviceId];

                if (serviceData) {
                    // Populate modal with service details
                    serviceModalWrapper.innerHTML = `
                        <div class="service-detail-container">
                            <div class="service-detail-main">
                                <div class="service-detail-gallery">
                                    <img src="${serviceData.image || '../assets/images/services/default.jpg'}" alt="${serviceData.title}">
                                </div>
                                <div class="service-detail-content">
                                    <h2>${serviceData.title}</h2>
                                    <div class="service-detail-meta">
                                        <div class="meta-item"><i class="far fa-clock"></i> Duration: ${serviceData.duration}</div>
                                        <div class="meta-item"><i class="fas fa-map-marker-alt"></i> Location: ${serviceData.location}</div>
                                        <div class="meta-item"><i class="fas fa-users"></i> Group Size: ${serviceData.groupSize}</div>
                                        <div class="meta-item"><i class="fas fa-star"></i> Rating: ${serviceData.rating} (${serviceData.reviews} reviews)</div>
                                    </div>
                                    <div class="service-detail-description">
                                        ${serviceData.description}
                                    </div>
                                    <div class="service-detail-features">
                                        <h3>What's Included</h3>
                                        <ul class="feature-list">
                                            ${serviceData.includes.map(item => `<li><i class="fas fa-check"></i> ${item}</li>`).join('')}
                                        </ul>
                                        
                                        <h3>What to Bring</h3>
                                        <ul class="feature-list">
                                            ${serviceData.whatToBring.map(item => `<li><i class="fas fa-check"></i> ${item}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="service-detail-sidebar">
                                <div class="sidebar-box">
                                    <div class="price-box">
                                        <div class="price-label">Price From</div>
                                        <div class="price-value">€${serviceData.price}<small>/person</small></div>
                                    </div>
                                    <a href="#" class="btn btn-primary book-now-btn" data-service="${serviceId}">Book Now</a>
                                    <a href="/pages/contact.html" class="btn btn-outline contact-btn">Ask a Question</a>
                                </div>
                                
                                <div class="sidebar-box">
                                    <h3>Availability</h3>
                                    <p class="sidebar-text">${serviceData.schedule}</p>
                                </div>
                                
                                <div class="sidebar-box">
                                    <h3>Additional Information</h3>
                                    <div class="sidebar-meta">
                                        <div class="sidebar-meta-item">
                                            <span>Difficulty:</span>
                                            <span>${serviceData.difficulty}</span>
                                        </div>
                                        <div class="sidebar-meta-item">
                                            <span>Language:</span>
                                            <span>English, French, Arabic</span>
                                        </div>
                                        <div class="sidebar-meta-item">
                                            <span>Confirmation:</span>
                                            <span>Immediate</span>
                                        </div>
                                        <div class="sidebar-meta-item">
                                            <span>Cancellation:</span>
                                            <span>Free up to 24h before</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

                    // Initialize "Book Now" buttons within the modal
                    const modalBookBtns = serviceModalWrapper.querySelectorAll('.book-now-btn');
                    modalBookBtns.forEach(bookBtn => {
                        bookBtn.addEventListener('click', (e) => {
                            e.preventDefault();
                            closeServiceModal();
                            openBookingModal(serviceId);
                        });
                    });

                    // Show modal
                    serviceModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                } else {
                    console.error(`Service data not found for ID: ${serviceId}`);
                }
            });
        });

        // Close service detail modal
        const closeServiceModal = () => {
            if (serviceModal) {
                serviceModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        };

        if (serviceModalClose) {
            serviceModalClose.addEventListener('click', closeServiceModal);
        }

        if (serviceModal) {
            serviceModal.addEventListener('click', (e) => {
                if (e.target === serviceModal) {
                    closeServiceModal();
                }
            });
        }

        // Booking Modal
        const bookBtns = document.querySelectorAll('.service-book-btn');
        const bookingModal = document.getElementById('bookingModal');

        if (!bookingModal) {
            console.error('Booking modal element not found!');
            return;
        }

        const bookingForm = document.getElementById('bookingForm');
        const modalServiceTitle = bookingModal.querySelector('.service-title');
        const serviceIdInput = document.getElementById('service-id');
        const serviceNameInput = document.getElementById('service-name');
        const servicePriceInput = document.getElementById('service-price');
        const summaryService = document.getElementById('summary-service');
        const summaryDate = document.getElementById('summary-date');
        const summaryParticipants = document.getElementById('summary-participants');
        const summaryPrice = document.getElementById('summary-price');
        const summaryTotal = document.getElementById('summary-total');
        const modalClose = bookingModal.querySelector('.modal-close');
        const modalCancel = bookingModal.querySelector('.modal-cancel');

        // Open booking modal
        const openBookingModal = (serviceId) => {
            const serviceData = serviceDetails[serviceId];

            if (serviceData) {
                console.log('Opening booking modal for service:', serviceData.title);

                // Set form values
                if (modalServiceTitle) modalServiceTitle.textContent = serviceData.title;
                if (serviceIdInput) serviceIdInput.value = serviceId;
                if (serviceNameInput) serviceNameInput.value = serviceData.title;
                if (servicePriceInput) servicePriceInput.value = serviceData.price;

                // Set summary values
                if (summaryService) summaryService.textContent = serviceData.title;
                if (summaryDate) summaryDate.textContent = 'Select a date';
                updateParticipantsSummary();
                updatePriceSummary(serviceData.price);

                // Show modal
                bookingModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            } else {
                console.error(`Service data not found for ID: ${serviceId}`);
            }
        };

        // Initialize book now buttons
        bookBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Book now button clicked');
                const serviceId = btn.getAttribute('data-service');
                console.log('Service ID for booking:', serviceId);
                openBookingModal(serviceId);
            });
        });

        // Close booking modal
        const closeBookingModal = () => {
            if (bookingModal) {
                bookingModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        };

        if (modalClose) {
            modalClose.addEventListener('click', closeBookingModal);
        }

        if (modalCancel) {
            modalCancel.addEventListener('click', (e) => {
                e.preventDefault();
                closeBookingModal();
            });
        }

        if (bookingModal) {
            bookingModal.addEventListener('click', (e) => {
                if (e.target === bookingModal) {
                    closeBookingModal();
                }
            });
        }

        // Form field change handlers
        const dateInput = document.getElementById('date');
        const adultsSelect = document.getElementById('adults');
        const childrenSelect = document.getElementById('children');

        // Date picker initialization
        if (dateInput && typeof flatpickr !== 'undefined') {
            // Initialize date picker with flatpickr
            flatpickr(dateInput, {
                minDate: "today",
                dateFormat: "Y-m-d",
                disable: [
                    function (date) {
                        // Disable dates in the past
                        return date < new Date().setHours(0, 0, 0, 0);
                    }
                ],
                onChange: function (selectedDates, dateStr) {
                    if (summaryDate) summaryDate.textContent = dateStr;
                }
            });
        } else if (dateInput) {
            // Fallback for when flatpickr is not available
            dateInput.type = 'date';
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;

            dateInput.addEventListener('change', function () {
                if (summaryDate) summaryDate.textContent = this.value;
            });
        }

        // Update participants summary
        const updateParticipantsSummary = () => {
            if (!adultsSelect || !childrenSelect || !summaryParticipants) return;

            const adults = parseInt(adultsSelect.value) || 0;
            const children = parseInt(childrenSelect.value) || 0;
            summaryParticipants.textContent = `${adults} adult${adults !== 1 ? 's' : ''}, ${children} child${children !== 1 ? 'ren' : ''}`;

            // Update price based on new participant count
            const servicePrice = parseFloat(servicePriceInput.value) || 0;
            updatePriceSummary(servicePrice);
        };

        // Update price summary
        const updatePriceSummary = (basePrice) => {
            if (!adultsSelect || !childrenSelect || !summaryPrice || !summaryTotal) return;

            const adults = parseInt(adultsSelect.value) || 0;
            const children = parseInt(childrenSelect.value) || 0;
            const childDiscount = 0.5; // 50% discount for children

            // Calculate base and total prices
            const adultTotal = basePrice * adults;
            const childrenTotal = basePrice * children * childDiscount;
            const totalPrice = adultTotal + childrenTotal;

            // Update summary text
            summaryPrice.textContent = `${basePrice.toFixed(2)}`;
            summaryTotal.textContent = `${totalPrice.toFixed(2)}`;
        };

        // Add event listeners for participant selects
        if (adultsSelect && childrenSelect) {
            adultsSelect.addEventListener('change', updateParticipantsSummary);
            childrenSelect.addEventListener('change', updateParticipantsSummary);
        }

        // Handle form submission
        if (bookingForm) {
            bookingForm.addEventListener('submit', function (e) {
                // Check if we're on localhost
                const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

                // Get form values with fallback
                const serviceId = serviceIdInput ? serviceIdInput.value : null;
                const serviceName = serviceNameInput ? serviceNameInput.value : 'Unknown Service';
                const selectedDate = dateInput ? dateInput.value : 'No date selected';
                const adults = adultsSelect ? adultsSelect.value : '0';
                const children = childrenSelect ? childrenSelect.value : '0';
                const totalPrice = summaryTotal ? summaryTotal.textContent : '$0.00';

                // Define email input element
                const emailInput = document.getElementById('email');
                const userEmail = emailInput ? emailInput.value : '';

                // Generate unique booking number
                const bookingNumber = 'WA-' + Math.floor(1000000 + Math.random() * 9000000);

                console.log('Booking form submitted:', {
                    service: serviceName,
                    date: selectedDate,
                    adults,
                    children,
                    bookingNumber,
                    userEmail
                });

                if (isLocalhost) {
                    // Local testing scenario
                    e.preventDefault();

                    // Update submit button state
                    const submitBtn = bookingForm.querySelector('button[type="submit"]');
                    if (submitBtn) {
                        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                        submitBtn.disabled = true;
                    }

                    // Prepare booking information
                    const bookingInfo = {
                        service: serviceName,
                        serviceId,
                        date: selectedDate,
                        adults,
                        children,
                        price: totalPrice,
                        bookingNumber,
                        email: userEmail
                    };

                    // Store booking info for confirmation page
                    localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));

                    // Redirect after a short delay
                    setTimeout(() => {
                        window.location.href = 'booking-confirmation.html';
                    }, 1500);
                } else {
                    const submitBtn = bookingForm.querySelector('button[type="submit"]');
                    if (submitBtn) {
                        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                        submitBtn.disabled = true;
                    }

                    // Add the booking number as a hidden field
                    const bookingNumberInput = document.createElement('input');
                    bookingNumberInput.type = 'hidden';
                    bookingNumberInput.name = 'booking_number';
                    bookingNumberInput.value = bookingNumber;
                    bookingForm.appendChild(bookingNumberInput);

                }
            });
        }
        // Destination Modal
        const destinationModal = document.getElementById('destinationModal');

        if (!destinationModal) {
            console.error('Destination modal element not found!');
            return;
        }

        const destinationModalWrapper = destinationModal.querySelector('.destination-modal-wrapper');
        const destinationModalClose = destinationModal.querySelector('.modal-close');

        // Function to open destination modal
        const openDestinationModal = (destinationId) => {
            const destinationData = destinationDetails[destinationId];

            if (!destinationData) {
                console.error(`Destination data not found for ID: ${destinationId}`);
                return;
            }

            const destinationModal = document.getElementById('destinationModal');
            const destinationModalWrapper = destinationModal.querySelector('.destination-modal-wrapper');

            // Populate modal with destination details
            destinationModalWrapper.innerHTML = `
                <div class="service-detail-container">
                    <div class="service-detail-main">
                        <div class="service-detail-gallery">
                            <img src="${destinationData.image}" alt="${destinationData.title}">
                        </div>
                        <div class="service-detail-content">
                            <h2>${destinationData.title}</h2>
                            <div class="service-detail-meta">
                                <div class="meta-item"><i class="fas fa-map-marker-alt"></i> Location: ${destinationData.title}</div>
                            </div>
                            <div class="service-detail-description">
                                ${destinationData.description}
                            </div>
                            <div class="service-detail-features">
                                <h3>Highlights</h3>
                                <ul class="feature-list">
                                    ${destinationData.highlights.map(highlight => `
                                        <li>
                                            <i class="${highlight.icon}"></i> 
                                            <strong>${highlight.title}:</strong> ${highlight.description}
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="service-detail-sidebar">
                        <div class="sidebar-box">
                            <div class="price-box">
                                <div class="price-label">Explore</div>
                                <div class="price-value">${destinationData.title}</div>
                            </div>
                            <a href="#" class="btn btn-primary book-destination-btn" data-destination="${destinationId}">Book a Tour</a>
                            <a href="/pages/services.html#tours" class="btn btn-outline">View Tours</a>
                        </div>
                        
                        <div class="sidebar-box">
                            <h3>Best Time to Visit</h3>
                            <p class="sidebar-text">Year-round, but spring and autumn are ideal.</p>
                        </div>
                        
                        <div class="sidebar-box">
                            <h3>Additional Information</h3>
                            <div class="sidebar-meta">
                                <div class="sidebar-meta-item">
                                    <span>Climate:</span>
                                    <span>Mediterranean/Desert</span>
                                </div>
                                <div class="sidebar-meta-item">
                                    <span>Language:</span>
                                    <span>Arabic, Berber, French</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Book Destination Tour Button
            const bookDestinationBtn = destinationModalWrapper.querySelector('.book-destination-btn');
            if (bookDestinationBtn) {
                bookDestinationBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const destinationId = bookDestinationBtn.getAttribute('data-destination');

                    // Map destination to a relevant tour
                    const destinationTourMap = {
                        'marrakech': 'marrakech-tour',
                        'fes': 'sahara-tour',  // Example mapping, adjust as needed
                        'chefchaouen': 'chefchaouen-tour',
                        'sahara': 'sahara-tour',
                        'essaouira': 'essaouira-tour',
                        'atlas': 'atlas-tour'
                    };

                    const tourId = destinationTourMap[destinationId] || 'sahara-tour';

                    // Close destination modal and open booking modal
                    destinationModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    openBookingModal(tourId);
                });
            }

            // Show modal
            destinationModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };

        // Open destination modal when buttons are clicked
        const destinationBtns = document.querySelectorAll('.destination-btn');
        destinationBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Destination button clicked');
                const destinationId = btn.getAttribute('data-destination') || '';

                if (!destinationId) {
                    console.error('No destination ID provided');
                    return;
                }

                console.log('Destination ID:', destinationId);

                if (destinationDetails[destinationId]) {
                    openDestinationModal(destinationId);
                } else {
                    console.error(`Destination data not found for ID: ${destinationId}. Available destinations:`, Object.keys(destinationDetails));
                }
            });
        });

        // Close destination modal
        const closeDestinationModal = () => {
            if (destinationModal) {
                destinationModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        };

        if (destinationModalClose) {
            destinationModalClose.addEventListener('click', closeDestinationModal);
        }

        if (destinationModal) {
            destinationModal.addEventListener('click', (e) => {
                if (e.target === destinationModal) {
                    closeDestinationModal();
                }
            });
        }



        // Re-initialize event listeners specifically for the Transportation tab
        const transportationLink = document.querySelector('.sidebar-menu li a[data-section="transportation"]');
        if (transportationLink) {
            transportationLink.addEventListener('click', function () {
                console.log('Transportation tab clicked, reinitializing buttons');
                // Add a small delay to allow the DOM to update
                setTimeout(() => {
                    // Re-attach event listeners for all buttons in the transportation section
                    const transportationSection = document.getElementById('transportation');
                    if (transportationSection) {
                        // Find all detail and book buttons in this section
                        const detailBtns = transportationSection.querySelectorAll('.service-details-btn');
                        const bookBtns = transportationSection.querySelectorAll('.service-book-btn');

                        // Add event listeners to detail buttons
                        detailBtns.forEach(btn => {
                            btn.addEventListener('click', (e) => {
                                e.preventDefault();
                                console.log('Transportation service details button clicked');
                                const serviceId = btn.getAttribute('data-service');

                                // Open service details modal
                                const serviceData = serviceDetails[serviceId];
                                if (serviceData) {
                                    openServiceModal(serviceId);
                                } else {
                                    console.error(`No service data found for ID: ${serviceId}`);
                                }
                            });
                        });

                        // Add event listeners to book buttons
                        bookBtns.forEach(btn => {
                            btn.addEventListener('click', (e) => {
                                e.preventDefault();
                                console.log('Transportation book button clicked');
                                const serviceId = btn.getAttribute('data-service');

                                // Open booking modal
                                openBookingModal(serviceId);
                            });
                        });
                    }
                }, 200);
            });
        }

        // Create a reusable function to open the service modal
        const openServiceModal = (serviceId) => {
            const serviceModal = document.getElementById('serviceDetailModal');
            const serviceModalWrapper = serviceModal.querySelector('.service-modal-wrapper');
            const serviceData = serviceDetails[serviceId];

            if (!serviceData) {
                console.error(`Service data not found for ID: ${serviceId}`);
                return;
            }

            // Populate modal with service details
            serviceModalWrapper.innerHTML = `
        <div class="service-detail-container">
            <div class="service-detail-main">
                <div class="service-detail-gallery">
                    <img src="${serviceData.image || '../assets/images/services/default.jpg'}" alt="${serviceData.title}">
                </div>
                <div class="service-detail-content">
                    <h2>${serviceData.title}</h2>
                    <div class="service-detail-meta">
                        <div class="meta-item"><i class="far fa-clock"></i> Duration: ${serviceData.duration}</div>
                        <div class="meta-item"><i class="fas fa-map-marker-alt"></i> Location: ${serviceData.location}</div>
                        <div class="meta-item"><i class="fas fa-users"></i> Group Size: ${serviceData.groupSize}</div>
                        <div class="meta-item"><i class="fas fa-star"></i> Rating: ${serviceData.rating || '4.5'} (${serviceData.reviews || '100+'})</div>
                    </div>
                    <div class="service-detail-description">
                        ${serviceData.description}
                    </div>
                    <div class="service-detail-features">
                        <h3>What's Included</h3>
                        <ul class="feature-list">
                            ${serviceData.includes ? serviceData.includes.map(item => `<li><i class="fas fa-check"></i> ${item}</li>`).join('') : ''}
                        </ul>
                        
                        <h3>What to Bring</h3>
                        <ul class="feature-list">
                            ${serviceData.whatToBring ? serviceData.whatToBring.map(item => `<li><i class="fas fa-check"></i> ${item}</li>`).join('') : ''}
                        </ul>
                    </div>
                </div>
            </div>
            <div class="service-detail-sidebar">
                <div class="sidebar-box">
                    <div class="price-box">
                        <div class="price-label">Price From</div>
                        <div class="price-value">€${serviceData.price}<small>/person</small></div>
                    </div>
                    <a href="#" class="btn btn-primary book-now-btn" data-service="${serviceId}">Book Now</a>
                    <a href="/pages/contact.html" class="btn btn-outline contact-btn">Ask a Question</a>
                </div>
                
                <div class="sidebar-box">
                    <h3>Availability</h3>
                    <p class="sidebar-text">${serviceData.schedule || 'Daily departures'}</p>
                </div>
                
                <div class="sidebar-box">
                    <h3>Additional Information</h3>
                    <div class="sidebar-meta">
                        <div class="sidebar-meta-item">
                            <span>Difficulty:</span>
                            <span>${serviceData.difficulty || 'Easy'}</span>
                        </div>
                        <div class="sidebar-meta-item">
                            <span>Language:</span>
                            <span>English, French, Arabic</span>
                        </div>
                        <div class="sidebar-meta-item">
                            <span>Confirmation:</span>
                            <span>Immediate</span>
                        </div>
                        <div class="sidebar-meta-item">
                            <span>Cancellation:</span>
                            <span>Free up to 24h before</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

            // Initialize "Book Now" buttons within the modal
            const modalBookBtns = serviceModalWrapper.querySelectorAll('.book-now-btn');
            modalBookBtns.forEach(bookBtn => {
                bookBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    serviceModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    openBookingModal(serviceId);
                });
            });

            // Show modal
            serviceModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };
        // Promotion buttons
        const promotionBtns = document.querySelectorAll('.promotion-btn');
        promotionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Promotion button clicked');
                const promotionId = btn.getAttribute('data-promotion');
                console.log('Promotion ID:', promotionId);

                // Map promotions to services for booking
                const promotionServiceMap = {
                    'summer-desert': 'sahara-tour',
                    'spring-chefchaouen': 'chefchaouen-tour',
                    'group-discount': 'marrakech-tour' // Default to a popular tour
                };

                const serviceId = promotionServiceMap[promotionId] || 'sahara-tour';
                openBookingModal(serviceId);
            });
        });

        // Countdown timer for promotions
        const countdownElements = document.querySelectorAll('.countdown');

        countdownElements.forEach(countdown => {
            const endDate = new Date(countdown.getAttribute('data-end')).getTime();

            const updateCountdown = () => {
                const now = new Date().getTime();
                const distance = endDate - now;

                if (distance < 0) {
                    countdown.innerHTML = 'Offer expired';
                    return;
                }

                // Get countdown elements
                const daysElem = countdown.querySelector('.days');
                const hoursElem = countdown.querySelector('.hours');
                const minutesElem = countdown.querySelector('.minutes');
                const secondsElem = countdown.querySelector('.seconds');

                // Calculate time units
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Update elements if they exist
                if (daysElem) daysElem.textContent = String(days).padStart(2, '0');
                if (hoursElem) hoursElem.textContent = String(hours).padStart(2, '0');
                if (minutesElem) minutesElem.textContent = String(minutes).padStart(2, '0');
                if (secondsElem) secondsElem.textContent = String(seconds).padStart(2, '0');
            };

            // Initial update
            updateCountdown();

            // Update every second
            setInterval(updateCountdown, 1000);
        });
    }

    // Initialize all event listeners on page load
    initializeEventListeners();

    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const serviceModal = document.getElementById('serviceDetailModal');
            const bookingModal = document.getElementById('bookingModal');
            const destinationModal = document.getElementById('destinationModal');

            if (serviceModal && serviceModal.style.display === 'block') {
                serviceModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }

            if (bookingModal && bookingModal.style.display === 'block') {
                bookingModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }

            if (destinationModal && destinationModal.style.display === 'block') {
                destinationModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .destination-card, .promotion-card');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };

    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Initialize animations
    animateOnScroll();

    // Add additional CSS class for animation
    const serviceCards = document.querySelectorAll('.service-card, .destination-card, .promotion-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Add this to your main.js file

document.addEventListener('DOMContentLoaded', function () {
    // Get the search form
    const searchForm = document.querySelector('.quick-booking-form');

    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const activityType = document.getElementById('activity-type').value;
            const destination = document.getElementById('destination').value;
            const travelDate = document.getElementById('travel-date').value;
            const guests = document.getElementById('guests').value;

            // Create a results message
            let resultsHTML = `
          <div class="search-results-container">
            <div class="container">
              <div class="search-results-header">
                <h2>Search Results</h2>
                <p>Showing options for ${destination || 'All destinations'}, ${travelDate || 'Any date'}, ${guests} guest(s)</p>
              </div>
              <div class="search-results-grid">
        `;

            // Create some sample results based on the search
            if (activityType === 'day-tour' || activityType === '') {
                resultsHTML += createTourCard('Atlas Mountains Day Trip', 'Discover Berber villages and stunning mountain scenery', '75', 'Full Day');
                resultsHTML += createTourCard('Essaouira Day Trip', 'Visit the charming coastal town of Essaouira', '65', 'Full Day');
            }

            if (activityType === 'multi-day' || activityType === '') {
                resultsHTML += createTourCard('Sahara Desert 3-Day Tour', 'Experience the magic of the Sahara with a camel trek', '295', '3 Days');
            }

            if (activityType === 'activity' || activityType === '') {
                resultsHTML += createActivityCard('Quad Biking in Agafay Desert', 'Experience the thrill across the moon-like landscape', '45', '3 Hours');
                resultsHTML += createActivityCard('Moroccan Cooking Class', 'Learn to prepare traditional Moroccan dishes', '65', '4 Hours');
            }

            if (activityType === 'transport' || activityType === '') {
                resultsHTML += createServiceCard('Airport Transfers', 'Hassle-free pickup and drop-off service', '20');
                resultsHTML += createServiceCard('Private Car with Driver', 'Explore Morocco at your own pace', '80/day');
            }

            resultsHTML += `
              </div>
              <div class="search-results-actions">
                <button class="btn btn-primary" onclick="window.location.reload()">Search Again</button>
              </div>
            </div>
          </div>
        `;

            // Replace the page content with results
            document.querySelector('.booking-section').innerHTML = resultsHTML;

            // Scroll to results
            document.querySelector('.search-results-container').scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// Helper functions to create cards
function createTourCard(title, description, price, duration) {
    return `
      <div class="tour-card">
        <div class="tour-img" style="background-color: #e0e0e0; height: 200px; display: flex; align-items: center; justify-content: center; color: #666;">
          [Tour Image]
        </div>
        <div class="tour-content">
          <div class="tour-info">
            <span><i class="fa-regular fa-clock"></i> ${duration}</span>
            <span><i class="fa-solid fa-tag"></i> From €${price}</span>
          </div>
          <h3>${title}</h3>
          <p>${description}</p>
          <div class="tour-features">
            <span><i class="fa-solid fa-utensils"></i> Meals</span>
            <span><i class="fa-solid fa-car"></i> Transport</span>
          </div>
          <a href="#" class="btn btn-outline">View Details</a>
        </div>
      </div>
    `;
}

function createActivityCard(title, description, price, duration) {
    return `
      <div class="activity-card">
        <div class="activity-img" style="background-color: #e0e0e0; height: 200px; display: flex; align-items: center; justify-content: center; color: #666;">
          [Activity Image]
        </div>
        <div class="activity-content">
          <div class="activity-info">
            <span><i class="fa-regular fa-clock"></i> ${duration}</span>
            <span><i class="fa-solid fa-location-dot"></i> Marrakech</span>
          </div>
          <h3>${title}</h3>
          <p>${description}</p>
          <a href="#" class="btn btn-outline">Learn More</a>
        </div>
      </div>
    `;
}

function createServiceCard(title, description, price) {
    return `
      <div class="service-card">
        <div class="service-icon">
          <i class="fa-solid fa-car"></i>
        </div>
        <h3>${title}</h3>
        <p>${description}</p>
        <div class="service-price">
          <span>From €${price}</span>
        </div>
        <a href="#" class="btn btn-outline">Book Now</a>
      </div>
    `;
}

// Rental Tabs Functionality
document.addEventListener('DOMContentLoaded', function () {
    const rentalTabs = document.querySelectorAll('.rental-tabs .tab');
    const tabContents = document.querySelectorAll('.tab-content');

    if (rentalTabs.length > 0) {
        rentalTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                rentalTabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked tab
                tab.classList.add('active');

                // Show corresponding content
                const tabId = tab.getAttribute('data-tab');
                document.getElementById(`${tabId}-content`).classList.add('active');
            });
        });
    }
});


// Add this to your main.js or create a new script

document.addEventListener('DOMContentLoaded', function () {
    // Initial setup for tabs
    setupRentalTabs();

    // This function handles tab switching
    function setupRentalTabs() {
        const tabs = document.querySelectorAll('.rental-tabs .tab');
        if (!tabs || tabs.length === 0) return;

        tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                // Remove active class from all tabs and contents
                document.querySelectorAll('.rental-tabs .tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

                // Add active class to clicked tab
                this.classList.add('active');

                // Show corresponding content
                const targetId = this.getAttribute('data-tab') + '-content';
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');

                    // Directly attach event listeners to the buttons in the active tab
                    attachButtonHandlers();
                }
            });
        });

        // Initial button setup
        attachButtonHandlers();
    }

    // This function attaches event handlers to buttons
    function attachButtonHandlers() {
        // Handle "View Details" buttons
        document.querySelectorAll('.service-details-btn').forEach(button => {
            // Remove existing event listeners to prevent duplicates
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);

            newButton.addEventListener('click', function (e) {
                e.preventDefault();
                const serviceId = this.getAttribute('data-service');
                console.log('View details clicked for:', serviceId);

                // Open service details modal
                openServiceDetails(serviceId);
            });
        });

        // Handle "Book Now" buttons
        document.querySelectorAll('.service-book-btn').forEach(button => {
            // Remove existing event listeners to prevent duplicates
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);

            newButton.addEventListener('click', function (e) {
                e.preventDefault();
                const serviceId = this.getAttribute('data-service');
                console.log('Book now clicked for:', serviceId);

                // Open booking modal
                openBookingModal(serviceId);
            });
        });
    }

    // Function to open service details modal
    function openServiceDetails(serviceId) {
        const serviceModal = document.getElementById('serviceDetailModal');
        if (!serviceModal) return;

        const serviceData = window.serviceDetails[serviceId];
        if (!serviceData) {
            console.error('No service data found for ID:', serviceId);
            return;
        }

        const serviceModalWrapper = serviceModal.querySelector('.service-modal-wrapper');
        if (!serviceModalWrapper) return;

        // Populate modal content (similar to what you had before)
        serviceModalWrapper.innerHTML = `
        <div class="service-detail-container">
          <div class="service-detail-main">
            <div class="service-detail-gallery">
              <img src="${serviceData.image || '../assets/images/rentals/default.jpg'}" alt="${serviceData.title}">
            </div>
            <div class="service-detail-content">
              <h2>${serviceData.title || 'Rental Item'}</h2>
              <div class="service-detail-meta">
                <div class="meta-item"><i class="far fa-clock"></i> Duration: ${serviceData.duration || 'Flexible'}</div>
                <div class="meta-item"><i class="fas fa-map-marker-alt"></i> Location: ${serviceData.location || 'Marrakech'}</div>
                <div class="meta-item"><i class="fas fa-users"></i> Capacity: ${serviceData.groupSize || 'Individual'}</div>
              </div>
              <div class="service-detail-description">
                ${serviceData.description || 'No description available.'}
              </div>
              <div class="service-detail-features">
                <h3>What's Included</h3>
                <ul class="feature-list">
                  ${serviceData.includes ? serviceData.includes.map(item => `<li><i class="fas fa-check"></i> ${item}</li>`).join('') : '<li>Details not available</li>'}
                </ul>
              </div>
            </div>
          </div>
          <div class="service-detail-sidebar">
            <div class="sidebar-box">
              <div class="price-box">
                <div class="price-label">Price</div>
                <div class="price-value">€${serviceData.price || '0'}<small>/day</small></div>
              </div>
              <a href="#" class="btn btn-primary rent-now-btn" data-service="${serviceId}">Rent Now</a>
              <a href="contact.html" class="btn btn-outline">Ask a Question</a>
            </div>
          </div>
        </div>
      `;

        // Add event listener to the "Rent Now" button in the modal
        const rentNowBtn = serviceModalWrapper.querySelector('.rent-now-btn');
        if (rentNowBtn) {
            rentNowBtn.addEventListener('click', function (e) {
                e.preventDefault();
                // Close details modal
                serviceModal.style.display = 'none';
                // Open booking modal
                openBookingModal(serviceId);
            });
        }

        // Add event listener to close button
        const closeBtn = serviceModal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                serviceModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }

        // Show the modal
        serviceModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Function to open booking modal
    function openBookingModal(serviceId) {
        const bookingModal = document.getElementById('bookingModal');
        if (!bookingModal) return;

        const serviceData = window.serviceDetails[serviceId];
        if (!serviceData) {
            console.error('No service data found for ID:', serviceId);
            return;
        }

        // Set modal title
        const modalTitle = bookingModal.querySelector('.service-title');
        if (modalTitle) modalTitle.textContent = serviceData.title || 'Rental Item';

        // Set form hidden fields
        const serviceIdInput = document.getElementById('service-id');
        const serviceNameInput = document.getElementById('service-name');
        const servicePriceInput = document.getElementById('service-price');

        if (serviceIdInput) serviceIdInput.value = serviceId;
        if (serviceNameInput) serviceNameInput.value = serviceData.title || '';
        if (servicePriceInput) servicePriceInput.value = serviceData.price || '0';

        // Update summary
        const summaryService = document.getElementById('summary-service');
        const summaryPrice = document.getElementById('summary-price');
        const summaryTotal = document.getElementById('summary-total');

        if (summaryService) summaryService.textContent = serviceData.title || 'Rental Item';
        if (summaryPrice) summaryPrice.textContent = '$' + (serviceData.price || '0');
        if (summaryTotal) summaryTotal.textContent = '$' + (serviceData.price || '0');

        // Show the modal
        bookingModal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Add event listener to close button
        const closeBtn = bookingModal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                bookingModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }

        // Add event listener to cancel button
        const cancelBtn = bookingModal.querySelector('.modal-cancel');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function (e) {
                e.preventDefault();
                bookingModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
    }

    // Handle tab switching when clicking sidebar links
    document.querySelectorAll('.sidebar-menu li a').forEach(link => {
        link.addEventListener('click', function () {
            const sectionId = this.getAttribute('data-section');
            if (sectionId === 'rentals') {
                setTimeout(setupRentalTabs, 100);
            }
        });
    });

    // Check if we should initialize the rental tabs based on URL hash
    if (window.location.hash === '#rentals') {
        setTimeout(setupRentalTabs, 100);
    }

    // Initialize on page load for rentals section if it's visible
    if (document.querySelector('#rentals.content-section.active')) {
        setupRentalTabs();
    }

    // Handle clicks outside the modals to close them
    window.addEventListener('click', function (e) {
        const serviceModal = document.getElementById('serviceDetailModal');
        const bookingModal = document.getElementById('bookingModal');

        if (e.target === serviceModal) {
            serviceModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        if (e.target === bookingModal) {
            bookingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    // Delegation approach - add a single event listener to the parent container
    document.addEventListener('click', function (event) {
        // Handle "View Details" buttons
        if (event.target.classList.contains('service-details-btn') ||
            event.target.closest('.service-details-btn')) {
            event.preventDefault();
            const button = event.target.classList.contains('service-details-btn') ?
                event.target :
                event.target.closest('.service-details-btn');
            const serviceId = button.getAttribute('data-service');

            // Open the service detail modal
            const serviceModal = document.getElementById('serviceDetailModal');
            if (serviceModal) {
                serviceModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        }

        // Handle "Book Now" buttons
        if (event.target.classList.contains('service-book-btn') ||
            event.target.closest('.service-book-btn')) {
            event.preventDefault();
            const button = event.target.classList.contains('service-book-btn') ?
                event.target :
                event.target.closest('.service-book-btn');
            const serviceId = button.getAttribute('data-service');

            // Open the booking modal
            const bookingModal = document.getElementById('bookingModal');
            if (bookingModal) {
                bookingModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        }
    });

    // Handle the tabs switching
    const tabs = document.querySelectorAll('.rental-tabs .tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Show corresponding content
            const targetId = this.getAttribute('data-tab') + '-content';
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});
// logo adjustment 
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.site-header');
    const scrollThreshold = 50; // How far to scroll before changing header
    
    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Check initial scroll position
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
});

document.addEventListener('DOMContentLoaded', function() {
    const contactToggle = document.querySelector('.contact-options-toggle');
    const contactMenu = document.querySelector('.contact-options-menu');
    
    if (contactToggle && contactMenu) {
        // Toggle menu on click
        contactToggle.addEventListener('click', function(e) {
            contactMenu.classList.toggle('active');
            e.stopPropagation();
        });
        
        // Close when clicking elsewhere on the page
        document.addEventListener('click', function(e) {
            if (contactMenu.classList.contains('active') && 
                !contactMenu.contains(e.target) && 
                !contactToggle.contains(e.target)) {
                contactMenu.classList.remove('active');
            }
        });
        
        // Prevent menu from closing when clicking inside it
        contactMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});
// Add this to your serviceDetails object in your JavaScript
const rentalServices = {
    'city-bikes': {
        title: 'City Bikes',
        subtitle: 'Comfortable bikes perfect for exploring Marrakech',
        price: 15,
        duration: 'Up to 24 hours',
        location: 'Marrakech',
        description: 'Our city bikes are perfect for exploring Marrakech at your own pace. Each rental includes a helmet, lock, and optional city map. The bikes are regularly maintained and adjusted for your comfort.',
        includes: [
            'Comfortable city bike',
            'Helmet and safety gear',
            'Secure lock',
            'Repair kit',
            'Optional city map',
            '24/7 support hotline'
        ],
        bring: [
            'Valid ID or passport',
            'Credit card for deposit',
            'Comfortable clothing',
            'Water bottle',
            'Sunscreen'
        ],
        availability: 'Daily, 8:00 AM - 8:00 PM',
        additionalInfo: {
            'Difficulty': 'Easy',
            'Security Deposit': '€100 (fully refundable)',
            'Minimum Age': '16 years',
            'Cancellation': 'Free up to 24h before'
        }
    },
    // Add other rental items similarly
};

// Merge this with your existing serviceDetails object
window.serviceDetails = window.serviceDetails || {};
Object.assign(window.serviceDetails, rentalServices);

window.addEventListener('load', function () {
        document.querySelector('.preloader').classList.add('fade-out');
        setTimeout(() => {
            document.querySelector('.preloader').style.display = 'none';
        }, 500); // matches the transition duration
    });

    // Add swipe + arrow keys
const slider = new Swiper('.hero-slider', {
  loop: true,
  autoplay: { delay: 5000 },
  keyboard: true,
  pagination: { el: '.slider-nav', clickable: true }
});
