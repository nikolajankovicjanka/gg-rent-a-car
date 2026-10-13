
import type sr from './sr';

const en: typeof sr = {
    nav: {
        home: 'Home',
        vehicles: 'Vehicles',
        tracking: 'Track booking',
        booking: 'Book a vehicle',
    },

    common: {
        viewDetails: 'View details',
        bookNow: 'Book now',
        perDay: 'per day',
        loading: 'Loading...',
        send: 'Send',
        cancel: 'Cancel',
    },

    booking: {
        title: 'Vehicle booking',
        vehicle: 'Vehicle',
        pickupDate: 'Pick-up date',
        returnDate: 'Return date',
        name: 'Full name',
        email: 'Email address',
        phone: 'Phone number',
        submit: 'Send inquiry',
        whatsapp: 'Book via WhatsApp',
    },

    home: {
        hero: {
            title: 'Your destination.',
            highlight: 'Our dedication.',
            description:
                'Experience premium car rental. Choose your vehicle, check availability and send an inquiry in just a few moments.',
            checkAvailability: 'Check availability',
            viewVehicles: 'View vehicles',
            vehicleAlt: 'GG Rent vehicle',
            overlay: 'YOUR JOURNEY, ELEVATED.',
        },

        stats: {
            onlineInquiries: 'Online inquiries',
            transparentPricing: 'Transparent pricing',
            premiumService: 'Premium service',
        },

        fleet: {
            eyebrow: 'OUR FLEET',
            title: 'Find the perfect vehicle for you.',
            allVehicles: 'All vehicles',
        },

        booking: {
            eyebrow: 'EASY BOOKING',
            title: 'You choose the dates.',
            highlight: 'We take care of the rest.',
            description:
                'Select a vehicle and available dates. Once you submit an inquiry, our administrator will review and confirm your booking by email.',

            steps: {
                vehicle: 'Choose a vehicle',
                calendar: 'Check the calendar',
                inquiry: 'Send an inquiry',
                confirmation: 'Receive confirmation',
            },
        },

        faq: {
            eyebrow: 'FREQUENTLY ASKED QUESTIONS',
            title: 'Good to know.',

            account: {
                question: 'Do I need to create an account?',
                answer:
                    'No. Choose a vehicle, select your dates and send an inquiry without registering.',
            },

            confirmation: {
                question: 'Is my inquiry an automatically confirmed booking?',
                answer:
                    'No. Your booking is confirmed only after approval by our administrator. We will send you an email confirmation.',
            },

            whatsapp: {
                question: 'Can I book via WhatsApp?',
                answer:
                    'Yes. Select your vehicle and dates, then click the WhatsApp button.',
            },
        },
    },

    vehicles: {
        title: 'Our vehicles',
        description: 'Find the ideal vehicle for your journey.',
        loading: 'Loading vehicles...',
        availableOnRequest: 'AVAILABLE ON REQUEST',
        seats: 'seats',
        perDay: 'day',
    },
};

export default en;
