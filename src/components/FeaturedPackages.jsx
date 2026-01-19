import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Clock, Star, MapPin, TrendingUp } from 'lucide-react';
import { fetchPackages } from '../features/packages/packagesSlice';
import { ANIMATION_VARIANTS, TRANSITION_DEFAULTS } from '../constants';

const PackageCard = ({ pkg, index }) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={ANIMATION_VARIANTS.fadeInUp}
            transition={{ ...TRANSITION_DEFAULTS, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="card group"
        >
            {/* Image */}
            <div className="relative overflow-hidden rounded-brand mb-4 h-56">
                <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badge */}
                {pkg.featured && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring' }}
                        className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1"
                    >
                        <TrendingUp size={16} />
                        <span>Featured</span>
                    </motion.div>
                )}

                {/* Rating */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                    <Star className="text-yellow-500 fill-yellow-500" size={16} />
                    <span className="font-semibold text-sm">{pkg.rating}</span>
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-brand">
                    <p className="text-xs text-gray-600">Starting from</p>
                    <p className="text-xl font-bold text-primary">₹{pkg.price.toLocaleString()}</p>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
                <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">
                    {pkg.title}
                </h3>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                        <MapPin size={16} className="text-primary" />
                        <span>{pkg.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Clock size={16} className="text-primary" />
                        <span>{pkg.duration}</span>
                    </div>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2">{pkg.description}</p>

                <Link to={`/package/${pkg.id}`} className="block">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary w-full mt-4"
                    >
                        View Details
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    );
};

const SkeletonPackageCard = () => (
    <div className="card">
        <div className="skeleton-shimmer h-56 mb-4" />
        <div className="skeleton-shimmer h-6 w-3/4 mb-3" />
        <div className="flex items-center space-x-4 mb-3">
            <div className="skeleton-shimmer h-4 w-24" />
            <div className="skeleton-shimmer h-4 w-20" />
        </div>
        <div className="skeleton-shimmer h-4 w-full mb-2" />
        <div className="skeleton-shimmer h-4 w-5/6 mb-4" />
        <div className="skeleton-shimmer h-10 w-full" />
    </div>
);

const FeaturedPackages = () => {
    const dispatch = useDispatch();
    const { items: packages, loading } = useSelector((state) => state.packages);

    useEffect(() => {
        dispatch(fetchPackages());
    }, [dispatch]);

    return (
        <section id="packages" className="section-padding bg-white">
            <div className="container-custom">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={ANIMATION_VARIANTS.fadeInUp}
                    transition={TRANSITION_DEFAULTS}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
                        Featured <span className="gradient-text">Packages</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Handpicked destinations and experiences curated just for you
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <>
                            <SkeletonPackageCard />
                            <SkeletonPackageCard />
                            <SkeletonPackageCard />
                            <SkeletonPackageCard />
                            <SkeletonPackageCard />
                            <SkeletonPackageCard />
                        </>
                    ) : (
                        packages.map((pkg, index) => (
                            <PackageCard key={pkg.id} pkg={pkg} index={index} />
                        ))
                    )}
                </div>

                {!loading && packages.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="text-center mt-12"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-outline"
                        >
                            View All Packages
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default FeaturedPackages;
