import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Download, Home, Printer, User } from 'lucide-react';

const BookingSuccess = () => {
    const location = useLocation();
    const booking = location.state?.booking;

    if (!booking) {
        return <div className="h-screen flex items-center justify-center">No booking found.</div>;
    }

    return (
        <div className="pt-24 min-h-screen bg-gray-50 pb-20">
            <div className="container-custom max-w-2xl text-center">
                <div className="bg-white p-10 rounded-brand shadow-xl relative overflow-hidden">
                    {/* Success Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500">
                            <CheckCircle size={40} />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
                    <p className="text-gray-600 mb-8">Thank you for booking with Antigravity. Your trip is all set.</p>

                    {/* Receipt Ticket */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-left mb-8">
                        <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
                            <span className="text-gray-500 font-mono text-xs uppercase">Booking ID</span>
                            <span className="font-mono font-bold">#{booking.id}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-y-4 text-sm">
                            <div>
                                <p className="text-gray-500 text-xs">Package</p>
                                <p className="font-bold">{booking.packageTitle}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-500 text-xs">Date</p>
                                <p className="font-bold">{booking.date}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs">Traveler</p>
                                <p className="font-semibold">{booking.firstName} {booking.lastName}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-500 text-xs">Guests</p>
                                <p className="font-semibold">{booking.travelers}</p>
                            </div>
                        </div>

                        <div className="border-t border-dashed border-gray-300 mt-4 pt-4 flex justify-between items-center">
                            <span className="font-bold">Total Amount Paid</span>
                            <span className="text-xl font-bold text-primary">₹{booking.totalAmount.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button onClick={() => window.print()} className="btn-outline flex items-center justify-center gap-2">
                            <Printer size={18} /> Print Receipt
                        </button>
                        <Link to="/profile" className="btn-primary flex items-center justify-center gap-2">
                            <User size={18} /> Go to Profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingSuccess;
