// Updated checkout.js - Handles Adult/Children Pricing Structure and Rentals by days

document.addEventListener('DOMContentLoaded', function() {
    console.log('=== CHECKOUT DEBUG ===');
    
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const id = urlParams.get('id');
    
    console.log('URL:', window.location.href);
    console.log('Params:', { category, id });
    
    // Load program data
    loadProgramData(category, id);
    
    // Initialize form handlers
    initializeForm();
});

function loadProgramData(category, id) {
    let programData = null;
    
    // Find program data based on category
    try {
        if (category === 'activity' && typeof activitiesData !== 'undefined') {
            programData = activitiesData[id];
        } else if (category === 'tour' && typeof toursData !== 'undefined') {
            programData = toursData[id];
        } else if (category === 'transportation' && typeof transportationData !== 'undefined') {
            programData = transportationData[id];
        } else if (category === 'rental' && window.serviceDetails && window.serviceDetails[id]) {
            programData = window.serviceDetails[id];
        }

        if (programData) {
            console.log('Program found:', programData.title);
            displayProgramInfo(programData, category, id);
        } else {
            console.log('Program not found!');
            showError();
        }

    } catch (error) {
        console.error('Error loading program:', error);
        showError();
    }
}

function displayProgramInfo(data, category, id) {
    // Update program name in header
    const programNameEl = document.getElementById('program-name');
    if (programNameEl) {
        programNameEl.textContent = data.title;
        console.log('Updated program name');
    }
    
    // Update program image
    const programImageEl = document.getElementById('program-image');
    if (programImageEl && data.mainImage) {
        programImageEl.src = data.mainImage;
        programImageEl.alt = data.title;
        programImageEl.style.display = 'block';
        console.log('Updated program image:', data.mainImage);
    } else if (programImageEl) {
        // Fallback image if no image is available
        programImageEl.src = '../assets/images/hero/slide1.jpg';
        programImageEl.alt = 'Morocco Tour';
        programImageEl.style.display = 'block';
    }
    
        // Update hidden form fields with pricing structure
    document.getElementById("category").value = category;
    document.getElementById("program-id").value = id;

    // Handle dynamic pricing first
    if (data.groupPricing) {
        // For group pricing, we don't set fixed adult/child prices here
        document.getElementById("program-price").value = 0; // Placeholder, actual price calculated later
        let childrenPriceInput = document.getElementById("children-price");
        if (!childrenPriceInput) {
            childrenPriceInput = document.createElement("input");
            childrenPriceInput.type = "hidden";
            childrenPriceInput.id = "children-price";
            childrenPriceInput.name = "children-price";
            document.getElementById("checkout-form").appendChild(childrenPriceInput);
        }
        childrenPriceInput.value = 0; // Placeholder
    } else if (data.pricing) {
        // New pricing structure with adult/children prices
        // For non-rentals we keep the existing structure
        document.getElementById("program-price").value = data.pricing.adult;

        // Add hidden field for children price
        let childrenPriceInput = document.getElementById("children-price");
        if (!childrenPriceInput) {
            childrenPriceInput = document.createElement("input");
            childrenPriceInput.type = "hidden";
            childrenPriceInput.id = "children-price";
            childrenPriceInput.name = "children-price";
            document.getElementById("checkout-form").appendChild(childrenPriceInput);
        }
        childrenPriceInput.value = data.pricing.child;
    } else {
        // Fallback to old pricing structure
        document.getElementById("program-price").value = data.price || 0;

        // Calculate children price as 50% of adult price for backward compatibility (will be ignored for rentals)
        let childrenPriceInput = document.getElementById("children-price");
        if (!childrenPriceInput) {
            childrenPriceInput = document.createElement("input");
            childrenPriceInput.type = "hidden";
            childrenPriceInput.id = "children-price";
            childrenPriceInput.name = "children-price";
            document.getElementById("checkout-form").appendChild(childrenPriceInput);
        }
        childrenPriceInput.value = (data.price || 0) * 0.5;
    }

    
    // Update booking summary
    const summaryProgram = document.getElementById('summary-program');
    if (summaryProgram) {
        summaryProgram.textContent = data.title;
    }
    
    // Update pricing display in summary
    updatePricingDisplay(data);
    
    console.log('Program info displayed successfully');
}

