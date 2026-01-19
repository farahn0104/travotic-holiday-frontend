import { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPackages } from '../features/packages/packagesSlice';
import { MapPin, Clock, Star, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Packages = () => {
    const { type } = useParams(); // 'weekend', 'domestic', 'international'
    const [searchParams] = useSearchParams();
    const regionFilter = searchParams.get('region');
    const subCategoryFilter = searchParams.get('subCategory');

    const dispatch = useDispatch();
    const { items: allPackages, loading } = useSelector((state) => state.packages);
    const [filteredPackages, setFilteredPackages] = useState([]);

    useEffect(() => {
        dispatch(fetchPackages());
    }, [dispatch]);

    useEffect(() => {
        if (!allPackages.length) return;

        let result = allPackages;

        // 1. Filter by Type/Category from URL Param (e.g. /packages/domestic)
        if (type) {
            result = result.filter(pkg => pkg.category.toLowerCase() === type.toLowerCase());
        }

        // 2. Filter by Region (Query Param)
        if (regionFilter) {
            result = result.filter(pkg => pkg.region && pkg.region.toLowerCase() === regionFilter.toLowerCase());
        }

        // 3. Filter by SubCategory (Query Param)
        if (subCategoryFilter) {
            result = result.filter(pkg => pkg.subCategory && pkg.subCategory.toLowerCase() === subCategoryFilter.toLowerCase());
        }

        setFilteredPackages(result);
    }, [type, regionFilter, subCategoryFilter, allPackages]);

    const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

    const getPageTitle = () => {
        if (regionFilter) return `${regionFilter} India Packages`;
        if (subCategoryFilter) return `${capitalize(subCategoryFilter)} Packages`;
        return `${capitalize(type)} Packages`;
    };

    return (
        <div className="pt-20 min-h-screen bg-gray-50">
            <div className="bg-secondary py-16 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern opacity-10"></div>
                <h1 className="text-4xl font-bold relative z-10">{getPageTitle()}</h1>
                <p className="mt-2 text-gray-300 relative z-10">Explore our best curated experiences</p>
            </div>

            <div className="container-custom section-padding">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <>
                        {filteredPackages.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="text-gray-300 mb-4 mx-auto w-16 h-16"><Filter size={64} /></div>
                                <h3 className="text-xl font-bold text-gray-500">No packages found</h3>
                                <p className="text-gray-400">Try adjusting your filters or checking back later.</p>
                                <Link to="/all-packages" className="btn-primary mt-6 inline-block">View All Packages</Link>
                            </div>
                        ) : (
                            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <AnimatePresence>
                                    {filteredPackages.map(pkg => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            key={pkg.id}
                                            className="card-glass group cursor-pointer h-full flex flex-col hover:-translate-y-2 transition-transform duration-300"
                                        >
                                            <div className="relative h-64 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-brand">
                                                <img
                                                    src={pkg.image}
                                                    alt={pkg.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-primary shadow-sm">
                                                    ₹{pkg.price.toLocaleString()}
                                                </div>
                                                {pkg.region && (
                                                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white uppercase">
                                                        {pkg.region}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 flex flex-col px-2">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">{pkg.title}</h3>
                                                </div>
                                                <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm mb-3">
                                                    <Star size={14} fill="currentColor" /> {pkg.rating}
                                                    <span className="text-gray-400 font-normal text-xs ml-1">(120 Reviews)</span>
                                                </div>

                                                <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                                                    <span className="flex items-center gap-1"><MapPin size={16} className="text-primary" /> {pkg.location.split(',')[0]}</span>
                                                    <span className="flex items-center gap-1"><Clock size={16} className="text-primary" /> {pkg.duration}</span>
                                                </div>

                                                <p className="text-gray-600 text-sm mb-6 flex-1 line-clamp-2">{pkg.description}</p>

                                                <Link to={`/package/${pkg.id}`} className="w-full btn-outline py-2.5 text-sm mt-auto group-hover:bg-primary group-hover:text-white group-hover:border-primary block text-center font-bold transition-all">
                                                    View Details
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Packages;
