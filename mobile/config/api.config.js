// API Configuration
// Update this based on your development environment

// For Android Emulator, use: http://10.0.2.2:3001
// For iOS Simulator, use: http://localhost:3001
// For Physical Device, use: http://YOUR_COMPUTER_IP:3001
// For Production, use: https://your-production-url.com

export const API_CONFIG = {
    // Change this to match your environment
    BASE_URL: 'http://192.168.18.8:3001/api',

    // Alternative URLs for reference
    ANDROID_EMULATOR: 'http://10.0.2.2:3001/api',
    IOS_SIMULATOR: 'http://localhost:3001/api',
    // Replace YOUR_IP with your actual computer IP address
    PHYSICAL_DEVICE: 'http://192.168.18.8:3001/api',
};

// To find your computer's IP address:
// Windows: Open CMD and run 'ipconfig', look for IPv4 Address
// Mac/Linux: Open Terminal and run 'ifconfig' or 'ip addr'
