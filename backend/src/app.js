const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./modules/auth/auth.routes')
const vendorRoutes = require('./modules/vendors/vendor.routes')
const inquiryRoutes = require('./modules/inquiries/inquiry.routes')
const reviewRoutes = require('./modules/reviews/review.routes')
const adminRoutes = require('./modules/admin/admin.routes')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

app.use('/api/auth', authRoutes)
app.use('/api/vendors', vendorRoutes)
app.use('/api/inquiries', inquiryRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/admin', adminRoutes)




app.get('/', (req, res) => {
  res.json({ message: 'Zafaf API is running' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))