function updatePricingDisplay(data) {
    const summaryPriceEl = document.getElementById('summary-price');
    if (!summaryPriceEl) return;

    const category = document.getElementById('category') ? document.getElementById('category').value : '';
    const id = document.getElementById('program-id') ? document.getElementById('program-id').value : '';

    // Special case: Airport transfer is €15 per person for everyone
    if (category === 'transportation' && id === 'airport-transfer') {
        summaryPriceEl.innerHTML = `
            <div class="pricing-breakdown">
                <div class="price-item">Everyone: €15/person</div>
            </div>
        `;
        updateTotalPrice();
        return;
    }

    // Rental: show single per-day price
    if (category === 'rental') {
        const perDay = data.price || 0;
        summaryPriceEl.innerHTML = `
            <div class="pricing-breakdown">
                <div class="price-item">Price: €${perDay}/day</div>
            </div>
        `;
        updateTotalPrice();
        return;
    }

    // Generic pricing display
    let adultPrice, childPrice;
    if (data.pricing) {
        adultPrice = data.pricing.adult;
        childPrice = data.pricing.child;
    } else {
        adultPrice = data.price || 0;
        childPrice = (data.price || 0) * 0.5;
    }

    if (adultPrice !== childPrice) {
        summaryPriceEl.innerHTML = `
            <div class="pricing-breakdown">
                <div class="price-item">Adults: €${adultPrice}/person</div>
                <div class="price-item">Children: €${childPrice}/person</div>
            </div>
        `;
    } else {
        summaryPriceEl.textContent = `€${adultPrice}/person`;
    }

    updateTotalPrice();
}

function showError() {
    const programNameEl = document.getElementById('program-name');
    const summaryProgram = document.getElementById('summary-program');
    
    if (programNameEl) {
        programNameEl.textContent = 'Program Not Found';
    }
    
    if (summaryProgram) {
        summaryProgram.textContent = 'Program Not Found';
    }
}

