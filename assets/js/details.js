// assets/js/details.js - Updated with Adult/Children Pricing

document.addEventListener('DOMContentLoaded', function() {
    console.log('Details page loaded');
    
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const id = urlParams.get('id');
    
    console.log('Category:', category, 'ID:', id);
    
    // Get data based on category
    let programData;
    
    try {
        switch(category) {
            case 'activity':
                if (typeof activitiesData !== 'undefined' && activitiesData[id]) {
                    programData = activitiesData[id];
                    console.log('Found activity data');
                }
                break;
            case 'tour':
                if (typeof toursData !== 'undefined' && toursData[id]) {
                    programData = toursData[id];
                    console.log('Found tour data');
                }
                break;
            case 'transportation':
                if (typeof transportationData !== 'undefined' && transportationData[id]) {
                    programData = transportationData[id];
                    console.log('Found transportation data');
                }
                break;
            case 'rental':
                // Rental items are stored in window.serviceDetails
                if (window.serviceDetails && window.serviceDetails[id]) {
                    programData = window.serviceDetails[id];
                    console.log('Found rental data');
                }
                break;
            case 'destination':
                if (typeof destinationsData !== 'undefined' && destinationsData[id]) {
                    programData = destinationsData[id];
                    console.log('Found destination data');
                }
                break;
            default:
                console.error('Invalid category or category not specified');
        }
    } catch (error) {
        console.error('Error loading program data:', error);
    }
    
    // If program data is found, populate the page
    if (programData) {
        loadProgramDetails(programData, category, id);
    } else {
        handleProgramNotFound();
    }
    
    // Function to load program details into the page
    function loadProgramDetails(data, category, id) {
      
        console.log('=== DEBUG START ===');
        console.log('Full data object:', data);
        console.log('Category:', category);
        console.log('ID:', id);
        console.log('mapImage exists:', data.mapImage);
        console.log('mapImage value:', data.mapImage);
        console.log('itinerary exists:', data.itinerary);
        console.log('pricing exists:', data.pricing);
        console.log('=== DEBUG END ===');
        
        // Set page title
        document.title = `${data.title} | Merrakechy Tour`;
        
        // Set hero section
        document.getElementById('program-hero').style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${data.heroImage}')`;
        document.getElementById('program-title').textContent = data.title;
        document.getElementById('program-subtitle').textContent = data.subtitle;
        
        // Set main program image
        document.getElementById('program-image').src = data.mainImage;
        document.getElementById('program-image').alt = data.title;
        
        // Set meta information
        let metaHtml = `
            <div class="meta-item"><i class="fas fa-map-marker-alt"></i> Location: ${data.location}</div>
        `;
        
        // Only add group size and rating if applicable (e.g., not for destinations)
        if (data.groupSize) {
            metaHtml += `<div class="meta-item"><i class="fas fa-users"></i> Group Size: ${data.groupSize}</div>`;
        }
        
        if (data.rating) {
            metaHtml += `<div class="meta-item"><i class="fas fa-star"></i> Rating: ${data.rating} (${data.reviews} reviews)</div>`;
        }
        
        document.getElementById('program-meta').innerHTML = metaHtml;
        
        // Set description
        document.getElementById('program-description').innerHTML = data.description;
        
        // Set itinerary if it exists
         if (data.mapImage || data.itinerary) {
            let itineraryHtml = '<h3>Itinerary</h3>';
            
            // Add map image if it exists
            if (data.mapImage) {
                itineraryHtml += `
                    <div class="itinerary-map">
                        <img src="${data.mapImage}" alt="Tour Route Map" style="width: 100%; max-width: 600px; height: auto; border-radius: 8px; margin: 20px 0; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                    </div>
                `;
            }
            
            // Add text itinerary if it exists
            if (data.itinerary) {
                data.itinerary.forEach(item => {
                    itineraryHtml += `
                        <div class="itinerary-item">
                            <div class="itinerary-time">${item.time}</div>
                            <div class="itinerary-content">
                                <h4>${item.title}</h4>
                                <p>${item.description}</p>
                            </div>
                        </div>
                    `;
                });
            }
            const customPricingMessage = document.getElementById('custom-pricing-message');
    
    if (data.showCustomPricing === true) {
        // Show the custom pricing message
        if (customPricingMessage) {
            customPricingMessage.style.display = 'block';
        }
    } else {
        // Hide the custom pricing message
        if (customPricingMessage) {
            customPricingMessage.style.display = 'none';
        }
    }
            
            document.getElementById('program-itinerary').innerHTML = itineraryHtml;
            
        } else if (data.highlights) {
            // For destinations, show highlights instead of itinerary
            let highlightsHtml = '<h3>Highlights</h3>';
            
            data.highlights.forEach(item => {
                highlightsHtml += `
                    <div class="itinerary-item">
                        <div class="itinerary-time">${item.title}</div>
                        <div class="itinerary-content">
                            <p>${item.description}</p>
                        </div>
                    </div>
                `;
            });
            
            document.getElementById('program-itinerary').innerHTML = highlightsHtml;
        } else {
            // Hide itinerary section if no itinerary
            document.getElementById('program-itinerary').style.display = 'none';
        }
        
        // Set inclusions if applicable (not for destinations)
        if (data.includes) {
            let includesHtml = '';
            data.includes.forEach(item => {
                includesHtml += `<li><i class="fas fa-check"></i> ${item}</li>`;
            });
            document.getElementById('program-includes').innerHTML = includesHtml;
        } else {
            // For destinations or other types without inclusions
            document.querySelector('.tour-detail-features h3:first-child').style.display = 'none';
            document.getElementById('program-includes').style.display = 'none';
        }
        
        // Set what to bring if applicable
        if (data.bring) {
            let bringHtml = '';
            data.bring.forEach(item => {
                bringHtml += `<li><i class="fas fa-check"></i> ${item}</li>`;
            });
            document.getElementById('program-bring').innerHTML = bringHtml;
        } else if (data.bestTimeToVisit) {
            // For destinations, show best time to visit instead
            document.querySelector('.tour-detail-features h3:last-child').textContent = 'Best Time to Visit';
            document.getElementById('program-bring').innerHTML = `<li><i class="fas fa-calendar-alt"></i> ${data.bestTimeToVisit}</li>`;
        } else {
            // Hide section if not applicable
            document.querySelector('.tour-detail-features h3:last-child').style.display = 'none';
            document.getElementById('program-bring').style.display = 'none';
        }
        
        // Set price if applicable (not for destinations) - UPDATED FOR ADULT/CHILDREN PRICING
                   // For bookable items, show the booking button
                   // Set price if applicable (not for destinations) - UPDATED FOR ADULT/CHILDREN PRICING
        if (data.price || data.pricing || data.groupPricing) { // <-- ADDED data.groupPricing HERE
            updatePricingDisplay(data);
            
            // For bookable items, show the booking button
            document.getElementById("booking-link").href = `checkout.html?category=${category}&id=${id}`;

            // Add event listener for the booking form
            const bookingForm = document.getElementById("booking-form");
            if (bookingForm) {
                bookingForm.addEventListener("submit", function(event) {
                    event.preventDefault();
                    const adults = parseInt(document.getElementById("adults").value);
                    const children = parseInt(document.getElementById("children").value);
                    const totalPeople = adults + children;

                    let calculatedPrice = 0;
                    if (category === 'activity' && data.groupPricing) {
                        calculatedPrice = calculateDynamicPrice(id, totalPeople);
                    } else if (category === 'tour' && data.groupPricing) {
                        calculatedPrice = calculateDynamicTourPrice(id, totalPeople);
                    } else if (data.pricing) {
                        calculatedPrice = (adults * data.pricing.adult) + (children * data.pricing.child);
                    } else if (data.price) {
                        calculatedPrice = data.price * totalPeople;
                    }

                    document.getElementById("calculated-price").textContent = `Total Price: €${calculatedPrice}`;
                    // Further logic for booking, e.g., redirect to confirmation page
                    console.log("Booking submitted for:", data.title, "Total people:", totalPeople, "Calculated Price:", calculatedPrice);
                });
            }
        } else {
            // Hide booking section if not applicable
            document.getElementById("booking-section").style.display = "none";
        }

        // Set availability if applicable
        if (data.availability) {
            document.getElementById('program-availability').textContent = data.availability;
        } else if (category === 'destination') {
            document.querySelector('.sidebar-box:nth-child(2) h3').textContent = 'Travel Info';
            document.getElementById('program-availability').textContent = 'Contact us for customized tours to this destination';
        } else {
            // Hide section if not applicable
            document.querySelector('.sidebar-box:nth-child(2)').style.display = 'none';
        }
        
        // Set additional information
        let additionalHtml = '';
        if (data.additionalInfo) {
            for (const [key, value] of Object.entries(data.additionalInfo)) {
                additionalHtml += `
                    <div class="sidebar-meta-item">
                        <span>${key}:</span>
                        <span>${value}</span>
                    </div>
                `;
            }
        }
        document.getElementById('program-additional').innerHTML = additionalHtml;
        
        // Set related programs
        if (data.relatedPrograms && data.relatedPrograms.length > 0) {
            loadRelatedPrograms(data.relatedPrograms, category);
        } else {
            document.querySelector('.related-tours').style.display = 'none';
        }
    }

    
        // NEW FUNCTION: Update pricing display with adult/children prices and group pricing
    function updatePricingDisplay(data) {
        const priceBox = document.querySelector(".price-box");

        if (!priceBox) return;

        if (data.groupPricing) {
            // Display group pricing tiers
            let pricingHtml = `
                <div class="price-label">Price From</div>
                <div class="pricing-details group-pricing">
            `;
            data.groupPricing.forEach(tier => {
                const maxText = tier.max === Infinity ? "+" : `-${tier.max}`;
                pricingHtml += `
                    <div class="price-item">
                        <span>${tier.min}${maxText} people:</span>
                        <span class="price-value">€${tier.pricePerPerson}<small>/person</small></span>
                    </div>
                `;
            });
            pricingHtml += `</div>`;
            priceBox.innerHTML = pricingHtml;
        } else if (data.pricing) {
            // Get prices
            const adultPrice = data.pricing.adult;
            const childPrice = data.pricing.child;

            // Check if we have different prices for adults and children
            if (data.pricing.adult !== data.pricing.child) {
                // Show both adult and children prices
                priceBox.innerHTML = `
                    <div class="price-label">Price From</div>
                    <div class="pricing-details">
                        <div class="price-item">
                            <span>Adults:</span>
                            <span class="price-value">€${adultPrice}<small>/person</small></span>
                        </div>
                        <div class="price-item">
                            <span>Children:</span>
                            <span class="price-value">€${childPrice}<small>/person</small></span>
                        </div>
                    </div>
                    ${data.priceUnit ? `<div class="price-unit">${data.priceUnit}</div>` : ""}
                `;
            } else {
                // Show single price (fallback to old format)
                const displayPrice = data.price || adultPrice;
                priceBox.innerHTML = `
                    <div class="price-label">Price From</div>
                    <div class="price-value">€${displayPrice}<small>/person</small></div>
                    ${data.priceUnit ? `<div class="price-unit">${data.priceUnit}</div>` : ""}
                `;
            }
        } else if (data.price) {
            // Display single price
            priceBox.innerHTML = `
                <div class="price-label">Price From</div>
                <div class="price-value">€${data.price}<small>/person</small></div>
                ${data.priceUnit ? `<div class="price-unit">${data.priceUnit}</div>` : ""}
            `;
        }
    }

    
    // Function to load related programs - UPDATED FOR PRICING
    function loadRelatedPrograms(relatedIds, currentCategory) {
        let relatedHtml = '';
        
        // Create HTML for each related program
        relatedIds.forEach(relatedId => {
            let relatedData = null;
            let relatedCategory = currentCategory;
            
            // Check all data sources to find the related program
            if (typeof activitiesData !== 'undefined' && activitiesData[relatedId]) {
                relatedData = activitiesData[relatedId];
                relatedCategory = 'activity';
            } else if (typeof toursData !== 'undefined' && toursData[relatedId]) {
                relatedData = toursData[relatedId];
                relatedCategory = 'tour';
            } else if (typeof transportationData !== 'undefined' && transportationData[relatedId]) {
                relatedData = transportationData[relatedId];
                relatedCategory = 'transportation';
            } else if (typeof destinationsData !== 'undefined' && destinationsData[relatedId]) {
                relatedData = destinationsData[relatedId];
                relatedCategory = 'destination';
            }
            
            if (relatedData) {
                // Get the appropriate price to display
                let priceText = '';
                if (relatedData.pricing) {
                    const adultPrice = relatedData.pricing.adult;
                    priceText = `From €${adultPrice}`;
                } else if (relatedData.price) {
                    priceText = `From €${relatedData.price}`;
                }
                
                const priceDisplay = priceText ? `<span><i class="fas fa-tag"></i> ${priceText}</span>` : '';
                
                relatedHtml += `
                    <div class="tour-card">
                        <div class="tour-img">
                            <img src="${relatedData.mainImage}" alt="${relatedData.title}">
                        </div>
                        <div class="tour-content">
                            <div class="tour-info">
                                <span><i class="far fa-clock"></i> ${relatedData.duration}</span>
                                ${priceDisplay}
                            </div>
                            <h3>${relatedData.title}</h3>
                            <p>${relatedData.subtitle}</p>
                            <a href="details.html?category=${relatedCategory}&id=${relatedId}" class="btn btn-outline">View Details</a>
                        </div>
                    </div>
                `;
            }
        });
        
        document.getElementById('related-programs').innerHTML = relatedHtml;
    }
    
    // Function to handle program not found
    function handleProgramNotFound() {
        document.getElementById('program-title').textContent = 'Program Not Found';
        document.getElementById('program-subtitle').textContent = 'The program you are looking for could not be found.';
        
        // Hide main content sections
        document.querySelector('.tour-detail-container').innerHTML = `
            <div class="not-found-message">
                <h2>We couldn't find this program</h2>
                <p>We're sorry, but the program you are looking for does not exist or has been removed.</p>
                <p>Please browse our <a href="services.html">services</a> to find another program that interests you.</p>
            </div>
        `;
        
        // Hide related programs section
        document.querySelector('.related-tours').style.display = 'none';
    }
});

