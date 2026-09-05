const BASE_URL = 'http://localhost:5000/api'

const getToken = () => localStorage.getItem('token')

export const api = {
  // Auth
  register: (data) => fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),

  login: (data) => fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),

  getMe: () => fetch(`${BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(r => r.json()),

  // Vendors
  getVendors: (params) => fetch(`${BASE_URL}/vendors?${new URLSearchParams(params)}`).then(r => r.json()),

  getVendor: (id) => fetch(`${BASE_URL}/vendors/${id}`).then(r => r.json()),

  createVendor: (data) => fetch(`${BASE_URL}/vendors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  }).then(r => r.json()),

  // Inquiries
  sendInquiry: (data) => fetch(`${BASE_URL}/inquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  }).then(r => r.json()),

  getMyInquiries: () => fetch(`${BASE_URL}/inquiries/my`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(r => r.json()),

  // Reviews
  createReview: (data) => fetch(`${BASE_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  }).then(r => r.json()),

  getVendorReviews: (vendorId) => fetch(`${BASE_URL}/reviews/${vendorId}`).then(r => r.json()),

  // Vendor dashboard
  getMyVendor: () => fetch(`${BASE_URL}/vendors/my`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(r => r.json()),

  getReceivedInquiries: () => fetch(`${BASE_URL}/inquiries/received`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(r => r.json()),

  updateInquiryStatus: (id, status) => fetch(`${BASE_URL}/inquiries/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify({ status })
  }).then(r => r.json()),

  // Admin
  getAdminStats: () => fetch(`${BASE_URL}/admin/stats`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(r => r.json()),

  getAdminVendors: () => fetch(`${BASE_URL}/admin/vendors`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(r => r.json()),

  getAdminUsers: () => fetch(`${BASE_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(r => r.json()),

  getAdminInquiries: () => fetch(`${BASE_URL}/admin/inquiries`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(r => r.json()),

  approveVendor: (id) => fetch(`${BASE_URL}/admin/vendors/${id}/approve`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(r => r.json()),

  rejectVendor: (id) => fetch(`${BASE_URL}/admin/vendors/${id}/reject`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(r => r.json()),


  //Cloudinary
  uploadImages: (formData) => fetch(`${BASE_URL}/vendors/upload`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${getToken()}` },
  body: formData
}).then(r => r.json()),
}