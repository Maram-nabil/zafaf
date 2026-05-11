const Inquiry = require('./inquiry.model')

// Send inquiry (user → vendor)
exports.sendInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.create({
      userId: req.user.id,
      ...req.body
    })
    res.status(201).json(inquiry)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get my inquiries (user)
exports.getMyInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find({ userId: req.user.id })
      .populate('vendorId', 'businessName category city')
    res.json(inquiries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get received inquiries (vendor)
exports.getReceivedInquiries = async (req, res) => {
  try {
    const vendor = await require('../vendors/vendor.model').findOne({ userId: req.user.id })
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' })

    const inquiries = await Inquiry.find({ vendorId: vendor._id })
      .populate('userId', 'name email')
    res.json(inquiries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update inquiry status (vendor)
exports.updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' })
    res.json(inquiry)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}