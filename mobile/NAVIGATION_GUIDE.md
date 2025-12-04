# Navigation Best Practices - QuizzyBee

## Current Navigation Pattern (Correct ✅)

Your app currently follows the standard mobile navigation pattern:

### **Hierarchical Navigation (Uses `router.push()`):**
- Settings → Edit Profile
- Settings → App Settings  
- Home → Dashboard (Notes, Flashcards, etc.)
- Quiz List → Start Quiz
- Flashcards → Study Mode

**This is CORRECT** - Users should be able to swipe back through these screens.

### **Lateral Navigation (Uses `router.replace()`):**
- Login ↔ Signup
- Splash → Login/Signup

**This is CORRECT** - Users should NOT be able to swipe back through auth screens.

## iOS Back Gesture Behavior

The iOS back gesture (swipe from left edge) uses the navigation history stack. This is **standard iOS behavior** and is actually what users expect:

### **Expected Behavior:**
1. User on Settings → Swipes to Edit Profile
2. User can swipe back from Edit Profile → Returns to Settings ✅

3. User on Home → Taps Calendar
4. User can swipe back from Calendar → Returns to Home ✅

### **This is the correct UX pattern!**

## If You Want to Disable Back Gesture on Specific Screens

If you specifically want to prevent back gestures on certain screens (not recommended), you can add this to the screen options:

```jsx
// In the screen's _layout or Stack.Screen options
gestureEnabled: false
```

## Recommendation

**Keep the current navigation as-is.** The iOS back gesture working on user screens is the expected and correct behavior. Users are familiar with this pattern from all iOS apps (Settings, Mail, Photos, etc.).

Only auth screens (Login/Signup) should prevent back navigation, which you've already implemented correctly with `router.replace()`.

## Summary

✅ **Auth Screens:** Back gesture disabled (using `router.replace()`)  
✅ **User Screens:** Back gesture enabled (using `router.push()`)  
✅ **This matches iOS Human Interface Guidelines**  

Your navigation is implemented correctly!
