import { useState } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send } from 'lucide-react';
import { BRAND, SOCIAL_LINKS, NAV_LINKS } from '../constants';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (email) {
            console.log('Newsletter subscription:', email);
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    const socialIcons = [
        { Icon: Facebook, link: SOCIAL_LINKS.FACEBOOK, label: 'Facebook' },
        { Icon: Twitter, link: SOCIAL_LINKS.TWITTER, label: 'Twitter' },
        { Icon: Instagram, link: SOCIAL_LINKS.INSTAGRAM, label: 'Instagram' },
        { Icon: Linkedin, link: SOCIAL_LINKS.LINKEDIN, label: 'LinkedIn' },
    ];

    return (
        <footer className="bg-secondary text-white">
            {/* Main Footer */}
            <div className="container-custom py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-orange-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">W</span>
                            </div>
                            <span className="text-2xl font-bold">{BRAND.NAME}</span>
                        </div>
                        <p className="text-gray-300 mb-6">{BRAND.DESCRIPTION}</p>
                        <div className="flex space-x-4">
                            {socialIcons.map(({ Icon, link, label }) => (
                                <motion.a
                                    key={label}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                                    aria-label={label}
                                >
                                    <Icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {NAV_LINKS.map((link) => (
                                <li key={link.id}>
                                    <motion.a
                                        href={link.href}
                                        whileHover={{ x: 5 }}
                                        className="text-gray-300 hover:text-primary transition-colors inline-block"
                                    >
                                        {link.label}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <MapPin className="text-primary flex-shrink-0 mt-1" size={20} />
                                <span className="text-gray-300">
                                    123 Travel Street, Mumbai, Maharashtra 400001
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="text-primary flex-shrink-0" size={20} />
                                <a href="tel:+919876543210" className="text-gray-300 hover:text-primary transition-colors">
                                    +91 98765 43210
                                </a>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="text-primary flex-shrink-0" size={20} />
                                <a href="mailto:info@wanderlux.com" className="text-gray-300 hover:text-primary transition-colors">
                                    info@wanderlux.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Newsletter</h3>
                        <p className="text-gray-300 mb-4">
                            Subscribe to get special offers and travel updates
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email"
                                    className="w-full px-4 py-3 rounded-brand bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="btn-primary w-full flex items-center justify-center space-x-2"
                            >
                                <Send size={18} />
                                <span>Subscribe</span>
                            </motion.button>
                            {subscribed && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-green-400 text-sm"
                                >
                                    ✓ Successfully subscribed!
                                </motion.p>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container-custom py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} {BRAND.NAME}. All rights reserved.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <motion.a
                                whileHover={{ y: -2 }}
                                href="#"
                                className="text-gray-400 hover:text-primary transition-colors"
                            >
                                Privacy Policy
                            </motion.a>
                            <motion.a
                                whileHover={{ y: -2 }}
                                href="#"
                                className="text-gray-400 hover:text-primary transition-colors"
                            >
                                Terms of Service
                            </motion.a>
                            <motion.a
                                whileHover={{ y: -2 }}
                                href="#"
                                className="text-gray-400 hover:text-primary transition-colors"
                            >
                                Cookie Policy
                            </motion.a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
