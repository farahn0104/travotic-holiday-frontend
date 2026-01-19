import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Users, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { submitEnquiry, resetEnquiryState } from '../features/enquiries/enquiriesSlice';
import { ANIMATION_VARIANTS, TRANSITION_DEFAULTS } from '../constants';

const BookingForm = () => {
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector((state) => state.enquiries);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        destination: '',
        date: '',
        guests: '1',
        message: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (success) {
            // Reset form after successful submission
            setFormData({
                name: '',
                email: '',
                phone: '',
                destination: '',
                date: '',
                guests: '1',
                message: '',
            });
            setErrors({});

            // Reset success state after 3 seconds
            setTimeout(() => {
                dispatch(resetEnquiryState());
            }, 3000);
        }
    }, [success, dispatch]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Phone must be 10 digits';
        }
        if (!formData.destination.trim()) newErrors.destination = 'Destination is required';
        if (!formData.date) newErrors.date = 'Date is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            dispatch(submitEnquiry({
                ...formData,
                submittedAt: new Date().toISOString(),
            }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <section id="booking" className="section-padding bg-gradient-to-br from-gray-50 to-white">
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
                        Plan Your <span className="gradient-text">Journey</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Fill in your details and let us create the perfect travel experience for you
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={ANIMATION_VARIANTS.scaleIn}
                        transition={{ ...TRANSITION_DEFAULTS, delay: 0.2 }}
                        className="card-glass"
                    >
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 bg-green-50 border border-green-200 rounded-brand p-4 flex items-center space-x-3"
                            >
                                <CheckCircle className="text-green-600" size={24} />
                                <p className="text-green-800 font-medium">
                                    Thank you! Your enquiry has been submitted successfully. We'll contact you soon.
                                </p>
                            </motion.div>
                        )}

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 bg-red-50 border border-red-200 rounded-brand p-4"
                            >
                                <p className="text-red-800 font-medium">{error}</p>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`input-field pl-12 ${errors.name ? 'border-red-500' : ''}`}
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`input-field pl-12 ${errors.email ? 'border-red-500' : ''}`}
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`input-field pl-12 ${errors.phone ? 'border-red-500' : ''}`}
                                            placeholder="9876543210"
                                        />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>

                                {/* Destination */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Destination *
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            name="destination"
                                            value={formData.destination}
                                            onChange={handleChange}
                                            className={`input-field pl-12 ${errors.destination ? 'border-red-500' : ''}`}
                                            placeholder="Goa, India"
                                        />
                                    </div>
                                    {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination}</p>}
                                </div>

                                {/* Date */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Travel Date *
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            className={`input-field pl-12 ${errors.date ? 'border-red-500' : ''}`}
                                        />
                                    </div>
                                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                                </div>

                                {/* Guests */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Number of Guests
                                    </label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <select
                                            name="guests"
                                            value={formData.guests}
                                            onChange={handleChange}
                                            className="input-field pl-12"
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                <option key={num} value={num}>
                                                    {num} {num === 1 ? 'Guest' : 'Guests'}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Additional Message
                                </label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-3 top-3 text-gray-400" size={20} />
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className="input-field pl-12 resize-none"
                                        placeholder="Tell us about your preferences, special requirements, or any questions..."
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        <span>Submit Enquiry</span>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default BookingForm;
