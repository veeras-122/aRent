// API Base URL
const API_URL = 'http://localhost:3000/api';

// Auth Utilities
const auth = {
  // Save token to localStorage
  setToken(token) {
    localStorage.setItem('token', token);
  },
  
  // Get token from localStorage
  getToken() {
    return localStorage.getItem('token');
  },
  
  // Remove token
  removeToken() {
    localStorage.removeItem('token');
  },
  
  // Check if user is logged in
  isLoggedIn() {
    return !!this.getToken();
  },
  
  // Save user data
  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },
  
  // Get user data
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  // Logout
  logout() {
    this.removeToken();
    localStorage.removeItem('user');
    window.location.href = '/login';
  },
  
  // Get headers with token
  getHeaders() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  }
};

// API Calls
const api = {
  // Auth
  async register(data) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await response.json();
  },
  
  async login(data) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await response.json();
  },
  
  async getProfile() {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: auth.getHeaders()
    });
    return await response.json();
  },
  
  async updateProfile(data) {
    const response = await fetch(`${API_URL}/auth/updatedetails`, {
      method: 'PUT',
      headers: auth.getHeaders(),
      body: JSON.stringify(data)
    });
    return await response.json();
  },
  
  // Equipment
  async getEquipment(filters = {}) {
    const queryString = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}/equipment?${queryString}`);
    return await response.json();
  },
  
  async getEquipmentById(id) {
    const response = await fetch(`${API_URL}/equipment/${id}`);
    return await response.json();
  },
  
  async createEquipment(data) {
    const response = await fetch(`${API_URL}/equipment`, {
      method: 'POST',
      headers: auth.getHeaders(),
      body: JSON.stringify(data)
    });
    return await response.json();
  },
  
  async updateEquipment(id, data) {
    const response = await fetch(`${API_URL}/equipment/${id}`, {
      method: 'PUT',
      headers: auth.getHeaders(),
      body: JSON.stringify(data)
    });
    return await response.json();
  },
  
  async deleteEquipment(id) {
    const response = await fetch(`${API_URL}/equipment/${id}`, {
      method: 'DELETE',
      headers: auth.getHeaders()
    });
    return await response.json();
  },
  
  async addReview(equipmentId, data) {
    const response = await fetch(`${API_URL}/equipment/${equipmentId}/review`, {
      method: 'POST',
      headers: auth.getHeaders(),
      body: JSON.stringify(data)
    });
    return await response.json();
  },
  
  async getMyListings() {
    const response = await fetch(`${API_URL}/equipment/my/listings`, {
      headers: auth.getHeaders()
    });
    return await response.json();
  },
  
  // Bookings
  async createBooking(data) {
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: auth.getHeaders(),
      body: JSON.stringify(data)
    });
    return await response.json();
  },
  
  async getBookings() {
    const response = await fetch(`${API_URL}/bookings`, {
      headers: auth.getHeaders()
    });
    return await response.json();
  },
  
  async getBookingById(id) {
    const response = await fetch(`${API_URL}/bookings/${id}`, {
      headers: auth.getHeaders()
    });
    return await response.json();
  },
  
  async confirmBooking(id) {
    const response = await fetch(`${API_URL}/bookings/${id}/confirm`, {
      method: 'PUT',
      headers: auth.getHeaders()
    });
    return await response.json();
  },
  
  async cancelBooking(id, reason) {
    const response = await fetch(`${API_URL}/bookings/${id}/cancel`, {
      method: 'PUT',
      headers: auth.getHeaders(),
      body: JSON.stringify({ reason })
    });
    return await response.json();
  },
  
  async completeBooking(id) {
    const response = await fetch(`${API_URL}/bookings/${id}/complete`, {
      method: 'PUT',
      headers: auth.getHeaders()
    });
    return await response.json();
  },
  
  async addBookingReview(id, data) {
    const response = await fetch(`${API_URL}/bookings/${id}/review`, {
      method: 'POST',
      headers: auth.getHeaders(),
      body: JSON.stringify(data)
    });
    return await response.json();
  }
};

// UI Utilities
const ui = {
  // Show alert
  showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
      <span>${type === 'success' ? '✓' : '⚠'}</span>
      <span>${message}</span>
    `;
    
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => {
      alertDiv.remove();
    }, 5000);
  },
  
  // Show loading spinner
  showLoading(element) {
    element.innerHTML = '<div class="spinner"></div>';
  },
  
  // Format currency
  formatCurrency(amount) {
    return `₹${amount.toLocaleString('en-IN')}`;
  },
  
  // Format date
  formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },
  
  // Generate star rating
  generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
      stars += '★';
    }
    if (hasHalfStar) {
      stars += '☆';
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
      stars += '☆';
    }
    
    return stars;
  },
  
  // Get status badge class
  getStatusBadgeClass(status) {
    const statusClasses = {
      'Available': 'success',
      'Rented': 'warning',
      'Maintenance': 'danger',
      'Unavailable': 'danger',
      'Pending': 'warning',
      'Confirmed': 'info',
      'Active': 'success',
      'Completed': 'success',
      'Cancelled': 'danger',
      'Rejected': 'danger'
    };
    return statusClasses[status] || 'secondary';
  }
};

