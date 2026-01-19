import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedPackages from '../components/FeaturedPackages';
import BookingForm from '../components/BookingForm';
import TrendingDestinations from '../components/TrendingDestinations';
import { API_BASE_URL } from '../constants';

const Home = () => {

    
    return (
        <>
            <Hero />
            <TrendingDestinations />
            <Categories />
            <FeaturedPackages />
            {/* Additional Home Sections as requested */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Best Price Guarantee', icon: '💰', desc: 'We offer the most competitive prices for your dream vacations.' },
                            { title: '24/7 Support', icon: '🎧', desc: 'Our team is available round the clock to assist you.' },
                            { title: 'Handpicked Hotels', icon: '🏨', desc: 'We select only the best accommodations for your comfort.' },
                        ].map((item, index) => (
                            <div key={index} className="card text-center hover:scale-105 transition-transform duration-300">
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <BookingForm />
        </>
    );
};

export default Home;
