# Expo Skill

## Purpose
Build and deploy cross-platform apps (iOS, Android, Web) with React Native and Expo. File-based routing, managed workflow, and EAS Build.

## When to Use
- Building mobile apps that also work on web
- Need to distribute apps to App Store / Google Play
- Cross-platform development (iOS + Android + Web)
- Using React Native with managed workflow
- Quick prototyping with hot reload

## Setup

```bash
# Create new project
npx create-expo-app@latest my-app
cd my-app

# Start development
npx expo start

# Start for specific platform
npx expo start --android
npx expo start --ios
npx expo start --web
```

## Core Concepts

### 1. File-based Routing (Expo Router)
```
app/
  _layout.tsx           # Root layout (Stack, Tabs, etc.)
  index.tsx             # / (home)
  dashboard.tsx         # /dashboard
  settings/
    index.tsx           # /settings
    profile.tsx         # /settings/profile
    [id].tsx            # /settings/:id (dynamic route)
```

### 2. Navigation Patterns

#### Stack Navigation
```tsx
// app/_layout.tsx
import { Stack } from "expo-router"

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
    </Stack>
  )
}
```

#### Tab Navigation
```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router"
import { HomeIcon, SettingsIcon } from "lucide-react-native"

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Home", 
          tabBarIcon: ({ color, size }) => <HomeIcon size={size} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="settings" 
        options={{ 
          title: "Settings", 
          tabBarIcon: ({ color, size }) => <SettingsIcon size={size} color={color} />
        }} 
      />
    </Tabs>
  )
}
```

#### Programmatic Navigation
```tsx
import { useRouter } from "expo-router"

const router = useRouter()

// Push new screen
router.push("/dashboard")

// Replace current screen (no back button)
router.replace("/login")

// Go back
router.back()

// Deep link
router.push("/settings/profile")
```

### 3. Platform-specific Code
```tsx
import { Platform, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: { shadowOffset: { width: 0, height: 2 }, shadowColor: "#000" },
      android: { elevation: 4 },
      web: { boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }
    })
  }
})
```

### 4. Safe Area
```tsx
import { SafeAreaView } from "react-native-safe-area-context"

export default function Screen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YourContent />
    </SafeAreaView>
  )
}
```

### 5. Dynamic Routes
```tsx
// app/user/[id].tsx
import { useLocalSearchParams } from "expo-router"

export default function UserProfile() {
  const { id } = useLocalSearchParams<{ id: string }>()
  
  return <Text>User ID: {id}</Text>
}
```

### 6. Modal Routes
```tsx
// app/_layout.tsx
<Stack>
  <Stack.Screen name="index" options={{ headerShown: false }} />
  <Stack.Screen 
    name="modal" 
    options={{ 
      presentation: "modal",
      headerShown: false 
    }} 
  />
</Stack>
```

## Key Packages

### Core
| Package | Purpose |
|---------|---------|
| `expo` | Core framework |
| `expo-router` | File-based routing |
| `react-native` | UI primitives |
| `react-native-web` | Web support |

### UI Libraries
| Package | Purpose |
|---------|---------|
| `react-native-paper` | Material Design components |
| `@rneui/themed` | Cross-platform UI kit |
| `tamagui` | Universal UI framework |
| `nativewind` | Tailwind CSS for RN |

### Navigation
| Package | Purpose |
|---------|---------|
| `@react-navigation/native` | Navigation core |
| `@react-navigation/bottom-tabs` | Tab navigator |
| `@react-navigation/stack` | Stack navigator |
| `expo-router` | File-based (recommended) |

### Storage
| Package | Purpose |
|---------|---------|
| `@react-native-async-storage/async-storage` | Local storage |
| `expo-secure-store` | Secure storage (keys, tokens) |
| `expo-file-system` | File system access |

### Camera/Media
| Package | Purpose |
|---------|---------|
| `expo-camera` | Camera access |
| `expo-image-picker` | Image selection |
| `expo-media-library` | Media library |
| `expo-av` | Audio/video playback |

### Location & Sensors
| Package | Purpose |
|---------|---------|
| `expo-location` | GPS, geocoding |
| `expo-sensors` | Accelerometer, gyroscope |
| `expo-device` | Device info |

## Build & Deploy

### Development
```bash
npx expo start
npx expo start --clear  # Clear cache
npx expo start --tunnel # For physical devices
```

### EAS Build (Recommended)
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios

# Build for both
eas build --platform all
```

### Submit to Stores
```bash
# Submit to Google Play
eas submit --platform android

# Submit to App Store
eas submit --platform ios

# Internal testing (Preview)
eas build --profile preview --platform android
```

### OTA Updates
```bash
# Push OTA update (no app store needed)
eas update --branch production --message "Bug fix"
```

## Expo Config (app.json / app.config.js)
```json
{
  "expo": {
    "name": "My App",
    "slug": "my-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#0a0a0f"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.myapp"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#0a0a0f"
      },
      "package": "com.myapp"
    },
    "web": {
      "bundler": "metro",
      "favicon": "./assets/favicon.png"
    },
    "plugins": ["expo-router"]
  }
}
```

## EAS Profiles
```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json"
      }
    }
  }
}
```

## Best Practices
1. **Use expo-router** for type-safe navigation
2. **Test on all platforms** during development
3. **Use `Platform.OS`** for platform-specific code
4. **Implement error boundaries** for crash handling
5. **Use EAS Build** for consistent, reproducible builds
6. **Use OTA updates** for quick bug fixes
7. **Follow React Native performance guidelines** - avoid unnecessary re-renders
8. **Use Hermes** engine (default in Expo) for better performance
9. **Test on physical devices** - simulator doesn't catch all issues
