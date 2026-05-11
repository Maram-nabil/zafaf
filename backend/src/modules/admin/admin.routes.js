const express = require('express')
const router = express.Router()
const {
  getStats,
  getAllVendors,
  approveVendor,
  rejectVendor,
  getAllUsers,
  suspendUser,
  getAllInquiries,
  deleteReview
} = require('./admin.controller')
const protect = require('../../middleware/auth')
const { isAdmin } = require('../../middleware/roles')

router.get('/stats', protect, isAdmin, getStats)
router.get('/vendors', protect, isAdmin, getAllVendors)
router.put('/vendors/:id/approve', protect, isAdmin, approveVendor)
router.put('/vendors/:id/reject', protect, isAdmin, rejectVendor)
router.get('/users', protect, isAdmin, getAllUsers)
router.put('/users/:id/suspend', protect, isAdmin, suspendUser)
router.get('/inquiries', protect, isAdmin, getAllInquiries)
router.delete('/reviews/:id', protect, isAdmin, deleteReview)

module.exports = router