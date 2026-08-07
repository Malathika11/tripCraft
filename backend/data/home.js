const homeData = {
    header : {
        logoImg: '../../../assets/images/logo.png',
        logoText1: 'Trip',
        logoText2: 'Craft',
        bodyTextOne: 'Explore. Plan. Experience',
        bodyTextTwo: 'Craft your journey, create memories',
        bodyTextThree: 'Your dream trip is just a few clicks away.',
        headCard: [
            {
                img: '../../../assets/images/plan_my_trip.png',
                title: 'Plan my trip',
                para: 'Create a personalized travel itinerary based on budget, destination, number of travelers and trip duration.',
                btnText: 'Start Planning'
            },
            {
                img: '../../../assets/images/visa_assistance.png',
                title: 'Visa Assistance',
                para: 'Get visa support, documentaion guidance, visa fee details and application tracking.',
                btnText: 'Apply for visa'
            }
        ]
    },
    whyChoose : {
        chooseHeader: 'why choose tripcraft?',
        choosePara: 'your journey, our priority',
        cardData: [
            {
                img: 'cls-3-medal',
                head: 'Expert Guidance',
                para: 'Travel experts to help you plan the perfect trip.'
            },
            {
                img: 'cls-4-tag',
                head: 'Best Prices',
                para: 'Get the best deals and save more on travel.'
            },
            {
                img: 'cls-6-support',
                head: '24/7 Support',
                para: "We're here for you anytime, anywhere."   
            },
            {
                img: 'cls-5-secured-filled',
                head: 'Secure & Reliable',
                para: 'Your data and journey are safe with us.'
            }
        ]
    },
    testimonials : [
        {
            message: 'TripCraft made our honeymoon absolutely perfect! Every detail was planned to perfection.',
            personImg: '../../../assets/images/homePerson1.avif',
            personName: 'Ananya & Rohit',
            personPlace: 'Bali, Indonesia',
            star: 5
        },
        {
            message: 'The visa assistance was smooth and stress-free.Got my visa approved without any hassle!',
            personImg: '../../../assets/images/homePerson2.avif',
            personName: 'Vikram S.',
            personPlace: 'Canada',
            star: 5
        },
        {
            message: 'Excellent service and amazing itinerary. Highly recommend TripCraft to all travelers!',
            personImg: '../../../assets/images/homePerson3.avif',
            personName: 'Priya M.',
            personPlace: 'Switzerland',
            star: 5
        },
        {
            message: 'TripCraft made our honeymoon absolutely perfect! Every detail was planned to perfection.',
            personImg: '../../../assets/images/homePerson1.avif',
            personName: 'Ananya & Rohit',
            personPlace: 'Bali, Indonesia',
            star: 5
        },
        {
            message: 'The visa assistance was smooth and stress-free.Got my visa approved without any hassle!',
            personImg: '../../../assets/images/homePerson2.avif',
            personName: 'Vikram S.',
            personPlace: 'Canada',
            star: 5
        }
    ],
    footer : {
        footerFirst: {
            img: '../../../assets/images/logo.png',
            txt: 'TripCraft',
            para: 'Crafting unforgettable journeys with seamless planning and trusted support.',
            icons : ['cls-9-facebook', 'cls-8-instagram', 'cls-10-twitter', 'cls-7-youtube']
        },
        footerSec: [
            {
                name: 'Company',
                ulValue: ['About Us', 'How It Works', 'Careers', 'Blog', 'Contact Us']
            },
            {
                name: 'Support',
                ulValue: ['Help Center', 'FAQs', 'Terms & Conditions', 'Privacy Policy', 'Refund Policy']
            }
        ],
        footerThree: {
            name: 'Contact Us',
            contactItem: [
                {
                    class: 'cls-13-call',
                    text: '+91 98765 43210'
                },
                {
                    class: 'cls-12-mail',
                    text: 'support@tripcraft.com'
                },
                {
                    class: 'cls-11-hugeicons_location',
                    text: '123, Travel Street, New Delhi, India'
                }
            ]
        }
    }
}

module.exports = homeData;