function initializeForm() {
    // Initialize enhanced date picker FIRST
    addDatePickerCSS();
    initializeDatePicker();

    // Handle participant count changes
    const adultsSelect = document.getElementById('adults');
    const childrenSelect = document.getElementById('children');

    if (adultsSelect) {
        adultsSelect.addEventListener('change', updateParticipants);
    }

    if (childrenSelect) {
        childrenSelect.addEventListener('change', updateParticipants);
    }

    // Handle date changes
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.addEventListener('change', function() {
            const summaryDate = document.getElementById('summary-date');
            if (summaryDate) {
                // Format the date nicely
                const date = new Date(this.value);
                const options = {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                };
                summaryDate.textContent = date.toLocaleDateString('en-US', options);
            }
            updateTotalPrice();
        });
    }

    // Rental-specific handling: show From/To, hide children, compute total days
    const category = document.getElementById('category').value;
    if (category === 'rental') {
        const rentalPeriod = document.getElementById('rental-period');
        const singleDateGroup = document.getElementById('single-date-group');
        if (rentalPeriod) rentalPeriod.style.display = 'block';
        if (singleDateGroup) singleDateGroup.style.display = 'none';

        // Hide children selector for rentals
        const childrenSelectEl = document.getElementById('children');
        if (childrenSelectEl) {
            const parent = childrenSelectEl.closest('.form-group');
            if (parent) parent.style.display = 'none';
            childrenSelectEl.value = '0';
        }

        // For rentals: show 'Number of bikes' only for bike rentals; remove the field for car rentals
        const adultsLabel = document.querySelector('label[for="adults"]');
        const adultsSelectEl = document.getElementById('adults');
        const programId = document.getElementById('program-id') ? document.getElementById('program-id').value : '';

        // Define bike identifiers (extend if more bike ids are added)
        const bikeIds = new Set(['city-bike', 'mountain-bike']);

        if (bikeIds.has(programId)) {
            // Bike rental: show Number of bikes (label only). We'll populate hidden number_of_bikes for FormSubmit.
            if (adultsLabel) adultsLabel.textContent = 'Number of bikes*';
        } else {
            // Car rental (or other rentals): remove visible "Adults/Number of bikes" field completely
            if (adultsSelectEl) {
                const formGroup = adultsSelectEl.closest('.form-group');
                if (formGroup) formGroup.remove();
            }

            // Ensure a hidden input with id 'adults' exists so calculation code still finds it
            // and the form still submits a default quantity of 1 if needed.
            if (!document.getElementById('adults')) {
                const hiddenAdults = document.createElement('input');
                hiddenAdults.type = 'hidden';
                hiddenAdults.id = 'adults';
                hiddenAdults.name = 'adults';
                hiddenAdults.value = '1';
                const formEl = document.getElementById('checkout-form');
                if (formEl) formEl.appendChild(hiddenAdults);
            }
        }

        const fromInput = document.getElementById('from-date');
        const toInput = document.getElementById('to-date');

        const onRentalDateChange = () => {
            const summaryDate = document.getElementById('summary-date');
            if (!fromInput || !toInput) return;
            const fromVal = fromInput.value ? new Date(fromInput.value) : null;
            const toVal = toInput.value ? new Date(toInput.value) : null;

            if (fromVal && toVal && toVal < fromVal) {
                alert('Return date must be the same or after the start date');
                toInput.value = '';
                return;
            }

            if (summaryDate) {
                if (fromVal && toVal) {
                    const options = { year: 'numeric', month: 'short', day: 'numeric' };
                    summaryDate.textContent = `${fromVal.toLocaleDateString('en-US', options)} — ${toVal.toLocaleDateString('en-US', options)}`;
                } else if (fromVal) {
                    summaryDate.textContent = fromVal.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                }
            }

            updateTotalPrice();
        };

        if (fromInput) fromInput.addEventListener('change', onRentalDateChange);
        if (toInput) toInput.addEventListener('change', onRentalDateChange);
    }

    // Initial participant update
    updateParticipants();

    // Special handling for airport-transfer: hide children; show contact note if >7
    const programId = document.getElementById('program-id').value;
    if (category === 'transportation' && programId === 'airport-transfer') {
        const childrenSelectEl = document.getElementById('children');
        if (childrenSelectEl) {
            const parent = childrenSelectEl.closest('.form-group');
            if (parent) parent.style.display = 'none';
            childrenSelectEl.value = '0';
        }

        const adultsSelectEl = document.getElementById('adults');
        if (adultsSelectEl) {
            adultsSelectEl.addEventListener('change', function() {
                updateParticipants();
            });
        }

        // Initial note state
        updateTotalPrice();
    }
}

