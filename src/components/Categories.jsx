import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Palmtree, Mountain, Globe } from 'lucide-react';
import { fetchCategories } from '../features/categories/categoriesSlice';
import { ANIMATION_VARIANTS, TRANSITION_DEFAULTS } from '../constants';

const categoryIcons = {
    Weekend: Palmtree,
    Domestic: Mountain,
    International: Globe,
};

const CategoryCard = ({ category, index }) => {
    const Icon = categoryIcons[category.name] || Globe;

    return (
        <Link to={`/packages/${category.name.toLowerCase()}`} className="block h-full">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={ANIMATION_VARIANTS.fadeInUp}
                transition={{ ...TRANSITION_DEFAULTS, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="card group cursor-pointer h-full"
            >
                <div className="relative overflow-hidden rounded-brand mb-6 h-48">
                    <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-3 rounded-full"
                    >
                        <Icon className="text-white" size={28} />
                    </motion.div>
                </div>

                <h3 className="text-2xl font-bold text-secondary mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-primary font-semibold">{category.packageCount} Packages</span>
                    <motion.button
                        whileHover={{ x: 5 }}
                        className="text-primary font-medium flex items-center space-x-1"
                    >
                        <span>Explore</span>
                        <span>→</span>
                    </motion.button>
                </div>
            </motion.div>
        </Link>
    );
};

const SkeletonCard = () => (
    <div className="card">
        <div className="skeleton-shimmer h-48 mb-6" />
        <div className="skeleton-shimmer h-6 w-3/4 mb-2" />
        <div className="skeleton-shimmer h-4 w-full mb-4" />
        <div className="flex items-center justify-between">
            <div className="skeleton-shimmer h-4 w-24" />
            <div className="skeleton-shimmer h-4 w-20" />
        </div>
    </div>
);

const Categories = () => {
    const dispatch = useDispatch();
    const { items: categories, loading } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <section id="categories" className="section-padding bg-gray-50">
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
                        Explore by <span className="gradient-text">Category</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Choose from our curated collection of travel experiences designed for every type of adventurer
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <>
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </>
                    ) : (
                        categories.map((category, index) => (
                            <CategoryCard key={category.id} category={category} index={index} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Categories;
