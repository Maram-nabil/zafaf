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
}