function updateParticipants() {
    const adultsSelect = document.getElementById('adults');
    const childrenSelect = document.getElementById('children');
    const summaryParticipants = document.getElementById('summary-participants');
    
    if (adultsSelect && childrenSelect && summaryParticipants) {
        const adults = parseInt(adultsSelect.value) || 1; // used as quantity for rentals
        const children = parseInt(childrenSelect.value) || 0;
        const category = document.getElementById('category') ? document.getElementById('category').value : '';
        const id = document.getElementById('program-id') ? document.getElementById('program-id').value : '';

        if (category === 'transportation' && id === 'airport-transfer') {
            const totalPeople = adults + 0; // children hidden
            summaryParticipants.textContent = `${totalPeople} ${totalPeople === 1 ? 'person' : 'people'}`;
        } else if (category === 'rental') {
            // Show quantity and days for rentals
            const fromInput = document.getElementById('from-date');
            const toInput = document.getElementById('to-date');
            let days = 1;
            if (fromInput && toInput && fromInput.value && toInput.value) {
                const fromVal = new Date(fromInput.value);
                const toVal = new Date(toInput.value);
                const msPerDay = 1000 * 60 * 60 * 24;
                const diff = Math.round((toVal - fromVal) / msPerDay);
                days = Math.max(1, diff || 0);
            }
            summaryParticipants.textContent = `${adults} item${adults !== 1 ? 's' : ''} — ${days} day${days !== 1 ? 's' : ''}`;

            // Update hidden quantity fields for FormSubmit
            const hiddenBikes = document.getElementById('number_of_bikes');
            const hiddenCars = document.getElementById('number_of_cars');
            const quantityField = document.getElementById('quantity');
            const programId = document.getElementById('program-id') ? document.getElementById('program-id').value : '';
            const bikeIds = new Set(['city-bike', 'mountain-bike']);

            if (bikeIds.has(programId)) {
                if (hiddenBikes) hiddenBikes.value = adults.toString();
                if (hiddenCars) hiddenCars.value = '';
                if (quantityField) quantityField.value = adults.toString();
            } else {
                // car or other rental
                if (hiddenCars) hiddenCars.value = adults.toString();
                if (hiddenBikes) hiddenBikes.value = '';
                if (quantityField) quantityField.value = adults.toString();
            }
        } else {
            summaryParticipants.textContent = `${adults} adult${adults !== 1 ? 's' : ''}, ${children} child${children !== 1 ? 'ren' : ''}`;

            // Clear hidden fields for non-rentals
            const hiddenBikes = document.getElementById('number_of_bikes');
            const hiddenCars = document.getElementById('number_of_cars');
            const quantityField = document.getElementById('quantity');
            if (hiddenBikes) hiddenBikes.value = '';
            if (hiddenCars) hiddenCars.value = '';
            if (quantityField) quantityField.value = '';
        }

        updateTotalPrice();
    }
}

