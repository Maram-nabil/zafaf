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

router.get('/', getAllVendors)
router.get('/my', protect, getMyVendor)
router.get('/:id', getVendor)
router.post('/', protect, createVendor)
router.put('/', protect, updateVendor)

module.exports = router