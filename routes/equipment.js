const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/equipment
// @desc    Get all equipment with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, district, minPrice, maxPrice, available, search } = req.query;
    
    let query = {};

    if (category) query.category = category;
    if (district) query['location.district'] = new RegExp(district, 'i');
    if (available === 'true') query['availability.status'] = 'Available';
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { type: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }
    
    if (minPrice || maxPrice) {
      query['pricing.daily'] = {};
      if (minPrice) query['pricing.daily'].$gte = Number(minPrice);
      if (maxPrice) query['pricing.daily'].$lte = Number(maxPrice);
    }

    const equipment = await Equipment.find(query)
      .populate('owner', 'name phone email')
      .sort('-createdAt');

    res.json({
      success: true,
      count: equipment.length,
      data: equipment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/equipment/:id
// @desc    Get single equipment
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id)
      .populate('owner', 'name phone email address')
      .populate('reviews.user', 'name');

    if (!equipment) {
      return res.status(404).json({ success: false, message: 'Equipment not found' });
    }

    res.json({
      success: true,
      data: equipment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/equipment
// @desc    Create new equipment listing
// @access  Private (Owner only)
router.post('/', protect, authorize('owner', 'admin'), async (req, res) => {
  try {
    req.body.owner = req.user.id;
    
    const equipment = await Equipment.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Equipment listed successfully',
      data: equipment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/equipment/:id
// @desc    Update equipment
// @access  Private (Owner only)
router.put('/:id', protect, authorize('owner', 'admin'), async (req, res) => {
  try {
    let equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({ success: false, message: 'Equipment not found' });
    }

    // Make sure user is equipment owner
    if (equipment.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized to update this equipment' });
    }

    equipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      message: 'Equipment updated successfully',
      data: equipment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/equipment/:id
// @desc    Delete equipment
// @access  Private (Owner only)
router.delete('/:id', protect, authorize('owner', 'admin'), async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({ success: false, message: 'Equipment not found' });
    }

    // Make sure user is equipment owner
    if (equipment.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized to delete this equipment' });
    }

    await equipment.deleteOne();

    res.json({
      success: true,
      message: 'Equipment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/equipment/:id/review
// @desc    Add review to equipment
// @access  Private
router.post('/:id/review', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({ success: false, message: 'Equipment not found' });
    }

    // Check if user already reviewed
    const alreadyReviewed = equipment.reviews.find(
      review => review.user.toString() === req.user.id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ success: false, message: 'Equipment already reviewed' });
    }

    const review = {
      user: req.user.id,
      rating: Number(rating),
      comment
    };

    equipment.reviews.push(review);
    equipment.calculateAverageRating();
    await equipment.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/equipment/my/listings
// @desc    Get current user's equipment listings
// @access  Private (Owner)
router.get('/my/listings', protect, authorize('owner', 'admin'), async (req, res) => {
  try {
    const equipment = await Equipment.find({ owner: req.user.id }).sort('-createdAt');

    res.json({
      success: true,
      count: equipment.length,
      data: equipment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
