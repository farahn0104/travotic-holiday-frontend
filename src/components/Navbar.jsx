import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { BRAND } from '../constants';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();

    // Reset mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { id: '1', label: 'Home', path: '/' },
        { id: 'all', label: 'All Packages', path: '/all-packages' },
        { id: '2', label: 'About Us', path: '/about-us' },
        {
            id: '3', label: 'Theme', path: '#',
            children: [
                { label: 'Weekend Getaways', path: '/all-packages?category=weekend' },
                { label: 'Beach Holidays', path: '/all-packages?subCategory=beach' },
                { label: 'Mountain Retreats', path: '/all-packages?subCategory=mountain' }
            ]
        },
        {
            id: '4', label: 'Domestic', path: '/all-packages?category=domestic',
            children: [
                { label: 'North India', path: '/all-packages?region=North' },
                { label: 'South India', path: '/all-packages?region=South' },
                { label: 'East India', path: '/all-packages?region=East' },
                { label: 'West India', path: '/all-packages?region=West' }
            ]
        },
        {
            id: '5', label: 'International', path: '/all-packages?category=international',
            children: [
                { label: 'All International', path: '/all-packages?category=international' }
            ]
        },
        { id: '6', label: 'Gallery', path: '/gallery' },
        { id: '7', label: 'Blog', path: '/blog' },
        { id: '8', label: 'Contact Us', path: '/contact-us' },
    ];

    const isLinkActive = (path) => {
        if (path === '/') return location.pathname === '/';

        // Split path into base and query
        const [linkBase, linkQuery] = path.split('?');
        const [currentBase, currentQuery] = [location.pathname, location.search];

        // Check if pathnames match
        if (linkBase !== currentBase) return false;

        // If link has no query, it's a match (e.g. /all-packages matching /all-packages?foo=bar is debatable, 
        // strictly for this app /all-packages is 'All Packages' filtering nothing, so maybe exact match?)
        // Let's go with: if link has query, it MUST show up in current URL.

        if (!linkQuery) return true; // generic match

        const linkParams = new URLSearchParams(linkQuery);
        const currentParams = new URLSearchParams(currentQuery);

        for (const [key, value] of linkParams.entries()) {
            if (currentParams.get(key) !== value) return false;
        }

        return true;
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || location.pathname !== '/'
                ? 'bg-white shadow-lg py-2'
                : 'bg-transparent py-4'
                }`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-orange-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">A</span>
                        </div>
                        <span className={`text-2xl font-bold transition-colors ${isScrolled || location.pathname !== '/' ? 'text-secondary' : 'text-white'
                            }`}>
                            {BRAND ? BRAND.NAME : 'Antigravity'}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {navLinks.map((link) => {
                            const active = isLinkActive(link.path) || (link.children && link.children.some(child => isLinkActive(child.path)));

                            return (
                                <div key={link.id}
                                    className="relative group h-full flex items-center"
                                    onMouseEnter={() => setActiveDropdown(link.id)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <Link
                                        to={link.path}
                                        className={`flex items-center gap-1 font-medium text-sm transition-colors py-2 ${isScrolled || location.pathname !== '/'
                                            ? (active ? 'text-primary' : 'text-gray-700 hover:text-primary')
                                            : (active ? 'text-white font-bold' : 'text-white/90 hover:text-white')
                                            }`}
                                    >
                                        {link.label}
                                        {link.children && <ChevronDown size={14} />}
                                    </Link>

                                    {/* Dropdown Menu */}
                                    {link.children && (
                                        <div className="absolute top-full left-0 pt-2 hidden group-hover:block w-48 transition-all duration-300">
                                            <div className="bg-white rounded-brand shadow-xl overflow-hidden py-2 border border-gray-100">
                                                {link.children.map((child, idx) => {
                                                    const childActive = isLinkActive(child.path);
                                                    return (
                                                        <Link
                                                            key={idx}
                                                            to={child.path}
                                                            className={`block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary ${childActive ? 'text-primary font-bold bg-primary/5' : 'text-gray-700'}`}
                                                        >
                                                            {child.label}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`lg:hidden p-2 rounded-lg ${isScrolled || location.pathname !== '/' ? 'text-secondary' : 'text-white'
                            }`}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: '100vh', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="lg:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto"
                    >
                        <div className="container-custom py-6 space-y-4">
                            {navLinks.map((link) => (
                                <div key={link.id} className="border-b border-gray-100 pb-4">
                                    <div className="flex justify-between items-center">
                                        <NavLink
                                            to={link.path}
                                            className={({ isActive }) => `text-lg font-medium ${isActive ? 'text-primary' : 'text-gray-900'}`}
                                        >
                                            {link.label}
                                        </NavLink>
                                        {link.children && (
                                            <button onClick={() => setActiveDropdown(activeDropdown === link.id ? null : link.id)}>
                                                <ChevronDown className={`transition-transform ${activeDropdown === link.id ? 'rotate-180' : ''}`} />
                                            </button>
                                        )}
                                    </div>

                                    {/* Mobile Dropdown */}
                                    {link.children && activeDropdown === link.id && (
                                        <div className="pl-4 mt-2 space-y-2">
                                            {link.children.map((child, idx) => (
                                                <Link
                                                    key={idx}
                                                    to={child.path}
                                                    className="block text-gray-600 py-1"
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
