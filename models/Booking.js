const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment',
    required: true
  },
  renter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true // in days
  },
  pricing: {
    baseRate: Number,
    operatorCharge: Number,
    deposit: Number,
    totalAmount: Number
  },
  operatorRequired: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Active', 'Completed', 'Cancelled', 'Rejected'],
    default: 'Pending'
  },
  payment: {
    method: String,
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Refunded'],
      default: 'Pending'
    },
    transactionId: String,
    paidAt: Date
  },
  deliveryAddress: {
    street: String,
    village: String,
    district: String,
    pincode: String
  },
  deliveryType: {
    type: String,
    enum: ['Pickup', 'Delivery'],
    default: 'Pickup'
  },
  notes: String,
  cancellationReason: String,
  review: {
    rating: Number,
    comment: String,
    date: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
bookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