// Initialize navbar
function initNavbar() {
  const user = auth.getUser();
  const navMenu = document.querySelector('.nav-menu');
  
  if (!navMenu) return;
  
  if (auth.isLoggedIn() && user) {
    navMenu.innerHTML = `
      <li><a href="/equipment" class="nav-link">Browse Equipment</a></li>
      ${user.role === 'owner' ? '<li><a href="/add-equipment" class="nav-link">Add Equipment</a></li>' : ''}
      <li><a href="/bookings" class="nav-link">My Bookings</a></li>
      <li><a href="/dashboard" class="nav-link">Dashboard</a></li>
      <li><span class="nav-link">👤 ${user.name}</span></li>
      <li><button onclick="auth.logout()" class="btn btn-outline">Logout</button></li>
    `;
  } else {
    navMenu.innerHTML = `
      <li><a href="/equipment" class="nav-link">Browse Equipment</a></li>
      <li><a href="/login" class="btn btn-primary">Login</a></li>
      <li><a href="/register" class="btn btn-secondary">Register</a></li>
    `;
  }
}

// Check auth on protected pages
function checkAuth() {
  const protectedPages = ['/dashboard', '/add-equipment', '/bookings'];
  const currentPath = window.location.pathname;
  
  if (protectedPages.includes(currentPath) && !auth.isLoggedIn()) {
    window.location.href = '/login';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  checkAuth();
});

// Validate form inputs
function validateForm(formData, rules) {
  const errors = {};
  
  for (const field in rules) {
    const value = formData[field];
    const rule = rules[field];
    
    if (rule.required && (!value || value.trim() === '')) {
      errors[field] = `${field} is required`;
    }
    
    if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = `${field} must be at least ${rule.minLength} characters`;
    }
    
    if (rule.email && value && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      errors[field] = `Invalid email format`;
    }
    
    if (rule.phone && value && !/^[0-9]{10}$/.test(value)) {
      errors[field] = `Phone must be 10 digits`;
    }
    
    if (rule.min && value && Number(value) < rule.min) {
      errors[field] = `${field} must be at least ${rule.min}`;
    }
  }
  
  return Object.keys(errors).length > 0 ? errors : null;
}

// Calculate booking duration and cost
function calculateBookingCost(startDate, endDate, dailyRate, operatorCharge = 0, deposit = 0) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  
  const baseRate = dailyRate * duration;
  const totalOperatorCharge = operatorCharge * duration;
  const totalAmount = baseRate + totalOperatorCharge + deposit;
  
  return {
    duration,
    baseRate,
    operatorCharge: totalOperatorCharge,
    deposit,
    totalAmount
  };
}
