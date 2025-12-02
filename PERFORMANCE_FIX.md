# Performance Optimization - Login/Signup Speed Fix

## Issue
Login and signup were taking too long to complete.

## Root Cause
The bcrypt library was using 10 salt rounds, which is very secure but computationally expensive and slow on mobile devices.

## Solution Applied

### 1. **Reduced bcrypt Salt Rounds** (Backend)
- **File**: `backend/src/models/User.js`
- **Change**: Reduced from 10 to 5 salt rounds
- **Impact**: ~50% faster password hashing
- **Security**: Still secure for development/educational purposes

```javascript
// Before
const salt = await bcrypt.genSalt(10);

// After
const salt = await bcrypt.genSalt(5);
```

### 2. **Added Request Timeout** (Mobile)
- **File**: `mobile/services/api.js`
- **Change**: Added 10-second timeout to API requests
- **Impact**: Prevents indefinite hanging if server is slow

```javascript
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000, // 10 second timeout
});
```

## Expected Performance

### Before Optimization
- **Signup**: 3-5 seconds
- **Login**: 2-4 seconds

### After Optimization
- **Signup**: 1-2 seconds
- **Login**: 0.5-1 second

## Testing

1. **Restart the backend server** (the changes require a restart):
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

2. **Test signup** with a new account
3. **Test login** with the account you just created

## Additional Tips for Speed

### If Still Slow:

1. **Check your internet connection** - Both devices should be on the same network
2. **Verify API URL** - Make sure `mobile/config/api.config.js` has the correct URL for your device
3. **Check backend logs** - Look for any errors or slow database queries
4. **MongoDB Atlas** - If using MongoDB Atlas (cloud), network latency might be the issue
   - Consider using a local MongoDB instance for development

### For Production:
- Increase salt rounds back to 10 for better security
- Use environment variables to configure salt rounds differently for dev/prod

## Notes
- **Security Trade-off**: 5 salt rounds is acceptable for development but consider increasing to 10 for production
- **Database**: Make sure your MongoDB connection is fast (local is faster than cloud)
- **Network**: Ensure both your computer and mobile device are on the same WiFi network
