🚜 AgriRent – Agricultural Equipment Rental Platform

AgriRent is a comprehensive web-based application designed to connect agricultural equipment owners with farmers who require machinery on a rental basis.

The platform enables efficient resource utilization, improves accessibility to farming equipment, and simplifies the booking and management process through a modern and responsive web interface.

Features
Farmer (Renter) Features

Browse and search equipment by category, location, and pricing

View detailed equipment specifications and owner information

Real-time availability checking

Book equipment for selected dates

Track booking history and status

Rate and review equipment

Flexible pickup and delivery options

Optional operator services

Equipment Owner Features

List multiple equipment with detailed specifications

Flexible pricing (hourly, daily, weekly, monthly)

Manage booking requests (confirm, reject, complete)

Track rental history and earnings

Update equipment availability

Dashboard with analytics and booking statistics

Receive ratings and reviews

Platform Features

User authentication and authorization

Role-based access control (Farmer, Owner, Admin)

Secure payment tracking

Responsive design for mobile and desktop

Real-time booking management

Review and rating system

Tech Stack
Frontend

HTML5

CSS3

JavaScript (ES6+)

Google Fonts (Poppins, Merriweather)

Backend

Node.js

Express.js

MongoDB

Mongoose

Security & Authentication

bcryptjs (Password hashing)

jsonwebtoken (JWT authentication)

express-validator (Input validation)

Installation
Prerequisites

Make sure the following are installed:

Node.js (v14 or higher)

MongoDB (v4.4 or higher)

Git (optional)

Step 1: Clone the Repository
git clone https://github.com/your-username/agri-rental-app.git
cd agri-rental-app
Step 2: Install Dependencies
npm install
Step 3: Configure Environment Variables

Create or modify the .env file:

PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/agri-rental-db
JWT_SECRET=your_secret_key
SESSION_SECRET=your_session_secret
APP_URL=http://localhost:3000
Step 4: Start the Application

Development mode:

npm run dev

Production mode:

npm start

The application will run at:

http://localhost:3000
Usage

Start MongoDB.

Run the application using:

npm start

Open your browser and navigate to:

http://localhost:3000
Farmers Can

Browse available equipment

View equipment details and pricing

Book equipment

Manage bookings

Equipment Owners Can

Add new equipment

Manage booking requests

Track earnings and statistics

View dashboard insights

Project Structure
agri-rental-app/
├── config/
├── middleware/
├── models/
├── routes/
├── public/
├── views/
├── .env
├── server.js
├── package.json
└── README.md
API Endpoints
Authentication

POST /api/auth/register

POST /api/auth/login

GET /api/auth/me

PUT /api/auth/updatedetails

POST /api/auth/logout

Equipment

GET /api/equipment

GET /api/equipment/:id

POST /api/equipment

PUT /api/equipment/:id

DELETE /api/equipment/:id

POST /api/equipment/:id/review

GET /api/equipment/my/listings

Bookings

POST /api/bookings

GET /api/bookings

GET /api/bookings/:id

PUT /api/bookings/:id/confirm

PUT /api/bookings/:id/cancel

PUT /api/bookings/:id/complete

POST /api/bookings/:id/review

Future Enhancements

Payment gateway integration

Real-time notifications

Equipment GPS tracking

In-app chat system

Mobile application

Multi-language support

Equipment insurance integration

Image upload functionality

Recommendation system

License

This project is developed for academic purposes.

Authors

SVS Brahmendra

P. Narendra

P. Jithin Sai
