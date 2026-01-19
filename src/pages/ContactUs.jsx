import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { submitEnquiry } from '../features/enquiries/enquiriesSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.enquiries);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const enquiryData = {
            ...formData,
            type: 'General Enquiry',
            date: new Date().toISOString()
        };

        dispatch(submitEnquiry(enquiryData)).then((result) => {
            if (submitEnquiry.fulfilled.match(result)) {
                toast.success("Message sent successfully!");
                setFormData({ firstName: '', lastName: '', email: '', message: '' });
            } else {
                toast.error("Failed to send message.");
            }
        });
    };

    return (
        <div className="pt-20 min-h-screen">
            <ToastContainer />
            <div className="bg-primary py-20 text-white text-center">
                <h1 className="text-4xl font-bold">Contact Us</h1>
                <p className="mt-4 opacity-90">We'd love to hear from you. Get in touch!</p>
            </div>

            <div className="container-custom section-padding">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-gray-900">Get In Touch</h2>
                        <p className="text-gray-600">Have questions about a package? Want to customize your trip? Our travel experts are here to help.</p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full text-primary">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Phone</h3>
                                    <p className="text-gray-600">+91 98765 43210</p>
                                    <p className="text-gray-600">+91 12345 67890</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full text-primary">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Email</h3>
                                    <p className="text-gray-600">hello@antigravity.tours</p>
                                    <p className="text-gray-600">support@antigravity.tours</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full text-primary">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Office</h3>
                                    <p className="text-gray-600">123 Travel Tower, Business Bay,<br />Mumbai, Maharashtra 400001</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-8 rounded-brand shadow-xl border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6">Send Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                    <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="input-field" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                    <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="input-field" placeholder="Doe" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input required name="email" value={formData.email} onChange={handleChange} type="email" className="input-field" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} className="input-field" placeholder="Tell us about your travel plans..."></textarea>
                            </div>
                            <button type="submit" disabled={loading} className="btn-primary w-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50">
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
