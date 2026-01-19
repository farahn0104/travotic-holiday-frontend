import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, MapPin } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const destinations = [
    {
        id: 'dest-1',
        name: 'Jaipur',
        location: 'Rajasthan',
        image: 'https://images.unsplash.com/photo-1603262110263-ce2537748800?w=800&q=80',
        packagesCount: 4
    },
    {
        id: 'dest-2',
        name: 'Kerala',
        location: 'South India',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
        packagesCount: 6
    },
    {
        id: 'dest-3',
        name: 'Maldives',
        location: 'International',
        image: 'https://images.unsplash.com/photo-1514282401047-d77a7149ba6c?w=800&q=80',
        packagesCount: 3
    },
    {
        id: 'dest-4',
        name: 'Dubai',
        location: 'UAE',
        image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80',
        packagesCount: 5
    },
    {
        id: 'dest-5',
        name: 'Manali',
        location: 'Himachal',
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
        packagesCount: 8
    },
    {
        id: 'dest-6',
        name: 'Goa',
        location: 'India',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
        packagesCount: 7
    }
];

const TrendingDestinations = () => {
    const navigate = useNavigate();

    return (
        <section className="py-16 bg-white">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Trending Destinations</h2>
                    <p className="text-gray-600">Most loved places by our travelers this season</p>
                </div>

                <div className="destinations-swiper-container">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                        }}
                        className="pb-12 px-4"
                    >
                        {destinations.map((dest, index) => (
                            <SwiperSlide key={dest.id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg h-[400px]"
                                    onClick={() => navigate(`/all-packages?search=${dest.name}`)}
                                >
                                    <img
                                        src={dest.image}
                                        alt={dest.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                                        <div className="absolute bottom-0 left-0 p-6 w-full text-white">
                                            <p className="text-sm font-medium uppercase tracking-wider mb-2 text-primary">{dest.location}</p>
                                            <h3 className="text-3xl font-bold mb-2">{dest.name}</h3>
                                            <div className="flex justify-between items-center group-hover:translate-x-2 transition-transform">
                                                <span className="text-sm text-gray-300">{dest.packagesCount} Packages</span>
                                                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                                                    <ChevronRight size={16} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <style>{`
                .swiper-pagination-bullet-active {
                    background-color: #ff6b00 !important;
                }
                .swiper-button-next, .swiper-button-prev {
                    color: white !important;
                    background: rgba(0,0,0,0.5);
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    backdrop-filter: blur(4px);
                }
                .swiper-button-next:after, .swiper-button-prev:after {
                    font-size: 18px !important;
                    font-weight: bold;
                }
            `}</style>
        </section>
    );
};

export default TrendingDestinations;
