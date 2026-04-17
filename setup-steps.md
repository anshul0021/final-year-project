# Complete Step-by-Step Guide to Start the Astrale Project on Mobile via USB

The project has been set up with dependencies installed (using `--legacy-peer-deps` to resolve version conflicts). Below are the **complete, step-by-step instructions** to start this React Native (Expo) project and run it on a physical mobile device connected via USB. Since this is an Expo-managed app and you're in a Linux environment (dev container), I'll focus on Android (as the app is published for Android and iOS requires macOS/Xcode). Running on a device via USB requires building the native app, not just using Expo Go.

**Important Notes:**

- This assumes you have a physical Android device (iOS requires macOS and won't work here).
- USB debugging must be enabled on your device.
- If you're running this in a codespace (remote environment), USB connection won't work directly— you'll need to run these steps on your local machine after cloning the repo.
- Prerequisites: A computer with internet, USB cable, and an Android device.
- The app uses Expo SDK 45, which is older; newer devices/emulators may have compatibility issues.

## Step 1: Prerequisites Setup

1. **Install Node.js and npm** (if not already installed):

   - Download from [nodejs.org](https://nodejs.org/).
   - Verify: Open a terminal and run `node --version` (should show v16+; you have v24) and `npm --version` (you have v11).

2. **Install Expo CLI globally**:

   - Open a terminal and run: `npm install -g @expo/cli`
   - Verify: Run `expo --version` (should show a version like 6.x).

3. **Install Android Studio** (required for Android SDK):

   - Download from [developer.android.com/studio](https://developer.android.com/studio).
   - Install it on your local machine (not in codespace).
   - During installation, ensure "Android SDK" is selected.
   - Open Android Studio after installation to complete setup.

4. **Set up Android Environment Variables**:

   - Find your Android SDK path (usually `C:\Users\<username>\AppData\Local\Android\Sdk` on Windows, or `/Users/<username>/Library/Android/sdk` on macOS, or `/home/<username>/Android/Sdk` on Linux).
   - Set `ANDROID_HOME` to that path.
     - On Windows: Open System Properties > Environment Variables > Add `ANDROID_HOME` as a system variable.
     - On macOS/Linux: Add to `~/.bashrc` or `~/.zshrc`: `export ANDROID_HOME=/path/to/sdk`
   - Add to PATH: `export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin`
   - Restart your terminal or run `source ~/.bashrc` (Linux/macOS).
   - Verify: Run `adb version` (Android Debug Bridge should show a version).

5. **Prepare Your Android Device**:
   - Connect your Android device to your computer via USB.
   - Enable Developer Options: Go to Settings > About Phone > Tap "Build Number" 7 times until "You are now a developer" appears.
   - Enable USB Debugging: Go to Settings > Developer Options > Enable "USB Debugging".
   - Allow USB debugging when prompted on your device.
   - Verify connection: Run `adb devices` in terminal (should list your device).

## Step 2: Project Setup

1. **Navigate to the Project Directory**:

   - Open a terminal and go to the project folder: `cd /path/to/your/project` (e.g., where you cloned or extracted `astrale-master`).

2. **Install Project Dependencies**:

   - Run: `npm install --legacy-peer-deps`
   - This installs all packages from `package.json` (may take 1-5 minutes; ignore warnings about deprecated packages).

3. **Verify Project Structure**:
   - Ensure files like `App.tsx`, `package.json`, `app.json`, and `src/` exist.

## Step 3: Build and Run on Android Device via USB

1. **Start the Build Process**:

   - Run: `npx expo run:android`
   - This command:
     - Builds the native Android app (APK).
     - Installs it on your connected USB device.
     - May take 5-15 minutes the first time (downloads Gradle, etc.).
   - If prompted, select your device from the list.

2. **Monitor the Process**:

   - Watch the terminal for output.
   - If it asks for permissions or to accept SDK licenses, follow the prompts (run `yes | $ANDROID_HOME/tools/bin/sdkmanager --licenses` if needed).
   - Common issues:
     - "Device not found": Reconnect USB, toggle USB debugging, or try a different USB port/cable.
     - "SDK not found": Double-check `ANDROID_HOME` and PATH.
     - Build errors: Ensure Android Studio is updated; try `npx expo install --fix` for dependency fixes.

3. **Launch the App on Device**:
   - Once built and installed, the app should auto-launch on your device.
   - If not, manually open "Astrale" from your device's app drawer.
   - The app will load with features like daily horoscopes, compatibility checks, etc.

## Step 4: Testing and Debugging

1. **Test the App**:

   - Interact with the UI (e.g., select zodiac signs, view horoscopes).
   - Check logs: Run `adb logcat` in a separate terminal for device logs.

2. **Make Changes**:

   - Edit files like `src/screens/main/daily.screen.js`.
   - Re-run `npx expo run:android` to rebuild and reinstall.

3. **Stop the App**:
   - Close the app on your device or run `adb shell am force-stop x.astrale` (package name from `app.json`).

## Troubleshooting

- **USB Issues**: Try `adb kill-server` then `adb start-server`.
- **Build Fails**: Update Android Studio/SDK; ensure device API level matches (min 21 from `app.json`).
- **Expo Errors**: Run `expo doctor` to check setup.
- **Old SDK**: This app uses Expo 45; for newer devices, you may need to upgrade Expo/React Native (not covered here).
- **iOS (if needed)**: Requires macOS. Install Xcode, run `npx expo run:ios` with device connected.

If you encounter specific errors, share the terminal output for help. For development without USB, you could use an emulator (install via Android Studio AVD Manager) or Expo Go app (run `npx expo start` and scan QR code), but that's not via USB.
