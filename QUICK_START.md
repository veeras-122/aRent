# 🚀 Quick Setup Guide - AgriRent Application

## ⚡ Fast Start (5 Minutes)

### Step 1: Install MongoDB
```bash
# Ubuntu/Debian
sudo apt update && sudo apt install -y mongodb-org
sudo systemctl start mongod

# macOS
brew install mongodb-community
brew services start mongodb-community

# Windows - Download from:
# https://www.mongodb.com/try/download/community
```

### Step 2: Install Dependencies
```bash
cd agri-rental-app
npm install
```

### Step 3: Start Application
```bash
npm start
```

### Step 4: Open Browser
Visit: **http://localhost:3000**

---

## 🎯 First Time Usage

### Create Test Accounts

**Test Farmer Account:**
- Go to http://localhost:3000/register
- Name: Test Farmer
- Email: farmer@test.com
- Phone: 9876543210
- Password: test123
- Role: Farmer (Rent Equipment)
- Fill location details
- Click Register

**Test Owner Account:**
- Go to http://localhost:3000/register
- Name: Test Owner
- Email: owner@test.com
- Phone: 9876543211
- Password: test123
- Role: Equipment Owner (List Equipment)
- Fill location details
- Click Register

---

## 📝 Quick Test Flow

### As Equipment Owner:
1. Login with owner account
2. Click "Add Equipment"
3. Fill form (try: Tractor, Land Preparation category)
4. Set daily rate: ₹1500
5. Set deposit: ₹5000
6. Click "List Equipment"

### As Farmer:
1. Login with farmer account
2. Go to "Browse Equipment"
3. Click on the listed tractor
4. Select dates (today + 3 days)
5. Click "Book Now"

### Back As Owner:
1. Login with owner account
2. Go to "My Bookings"
3. Click on pending booking
4. Click "Confirm Booking"

---

## 🔧 Common Commands

**Start Development Server (auto-reload):**
```bash
npm run dev
```

**Start Production Server:**
```bash
npm start
```

**Check MongoDB Status:**
```bash
sudo systemctl status mongod  # Linux
brew services list  # macOS
```

**Stop MongoDB:**
```bash
sudo systemctl stop mongod  # Linux
brew services stop mongodb-community  # macOS
```

---

## 📱 Application URLs

- **Homepage:** http://localhost:3000
- **Login:** http://localhost:3000/login
- **Register:** http://localhost:3000/register
- **Equipment:** http://localhost:3000/equipment
- **Dashboard:** http://localhost:3000/dashboard
- **Bookings:** http://localhost:3000/bookings
- **Add Equipment:** http://localhost:3000/add-equipment

---

## 🎨 Features to Try

✅ **Browse Equipment** - Filter by category, location, availability
✅ **Equipment Details** - View specs, pricing, reviews
✅ **Book Equipment** - Select dates, calculate costs
✅ **Manage Bookings** - Confirm, complete, cancel
✅ **Dashboard** - View stats and recent activity
✅ **Reviews** - Rate and review equipment

---

## 🐛 Quick Fixes

**MongoDB Not Starting?**
```bash
# Check logs
sudo journalctl -u mongod -f

# Restart
sudo systemctl restart mongod
```

**Port 3000 Already Used?**
Edit `.env` file:
```env
PORT=3001
```

**Dependencies Error?**
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

## 📊 Sample Test Data

Use these for quick testing:

**Equipment Categories:**
- Land Preparation
- Planting Equipment
- Irrigation
- Harvesting
- Specialized

**Sample Equipment:**
- John Deere Tractor (₹1500/day)
- Combine Harvester (₹3000/day)
- Rotary Tiller (₹800/day)
- Water Pump (₹500/day)

**Sample Locations (India):**
- Districts: Hyderabad, Guntur, Krishna, Warangal
- States: Telangana, Andhra Pradesh, Karnataka

---

## ✅ Success Checklist

- [ ] MongoDB is running
- [ ] Dependencies installed (`npm install`)
- [ ] Server started (`npm start`)
- [ ] Can access http://localhost:3000
- [ ] Can register new users
- [ ] Can login
- [ ] Can add equipment (as owner)
- [ ] Can book equipment (as farmer)
- [ ] Can see dashboard

---

## 🎓 Learning Resources

**Understanding the Code:**
- `server.js` - Main application entry point
- `routes/` - API endpoints
- `models/` - Database schemas
- `views/` - HTML pages
- `public/` - CSS, JavaScript, assets

**Key Technologies:**
- Express.js: https://expressjs.com/
- MongoDB: https://docs.mongodb.com/
- Mongoose: https://mongoosejs.com/

---

**Need Help?** Check the full README.md for detailed documentation!

**Developed by:** SVS Brahmendra, P Narendra, P Jithin Sai
