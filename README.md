# 🛡️ VisionShield

**A secure communication mobile app:** video-based registration, real-time chat, video calls over WebRTC, friends and document sharing, with AI that detects forbidden objects in video.

![React Native](https://img.shields.io/badge/React%20Native-20232A?style=flat&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)
![Go](https://img.shields.io/badge/Go-00ADD8?style=flat&logo=go&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![WebRTC](https://img.shields.io/badge/WebRTC-333333?style=flat&logo=webrtc&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)

---

## Features

- 🔐 **Accounts and authentication:** sign-up (including sign-up with a video), login, and JWT access tokens refreshed with a refresh token
- 💬 **Real-time chat:** conversations over WebSocket, with documents attached to messages
- 📹 **Video streaming:** live video over WebRTC
- 👥 **Social:** user profiles, friend requests, friend list and real-time contact search
- 📁 **Documents:** upload, list, share and delete files (stored on Cloudinary)
- 🤖 **AI detection:** a YOLO-based model that spots forbidden objects in video

## Architecture

The project is split into three repositories:

| Repository | Role | Stack |
|---|---|---|
| [`VisionShield`](https://github.com/VisionShield/VisionShield) (this one) | Mobile app | React Native, Expo, Expo Router |
| [`backend`](https://github.com/VisionShield/backend) | REST API, WebSocket chat, WebRTC signaling | Go, MongoDB, Cloudinary |
| [`IA_objets`](https://github.com/VisionShield/IA_objets) | Forbidden-object detection | Python, YOLO |

```
Mobile app (Expo)  ──REST / WebSocket──▶  Go backend  ──▶  MongoDB + Cloudinary
                                              │
                                              └──▶  AI detection (Python / YOLO)
```

## App structure

```
app/
├── (auth)/          # Login and sign-up screens
├── (chat)/          # Conversations and messages
├── (dashboard)/     # Main screens after login
├── (user_profile)/  # User profile
├── components/      # Reusable UI components
├── constants/       # Colors, configuration
├── screens/         # Other screens
└── utils/           # Helpers (API calls, etc.)
```

Navigation uses Expo Router's file-based routing: each file in `app/` is a screen.

## Getting started

**Requirements:** Node.js and npm, plus the Expo Go app on your phone (or an Android/iOS emulator).

```bash
git clone https://github.com/VisionShield/VisionShield.git
cd VisionShield
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `a` for an Android emulator and `i` for an iOS simulator.

The app needs the [backend](https://github.com/VisionShield/backend) running. See that repository for its setup and the full list of API routes.

## Team

Amira Bammoun · Zakaria Guitaoui · Daniel Murugarajah · Maxime Natarianni · Lina Ouchaou · Justine Pogeant