function updateTotalPrice() {
    const adultsSelect = document.getElementById("adults");
    const childrenSelect = document.getElementById("children");
    const summaryTotal = document.getElementById("summary-total");
    const category = document.getElementById("category").value;
    const id = document.getElementById("program-id").value;

    if (adultsSelect && summaryTotal) {
        const adults = parseInt(adultsSelect.value) || 1;
        // childrenSelect may not exist or may be hidden for some services
        const children = document.getElementById('children') ? (parseInt(document.getElementById('children').value) || 0) : 0;
        const totalPeople = adults + children;

        let totalPrice = 0;
        let adultPrice = 0;
        let childPrice = 0;

        // Retrieve program data again to access groupPricing
        let programData = null;
        if (category === 'activity' && typeof activitiesData !== 'undefined') {
            programData = activitiesData[id];
        } else if (category === 'tour' && typeof toursData !== 'undefined') {
            programData = toursData[id];
        } else if (category === 'transportation' && typeof transportationData !== 'undefined') {
            programData = transportationData[id];
        } else if (category === 'rental' && window.serviceDetails && window.serviceDetails[id]) {
            programData = window.serviceDetails[id];
        }

        if (programData) {
            // Special-case: Airport Transfer is per vehicle (flat €15) for up to 7 people
            if (category === 'transportation' && id === 'airport-transfer') {
                const perPerson = 15;
                const notice = document.getElementById('group-contact-note');

                if (totalPeople >= 1 && totalPeople <= 7) {
                    totalPrice = perPerson * totalPeople;
                    if (notice) notice.style.display = 'none';
                } else if (totalPeople > 7) {
                    totalPrice = 0;
                    if (notice) notice.style.display = 'block';
                }

                adultPrice = perPerson;
                childPrice = perPerson;
            } else if (category === 'rental' && programData.price) {
                // Rental pricing: price per day * number of days * quantity (adults select used as quantity)
                const fromInput = document.getElementById('from-date');
                const toInput = document.getElementById('to-date');
                let days = 1;
                if (fromInput && toInput && fromInput.value && toInput.value) {
                    const fromVal = new Date(fromInput.value);
                    const toVal = new Date(toInput.value);
                    const msPerDay = 1000 * 60 * 60 * 24;
                    const diff = Math.round((toVal - fromVal) / msPerDay);
                    days = Math.max(1, diff || 0);
                }
                const quantity = adults; // use adults select as quantity for rentals
                const perDay = programData.price;
                totalPrice = perDay * days * quantity;
                adultPrice = perDay; // per day price
                childPrice = perDay;
            } else if (programData.groupPricing) {
                if (category === 'activity') {
                    totalPrice = calculateDynamicPrice(id, totalPeople);
                } else if (category === 'tour') {
                    totalPrice = calculateDynamicTourPrice(id, totalPeople);
                }
                // For display purposes in breakdown, we can approximate per person price
                adultPrice = totalPrice / (totalPeople || 1);
                childPrice = totalPrice / (totalPeople || 1); // Assuming same for children in group pricing
            } else if (programData.pricing) {
                adultPrice = programData.pricing.adult;
                childPrice = programData.pricing.child;
                totalPrice = (adults * adultPrice) + (children * childPrice);
            } else if (programData.price) {
                adultPrice = programData.price;
                childPrice = programData.price * 0.5; // Fallback for old single price
                totalPrice = (adults * adultPrice) + (children * childPrice);
            }
        }

        summaryTotal.textContent = totalPrice.toFixed(2);

        // Update detailed breakdown if it exists
        const breakdownEl = document.getElementById("price-breakdown");
        if (breakdownEl) {
            // Build breakdown based on category
            const cat = category;
            if (cat === 'rental') {
                // Show quantity × days × per day price
                const fromInput = document.getElementById('from-date');
                const toInput = document.getElementById('to-date');
                let days = 1;
                if (fromInput && toInput && fromInput.value && toInput.value) {
                    const fromVal = new Date(fromInput.value);
                    const toVal = new Date(toInput.value);
                    const msPerDay = 1000 * 60 * 60 * 24;
                    const diff = Math.round((toVal - fromVal) / msPerDay);
                    days = Math.max(1, diff || 0);
                }
                const quantity = adults;
                breakdownEl.innerHTML = `
                    <div class="breakdown-item">
                        <span>Price (€${adultPrice.toFixed(2)} / day)</span>
                        <span>€${adultPrice.toFixed(2)}</span>
                    </div>
                    <div class="breakdown-item">
                        <span>Quantity × Days (${quantity} × ${days})</span>
                        <span>€${(quantity * days * adultPrice).toFixed(2)}</span>
                    </div>
                    <div class="breakdown-total">
                        <span>Total:</span>
                        <span>€${totalPrice.toFixed(2)}</span>
                    </div>
                `;
            } else {
                breakdownEl.innerHTML = `
                    <div class="breakdown-item">
                        <span>Adults (${adults} × €${adultPrice.toFixed(2)}):</span>
                        <span>€${(adults * adultPrice).toFixed(2)}</span>
                    </div>
                    ${children > 0 ? `
                    <div class="breakdown-item">
                        <span>Children (${children} × €${childPrice.toFixed(2)}):</span>
                        <span>€${(children * childPrice).toFixed(2)}</span>
                    </div>` : ''}
                    <div class="breakdown-total">
                        <span>Total:</span>
                        <span>€${totalPrice.toFixed(2)}</span>
                    </div>
                `;
            }
        }

        console.log("Price calculation:", {
            adultPrice,
            childPrice,
            adults,
            children,
            totalPrice
        });
    }
}