// assets/js/details.js - Updated to use gallery images from data files

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the image gallery on the details page
  initializeDetailGallery();
});

function initializeDetailGallery() {
  // Find the gallery container in the details page
  const galleryContainer = document.querySelector('.tour-detail-gallery, .service-detail-gallery');
  if (!galleryContainer) return;
  
  // Check if gallery already has a slider
  if (galleryContainer.querySelector('.detail-image-slider')) return;
  
  // Get the current main image
  const mainImage = galleryContainer.querySelector('img');
  if (!mainImage) return;
  
  const imgSrc = mainImage.src;
  const imgAlt = mainImage.alt || 'Tour image';
  
  // Get the category and ID from URL parameters to find corresponding item
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  const id = urlParams.get('id');
  
  // Get images for this specific item from data files
  let images = getImagesForItem(category, id, imgSrc);
  
  // Create and insert the gallery HTML
  const sliderHTML = createDetailGalleryHTML(images, imgAlt);
  galleryContainer.innerHTML = sliderHTML;
  
  // Initialize the gallery functionality
  const slider = galleryContainer.querySelector('.detail-image-slider');
  initializeDetailSlider(slider);
}

function getImagesForItem(category, id, defaultImage) {
  let itemData = null;
  let images = [defaultImage]; // Fallback to default image
  
  try {
    // Get data based on category
    switch(category) {
      case 'activity':
        if (typeof activitiesData !== 'undefined' && activitiesData[id]) {
          itemData = activitiesData[id];
        }
        break;
      case 'tour':
        if (typeof toursData !== 'undefined' && toursData[id]) {
          itemData = toursData[id];
        }
        break;
      case 'transportation':
        if (typeof transportationData !== 'undefined' && transportationData[id]) {
          itemData = transportationData[id];
        }
        break;
      case 'destination':
        if (typeof destinationsData !== 'undefined' && destinationsData[id]) {
          itemData = destinationsData[id];
        }
        break;
      case 'rental':
        if (window.serviceDetails && window.serviceDetails[id]) {
          itemData = window.serviceDetails[id];
        }
        break;
    }
    
    // If we found the item data and it has gallery images, use them
    if (itemData && itemData.galleryImages && Array.isArray(itemData.galleryImages) && itemData.galleryImages.length > 0) {
      images = itemData.galleryImages;
    } else if (itemData) {
      // If no gallery images but we have other images, create a gallery from available images
      const availableImages = [];
      
      // Add main image if available
      if (itemData.mainImage) {
        availableImages.push(itemData.mainImage);
      }
      
      // Add hero image if different from main image
      if (itemData.heroImage && itemData.heroImage !== itemData.mainImage) {
        availableImages.push(itemData.heroImage);
      }
      
      // If we have any images, use them; otherwise keep the default
      if (availableImages.length > 0) {
        images = availableImages;
      }
    }
    
  } catch (error) {
    console.warn('Error loading gallery images:', error);
    // Keep the default image as fallback
  }
  
  // Ensure we always have at least one image
  if (images.length === 0) {
    images = [defaultImage];
  }
  
  return images;
}

