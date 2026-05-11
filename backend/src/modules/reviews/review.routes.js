const express = require('express')
const router = express.Router()
const {
  createReview,
  getVendorReviews,
  getMyReviews,
  deleteReview
} = require('./review.controller')
const protect = require('../../middleware/auth')

router.post('/', protect, createReview)
router.get('/my', protect, getMyReviews)
router.get('/:vendorId', getVendorReviews)
router.delete('/:id', protect, deleteReview)

module.exports = router