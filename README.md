# WanderLux - Tour & Travels Landing Page

A high-end, professional Tour and Travels Landing Page built with React JS, Redux Toolkit, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern UI/UX**: Glassmorphic design with smooth animations and micro-interactions
- **State Management**: Redux Toolkit for managing packages, categories, and enquiries
- **Responsive Design**: Mobile-first approach with full responsiveness across all devices
- **Smooth Animations**: Framer Motion for scroll-reveal, hover effects, and page transitions
- **Form Validation**: Complete booking form with validation and error handling
- **Skeleton Loaders**: Beautiful shimmer effect while data is loading
- **Mock Backend**: JSON Server for simulating API calls

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Mock API**: JSON Server

## 📦 Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

## 🎯 Running the Application

You need to run TWO terminals simultaneously:

### Terminal 1 - Frontend (Vite Dev Server)
```bash
npm run dev
```
This will start the React application at `http://localhost:5173`

### Terminal 2 - Backend (JSON Server)
```bash
npm run server
```
This will start the mock API server at `http://localhost:3001`

## 🎨 Design Features

### Color Scheme
- **Primary**: #ff5722 (Deep Orange)
- **Secondary**: #2c3e50 (Dark Blue)
- **Brand Radius**: 12px
- **Custom Shadows**: Brand shadow with primary color

### Custom Utilities
- `.container-border` - Glassmorphic border effect
- `.brand-shadow` - Custom shadow with primary color
- `.glass-effect` - Glassmorphic background with backdrop blur

### Sections

1. **Sticky Navbar**
   - Transparent to solid on scroll
   - Mobile-responsive menu
   - Smooth scroll navigation

2. **Hero Section**
   - Dynamic image slider with 3 slides
   - Glassmorphic search overlay
   - Destination, Date, and Guest count inputs

3. **Category Grid**
   - Weekend, Domestic, and International tours
   - Hover-up animations
   - Icon bounce effects

4. **Featured Packages**
   - Responsive grid (1 col mobile, 3 col desktop)
   - Price, duration, and rating display
   - Skeleton loaders during data fetch

5. **Booking/Enquiry Form**
   - Complete form validation
   - Redux integration for POST requests
   - Success/Error state handling
   - Glassmorphic design

6. **Modern Footer**
   - Multi-column layout
   - Social media links
   - Newsletter subscription
   - Contact information

## 📁 Project Structure

```
antigravity/
├── src/
│   ├── app/
│   │   └── store.js              # Redux store configuration
│   ├── features/
│   │   ├── packages/
│   │   │   └── packagesSlice.js  # Packages state management
│   │   ├── categories/
│   │   │   └── categoriesSlice.js # Categories state management
│   │   └── enquiries/
│   │       └── enquiriesSlice.js # Enquiries state management
│   ├── components/
│   │   ├── Navbar.jsx            # Sticky navigation bar
│   │   ├── Hero.jsx              # Hero slider section
│   │   ├── Categories.jsx        # Category cards
│   │   ├── FeaturedPackages.jsx  # Package listings
│   │   ├── BookingForm.jsx       # Enquiry form
│   │   └── Footer.jsx            # Footer section
│   ├── constants.js              # Centralized constants
│   ├── index.css                 # Global styles & Tailwind
│   ├── App.jsx                   # Main app component
│   └── main.jsx                  # Entry point
├── db.json                       # Mock database
├── tailwind.config.js            # Tailwind configuration
└── package.json                  # Dependencies

```

## 🎭 Animations & Micro-interactions

- **Button Clicks**: Scale-down effect on click
- **Icon Hovers**: Bounce and rotate effects
- **Card Hovers**: Lift-up animation with enhanced shadow
- **Scroll Reveals**: Fade-in-up animations on scroll
- **Skeleton Loaders**: Shimmer effect during loading
- **Page Transitions**: Smooth transitions between states

## 📊 API Endpoints

The mock API (JSON Server) provides the following endpoints:

- `GET /packages` - Fetch all tour packages
- `GET /categories` - Fetch all categories
- `POST /enquiries` - Submit booking enquiry
- `GET /enquiries` - Fetch all enquiries

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the theme colors:
```javascript
colors: {
  primary: '#ff5722',
  secondary: '#2c3e50',
}
```

### Constants
Edit `src/constants.js` to update:
- API URLs
- Brand information
- Social links
- Navigation items
- Animation variants

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (1 column)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (3 columns)

## 🚀 Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

## 📝 License

This project is created for demonstration purposes.

## 👨‍💻 Developer Notes

- All components use Framer Motion for animations
- Redux Toolkit is used for state management
- Form validation is implemented in the BookingForm component
- Skeleton loaders appear during data fetching
- Mobile-first responsive design approach
- Glassmorphic design elements throughout

---

**Built with ❤️ using React, Redux Toolkit, Tailwind CSS, and Framer Motion**