function createDetailGalleryHTML(images, altText) {
  let slidesHTML = '';
  
  images.forEach((path, index) => {
    slidesHTML += `
      <div class="slider-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
        <img src="${path}" alt="${altText} ${index + 1}" loading="${index === 0 ? 'eager' : 'lazy'}">
      </div>
    `;
  });
  
  let thumbnailsHTML = '';
  if (images.length > 1) {
    images.forEach((path, index) => {
      thumbnailsHTML += `
        <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
          <img src="${path}" alt="Thumbnail ${index + 1}" loading="lazy">
        </div>
      `;
    });
  }
  
  return `
    <div class="detail-image-slider">
      <div class="slider-main">
        <div class="slider-container">
          ${slidesHTML}
        </div>
        ${images.length > 1 ? `
          <button class="slider-prev" aria-label="Previous image"><i class="fas fa-chevron-left"></i></button>
          <button class="slider-next" aria-label="Next image"><i class="fas fa-chevron-right"></i></button>
        ` : ''}
      </div>
      ${images.length > 1 ? `
        <div class="slider-thumbnails">
          ${thumbnailsHTML}
        </div>
      ` : ''}
    </div>
  `;
}

function initializeDetailSlider(sliderElement) {
  const slides = sliderElement.querySelectorAll('.slider-slide');
  const thumbnails = sliderElement.querySelectorAll('.thumbnail');
  const prevBtn = sliderElement.querySelector('.slider-prev');
  const nextBtn = sliderElement.querySelector('.slider-next');
  
  if (slides.length <= 1) {
    // Hide navigation if only one slide
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    return;
  }
  
  let currentIndex = 0;
  let autoAdvanceInterval;
  
  // Function to go to a specific slide
  function goToSlide(index) {
    // Handle bounds
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    // Update current index
    currentIndex = index;
    
    // Update slides
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });
    
    // Update thumbnails
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === currentIndex);
    });
  }
  
  // Set up button handlers
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      resetAutoAdvance();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      resetAutoAdvance();
    });
  }
  
  // Set up thumbnail click handlers
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const index = parseInt(thumb.getAttribute('data-index'));
      goToSlide(index);
      resetAutoAdvance();
    });
  });
  
  // Set up touch swipe functionality
  let touchStartX = 0;
  let touchEndX = 0;
  
  const sliderContainer = sliderElement.querySelector('.slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
      
      // Pause auto-advance on touch
      clearInterval(autoAdvanceInterval);
    }, {passive: true});
    
    sliderContainer.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      
      // Restart auto-advance after touch
      startAutoAdvance();
    }, {passive: true});
  }
  
  function handleSwipe() {
    const swipeThreshold = 50; // minimum distance to be considered a swipe
    
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left (next)
      goToSlide(currentIndex + 1);
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right (previous)
      goToSlide(currentIndex - 1);
    }
  }
  
  // Auto-advance slides every 4 seconds (increased from 2 for better UX)
  function startAutoAdvance() {
    if (slides.length > 1) {
      autoAdvanceInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 4000);
    }
  }
  
  function resetAutoAdvance() {
    clearInterval(autoAdvanceInterval);
    startAutoAdvance();
  }
  
  // Start auto-advance when initialized
  startAutoAdvance();
  
  // Pause auto-advance when mouse hovers over slider
  sliderElement.addEventListener('mouseenter', () => {
    clearInterval(autoAdvanceInterval);
  });
  
  // Resume auto-advance when mouse leaves slider
  sliderElement.addEventListener('mouseleave', () => {
    startAutoAdvance();
  });
  
  // Stop auto-advance if page visibility changes (user switches tabs)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(autoAdvanceInterval);
    } else {
      startAutoAdvance();
    }
  });
}
// Add this to your details.js file or create a separate navigation.js file

