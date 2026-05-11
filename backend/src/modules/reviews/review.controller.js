const Review = require('./review.model')
const Vendor = require('../vendors/vendor.model')

// Write review
exports.createReview = async (req, res) => {
  try {
    const { vendorId, rating, comment } = req.body

    const existing = await Review.findOne({ userId: req.user.id, vendorId })
    if (existing) return res.status(400).json({ message: 'Already reviewed this vendor' })

    const review = await Review.create({
      userId: req.user.id,
      vendorId,
      rating,
      comment
    })

    // Update vendor avg rating
    const reviews = await Review.find({ vendorId })
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length

    await Vendor.findByIdAndUpdate(vendorId, {
      avgRating: avgRating.toFixed(1),
      reviewCount: reviews.length
    })

    res.status(201).json(review)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get vendor reviews
exports.getVendorReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ vendorId: req.params.vendorId })
      .populate('userId', 'name')
    res.json(reviews)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get my reviews
exports.getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user.id })
      .populate('vendorId', 'businessName category')
    res.json(reviews)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete review (admin)
exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id)
    res.json({ message: 'Review deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}