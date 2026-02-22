const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide equipment name'],
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Land Preparation',
      'Planting Equipment',
      'Irrigation',
      'Crop Protection',
      'Harvesting',
      'Post-Harvest',
      'Transportation',
      'Specialized'
    ]
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  specifications: {
    brand: String,
    model: String,
    year: Number,
    horsepower: String,
    capacity: String,
    condition: {
      type: String,
      enum: ['Excellent', 'Good', 'Fair'],
      default: 'Good'
    }
  },
  pricing: {
    hourly: Number,
    daily: {
      type: Number,
      required: true
    },
    weekly: Number,
    monthly: Number
  },
  availability: {
    status: {
      type: String,
      enum: ['Available', 'Rented', 'Maintenance', 'Unavailable'],
      default: 'Available'
    },
    calendar: [{
      date: Date,
      available: Boolean
    }]
  },
  location: {
    address: String,
    village: String,
    district: String,
    state: String,
    pincode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  images: [String],
  operatorIncluded: {
    type: Boolean,
    default: false
  },
  operatorCharge: Number,
  deposit: {
    type: Number,
    required: true
  },
  minRentalPeriod: {
    type: String,
    default: '1 day'
  },
  features: [String],
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  totalBookings: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate average rating
equipmentSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.averageRating = 0;
  } else {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.averageRating = (sum / this.reviews.length).toFixed(1);
  }
};

module.exports = mongoose.model('Equipment', equipmentSchema);