document.addEventListener('DOMContentLoaded', function() {
    // Create and insert the back navigation
    createBackNavigation();
    
    // Initialize the image gallery (your existing code)
    initializeDetailGallery();
});

function createBackNavigation() {
    // Get URL parameters to determine the category
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const referrer = document.referrer;
    
    // Determine the back link text and URL based on category
    let backText = 'Back to Services';
    let backUrl = '../pages/services.html';
    let backIcon = 'fas fa-arrow-left';
    
    // Set specific back navigation based on category
    switch(category) {
        case 'activity':
            backText = 'Back to Activities';
            backUrl = '../pages/services.html#activities';
            backIcon = 'fas fa-hiking';
            break;
        case 'tour':
            backText = 'Back to Tours';
            backUrl = '../pages/services.html#tours';
            backIcon = 'fas fa-map-marked-alt';
            break;
        case 'transportation':
            backText = 'Back to Transportation';
            backUrl = '../pages/services.html#transportation';
            backIcon = 'fas fa-car';
            break;
        case 'destination':
            backText = 'Back to Destinations';
            backUrl = '../pages/services.html#destinations';
            backIcon = 'fas fa-map-marker-alt';
            break;
        default:
            // If coming from homepage or other page
            if (referrer.includes('index.html') || referrer.endsWith('/')) {
                backText = 'Back to Home';
                backUrl = '../index.html';
                backIcon = 'fas fa-home';
            }
    }
    
    // Create the back navigation HTML
    const backNavHTML = `
        <div class="back-navigation">
            <a href="${backUrl}" class="back-btn" id="backButton">
                <i class="${backIcon}"></i>
                <span>${backText}</span>
            </a>
        </div>
    `;
    
    // Find where to insert the back navigation
    const heroSection = document.querySelector('.page-hero, .tour-detail-header');
    const mainContent = document.querySelector('.tour-detail-container, .service-detail-container, main');
    
    if (heroSection) {
        // Insert after hero section
        heroSection.insertAdjacentHTML('afterend', backNavHTML);
    } else if (mainContent) {
        // Insert at the beginning of main content
        mainContent.insertAdjacentHTML('beforebegin', backNavHTML);
    } else {
        // Fallback: insert at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', backNavHTML);
    }
    
    // Add click handler with smooth transition
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading state
            this.classList.add('loading');
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Going back...</span>';
            
            // Navigate after a short delay for better UX
            setTimeout(() => {
                window.location.href = this.getAttribute('href');
            }, 300);
        });
    }
    
    // Add breadcrumb navigation as well
    createBreadcrumb(category);
}

