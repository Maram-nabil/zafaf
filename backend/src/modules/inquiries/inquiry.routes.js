const express = require('express')
const router = express.Router()
const {
  sendInquiry,
  getMyInquiries,
  getReceivedInquiries,
  updateInquiryStatus
} = require('./inquiry.controller')
const protect = require('../../middleware/auth')

router.post('/', protect, sendInquiry)
router.get('/my', protect, getMyInquiries)
router.get('/received', protect, getReceivedInquiries)
router.put('/:id', protect, updateInquiryStatus)

module.exports = router