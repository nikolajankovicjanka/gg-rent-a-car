
import type sr from './sr';

const de: typeof sr = {
    nav: {
        home: 'Startseite',
        vehicles: 'Fahrzeuge',
        tracking: 'Buchung verfolgen',
        booking: 'Fahrzeug buchen',
    },

    common: {
        viewDetails: 'Details ansehen',
        bookNow: 'Jetzt buchen',
        perDay: 'pro Tag',
        loading: 'Wird geladen...',
        send: 'Senden',
        cancel: 'Abbrechen',
    },

    booking: {
        title: 'Fahrzeugbuchung',
        vehicle: 'Fahrzeug',
        pickupDate: 'Abholdatum',
        returnDate: 'Rückgabedatum',
        name: 'Vor- und Nachname',
        email: 'E-Mail-Adresse',
        phone: 'Telefonnummer',
        submit: 'Anfrage senden',
        whatsapp: 'Über WhatsApp buchen',
    },

    home: {
        hero: {
            title: 'Ihr Reiseziel.',
            highlight: 'Unser Engagement.',
            description:
                'Erleben Sie erstklassige Autovermietung. Wählen Sie Ihr Fahrzeug, prüfen Sie die Verfügbarkeit und senden Sie in wenigen Augenblicken eine Anfrage.',
            checkAvailability: 'Verfügbarkeit prüfen',
            viewVehicles: 'Fahrzeuge ansehen',
            vehicleAlt: 'GG Rent Fahrzeug',
            overlay: 'IHRE REISE. UNSER ANSPRUCH.',
        },

        stats: {
            onlineInquiries: 'Online-Anfragen',
            transparentPricing: 'Transparente Preise',
            premiumService: 'Premium-Service',
        },

        fleet: {
            eyebrow: 'UNSERE FLOTTE',
            title: 'Finden Sie das passende Fahrzeug.',
            allVehicles: 'Alle Fahrzeuge',
        },

        booking: {
            eyebrow: 'EINFACHE BUCHUNG',
            title: 'Sie wählen den Zeitraum.',
            highlight: 'Wir kümmern uns um den Rest.',
            description:
                'Wählen Sie ein Fahrzeug und verfügbare Termine. Nach Ihrer Anfrage prüft unser Administrator die Buchung und bestätigt sie per E-Mail.',

            steps: {
                vehicle: 'Fahrzeug auswählen',
                calendar: 'Kalender prüfen',
                inquiry: 'Anfrage senden',
                confirmation: 'Bestätigung erhalten',
            },
        },

        faq: {
            eyebrow: 'FRAGEN UND ANTWORTEN',
            title: 'Gut zu wissen.',

            account: {
                question: 'Muss ich ein Benutzerkonto erstellen?',
                answer:
                    'Nein. Wählen Sie ein Fahrzeug und Ihre Termine aus und senden Sie eine Anfrage ohne Registrierung.',
            },

            confirmation: {
                question: 'Ist meine Anfrage automatisch eine bestätigte Buchung?',
                answer:
                    'Nein. Die Buchung wird erst nach Genehmigung durch unseren Administrator bestätigt. Sie erhalten eine Bestätigung per E-Mail.',
            },

            whatsapp: {
                question: 'Kann ich über WhatsApp buchen?',
                answer:
                    'Ja. Wählen Sie Ihr Fahrzeug und Ihre Termine aus und klicken Sie anschließend auf die WhatsApp-Schaltfläche.',
            },
        },
    },

    vehicles: {
        title: 'Unsere Fahrzeuge',
        description: 'Finden Sie das ideale Fahrzeug für Ihre Reise.',
        loading: 'Fahrzeuge werden geladen...',
        availableOnRequest: 'AUF ANFRAGE VERFÜGBAR',
        seats: 'Sitzplätze',
        perDay: 'Tag',
    },
};

export default de;
