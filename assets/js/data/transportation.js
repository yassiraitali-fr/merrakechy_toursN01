// assets/js/data/transportation.js

// Transportation services data
const transportationData = {
    'airport-transfer': {
        title: 'Airport Transfer Service',
        subtitle: 'Comfortable and reliable transfers between Marrakech Menara Airport and your accommodation',
        heroImage: '../assets/images/itinerary/Aeroport-Marrakech.webp', // Use a placeholder image for now
        mainImage: '../assets/images/itinerary/Aeroport-Marrakech.webp', // Use a placeholder image for now
        price: 15,
        duration: 'Approximately 20-30 minutes',
        location: 'Marrakech',
        groupSize: '1-4 people per standard vehicle',
        rating: 4.8,
        reviews: 215,
        description: `
            <h3>Service Overview</h3>
            <p>Avoid the hassle and uncertainty of finding transportation upon arrival in Marrakech with our reliable airport transfer service. We provide comfortable, air-conditioned vehicles .</p>
            <p>Our service includes meet and greet at the airport, with your driver waiting in the arrivals hall holding a sign with your name. For departures, your driver will pick you up from your accommodation at the agreed time, ensuring you reach the airport with plenty of time for your flight.</p>
            <p>All our vehicles are modern, well-maintained, and equipped with air conditioning for your comfort. We offer 24/7 service, so no matter when your flight arrives or departs, we have you covered.</p>
        `,
        includes: [
            'Meet and greet service at the airport (for arrivals)',
            'Private transportation in air-conditioned vehicle',

        ],
        bring: [
            'Your flight details (for airport pickup)',
            'Your accommodation address in Marrakech',
            'A working mobile phone number for communication if needed'
        ],
        availability: '24/7, 365 days a year',
        additionalInfo: {
            'Vehicle Types': 'Standard sedan, minivan, or minibus',
            'Waiting Time': 'Up to 2 hour after flight landing at no extra charge',
            'Cancellation': 'Free up to 24h before',
            'NOTE' :  ' Pickup/drop-off 10 km+ from Marrakech: €20 per vehicle'
        },
        priceUnit: '/person (up to 7 people)',
        relatedPrograms: ['private-driver', 'intercity-transfer', 'camel-ride']
    },

    "private-driver": {
        title: "Private Car with Driver",
        subtitle: "Customize your day trip with flexible vehicle and fuel options",
        heroImage: "../assets/images/itinerary/Car_Pic.webp", // Placeholder
        mainImage: "../assets/images/itinerary/Car_Pic.webp", // Placeholder
        price: 40, // Base from
        showCustomPricing: true ,
        duration: "Full day (up to 10 hours)",
        location: "Marrakech and surrounding areas",
        groupSize: "1–50 people ",
        rating: 4.9,
        reviews: 78,
        description: `
    <h3>Service Overview</h3>
    <p>Enjoy the flexibility of traveling through Marrakech and nearby regions with a professional driver and private vehicle tailored to your group and needs. This service is perfect for families, groups, or couples who want to explore without the stress of navigation or planning transport.</p>

    <p>You can choose from a range of vehicle and fuel options depending on your route, distance, and preferences. After booking, our team will contact you to confirm all the details and suggest the best setup for your journey.</p>

    <h4>Available Options:</h4>
    <ul>
      <li>🚘 <strong>Vehicle Types:</strong>
        <ul>
          <li>Standard Private Car (1–4 people)</li>
          <li>4x4 Vehicle (for mountain or off-road trips)</li>
          <li>Minibus (for larger groups up to 16 people)</li>
        </ul>
      </li>
      <li>⛽ <strong>Fuel Options:</strong>
        <ul>
          <li>With fuel included</li>
          <li>Without fuel (you cover fuel separately)</li>
        </ul>
      </li>
      <li>🕒 <strong>Duration:</strong> Full-day service (up to 10 hours)</li>
    </ul>

    <p><em>Our agent will contact you after booking to finalize the best setup based on your destination and group size.</em></p>
  `,
        includes: [
            "Private air-conditioned vehicle",
            "Pickup and drop-off at your accommodation",
        ],
        
        availability: "Available daily, advance booking recommended",
        additionalInfo: {
            "Customization": "You can suggest your own itinerary or ask the driver for recommendations",
            "Vehicle Selection": "Based on group size and route (city, mountain, desert, etc.)",
            "Operating Hours": "Flexible, up to 10 hours total",
            "Confirmation": "Instant, followed by a confirmation call",
            "Cancellation": "Free up to 48h before"
        },
        priceUnit: "/day",
        relatedPrograms: ["airport-transfer", "intercity-transfer", "imlil-atlas"]
    },

    'intercity-transfer': {
        title: 'City-to-City Transfer Service',
        subtitle: 'Comfortable and direct transportation between Morocco\'s major cities and destinations',
        heroImage: '../assets/images/itinerary/car_fleet.webp', // Use a placeholder image for now
        mainImage: '../assets/images/itinerary/car_fleet.webp', // Use a placeholder image for now
        price: 40,
        showCustomPricing: true ,
        duration: 'Varies by destination',
        location: 'Various cities in Morocco',
        groupSize: '1-50 people per standard vehicle',
        rating: 4.7,
        reviews: 93,
        description: `
            <h3>Service Overview</h3>
            <p>Travel comfortably between Morocco's major cities and destinations with our reliable intercity transfer service. We provide private, direct transportation in modern, air-conditioned vehicles with professional drivers, allowing you to relax and enjoy the journey while we handle the logistics.</p>
            <p>Our service offers a convenient alternative to public transportation, giving you the flexibility to depart at your preferred time and to travel directly to your accommodation at your destination. Your driver can make short stops upon request for bathroom breaks, photo opportunities, or quick refreshments.</p>
            <p>Popular routes include Marrakech to Essaouira, Marrakech to Casablanca, Marrakech to Fes, and many more. All our vehicles are well-maintained and equipped for long-distance travel, ensuring your journey is as comfortable as possible.</p>
        `,
        includes: [
            'Private transportation in air-conditioned vehicle',
            'Pickup and Drop-off from your accommodation at origin city',
            'Fuel and all transportation costs',
            'Short breaks upon request',
        ],
        bring: [
            
        ],
        availability: 'Daily, 24/7, subject to availability',
        additionalInfo: {
            'Vehicle Types': 'Standard sedan, minivan, or minibus depending on group size',
            'Custom Routes': 'Available upon request',
            'Journey Time': 'Varies by destination - contact us for specific routes',
            'Cancellation': 'Free up to 48h before'
        },
        priceUnit: '/person (minimum 2 people)',
        relatedPrograms: ['airport-transfer', 'private-driver', 'zagora-2-days']
    }
};