function createBreadcrumb(category) {
    // Get current page info
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    // Get the title from the page or data
    let currentTitle = document.title || 'Details';
    const h1Element = document.querySelector('h1');
    if (h1Element) {
        currentTitle = h1Element.textContent;
    }
    
    // Create breadcrumb based on category
    let breadcrumbHTML = '<nav class="breadcrumb" aria-label="Breadcrumb">';
    breadcrumbHTML += '<ol class="breadcrumb-list">';
    
    // Home link
    breadcrumbHTML += '<li class="breadcrumb-item"><a href="../index.html"><i class="fas fa-home"></i> Home</a></li>';
    
    // Services link
    breadcrumbHTML += '<li class="breadcrumb-item"><a href="../pages/services.html">Services</a></li>';
    
    // Category link
    switch(category) {
        case 'activity':
            breadcrumbHTML += '<li class="breadcrumb-item"><a href="../pages/services.html#activities">Activities</a></li>';
            break;
        case 'tour':
            breadcrumbHTML += '<li class="breadcrumb-item"><a href="../pages/services.html#tours">Tours</a></li>';
            break;
        case 'transportation':
            breadcrumbHTML += '<li class="breadcrumb-item"><a href="../pages/services.html#transportation">Transportation</a></li>';
            break;
        case 'destination':
            breadcrumbHTML += '<li class="breadcrumb-item"><a href="../pages/services.html#destinations">Destinations</a></li>';
            break;
    }
    
    // Current page
    breadcrumbHTML += `<li class="breadcrumb-item active" aria-current="page">${currentTitle}</li>`;
    
    breadcrumbHTML += '</ol></nav>';
    
    // Insert breadcrumb
    const backNav = document.querySelector('.back-navigation');
    if (backNav) {
        backNav.insertAdjacentHTML('afterend', breadcrumbHTML);
    }
}

