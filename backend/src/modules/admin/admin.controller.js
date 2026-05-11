const User = require('../auth/user.model')
const Vendor = require('../vendors/vendor.model')
const Inquiry = require('../inquiries/inquiry.model')
const Review = require('../reviews/review.model')

// Get stats
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' })
    const totalVendors = await Vendor.countDocuments()
    const pendingVendors = await Vendor.countDocuments({ isApproved: false })
    const totalInquiries = await Inquiry.countDocuments()

    res.json({ totalUsers, totalVendors, pendingVendors, totalInquiries })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all vendors
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate('userId', 'name email')
    res.json(vendors)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Approve vendor
exports.approveVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    )
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' })
    res.json(vendor)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Reject vendor
exports.rejectVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { isApproved: false },
      { new: true }
    )
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' })
    res.json(vendor)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Suspend user
exports.suspendUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isSuspended: true },
      { new: true }
    )
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all inquiries
exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .populate('userId', 'name email')
      .populate('vendorId', 'businessName category')
    res.json(inquiries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id)
    res.json({ message: 'Review deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}