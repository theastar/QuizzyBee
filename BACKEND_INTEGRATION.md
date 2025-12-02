# Backend Integration Guide

## Setup Complete! ✅

Your QuizzyBee mobile app is now connected to the backend authentication system.

## What's Been Added

### 1. **API Service** (`mobile/services/api.js`)
- Handles all HTTP requests to the backend
- Automatically adds authentication tokens to requests
- Configured for different development environments

### 2. **Authentication Store** (`mobile/context/AuthStore.jsx`)
- Manages user authentication state using Zustand
- Handles login, register, and logout functionality
- Stores user data and JWT tokens

### 3. **Updated Pages**
- **Login Page** (`mobile/app/login.jsx`) - Now connects to backend `/api/auth/login`
- **Signup Page** (`mobile/app/signup.jsx`) - Now connects to backend `/api/auth/register`

### 4. **Configuration** (`mobile/config/api.config.js`)
- Easy switching between development environments

## How to Use

### Step 1: Start the Backend Server
```bash
cd backend
npm run dev
```
The server should start on `http://localhost:3001`

### Step 2: Configure API URL (Important!)

Open `mobile/config/api.config.js` and update the `BASE_URL` based on your device:

**For Android Emulator:**
```javascript
BASE_URL: 'http://10.0.2.2:3001/api'
```

**For iOS Simulator:**
```javascript
BASE_URL: 'http://localhost:3001/api'
```

**For Physical Device:**
1. Find your computer's IP address:
   - **Windows**: Open CMD and run `ipconfig`, look for IPv4 Address
   - **Mac/Linux**: Open Terminal and run `ifconfig` or `ip addr`
2. Update the URL:
```javascript
BASE_URL: 'http://YOUR_IP_ADDRESS:3001/api'
```

### Step 3: Start the Mobile App
```bash
cd mobile
npx expo start
```

## Testing the Integration

### Register a New User
1. Open the app and go to Sign Up
2. Enter:
   - Username (minimum 6 characters)
   - Email
   - Password (minimum 6 characters)
   - Confirm Password
3. Click "Sign Up"
4. If successful, you'll be redirected to the home screen

### Login
1. Go to Login page
2. Enter your email and password
3. Click "Login"
4. If successful, you'll be redirected to the home screen

## API Endpoints

- **Register**: `POST /api/auth/register`
  - Body: `{ username, email, password }`
  
- **Login**: `POST /api/auth/login`
  - Body: `{ email, password }`

## Troubleshooting

### "Network Error" or "Connection Refused"
- Make sure the backend server is running
- Check that the API URL in `api.config.js` is correct for your device
- For physical devices, ensure your phone and computer are on the same WiFi network

### "Invalid credentials" on Login
- Make sure you've registered the user first
- Check that email and password match what you registered with

### Backend not connecting to MongoDB
- Verify the `.env` file is in the `backend` folder (not in `backend/src`)
- Check that `MONGO_URI` in `.env` is correct

## Next Steps

You can now:
- Access user data with `useAuthStore()` in any component
- Check if user is logged in with `isAuthenticated`
- Get user info with `user` object
- Logout with `logout()` function

Example:
```javascript
import { useAuthStore } from '../context/AuthStore';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuthStore();
  
  if (isAuthenticated) {
    return <Text>Welcome, {user.username}!</Text>;
  }
  
  return <Text>Please log in</Text>;
}
```
