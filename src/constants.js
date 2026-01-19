// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
    PACKAGES: '/packages',
    CATEGORIES: '/categories',
    ENQUIRIES: '/enquiries',
    BLOGS: '/blogs',
    GALLERY: '/gallery',
    BOOKINGS: '/bookings',
};

// Theme Colors
export const COLORS = {
    PRIMARY: '#ff5722',
    SECONDARY: '#2c3e50',
    BACKGROUND: '#f8f9fa',
    TEXT_DARK: '#1a1a1a',
    TEXT_LIGHT: '#6c757d',
    WHITE: '#ffffff',
};

// Brand Constants
export const BRAND = {
    NAME: 'WanderLux',
    TAGLINE: 'Discover Your Next Adventure',
    DESCRIPTION: 'Experience the world with curated travel packages designed for unforgettable journeys',
};

// Social Links
export const SOCIAL_LINKS = {
    FACEBOOK: 'https://facebook.com',
    TWITTER: 'https://twitter.com',
    INSTAGRAM: 'https://instagram.com',
    LINKEDIN: 'https://linkedin.com',
};

// Navigation Links
export const NAV_LINKS = [
    { id: 1, label: 'Home', href: '#home' },
    { id: 2, label: 'Packages', href: '#packages' },
    { id: 3, label: 'Categories', href: '#categories' },
    { id: 4, label: 'About', href: '#about' },
    { id: 5, label: 'Contact', href: '#contact' },
];

// Animation Variants
export const ANIMATION_VARIANTS = {
    fadeInUp: {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 },
    },
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    scaleIn: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    },
};

// Transition Defaults
export const TRANSITION_DEFAULTS = {
    duration: 0.6,
    ease: 'easeOut',
};