// Date picker functions (keeping your existing ones)
function initializeDatePicker() {
    const dateInput = document.getElementById('date');
    if (!dateInput) return;
    
    console.log('Initializing date picker...');
    
    // Set minimum date to today
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    dateInput.min = todayString;
    
    // Ensure it's a date input
    dateInput.type = 'date';
    
    // Add enhanced styling
    dateInput.classList.add('enhanced-date-input');
    
    // Wrap in container for icon (only if not already wrapped)
    if (!dateInput.parentElement.classList.contains('date-input-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'date-input-wrapper';
        dateInput.parentNode.insertBefore(wrapper, dateInput);
        wrapper.appendChild(dateInput);
        
        // Add calendar icon
        const calendarIcon = document.createElement('i');
        calendarIcon.className = 'fas fa-calendar-alt date-input-icon';
        wrapper.appendChild(calendarIcon);
        
        // Make icon clickable
        calendarIcon.addEventListener('click', function() {
            dateInput.focus();
            if (dateInput.showPicker) {
                dateInput.showPicker();
            }
        });
        
        console.log('Date picker wrapper and icon added');
    }
    
    // Add validation
    dateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            alert('Please select a future date');
            this.value = '';
            return;
        }
        
        // Update summary with formatted date
        const summaryDate = document.getElementById('summary-date');
        if (summaryDate) {
            const formattedDate = selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            summaryDate.textContent = formattedDate;
        }
        
        console.log('Date selected:', this.value);
    });
    
    // Focus event - try to show picker on supported browsers
    dateInput.addEventListener('focus', function() {
        if (this.showPicker && !this.value) {
            setTimeout(() => {
                if (this.showPicker) {
                    this.showPicker();
                }
            }, 100);
        }
    });
}

function addDatePickerCSS() {
    // Check if styles already added
    if (document.getElementById('date-picker-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'date-picker-styles';
    style.textContent = `
        .date-input-wrapper {
            position: relative;
            display: block;
            width: 100%;
        }
        
        .enhanced-date-input {
            width: 100%;
            padding: 12px 40px 12px 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            font-family: inherit;
            background-color: #fff;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .enhanced-date-input:focus {
            outline: none;
            border-color: #E57C23;
            box-shadow: 0 0 0 3px rgba(229, 124, 35, 0.2);
        }
        
        .date-input-icon {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #E57C23;
            cursor: pointer;
            font-size: 16px;
            transition: color 0.3s ease;
        }
        
        .date-input-icon:hover {
            color: #d06a1e;
        }
        
        /* Hide default calendar icon in WebKit browsers */
        .enhanced-date-input::-webkit-calendar-picker-indicator {
            opacity: 0;
            position: absolute;
            right: 0;
            width: 40px;
            height: 100%;
            cursor: pointer;
        }
        
        .pricing-breakdown {
            font-size: 0.9rem;
        }
        
        .price-item {
            margin-bottom: 5px;
        }
        
        .breakdown-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 0.9rem;
        }
        
        .breakdown-total {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid #eee;
            font-weight: 600;
        }
        
        /* Mobile responsive */
        @media (max-width: 768px) {
            .enhanced-date-input {
                padding: 14px 45px 14px 15px;
                font-size: 16px; /* Prevents zoom on iOS */
            }
            
            .date-input-icon {
                right: 15px;
                font-size: 18px;
            }
        }
    `;
    
    document.head.appendChild(style);
    console.log('Date picker CSS added');
}

// Add this to your checkout.js
document.addEventListener('DOMContentLoaded', function() {
    function updateTotalPriceField() {
        const totalPriceField = document.getElementById('total-price');
        const summaryTotal = document.getElementById('summary-total');
        const programName = document.getElementById('program-name');
        const programNameField = document.getElementById('program-name-hidden');
        
        if (totalPriceField && summaryTotal && summaryTotal.textContent) {
            totalPriceField.value = '€' + summaryTotal.textContent;
            console.log('Updated total price field:', totalPriceField.value);
        }
        
        if (programNameField && programName && programName.textContent !== 'Loading...') {
            programNameField.value = programName.textContent;
            console.log('Updated program name field:', programNameField.value);
        }
    }
    
    // Update on page load
    setTimeout(updateTotalPriceField, 2000);
    
    // Update when adults/children change
    const adultsSelect = document.getElementById('adults');
    const childrenSelect = document.getElementById('children');
    
    if (adultsSelect) {
        adultsSelect.addEventListener('change', function() {
            setTimeout(updateTotalPriceField, 100);
        });
    }
    
    if (childrenSelect) {
        childrenSelect.addEventListener('change', function() {
            setTimeout(updateTotalPriceField, 100);
        });
    }
});