// Handle browser back button to maintain state
window.addEventListener('popstate', function(event) {
    // If user uses browser back button, ensure they go to the right section
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category && document.referrer.includes('services.html')) {
        // Redirect to the correct section
        window.location.href = `../pages/services.html#${category === 'activity' ? 'activities' : category}`;
    }
});

function renderSimpleRouteMap(tourData) {
    if (!tourData.routeMap) return '';
    
    return `
        <div style="width: 100%; height: 400px; margin: 30px 0; border-radius: 10px; overflow: hidden;">
            <iframe 
                src="${tourData.routeMap}" 
                width="100%" 
                height="100%" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy">
            </iframe>
        </div>
    `;
}

let lightboxImages = [];
let currentIndex = 0;

function createSimpleLightbox() {
    // Remove any existing lightbox
    const existing = document.getElementById('simple-lightbox');
    if (existing) existing.remove();

    // Create lightbox HTML
    const lightboxHTML = `
        <div id="simple-lightbox" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 999999;">
            <div id="lightbox-close" style="position: absolute; top: 20px; right: 30px; color: white; font-size: 40px; cursor: pointer;">&times;</div>
            <div id="lightbox-left" style="position: absolute; top: 50%; left: 20px; font-size: 50px; color: white; cursor: pointer;">&#10094;</div>
            <div id="lightbox-right" style="position: absolute; top: 50%; right: 20px; font-size: 50px; color: white; cursor: pointer;">&#10095;</div>
            <div id="lightbox-bg" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; padding: 50px;">
                <img id="simple-lightbox-img" style="max-width: 100%; max-height: 100%; object-fit: contain;" src="" alt="">
            </div>
        </div>
    `;

    // Add to body
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    // Add interactions
    document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'lightbox-close') {
        closeLightbox();
    }
});

    document.getElementById('lightbox-left').onclick = () => showPrevImage();
    document.getElementById('lightbox-right').onclick = () => showNextImage();

    // Close when clicking on background (not image)
    document.getElementById('lightbox-bg').onclick = (e) => {
        if (e.target.id === 'lightbox-bg') {
            closeLightbox();
        }
    };

    // Escape & arrow keys
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });

    // Swipe support
    addSwipeSupport();
}

