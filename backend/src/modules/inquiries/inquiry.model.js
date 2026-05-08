const mongoose = require('mongoose')

const inquirySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  eventDate: { type: Date },
  eventType: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending' }
}, { timestamps: true })

module.exports = mongoose.model('Inquiry', inquirySchema)