const mongoose = require('mongoose')

const vendorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  businessName: { type: String, required: true },
  category: { type: String, required: true },
  city: { type: String, required: true },
  bio: { type: String },
  phone: { type: String },
  priceMin: { type: Number },
  priceMax: { type: Number },
  portfolio: [{ type: String }],
  isApproved: { type: Boolean, default: false },
  avgRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Vendor', vendorSchema)