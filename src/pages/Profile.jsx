import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../features/bookings/bookingsSlice';
import { User, MapPin, Calendar, LogOut } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'

const Profile = () => {
    // ... (rest of component) ...
    // Note: I will only replace the top imports and the specific function call, assuming the tool handles context correctly.
    // Wait, replace_file_content needs contiguous block. I'll target the import area first, then the function call? 
    // No, I can do it in one go if I include enough context or use multi_replace.
    // Let's use multi_replace for safety as lines might be far apart?
    // Profile.jsx imports are at top (lines 1-6), usage is around line 45.
    // I will use replace_file_content for imports, then another call or just one large block if possible? 
    // Actually, `replace_file_content` for the whole file content is unsafe if I don't read it all.
    // I previously read the whole file in step 321.
    // I will use `replace_file_content` to fix the usage inside `handleDownloadTicket`.
    // And another `replace_file_content` to fix imports.
    // Actually, `replace_file_content` doesn't support multiple blocks. I should use `multi_replace_file_content`.

    // Wait, I can't use `multi_replace_file_content` if I don't have it listed in my tools?
    // I DO has `multi_replace_file_content`.

    // Plan: Use `multi_replace_file_content`.
    // Chunk 1: Imports.
    // Chunk 2: `doc.autoTable` -> `autoTable(doc,`.

    // Let's check the context from Step 324/321.
    // Import is line 6: `import 'jspdf-autotable';`
    // Usage is around line 45.

    // Proceeding with `multi_replace_file_content`.

    const dispatch = useDispatch();
    // ...


    const Profile = () => {
        const dispatch = useDispatch();
        const { items: bookings, loading } = useSelector((state) => state.bookings);

        // Mock User Data
        const user = {
            name: "John Doe",
            email: "john.doe@example.com",
            avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&q=80",
            memberSince: "2024"
        };

        useEffect(() => {
            dispatch(fetchBookings());
        }, [dispatch]);

        const handleDownloadTicket = (booking) => {
            console.log("Attempting to download ticket for:", booking);
            try {
                const doc = new jsPDF();

                // Header
                doc.setFillColor(255, 107, 0); // Primary color (Orange)
                doc.rect(0, 0, 210, 40, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(22);
                doc.text("Antigravity Tours", 105, 20, null, null, "center");
                doc.setFontSize(12);
                doc.text("Booking Confirmation", 105, 30, null, null, "center");

                // Booking Info
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(14);
                const bookingDateStr = booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : 'N/A';
                doc.text(`Booking ID: #${booking.id || 'N/A'}`, 14, 60);
                doc.text(`Date: ${bookingDateStr}`, 14, 70);

                // Details Table
                autoTable(doc, {
                    startY: 80,
                    head: [['Description', 'Details']],
                    body: [
                        ['Package Name', booking.packageTitle || 'N/A'],
                        ['Traveler Name', `${booking.firstName || ''} ${booking.lastName || ''}`],
                        ['Travel Date', booking.date || 'N/A'],
                        ['Travelers', String(booking.travelers || '0')],
                        ['Contact Email', booking.email || 'N/A'],
                        ['Contact Phone', String(booking.phone || 'N/A')],
                        ['Status', booking.status || 'Pending'],
                        ['Total Amount', `Rs. ${booking.totalAmount?.toLocaleString() || '0'}`]
                    ],
                    theme: 'grid',
                    headStyles: { fillColor: [255, 107, 0] },
                    styles: { fontSize: 12, cellPadding: 3 }
                });

                // Footer
                const finalY = doc.lastAutoTable.finalY || 150;
                doc.setFontSize(10);
                doc.setTextColor(100);
                doc.text("Thank you for choosing Antigravity Tours.", 105, finalY + 20, null, null, "center");
                doc.text("For support, contact: support@antigravity.tours", 105, finalY + 26, null, null, "center");

                doc.save(`Ticket_${booking.id || 'download'}.pdf`);
            } catch (err) {
                console.error("PDF Download Error:", err);
                alert("Failed to download ticket. Please check console for details.");
            }
        };

        return (
            <div className="pt-24 min-h-screen bg-gray-50 pb-20">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* User Sidebar */}
                        <div className="bg-white p-6 rounded-brand shadow-lg h-fit text-center">
                            <img src={user.avatar} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary/20" />
                            <h2 className="text-xl font-bold">{user.name}</h2>
                            <p className="text-gray-500 text-sm mb-6">{user.email}</p>

                            <div className="border-t pt-4 text-left space-y-3">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <User size={18} /> My Profile
                                </div>
                                <div className="flex items-center gap-3 text-primary font-bold bg-primary/5 p-2 rounded">
                                    <Calendar size={18} /> My Bookings
                                </div>
                                <div className="flex items-center gap-3 text-red-500 cursor-pointer hover:bg-red-50 p-2 rounded">
                                    <LogOut size={18} /> Logout
                                </div>
                            </div>
                        </div>

                        {/* Bookings Content */}
                        <div className="lg:col-span-3">
                            <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

                            {loading ? (
                                <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div></div>
                            ) : bookings.length === 0 ? (
                                <div className="bg-white p-8 rounded-brand shadow text-center text-gray-500">
                                    You haven't made any bookings yet.
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {bookings.map(booking => (
                                        <div key={booking.id} className="bg-white p-6 rounded-brand shadow hover:shadow-lg transition-shadow border border-gray-100">
                                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full uppercase">{booking.status}</span>
                                                        <span className="text-gray-400 text-sm">#{booking.id}</span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-gray-800">{booking.packageTitle}</h3>
                                                    <div className="flex gap-4 text-gray-500 text-sm mt-2">
                                                        <span className="flex items-center gap-1"><Calendar size={14} /> Travel Date: {booking.date}</span>
                                                        <span className="flex items-center gap-1"><User size={14} /> {booking.travelers} Guests</span>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-gray-500 text-xs">Total Amount</p>
                                                    <p className="text-xl font-bold text-primary">₹{booking.totalAmount?.toLocaleString()}</p>
                                                    <button
                                                        onClick={() => handleDownloadTicket(booking)}
                                                        className="mt-2 text-primary text-sm font-semibold hover:underline"
                                                    >
                                                        Download Ticket
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

}
export default Profile;
