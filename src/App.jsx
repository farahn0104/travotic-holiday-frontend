import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Packages from './pages/Packages';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import ContactUs from './pages/ContactUs';
import AllPackages from './pages/AllPackages';
import PackageDetails from './pages/PackageDetails';
import BookingPage from './pages/BookingPage';
import BookingSuccess from './pages/BookingSuccess';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import BlogDetails from './pages/BlogDetails';
import './index.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-packages" element={<AllPackages />} />
            <Route path="/package/:id" element={<PackageDetails />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about-us" element={<AboutUs />} />

            <Route path="/packages/:type" element={<Packages />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
