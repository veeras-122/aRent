const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Equipment = require('../models/Equipment');
const { protect } = require('../middleware/auth');

// @route   POST /api/bookings
// @desc    Create new booking
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { equipmentId, startDate, endDate, operatorRequired, deliveryAddress, deliveryType, notes } = req.body;

    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ success: false, message: 'Equipment not found' });
    }

    if (equipment.availability.status !== 'Available') {
      return res.status(400).json({ success: false, message: 'Equipment is not available' });
    }

    // Calculate duration in days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    // Calculate pricing
    const baseRate = equipment.pricing.daily * duration;
    const operatorCharge = operatorRequired && equipment.operatorIncluded ? 
      (equipment.operatorCharge || 0) * duration : 0;
    const deposit = equipment.deposit;
    const totalAmount = baseRate + operatorCharge + deposit;

    const booking = await Booking.create({
      equipment: equipmentId,
      renter: req.user.id,
      owner: equipment.owner,
      startDate,
      endDate,
      duration,
      pricing: {
        baseRate,
        operatorCharge,
        deposit,
        totalAmount
      },
      operatorRequired,
      deliveryAddress,
      deliveryType,
      notes
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/bookings
// @desc    Get all bookings for current user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const query = req.user.role === 'owner' 
      ? { owner: req.user.id }
      : { renter: req.user.id };

    const bookings = await Booking.find(query)
      .populate('equipment', 'name type category images pricing')
      .populate('renter', 'name phone email')
      .populate('owner', 'name phone email')
      .sort('-createdAt');

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get single booking
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('equipment')
      .populate('renter', 'name phone email address')
      .populate('owner', 'name phone email address');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Make sure user is authorized
    if (booking.renter._id.toString() !== req.user.id && 
        booking.owner._id.toString() !== req.user.id && 
        req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/bookings/:id/confirm
// @desc    Confirm booking (Owner only)
// @access  Private
router.put('/:id/confirm', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.owner.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    booking.status = 'Confirmed';
    await booking.save();

    // Update equipment status
    await Equipment.findByIdAndUpdate(booking.equipment, {
      'availability.status': 'Rented'
    });

    res.json({
      success: true,
      message: 'Booking confirmed successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/bookings/:id/cancel
// @desc    Cancel booking
// @access  Private
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.renter.toString() !== req.user.id && 
        booking.owner.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    booking.status = 'Cancelled';
    booking.cancellationReason = req.body.reason || 'No reason provided';
    await booking.save();

    // Update equipment status back to available
    await Equipment.findByIdAndUpdate(booking.equipment, {
      'availability.status': 'Available'
    });

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/bookings/:id/complete
// @desc    Complete booking
// @access  Private
router.put('/:id/complete', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.owner.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    booking.status = 'Completed';
    await booking.save();

    // Update equipment
    const equipment = await Equipment.findById(booking.equipment);
    equipment.availability.status = 'Available';
    equipment.totalBookings += 1;
    await equipment.save();

    res.json({
      success: true,
      message: 'Booking completed successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/bookings/:id/review
// @desc    Add review to booking
// @access  Private
router.post('/:id/review', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.renter.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    if (booking.status !== 'Completed') {
      return res.status(400).json({ success: false, message: 'Can only review completed bookings' });
    }

    booking.review = {
      rating: Number(rating),
      comment,
      date: Date.now()
    };
    await booking.save();

    // Add review to equipment
    const equipment = await Equipment.findById(booking.equipment);
    equipment.reviews.push({
      user: req.user.id,
      rating: Number(rating),
      comment
    });
    equipment.calculateAverageRating();
    await equipment.save();

    res.json({
      success: true,
      message: 'Review added successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
