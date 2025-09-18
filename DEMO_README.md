# 🚀 CodFleet Google OAuth Demo

## Demo Page Access

**URL:** `http://localhost:3000/demo.html`

## What the Demo Includes

### ✅ **Beautiful UI**
- Modern, responsive design
- Google-branded login button
- Real-time status messages
- User information display
- Loading animations

### ✅ **Full OAuth Flow**
- **Google Sign-In Integration** - Uses Google's official JavaScript library
- **Automatic Login/Registration** - Tries login first, then registration if needed
- **Token Management** - Handles access and refresh tokens
- **User Information Display** - Shows user details after successful authentication
- **Logout Functionality** - Properly logs out and clears tokens

### ✅ **API Integration**
- **POST** `/api/v1/auth/google/login` - Login with Google ID token
- **POST** `/api/v1/auth/google/register` - Register with Google ID token
- **POST** `/api/v1/auth/logout` - Logout and revoke tokens

## How to Test

### 1. **Start the Server**
```bash
cd codfleet-api
npm run dev
```

### 2. **Open Demo Page**
Open your browser and go to: `http://localhost:3000/demo.html`

### 3. **Test Google Login**
1. Click the "Continue with Google" button
2. Sign in with your Google account
3. The page will automatically:
   - Try to login first
   - If account doesn't exist, register automatically
   - Display your user information
   - Show success/error messages

### 4. **Test Logout**
1. Click the "Logout" button
2. All tokens will be revoked
3. UI will reset to login state

## Demo Features

### 🎨 **Visual Elements**
- **Gradient Background** - Beautiful blue-purple gradient
- **Card Design** - Clean white card with shadows
- **Google Button** - Official Google Sign-In button styling
- **Status Messages** - Color-coded success/error/info messages
- **Loading Spinner** - Animated loading indicator
- **User Info Card** - Displays user details after login

### 🔧 **Technical Features**
- **Auto-Detection** - Automatically detects if user exists
- **Error Handling** - Comprehensive error messages
- **Token Storage** - Secure token management
- **Browser Detection** - Detects user's browser
- **Responsive Design** - Works on all screen sizes

### 📱 **User Experience**
- **One-Click Login** - Single button for authentication
- **Instant Feedback** - Real-time status updates
- **Smooth Animations** - Hover effects and transitions
- **Clear Information** - Shows all relevant user data

## API Endpoints Tested

### ✅ **Google OAuth URL**
```bash
curl http://localhost:3000/api/v1/auth/google/url
```
**Response:** Returns Google OAuth authorization URL

### ✅ **Google Login**
```bash
curl -X POST http://localhost:3000/api/v1/auth/google/login \
  -H "Content-Type: application/json" \
  -d '{"idToken": "google-id-token"}'
```
**Response:** JWT access/refresh tokens + user info

### ✅ **Google Registration**
```bash
curl -X POST http://localhost:3000/api/v1/auth/google/register \
  -H "Content-Type: application/json" \
  -d '{"idToken": "google-id-token"}'
```
**Response:** JWT access/refresh tokens + user info

### ✅ **Logout**
```bash
curl -X POST http://localhost:3000/api/v1/auth/logout \
  -H "Authorization: Bearer access-token" \
  -H "Content-Type: application/json" \
  -d '{"logoutAll": true}'
```
**Response:** Success message

## Configuration

The demo uses your Google OAuth credentials:
- **Client ID:** `41030008524-8ncad5tr1nht732u4mbkuqkljsvvlire.apps.googleusercontent.com`
- **Redirect URI:** `http://localhost:3000/api/v1/auth/google/callback`

## Troubleshooting

### **Common Issues:**

1. **"Google OAuth not configured"**
   - Check that environment variables are set in `.env`
   - Restart the server after adding variables

2. **"Invalid Google token"**
   - Make sure you're using a valid Google ID token
   - Check that the token hasn't expired

3. **"Email not verified"**
   - Verify your email with Google first
   - Check your Google account settings

4. **CORS Issues**
   - Make sure you're accessing from `localhost:3000`
   - Check browser console for errors

### **Debug Steps:**

1. **Check Server Status:**
   ```bash
   curl http://localhost:3000/api/health
   ```

2. **Check Google OAuth URL:**
   ```bash
   curl http://localhost:3000/api/v1/auth/google/url
   ```

3. **Check Browser Console:**
   - Open Developer Tools (F12)
   - Look for JavaScript errors
   - Check Network tab for API calls

## Production Notes

### **Security:**
- The demo page is for testing only
- Don't use in production without proper security measures
- Implement proper CORS settings
- Use HTTPS in production

### **Customization:**
- Modify the styling in `public/demo.html`
- Change the Google Client ID for your domain
- Add your own branding and colors

## Next Steps

After testing the demo:

1. **Integrate with your frontend** - Use the API endpoints in your React/Vue/Angular app
2. **Add more OAuth providers** - Microsoft, Apple, etc.
3. **Implement user management** - Profile pages, settings, etc.
4. **Add security features** - Rate limiting, device tracking, etc.

## Support

If you encounter any issues:
1. Check the server logs
2. Verify environment variables
3. Test API endpoints individually
4. Check browser console for errors

The demo is now ready for testing! 🎉

**Access it at:** `http://localhost:3000/demo.html`
