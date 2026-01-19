import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const heroSlides = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
        title: 'Explore the Mountains',
        subtitle: 'Adventure Awaits in the Himalayas',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80',
        title: 'Tropical Paradise',
        subtitle: 'Discover Exotic Beach Destinations',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80',
        title: 'Cultural Journeys',
        subtitle: 'Experience Rich Heritage & Traditions',
    },
];

const Hero = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchData, setSearchData] = useState({
        destination: '',
        date: '',
        guests: '1',
    });

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/all-packages?search=${encodeURIComponent(searchData.destination)}`);
    };

    return (
        <section id="home" className="relative h-screen overflow-hidden">
            {/* Slider */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/30 transition-all"
            >
                <ChevronLeft size={28} />
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/30 transition-all"
            >
                <ChevronRight size={28} />
            </motion.button>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
                <div className="container-custom w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-center text-white mb-12"
                    >
                        <motion.h1
                            key={`title-${currentSlide}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-5xl md:text-7xl font-bold mb-4 text-shadow-lg"
                        >
                            {heroSlides[currentSlide].title}
                        </motion.h1>
                        <motion.p
                            key={`subtitle-${currentSlide}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-xl md:text-2xl text-shadow"
                        >
                            {heroSlides[currentSlide].subtitle}
                        </motion.p>
                    </motion.div>

                    {/* Search Overlay */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-4xl mx-auto"
                    >
                        <form
                            onSubmit={handleSearch}
                            className="glass-effect rounded-brand p-6 md:p-8"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {/* Destination */}
                                <div className="flex items-center space-x-3 bg-white/10 rounded-brand px-4 py-3">
                                    <MapPin className="text-primary" size={24} />
                                    <input
                                        type="text"
                                        placeholder="Where to?"
                                        value={searchData.destination}
                                        onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                                        className="bg-transparent text-white placeholder-white/70 outline-none w-full"
                                    />
                                </div>

                                {/* Date */}
                                <div className="flex items-center space-x-3 bg-white/10 rounded-brand px-4 py-3">
                                    <Calendar className="text-primary" size={24} />
                                    <input
                                        type="date"
                                        value={searchData.date}
                                        onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                                        className="bg-transparent text-white outline-none w-full"
                                    />
                                </div>

                                {/* Guests */}
                                <div className="flex items-center space-x-3 bg-white/10 rounded-brand px-4 py-3">
                                    <Users className="text-primary" size={24} />
                                    <select
                                        value={searchData.guests}
                                        onChange={(e) => setSearchData({ ...searchData, guests: e.target.value })}
                                        className="bg-transparent text-white outline-none w-full"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                            <option key={num} value={num} className="text-gray-900">
                                                {num} {num === 1 ? 'Guest' : 'Guests'}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Search Button */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="btn-primary w-full"
                                >
                                    Search
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>

                    {/* Slide Indicators */}
                    <div className="flex justify-center space-x-3 mt-8">
                        {heroSlides.map((_, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ scale: 1.2 }}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-primary w-8' : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
