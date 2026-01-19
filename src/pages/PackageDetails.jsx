import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPackages } from '../features/packages/packagesSlice';
import axios from 'axios';
import { MapPin, Clock, Star, Heart, Share2, CheckCircle, X, User, Mail, Phone, Calendar, ArrowLeft, Check } from 'lucide-react';

const PackageDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items: allPackages, loading: packagesLoading, error: packagesError } = useSelector((state) => state.packages);

    const [pkg, setPkg] = useState(null);
    const [relatedPackages, setRelatedPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('destination');

    // Enquiry Form State
    const [enquiryForm, setEnquiryForm] = useState({
        name: '', email: '', phone: '', message: ''
    });

    useEffect(() => {
        if (allPackages.length === 0) {
            dispatch(fetchPackages());
        }
    }, [dispatch, allPackages.length]);

    useEffect(() => {
        if (allPackages.length > 0) {
            const foundPkg = allPackages.find(p => p.id == id);

            if (foundPkg) {
                setPkg(foundPkg);

                // Fetch related packages
                const others = allPackages.filter(p =>
                    p.id != id &&
                    (p.category === foundPkg.category ||
                        (foundPkg.location && p.location && p.location.includes(foundPkg.location.split(',')[0]))
                    )
                ).slice(0, 3);
                setRelatedPackages(others);
                setError(null);
            } else {
                setError("Package not found");
            }
            setLoading(false);
        } else if (packagesError) {
            setError(packagesError);
            setLoading(false);
        }
    }, [id, allPackages, packagesError]);

    const handleEnquirySubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/enquiries', {
                packageId: pkg.id,
                packageTitle: pkg.title,
                ...enquiryForm,
                date: new Date().toISOString()
            });
            alert('Enquiry sent successfully!');
            setEnquiryForm({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            alert('Failed to send enquiry.');
        }
    };

    if (loading) return <div className="h-screen flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;

    if (error || !pkg) return (
        <div className="h-screen flex flex-col justify-center items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-800">Package Not Found</h2>
            <Link to="/all-packages" className="btn-primary flex items-center gap-2"><ArrowLeft size={18} /> Browse All Packages</Link>
        </div>
    );

    return (
        <div className="pt-20 min-h-screen bg-gray-50">
            {/* Hero Image */}
            <div className="h-[60vh] relative">
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
                    <div className="container-custom pb-16 text-white">
                        <div className="flex gap-2 mb-4 animate-fadeIn">
                            <span className="bg-primary px-3 py-1 rounded text-sm font-bold uppercase tracking-wide shadow-lg">{pkg.category}</span>
                            <span className="bg-white/20 backdrop-blur px-3 py-1 rounded text-sm font-bold flex items-center gap-1">
                                <Star size={14} className="text-yellow-400" fill="currentColor" /> {pkg.rating}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-shadow-lg animate-slideUp">{pkg.title}</h1>
                        <div className="flex flex-wrap gap-6 text-lg animate-slideUp delay-100">
                            <span className="flex items-center gap-2"><MapPin className="text-primary" /> {pkg.location}</span>
                            <span className="flex items-center gap-2"><Clock className="text-primary" /> {pkg.duration}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom section-padding -mt-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Navigation Tabs */}
                        <div className="flex flex-wrap gap-4 border-b border-gray-200 bg-white p-4 rounded-t-brand shadow-sm">
                            {['destination', 'overview', 'itinerary', 'inclusions'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-2 text-lg font-semibold capitalize transition-all relative px-4 rounded-lg ${activeTab === tab
                                        ? 'text-white bg-primary shadow-lg'
                                        : 'text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    {tab === 'destination' ? 'Explore Destination' : tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="bg-white p-8 rounded-b-brand rounded-tr-brand shadow-lg min-h-[400px]">

                            {activeTab === 'destination' && (
                                <div className="space-y-6 animate-fadeIn">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-primary pl-4">Why Visit {pkg.location?.split(',')[0]}?</h3>
                                        <p className="text-lg text-gray-700 leading-relaxed italic">{pkg.whyVisit || "Experience the local culture and breathtaking views."}</p>
                                    </div>
                                    <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
                                        <h4 className="text-xl font-bold mb-3 text-orange-800 flex items-center gap-2">
                                            <Calendar size={20} /> Historical Significance
                                        </h4>
                                        <p className="text-gray-700 leading-relaxed">{pkg.history || "A place rich in history and tradition."}</p>
                                    </div>

                                    <h4 className="text-xl font-bold mt-8 mb-4">Other Packages in this Region</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {relatedPackages.map(rp => (
                                            <div key={rp.id} onClick={() => window.location.href = `/package/${rp.id}`} className="flex items-center gap-4 p-3 border rounded-lg hover:shadow-md cursor-pointer transition-all hover:bg-gray-50">
                                                <img src={rp.image} className="w-16 h-16 rounded object-cover" alt={rp.title} />
                                                <div>
                                                    <h5 className="font-bold text-sm">{rp.title}</h5>
                                                    <p className="text-primary font-bold text-xs">₹{rp.price.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                        {relatedPackages.length === 0 && <p className="text-gray-500">No other similar packages found at the moment.</p>}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'overview' && (
                                <div className="space-y-4 animate-fadeIn">
                                    <h3 className="text-2xl font-bold mb-4">About this trip</h3>
                                    <p className="text-gray-600 leading-relaxed text-lg">{pkg.description}</p>
                                    <h3 className="text-xl font-bold mt-6">Highlights</h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {['Premium Accommodation', 'Breakfast & Dinner', 'Sightseeing Tours', 'Airport Transfers', 'Guided Walks'].map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-gray-700">
                                                <CheckCircle size={18} className="text-green-500" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {activeTab === 'itinerary' && (
                                <div className="space-y-8 animate-fadeIn">
                                    {[1, 2, 3, 4, 5].slice(0, parseInt(pkg.duration) || 3).map((day) => (
                                        <div key={day} className="flex gap-6 group">
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                                                    {day}
                                                </div>
                                                {day !== (parseInt(pkg.duration) || 3) && <div className="w-0.5 h-full bg-gray-200 mt-2"></div>}
                                            </div>
                                            <div className="bg-gray-50 p-6 rounded-lg flex-1 border border-gray-100 hover:shadow-md transition-shadow">
                                                <h4 className="font-bold text-xl mb-2 text-gray-800">Day {day}: Exploration & Adventure</h4>
                                                <p className="text-gray-600">Full day of sightseeing. Visit local landmarks, enjoy traditional cuisine, and immerse yourself in the culture.</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'inclusions' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
                                    <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                                        <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2 text-lg"><CheckCircle /> What's Included</h4>
                                        <ul className="space-y-3 text-gray-700">
                                            <li className="flex gap-2"><Check size={16} className="mt-1" /> Accommodation on twin sharing basis</li>
                                            <li className="flex gap-2"><Check size={16} className="mt-1" /> Daily Breakfast and Dinner</li>
                                            <li className="flex gap-2"><Check size={16} className="mt-1" /> All transfers and sightseeing</li>
                                            <li className="flex gap-2"><Check size={16} className="mt-1" /> English speaking driver/guide</li>
                                        </ul>
                                    </div>
                                    <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                                        <h4 className="font-bold text-red-800 mb-4 flex items-center gap-2 text-lg"><X className="w-5 h-5" /> What's Not Included</h4>
                                        <ul className="space-y-3 text-gray-700">
                                            <li className="flex gap-2"><X size={16} className="mt-1" /> Airfare / Train fare</li>
                                            <li className="flex gap-2"><X size={16} className="mt-1" /> Personal expenses</li>
                                            <li className="flex gap-2"><X size={16} className="mt-1" /> Entrance fees to monuments</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Booking Card */}
                        <div className="bg-white p-6 rounded-brand shadow-xl border-t-4 border-primary sticky top-24">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Starting from</p>
                                    <h2 className="text-4xl font-extrabold text-primary">₹{pkg.price ? pkg.price.toLocaleString() : 'N/A'}</h2>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate(`/booking/${pkg.id}`)}
                                className="w-full btn-primary mb-4 text-center block text-lg shadow-primary/30"
                            >
                                Book This Package
                            </button>

                            <div className="flex gap-4 mb-8">
                                <button className="flex-1 py-2 border border-gray-200 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-gray-50 transition-colors">
                                    <Share2 size={18} /> Share
                                </button>
                                <button className="flex-1 py-2 border border-gray-200 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-gray-50 transition-colors text-pink-500">
                                    <Heart size={18} /> Save
                                </button>
                            </div>

                            {/* Enquiry Form */}
                            <div className="border-t pt-6 bg-gray-50 -mx-6 px-6 pb-2">
                                <h3 className="font-bold mb-4 text-gray-800">Interested? Send Enquiry</h3>
                                <form onSubmit={handleEnquirySubmit} className="space-y-3">
                                    <div className="relative group">
                                        <User size={16} className="absolute left-3 top-3 text-gray-400 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            required
                                            value={enquiryForm.name}
                                            onChange={e => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <Mail size={16} className="absolute left-3 top-3 text-gray-400 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            required
                                            value={enquiryForm.email}
                                            onChange={e => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <Phone size={16} className="absolute left-3 top-3 text-gray-400 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            required
                                            value={enquiryForm.phone}
                                            onChange={e => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <textarea
                                        placeholder="Type your message here..."
                                        rows={3}
                                        value={enquiryForm.message}
                                        onChange={e => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                                        className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    ></textarea>
                                    <button type="submit" className="w-full btn-secondary py-2 text-sm shadow-md hover:shadow-lg transform active:scale-95">
                                        Send Enquiry
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageDetails;
