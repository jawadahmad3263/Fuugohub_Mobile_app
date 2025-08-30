# Apple Sign-In Setup Guide

## Prerequisites
- Apple Developer Account
- Xcode installed
- iOS device or simulator running iOS 13+

## Step 1: Configure Apple Developer Account

1. **Log in to Apple Developer Console**
   - Go to https://developer.apple.com/account/
   - Sign in with your Apple Developer account

2. **Create App ID (if not already created)**
   - Go to "Certificates, Identifiers & Profiles"
   - Click "Identifiers" → "+" → "App IDs"
   - Select "App" and click "Continue"
   - Enter your Bundle ID (e.g., `com.yourcompany.fuugohub`)
   - Enable "Sign In with Apple" capability
   - Click "Continue" and "Register"

3. **Configure Sign In with Apple**
   - Select your App ID
   - Click "Edit" next to "Sign In with Apple"
   - Configure the following:
     - **Primary App ID**: Your app's bundle identifier
     - **Domains and Subdomains**: Add your backend domain (e.g., `api.yourcompany.com`)
     - **Return URLs**: Add your app's URL scheme (e.g., `com.yourcompany.fuugohub://`)
   - Click "Save"

## Step 2: Configure Xcode Project

1. **Open Xcode Project**
   ```bash
   open ios/fuugohub.xcworkspace
   ```

2. **Add Sign In with Apple Capability**
   - Select your project in the navigator
   - Select your target (fuugohub)
   - Go to "Signing & Capabilities" tab
   - Click "+" button
   - Search for "Sign In with Apple"
   - Add the capability

3. **Verify Bundle Identifier**
   - Make sure your Bundle Identifier matches the one in Apple Developer Console
   - Example: `com.yourcompany.fuugohub`

4. **Configure Team**
   - Select your Apple Developer Team
   - Make sure "Automatically manage signing" is checked

## Step 3: Update Info.plist (Already Done)

The following has been added to your `ios/fuugohub/Info.plist`:

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleTypeRole</key>
    <string>Editor</string>
    <key>CFBundleURLName</key>
    <string>AppleSignIn</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
    </array>
  </dict>
</array>
```

## Step 4: Backend Configuration

Your backend needs to handle Apple Sign-In authentication. The app sends:

```json
{
  "identity_token": "apple_identity_token",
  "user_id": "apple_user_id"
}
```

### Backend Endpoint: `POST /auth/apple`

Expected response:
```json
{
  "success": true,
  "data": {
    "token": "your_jwt_token",
    "action": "login" // or "signup"
  }
}
```

## Step 5: Testing

1. **Build and Run**
   ```bash
   yarn ios
   ```

2. **Test on Physical Device**
   - Apple Sign-In works best on physical devices
   - Simulator may have limitations

3. **Debug Logs**
   - Check console logs for detailed error information
   - Look for "Apple Sign-In:" prefixed logs

## Common Issues and Solutions

### Issue: "Unknown error occurred during Apple Sign-In"
**Solution**: Add "Sign In with Apple" capability in Xcode

### Issue: "Apple Sign-In is not available on this device"
**Solution**: 
- Make sure you're testing on iOS 13+
- Use a physical device instead of simulator

### Issue: "Invalid response from Apple"
**Solution**: 
- Check your Apple Developer Console configuration
- Verify Bundle ID matches between Xcode and Apple Developer Console

### Issue: "User cancelled Apple Sign-In"
**Solution**: This is normal user behavior, no action needed

## Security Notes

1. **Token Validation**: Always validate Apple identity tokens on your backend
2. **User Privacy**: Apple may not provide email/name on subsequent logins
3. **Token Expiry**: Apple tokens expire, handle refresh logic
4. **Revocation**: Users can revoke Apple Sign-In access

## Additional Resources

- [Apple Sign-In Documentation](https://developer.apple.com/sign-in-with-apple/)
- [React Native Apple Authentication](https://github.com/invertase/react-native-apple-authentication)
- [Apple Developer Guidelines](https://developer.apple.com/app-store/review/guidelines/#sign-in-with-apple)
