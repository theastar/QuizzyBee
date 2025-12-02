# Signup Failure Troubleshooting Guide

## ✅ Good News!
The backend is working correctly! I tested it and both registration and login are functioning properly.

## 🔍 The Problem
The issue is likely with the **mobile app's connection to the backend**, not MongoDB or the backend itself.

## 🛠️ Solutions to Try

### Solution 1: Check Your Device Type and Update API URL

**Open `mobile/config/api.config.js` and update the `BASE_URL`:**

#### If using **Android Emulator**:
```javascript
BASE_URL: 'http://10.0.2.2:3001/api',
```

#### If using **iOS Simulator**:
```javascript
BASE_URL: 'http://localhost:3001/api',
```

#### If using **Physical Device** (Phone/Tablet):
1. Find your computer's IP address:
   - **Windows**: Open CMD and run `ipconfig`, look for "IPv4 Address" (e.g., 192.168.1.100)
   - **Mac**: Open Terminal and run `ifconfig | grep "inet "` 
   - **Linux**: Run `ip addr show`

2. Update the URL:
```javascript
BASE_URL: 'http://YOUR_IP_ADDRESS:3001/api',  // e.g., 'http://192.168.1.100:3001/api'
```

3. **Important**: Make sure your phone and computer are on the **same WiFi network**!

### Solution 2: Check Expo Dev Tools

1. Look at the Expo console in your terminal where you ran `npx expo start`
2. Check for any network errors or red error messages
3. Try pressing `r` in the Expo terminal to reload the app

### Solution 3: Enable Network Debugging

**Update `mobile/context/AuthStore.jsx` to see the actual error:**

The store already shows errors in alerts, but check the mobile app console for more details.

### Solution 4: Test with Expo Go on Physical Device

If using Expo Go:
1. Make sure your phone and computer are on the same WiFi
2. Update `mobile/config/api.config.js` with your computer's IP address
3. Restart the Expo server

### Solution 5: Clear Cache and Restart

```bash
# In mobile folder
npx expo start -c
```

## 📱 How to Test

1. **Update the API URL** in `mobile/config/api.config.js` based on your device type
2. **Restart Expo** (press Ctrl+C, then run `npx expo start` again)
3. **Try signing up** with:
   - Username: `testuser` (at least 6 characters)
   - Email: `test@example.com`
   - Password: `password123` (at least 6 characters)

## 🔍 Check for Specific Errors

### "Network Error"
- Backend is not running or wrong URL
- Check that backend server is running (`npm run dev` in backend folder)
- Verify the API URL matches your device type

### "Timeout"
- Network is too slow or blocked
- Try increasing timeout in `mobile/services/api.js` (currently 10000ms)

### "All fields are required"
- Form validation issue
- Make sure all fields are filled

### "Username/Email already taken"
- Try a different username/email
- This means the backend IS working!

## 🎯 Quick Test

Run this in your backend terminal to verify it's working:
```bash
node test-backend.js
```

You should see "✅ All tests passed!"

## 📋 Checklist

- [ ] Backend server is running (`npm run dev`)
- [ ] MongoDB is connected (check backend terminal for "Database connected")
- [ ] API URL in `mobile/config/api.config.js` matches your device type
- [ ] Phone and computer on same WiFi (if using physical device)
- [ ] Expo app is reloaded after changing config
- [ ] All form fields are filled with valid data

## 💡 Most Common Issue

**90% of the time, it's the wrong API URL!**

- Android Emulator: `http://10.0.2.2:3001/api`
- iOS Simulator: `http://localhost:3001/api`  
- Physical Device: `http://YOUR_COMPUTER_IP:3001/api`

Make sure you're using the right one for your device!
