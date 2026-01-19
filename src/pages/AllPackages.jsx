import { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter, MapPin, Clock, Star, Search } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AllPackages = () => {
    const [packages, setPackages] = useState([]);
    const [filteredPackages, setFilteredPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [priceRange, setPriceRange] = useState(200000);
    const [searchParams] = useSearchParams();

    // Initialize state from URL params
    const initialCategory = searchParams.get('category');
    const [selectedCategories, setSelectedCategories] = useState(initialCategory ? [initialCategory] : []);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

    useEffect(() => {
        // Update filters if URL params change (e.g. navigation from navbar)
        const cat = searchParams.get('category');
        if (cat) setSelectedCategories([cat]);

        const search = searchParams.get('search');
        if (search) setSearchQuery(search);
    }, [searchParams]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get('http://localhost:3001/packages');
                setPackages(response.data);
                // Initial filtering will happen in the next useEffect
            } catch (error) {
                console.error("Error fetching packages:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    useEffect(() => {
        let result = packages;

        // Filter by Price
        result = result.filter(pkg => pkg.price <= priceRange);

        // Filter by Category (from State, which might be from URL)
        if (selectedCategories.length > 0) {
            result = result.filter(pkg => selectedCategories.includes(pkg.category));
        }

        // Filter by URL Params specific: Region & SubCategory
        const regionParam = searchParams.get('region');
        const subCatParam = searchParams.get('subCategory');

        if (regionParam) {
            result = result.filter(pkg => pkg.region?.toLowerCase() === regionParam.toLowerCase());
        }

        if (subCatParam) {
            result = result.filter(pkg => pkg.subCategory?.toLowerCase() === subCatParam.toLowerCase());
        }

        // Filter by Search Query (Location or Title)
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(pkg =>
                pkg.title.toLowerCase().includes(query) ||
                pkg.location.toLowerCase().includes(query)
            );
        }

        setFilteredPackages(result);
    }, [packages, priceRange, selectedCategories, searchQuery, searchParams]);

    const handleCategoryChange = (category) => {
        // When manually changing category, we might want to clear URL params or just update local state
        // For simplicity, updating local state. 
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    return (
        <div className="pt-20 min-h-screen bg-gray-50">
            <div className="bg-primary/5 py-10">
                <div className="container-custom">
                    <h1 className="text-3xl font-bold text-gray-900">Explore All Destinations</h1>
                    <p className="text-gray-600 mt-2">Find your perfect getaway from our wide range of packages</p>
                </div>
            </div>

            <div className="container-custom section-padding grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Filters */}
                <div className="bg-white p-6 rounded-brand shadow-lg h-fit sticky top-24">
                    <div className="flex items-center gap-2 mb-6 text-primary">
                        <Filter size={20} />
                        <h2 className="font-bold text-xl">Filters</h2>
                    </div>

                    {/* Search */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2">Search Location</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Where do you want to go?"
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="mb-6">
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-semibold">Max Price</label>
                            <span className="text-primary font-bold">₹{priceRange.toLocaleString()}</span>
                        </div>
                        <input
                            type="range"
                            min="5000"
                            max="200000"
                            step="5000"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>₹5k</span>
                            <span>₹2L</span>
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <label className="block text-sm font-semibold mb-3">Categories</label>
                        <div className="space-y-2">
                            {['weekend', 'domestic', 'international'].map(cat => (
                                <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded text-primary focus:ring-primary"
                                        checked={selectedCategories.includes(cat)}
                                        onChange={() => handleCategoryChange(cat)}
                                    />
                                    <span className="capitalize text-gray-700">{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Packages Grid */}
                <div className="lg:col-span-3">
                    {loading ? (
                        <div className="flex justify-center mt-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : filteredPackages.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-brand shadow-sm">
                            <p className="text-xl text-gray-500">No packages match your filters.</p>
                            <button
                                onClick={() => { setPriceRange(200000); setSelectedCategories([]); setSearchQuery(''); }}
                                className="mt-4 text-primary font-semibold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPackages.map(pkg => (
                                <div key={pkg.id} className="card group cursor-pointer flex flex-col h-full bg-white border border-gray-100 hover:border-primary/20">
                                    <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-brand">
                                        <img
                                            src={pkg.image}
                                            alt={pkg.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-800 shadow-sm">
                                            {pkg.category.toUpperCase()}
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary leading-tight line-clamp-2">{pkg.title}</h3>
                                            <div className="flex items-center gap-1 text-yellow-500 font-bold text-xs bg-yellow-50 px-1.5 py-0.5 rounded">
                                                <Star size={12} fill="currentColor" /> {pkg.rating}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                            <MapPin size={14} className="text-primary" />
                                            <span className="truncate">{pkg.location}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                                            <Clock size={14} className="text-primary" />
                                            <span>{pkg.duration}</span>
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <div>
                                                <span className="text-xs text-gray-500 block">Starting from</span>
                                                <span className="text-lg font-bold text-primary">₹{pkg.price.toLocaleString()}</span>
                                            </div>
                                            <button
                                                onClick={() => navigate(`/package/${pkg.id}`)}
                                                className="px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-primary transition-colors shadow-lg shadow-gray-200"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllPackages;
