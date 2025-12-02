// Test script to check backend connectivity
// Run this with: node test-backend.js

const testBackend = async () => {
    try {
        console.log("Testing backend connection...\n");

        // Test 1: Check if server is running
        console.log("1. Testing server connection...");
        const healthCheck = await fetch("http://localhost:3001/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        });
        console.log("✓ Server is responding\n");

        // Test 2: Try to register a test user
        console.log("2. Testing user registration...");
        const testUser = {
            username: "testuser" + Date.now(),
            email: "test" + Date.now() + "@example.com",
            password: "password123"
        };

        const registerResponse = await fetch("http://localhost:3001/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(testUser)
        });

        const registerData = await registerResponse.json();

        if (registerResponse.ok) {
            console.log("✓ Registration successful!");
            console.log("User:", registerData.user);
            console.log("Token:", registerData.token.substring(0, 20) + "...\n");

            // Test 3: Try to login
            console.log("3. Testing login...");
            const loginResponse = await fetch("http://localhost:3001/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: testUser.email,
                    password: testUser.password
                })
            });

            const loginData = await loginResponse.json();

            if (loginResponse.ok) {
                console.log("✓ Login successful!");
                console.log("User:", loginData.user);
                console.log("\n✅ All tests passed! Backend is working correctly.");
            } else {
                console.log("✗ Login failed:", loginData.message);
            }
        } else {
            console.log("✗ Registration failed:", registerData.message);
            console.log("Error details:", registerData);
        }

    } catch (error) {
        console.log("\n❌ Error:", error.message);
        console.log("\nPossible issues:");
        console.log("- Backend server is not running (run 'npm run dev' in backend folder)");
        console.log("- MongoDB connection failed");
        console.log("- Port 3001 is blocked or in use");
    }
};

testBackend();
