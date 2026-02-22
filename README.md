# 🚜 AgriRent - Agricultural Equipment Rental Platform

A comprehensive web application that connects agricultural equipment owners with farmers who need access to machinery on a rental basis. Built with modern web technologies and a beautiful, distinctive design.

## 👥 Project Team
- **SVS Brahmendra**
- **P Narendra**
- **P Jithin Sai**

## 🌟 Features

### For Farmers (Renters)
- Browse and search agricultural equipment by category, location, and price
- View detailed equipment specifications and owner information
- Real-time availability checking
- Book equipment for specific dates
- View booking history and status
- Rate and review equipment after use
- Flexible delivery options (pickup or delivery)
- Optional operator services

### For Equipment Owners
- List multiple equipment with detailed specifications
- Set flexible pricing (hourly, daily, weekly, monthly)
- Manage booking requests (confirm, reject, complete)
- Track rental history and earnings
- Update equipment availability
- Receive ratings and reviews
- Dashboard with analytics

### Platform Features
- User authentication and authorization
- Role-based access control (Farmer, Owner, Admin)
- Responsive design for mobile and desktop
- Beautiful agricultural-themed UI
- Real-time booking management
- Secure payment tracking
- Review and rating system

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom styling with modern design
- **JavaScript (ES6+)** - Client-side logic
- **Fonts** - Poppins (body), Merriweather (display)

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### Security & Authentication
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **express-validator** - Input validation

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** (optional) - [Download](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Install MongoDB

**On Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

**On macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**On Windows:**
Download and install from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

### 2. Install Dependencies

Navigate to the project directory and install npm packages:

```bash
cd agri-rental-app
npm install
```

### 3. Configure Environment Variables

The `.env` file is already created with default settings. You can modify it if needed:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/agri-rental-db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
SESSION_SECRET=your_session_secret_key_change_this_in_production
APP_URL=http://localhost:3000
```

**⚠️ IMPORTANT for Production:**
- Change `JWT_SECRET` and `SESSION_SECRET` to strong, random values
- Update `MONGODB_URI` to your production database
- Set `NODE_ENV=production`

### 4. Start the Application

**Development Mode (with auto-restart):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The application will be available at: **http://localhost:3000**

## 📱 Using the Application

### Initial Setup

1. **Start MongoDB** (if not already running):
   ```bash
   sudo systemctl start mongod  # Linux
   brew services start mongodb-community  # macOS
   ```

2. **Start the application**:
   ```bash
   npm start
   ```

3. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

### User Registration

#### As a Farmer (Equipment Renter):
1. Click "Register" in the navigation
2. Fill in your details
3. Select role: "Farmer (Rent Equipment)"
4. Provide your location (village, district, state)
5. Click "Create Account"

#### As an Equipment Owner:
1. Click "Register" in the navigation
2. Fill in your details
3. Select role: "Equipment Owner (List Equipment)"
4. Provide your location
5. Click "Create Account"

### For Farmers

1. **Browse Equipment**:
   - Go to "Browse Equipment"
   - Use filters (category, district, availability)
   - Search by equipment name or type

2. **View Equipment Details**:
   - Click on any equipment card
   - View specifications, pricing, and reviews
   - Check owner information and location

3. **Book Equipment**:
   - Select start and end dates
   - Choose if operator is required
   - Select delivery type (pickup/delivery)
   - Review cost summary
   - Click "Book Now"

4. **Manage Bookings**:
   - Go to "My Bookings"
   - View all bookings with status
   - Click on any booking for details
   - Cancel bookings if needed

### For Equipment Owners

1. **Add Equipment**:
   - Click "Add Equipment" (after login)
   - Fill in equipment details:
     - Basic information (name, category, type)
     - Specifications (brand, model, condition)
     - Pricing (hourly, daily, weekly rates)
     - Location (address, village, district)
     - Features
   - Click "List Equipment"

2. **Manage Bookings**:
   - Go to "My Bookings"
   - View pending booking requests
   - Click "Confirm" to accept a booking
   - Click "Mark as Completed" when rental period ends

3. **View Dashboard**:
   - Access "Dashboard" for overview
   - See statistics (total bookings, upcoming, completed)
   - View your listed equipment
   - Track recent bookings

## 🗂️ Project Structure

```
agri-rental-app/
├── config/
│   └── database.js          # MongoDB connection
├── middleware/
│   └── auth.js              # Authentication middleware
├── models/
│   ├── User.js              # User schema
│   ├── Equipment.js         # Equipment schema
│   └── Booking.js           # Booking schema
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── equipment.js         # Equipment CRUD routes
│   └── bookings.js          # Booking management routes
├── public/
│   ├── css/
│   │   └── style.css        # Main stylesheet
│   └── js/
│       └── main.js          # Frontend JavaScript
├── views/
│   ├── index.html           # Homepage
│   ├── login.html           # Login page
│   ├── register.html        # Registration page
│   ├── dashboard.html       # User dashboard
│   ├── equipment.html       # Equipment listing
│   ├── equipment-detail.html # Equipment details
│   ├── add-equipment.html   # Add equipment form
│   └── bookings.html        # Bookings management
├── .env                     # Environment variables
├── server.js                # Main server file
├── package.json             # Dependencies
└── README.md               # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/updatedetails` - Update profile
- `POST /api/auth/logout` - Logout user

### Equipment
- `GET /api/equipment` - Get all equipment (with filters)
- `GET /api/equipment/:id` - Get single equipment
- `POST /api/equipment` - Create equipment (Owner only)
- `PUT /api/equipment/:id` - Update equipment (Owner only)
- `DELETE /api/equipment/:id` - Delete equipment (Owner only)
- `POST /api/equipment/:id/review` - Add review
- `GET /api/equipment/my/listings` - Get owner's equipment

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user's bookings
- `GET /api/bookings/:id` - Get single booking
- `PUT /api/bookings/:id/confirm` - Confirm booking (Owner)
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `PUT /api/bookings/:id/complete` - Complete booking (Owner)
- `POST /api/bookings/:id/review` - Add review to booking

## 🎨 Design Features

The application features a distinctive agricultural theme:

- **Earth & Agricultural Color Palette**:
  - Earth Brown, Soil Dark, Wheat Gold
  - Crop Green, Harvest Orange, Sky Blue

- **Typography**:
  - Display: Merriweather (serif, bold)
  - Body: Poppins (sans-serif)

- **Animations**:
  - Smooth page transitions
  - Hover effects on cards and buttons
  - Loading spinners
  - Alert animations

- **Responsive Design**:
  - Mobile-first approach
  - Adapts to all screen sizes
  - Touch-friendly interfaces

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Role-based access control
- Input validation and sanitization
- Protected API endpoints
- CORS enabled
- Secure session management

## 📊 Database Schema

### User Collection
- Personal information (name, email, phone)
- Address details
- Role (farmer/owner/admin)
- Password (hashed)
- Verification status

### Equipment Collection
- Owner reference
- Equipment details and specifications
- Pricing information
- Location data
- Availability status
- Reviews and ratings
- Total bookings

### Booking Collection
- Equipment and user references
- Rental dates and duration
- Pricing breakdown
- Delivery information
- Status tracking
- Payment information
- Reviews

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
sudo systemctl status mongod  # Linux
brew services list  # macOS

# Start MongoDB if not running
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
```

### Port Already in Use
If port 3000 is already in use, change it in `.env`:
```env
PORT=3001
```

### Dependencies Issues
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

## 🚀 Future Enhancements

- [ ] Payment gateway integration
- [ ] Real-time notifications
- [ ] Equipment tracking with GPS
- [ ] Chat system between farmers and owners
- [ ] Mobile app (React Native)
- [ ] Equipment insurance integration
- [ ] Analytics and reporting dashboard
- [ ] Multi-language support
- [ ] Image upload for equipment
- [ ] Equipment recommendation system

## 📄 License

This project is developed as part of an academic project by SVS Brahmendra, P Narendra, and P Jithin Sai.

## 🤝 Support

For support or queries, please contact:
- Email: support@agrirent.com
- Phone: +91 1234567890

## 🙏 Acknowledgments

- Thanks to the agricultural community for inspiration
- Node.js and MongoDB communities for excellent documentation
- Google Fonts for typography

---

**Built with ❤️ for farmers everywhere** 🌾
