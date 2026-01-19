import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPackages } from '../features/packages/packagesSlice';
import { createBooking } from '../features/bookings/bookingsSlice';
import { CreditCard, Calendar, Users, Check } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Use Redux for packages
    const { items: allPackages, loading: packagesLoading } = useSelector((state) => state.packages);
    const { success: bookingSuccess, error: bookingError } = useSelector((state) => state.bookings);

    const [pkg, setPkg] = useState(null);
    const [step, setStep] = useState(1);

    // Booking State
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        date: '', travelers: 2,
        cardNumber: '', expiry: '', cvv: '' // Mock Payment
    });

    useEffect(() => {
        if (allPackages.length === 0) {
            dispatch(fetchPackages());
        }
    }, [dispatch, allPackages.length]);

    useEffect(() => {
        if (!packagesLoading && allPackages.length > 0) {
            const foundPkg = allPackages.find(p => p.id == id);
            if (foundPkg) {
                setPkg(foundPkg);
            }
        }
    }, [id, allPackages, packagesLoading]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        const bookingData = {
            id: Date.now(), // Generate ID
            packageId: pkg.id,
            packageTitle: pkg.title,
            ...formData,
            totalAmount: pkg.price * formData.travelers,
            bookingDate: new Date().toISOString(),
            status: 'Confirmed'
        };

        dispatch(createBooking(bookingData)).then((result) => {
            if (createBooking.fulfilled.match(result)) {
                toast.success("Booking confirmed successfully!");
                setTimeout(() => {
                    navigate('/booking-success', { state: { booking: bookingData } });
                }, 1500);
            } else {
                toast.error("Booking failed. Please try again.");
            }
        });
    };

    if (packagesLoading || !pkg) return <div className="h-screen flex items-center justify-center">Loading...</div>;

    const total = pkg.price * formData.travelers;

    return (
        <div className="pt-24 min-h-screen bg-gray-50 pb-20">
            <ToastContainer />
            <div className="container-custom max-w-4xl">
                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-8 relative">
                    <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 -z-10"></div>
                    <div className={`flex flex-col items-center bg-white px-4 ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>1</div>
                        <span className="font-medium text-sm">Traveler Info</span>
                    </div>
                    <div className={`flex flex-col items-center bg-white px-4 ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>2</div>
                        <span className="font-medium text-sm">Payment</span>
                    </div>
                    <div className={`flex flex-col items-center bg-white px-4 ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>3</div>
                        <span className="font-medium text-sm">Success</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 rounded-brand shadow-lg">
                            <h1 className="text-2xl font-bold mb-6">
                                {step === 1 ? 'Traveler Information' : 'Payment Details'}
                            </h1>

                            {step === 1 && (
                                <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                                    <div className="grid grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                            <input required name="firstName" value={formData.firstName} onChange={handleInputChange} className="input-field" placeholder="John" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                            <input required name="lastName" value={formData.lastName} onChange={handleInputChange} className="input-field" placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                        <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="input-field" placeholder="john@example.com" />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                        <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="input-field" placeholder="+91 98765 43210" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6 mb-8">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date</label>
                                            <input required type="date" name="date" value={formData.date} onChange={handleInputChange} className="input-field" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Travelers</label>
                                            <div className="flex items-center gap-4">
                                                <input type="number" min="1" name="travelers" value={formData.travelers} onChange={handleInputChange} className="input-field" />
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn-primary w-full">Continue to Payment</button>
                                </form>
                            )}

                            {step === 2 && (
                                <form onSubmit={handlePayment}>
                                    <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
                                        <CreditCard className="text-blue-500 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-blue-800 text-sm">Secure Payment</h4>
                                            <p className="text-blue-600 text-xs text-justify">This is a mock payment gateway. No actual money will be deducted.</p>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                                        <input required name="cardNumber" maxLength="16" placeholder="0000 0000 0000 0000" className="input-field" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6 mb-8">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                                            <input required placeholder="MM/YY" className="input-field" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                                            <input required type="password" maxLength="3" placeholder="123" className="input-field" />
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button type="button" onClick={() => setStep(1)} className="flex-1 btn-outline">Back</button>
                                        <button type="submit" className="flex-1 btn-primary">Pay ₹{total.toLocaleString()}</button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="bg-white p-6 rounded-brand shadow-lg sticky top-24">
                            <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
                            <div className="flex items-start gap-4 mb-4 pb-4 border-b">
                                <img src={pkg.image} alt="Package" className="w-20 h-20 object-cover rounded-lg" />
                                <div>
                                    <h4 className="font-bold text-sm">{pkg.title}</h4>
                                    <p className="text-gray-500 text-xs">{pkg.duration}</p>
                                </div>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Base Price</span>
                                    <span>₹{pkg.price.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Travelers</span>
                                    <span>x {formData.travelers}</span>
                                </div>
                                <div className="flex justify-between pt-3 border-t font-bold text-lg">
                                    <span>Total</span>
                                    <span className="text-primary">₹{total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