function openSimpleLightbox(imgSrc) {
    const lightbox = document.getElementById('simple-lightbox');
    const lightboxImg = document.getElementById('simple-lightbox-img');
    currentIndex = lightboxImages.findIndex(src => src === imgSrc);

    if (lightbox && lightboxImg) {
        lightboxImg.src = imgSrc;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('simple-lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function showPrevImage() {
    currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
    document.getElementById('simple-lightbox-img').src = lightboxImages[currentIndex];
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % lightboxImages.length;
    document.getElementById('simple-lightbox-img').src = lightboxImages[currentIndex];
}

function addLightboxClicks() {
    setTimeout(() => {
        const images = document.querySelectorAll('#program-image, .tour-detail-gallery img, .slider-slide img');
        lightboxImages = Array.from(images).map(img => img.src);

        images.forEach(img => {
            img.style.cursor = 'pointer';
            img.onclick = function () {
                openSimpleLightbox(this.src);
            };
        });
    }, 1000);
}

function addSwipeSupport() {
    let touchStartX = 0;

    const lightbox = document.getElementById('simple-lightbox');

    lightbox.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', function (e) {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            showNextImage();
        } else if (touchEndX - touchStartX > 50) {
            showPrevImage();
        }
    });
}

// 🔁 Initialize everything
setTimeout(() => {
    createSimpleLightbox();
    addLightboxClicks();
}, 2000);
