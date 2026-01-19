import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGallery } from '../features/gallery/gallerySlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, Filter } from 'lucide-react';

const Gallery = () => {
    const dispatch = useDispatch();
    const { items: galleryItems, loading } = useSelector((state) => state.gallery);

    const [filteredImages, setFilteredImages] = useState([]);

    // Filter States
    const [selectedYear, setSelectedYear] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All'); // Domestic/International
    const [searchQuery, setSearchQuery] = useState('');

    const years = ['All', ...new Set(galleryItems.map(item => item.year))].sort((a, b) => b - a);
    const categories = ['All', 'Domestic', 'International'];

    useEffect(() => {
        dispatch(fetchGallery());
    }, [dispatch]);

    useEffect(() => {
        let result = galleryItems;

        // Filter by Year
        if (selectedYear !== 'All') {
            result = result.filter(img => img.year === selectedYear);
        }

        // Filter by Category
        if (selectedCategory !== 'All') {
            result = result.filter(img => img.category.toLowerCase() === selectedCategory.toLowerCase());
        }

        // Filter by Search (Title, Location)
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(img =>
                img.title.toLowerCase().includes(q) ||
                (img.location && img.location.toLowerCase().includes(q))
            );
        }

        setFilteredImages(result);
    }, [selectedYear, selectedCategory, searchQuery, galleryItems]);

    return (
        <div className="pt-20 min-h-screen bg-gray-50">
            <div className="bg-secondary/90 text-white text-center py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern opacity-10"></div>
                <h1 className="text-4xl font-bold relative z-10">Captured Moments</h1>
                <p className="mt-2 text-gray-300 relative z-10">Explore the world through our lens</p>
            </div>

            <div className="container-custom section-padding">

                {/* Controls Bar */}
                <div className="bg-white p-6 rounded-brand shadow-lg mb-12 flex flex-col md:flex-row gap-6 justify-between items-center">

                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by location or event..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-primary focus:outline-none bg-gray-50"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-primary" />
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value === 'All' ? 'All' : Number(e.target.value))}
                                className="bg-gray-50 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                            >
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <MapPin size={18} className="text-primary" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="bg-gray-50 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Gallery Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredImages.map((img) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={img.id}
                                className="group relative overflow-hidden rounded-brand shadow-lg aspect-[4/3] cursor-pointer"
                            >
                                <img
                                    src={img.image}
                                    alt={img.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0">
                                    <span className="text-primary font-bold text-xs uppercase tracking-wider mb-1">{img.category}</span>
                                    <h3 className="text-white text-xl font-bold">{img.title}</h3>
                                    <div className="flex justify-between items-center mt-2 text-gray-300 text-sm">
                                        <span className="flex items-center gap-1"><MapPin size={12} /> {img.location}</span>
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {img.year}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredImages.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-gray-300 mb-4 mx-auto w-16 h-16"><Filter size={64} /></div>
                        <h3 className="text-xl font-bold text-gray-500">No photos found</h3>
                        <p className="text-gray-400">Try adjusting your filters or search query.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;
