const Vendor = require('./vendor.model')

// Get all vendors (with filter)
exports.getAllVendors = async (req, res) => {
  try {
    const { category, city, minPrice, maxPrice, rating } = req.query

    let filter = { isApproved: true }

    if (category) filter.category = category
    if (city) filter.city = city
    if (minPrice || maxPrice) {
      filter.priceMin = {}
      if (minPrice) filter.priceMin.$gte = Number(minPrice)
      if (maxPrice) filter.priceMin.$lte = Number(maxPrice)
    }
    if (rating) filter.avgRating = { $gte: Number(rating) }

    const vendors = await Vendor.find(filter).populate('userId', 'name email')

    res.json(vendors)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get single vendor
exports.getVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate('userId', 'name email')
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' })
    res.json(vendor)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create vendor profile
exports.createVendor = async (req, res) => {
  try {
    const existing = await Vendor.findOne({ userId: req.user.id })
    if (existing) return res.status(400).json({ message: 'Vendor profile already exists' })

    const vendor = await Vendor.create({
      userId: req.user.id,
      ...req.body
    })

    res.status(201).json(vendor)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update vendor profile
exports.updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.id })
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' })

    const updated = await Vendor.findByIdAndUpdate(vendor._id, req.body, { new: true })
    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get my vendor profile
exports.getMyVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.id })
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' })
    res.json(vendor)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}