const express = require('express')
const router = express.Router()
const {
  getAllVendors,
  getVendor,
  createVendor,
  updateVendor,
  getMyVendor
} = require('./vendor.controller')
const protect = require('../../middleware/auth')
const { upload } = require('../../config/cloudinary')


router.get('/', getAllVendors)
router.get('/my', protect, getMyVendor)
router.get('/:id', getVendor)
router.post('/', protect, createVendor)
router.put('/', protect, updateVendor)
router.post('/upload', protect, upload.array('images', 6), async (req, res) => {
  try {
    const urls = req.files.map(file => file.path)
    res.json({ urls })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router