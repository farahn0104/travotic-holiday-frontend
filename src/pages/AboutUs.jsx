import { motion } from 'framer-motion';

const AboutUs = () => {
    return (
        <div className="pt-20">
            <div className="relative h-[400px] bg-slate-900 flex items-center justify-center">
                <img
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80"
                    alt="Travel"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="relative z-10 text-center text-white">
                    <h1 className="text-5xl font-bold mb-4">About Us</h1>
                    <p className="text-xl max-w-2xl mx-auto">Crafting unforgettable journeys since 2010.</p>
                </div>
            </div>

            <div className="container-custom section-padding">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <span className="text-primary font-bold uppercase tracking-widest text-sm">Who We Are</span>
                        <h2 className="text-4xl font-bold text-gray-900 leading-tight">Crafting Unforgettable <br /> Journeys Since 2010</h2>
                        <div className="w-20 h-1 bg-primary rounded-full"></div>

                        <p className="text-gray-600 leading-relaxed text-lg">
                            At <strong>Antigravity</strong>, we believe that travel is the only thing you buy that makes you richer.
                            We started with a simple mission: to make the world accessible to everyone, breaking the barriers of conventional tourism.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            From humble beginnings as a small trekking group in the Himalayas, we've grown into a full-service premier travel agency.
                            Our team of dedicated travel experts work tirelessly to curate the perfect itineraries.
                            Whether you're looking for a quick weekend getaway, a spiritual journey in Varanasi, or a luxurious escape to Dubai, we handle every detail.
                        </p>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div>
                                <h4 className="text-3xl font-bold text-primary">15k+</h4>
                                <p className="text-gray-500">Happy Travelers</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold text-primary">500+</h4>
                                <p className="text-gray-500">Destinations</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold text-primary">120+</h4>
                                <p className="text-gray-500">Luxury Hotels</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold text-primary">24/7</h4>
                                <p className="text-gray-500">Dedicated Support</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl z-0"></div>
                        <div className="grid grid-cols-2 gap-4 relative z-10">
                            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80" className="rounded-2xl shadow-xl mt-12 w-full object-cover h-64" alt="Team" />
                            <img src="https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80" className="rounded-2xl shadow-xl w-full object-cover h-64" alt="Office" />
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl z-20 max-w-xs border border-gray-100 hidden md:block">
                            <p className="text-gray-800 italic font-medium">"Traveling with Antigravity was the best decision of my life. Everything was perfect!"</p>
                            <div className="flex items-center gap-2 mt-4">
                                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                <span className="text-sm font-bold text-gray-900">- Anjali S.</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Mission Section */}
                <div className="mt-24 text-center max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                    <p className="text-gray-600">To inspire and enable people to explore the world in a sustainable and meaningful way. We are committed to providing exceptional service, supporting local communities, and protecting the environment in every destination we visit.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
