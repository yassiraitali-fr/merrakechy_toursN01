// assets/js/services.js

document.addEventListener('DOMContentLoaded', function () {
    console.log('Services page loaded');

    // Handle main services filter tabs
    const filterBtns = document.querySelectorAll('.filter-btn');
    const contentSections = document.querySelectorAll('.content-section');

    // Add click event listener to each filter button
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            console.log('Filter button clicked:', this.dataset.filter);

            // Remove active class from all buttons
            filterBtns.forEach(btn => {
                btn.classList.remove('active');
            });

            // Add active class to clicked button
            this.classList.add('active');

            // Get filter value
            const filter = this.dataset.filter;

            // Hide all content sections
            contentSections.forEach(section => {
                section.classList.remove('active');
            });

            // Show the selected content section
            const targetSection = document.getElementById(filter);
            if (targetSection) {
                targetSection.classList.add('active');
            } else {
                console.error('Section not found:', filter);
            }
        });
    });

    // Handle sub-category filter buttons
    const contentFilterBtns = document.querySelectorAll('.content-filter-btn');

    contentFilterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            console.log('Content filter button clicked:', this.dataset.category);

            // Find the parent content section
            const parentSection = this.closest('.content-section');

            // Remove active class from all buttons in this section
            parentSection.querySelectorAll('.content-filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Add active class to clicked button
            this.classList.add('active');

            // Get filter category
            const category = this.dataset.category;

            // Get all service cards in this section
            const serviceCards = parentSection.querySelectorAll('.service-card');

            // Show/hide service cards based on category
            serviceCards.forEach(card => {
                // If the category indicates 'all' for this section, show all
                if (category.startsWith('all-')) {
                    card.style.display = 'flex';
                } else if (card.classList.contains(category)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Initialize page based on URL hash if present
    const initializePageFromHash = () => {
        const hash = window.location.hash.substring(1); // Remove the # symbol
        if (hash) {
            // Find the button that corresponds to this hash
            const targetBtn = document.querySelector(`.filter-btn[data-filter="${hash}"]`);
            if (targetBtn) {
                targetBtn.click();
            }
        }
    };

    // Initialize on page load
    initializePageFromHash();

    // WhatsApp Button
    const whatsappButton = document.querySelector('.whatsapp-button');
    if (whatsappButton) {
        whatsappButton.addEventListener('mouseenter', () => {
            whatsappButton.style.transform = 'translateY(-10px)';
        });

        whatsappButton.addEventListener('mouseleave', () => {
            whatsappButton.style.transform = 'translateY(0)';
        });
    }

    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Process search parameters from URL
function processSearchParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const destination = urlParams.get('destination');
    const date = urlParams.get('date');
    const guests = urlParams.get('guests');

    console.log('Search params detected:', { destination, date, guests });

    if (destination) {
        // Switch to destinations tab if a destination was searched
        const destinationsBtn = document.querySelector('.filter-btn[data-filter="destinations"]');
        if (destinationsBtn) {
            destinationsBtn.click();

            // Highlight the searched destination in some way
            // This could be adding a class to the destination card or showing a message
            const destinationCards = document.querySelectorAll('.destination-card');
            destinationCards.forEach(card => {
                const cardTitle = card.querySelector('h3');
                if (cardTitle && cardTitle.textContent.toLowerCase().includes(destination.toLowerCase())) {
                    card.classList.add('highlighted');
                    // Scroll to this card
                    setTimeout(() => {
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 500);
                }
            });

            // Optional: Display a message about the search
            const sectionHeader = document.querySelector('#destinations .section-header');
            if (sectionHeader) {
                const searchMessage = document.createElement('p');
                searchMessage.className = 'search-message';
                searchMessage.textContent = `Showing results for ${destination}${date ? ' on ' + formatDate(date) : ''}${guests ? ' for ' + guests + ' people' : ''}`;
                sectionHeader.appendChild(searchMessage);
            }
        }
    }
}

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

// Call this function when document is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Process any search parameters
    processSearchParams();

    // ... other initialization code ...
});
// Add this to your services.js file or main.js to handle automatic section navigation

document.addEventListener('DOMContentLoaded', function() {
    // Handle automatic section switching when coming from details page
    handleSectionFromURL();
    
    // Your existing services page code...
});

function handleSectionFromURL() {
    // Check if we're on the services page
    if (!window.location.pathname.includes('services.html')) return;
    
    // Get the hash from URL (e.g., #activities, #tours)
    const hash = window.location.hash.substring(1); // Remove the #
    
    if (hash) {
        // Wait a bit for the page to load, then switch to the correct section
        setTimeout(() => {
            switchToSection(hash);
        }, 100);
    }
}

function switchToSection(sectionName) {
    // Map section names to filter buttons
    const sectionMap = {
        'activities': 'activities',
        'tours': 'tours',
        'transportation': 'transportation',
        'destinations': 'destinations',
        'rentals': 'rentals'
    };
    
    const targetSection = sectionMap[sectionName];
    if (!targetSection) return;
    
    // Find and click the corresponding filter button
    const filterButtons = document.querySelectorAll('.filter-btn');
    const targetButton = Array.from(filterButtons).find(btn => 
        btn.getAttribute('data-filter') === targetSection
    );
    
    if (targetButton) {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to target button
        targetButton.classList.add('active');
        
        // Hide all content sections
        const contentSections = document.querySelectorAll('.content-section');
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target content section
        const targetContent = document.getElementById(targetSection);
        if (targetContent) {
            targetContent.classList.add('active');
            
            // Smooth scroll to the section
            targetContent.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Add a subtle highlight effect
            targetContent.style.animation = 'sectionHighlight 2s ease';
        }
    }
}

// Add this CSS animation to your main.css
const style = document.createElement('style');
style.textContent = `
    @keyframes sectionHighlight {
        0% { background-color: rgba(229, 124, 35, 0.1); }
        100% { background-color: transparent; }
    }
`;
document.head.appendChild(style);
