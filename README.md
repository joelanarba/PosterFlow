# PosterFlow 🎨

AI-powered poster and flyer design tool built for churches, events, and businesses in Ghana.

## Features

- 🤖 **AI Background Generation** - Generate unique backgrounds using Stable Diffusion
- 📱 **Social Media Presets** - Instagram, Facebook, Twitter, LinkedIn, and YouTube sizes
- 🎨 **Design Editor** - Add text, shapes, and customize your posters
- ☁️ **Cloud Storage** - Save and manage your designs in the cloud
- 💳 **Credit System** - Purchase design credits via Paystack
- 📊 **Analytics** - Google Analytics 4 integration for usage tracking
- 🔒 **GDPR Compliant** - Cookie consent and privacy controls

## Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS
- **Backend**: Firebase (Auth, Firestore, Storage, Functions, Hosting)
- **AI**: HuggingFace Stable Diffusion XL
- **Payments**: Paystack
- **Monitoring**: Sentry (error tracking), Google Analytics 4
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- Firebase project
- HuggingFace API key
- Paystack account (for payments)
- Sentry account (optional, for error tracking)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/posterflow.git
   cd posterflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd functions && npm install && cd ..
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your Firebase configuration:
   - Get Firebase config from Firebase Console → Project Settings
   - Get Sentry DSN from sentry.io (optional)

4. **Configure Cloud Functions**
   
   Set environment variables for Firebase Functions:
   ```bash
   firebase functions:secrets:set HUGGINGFACE_API_KEY
   firebase functions:secrets:set PAYSTACK_SECRET_KEY
   firebase functions:secrets:set SENTRY_DSN  # optional
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Run functions emulator (optional)**
   ```bash
   firebase emulators:start
   ```

## Deployment

### Manual Deployment

```bash
# Build the app
npm run build

# Deploy to Firebase  (hosting + functions)
firebase deploy
```

### Automated Deployment (CI/CD)

Pushes to the `main` branch automatically deploy via GitHub Actions.

**Required GitHub Secrets:**
- `FIREBASE_SERVICE_ACCOUNT` - Firebase service account JSON
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`
- `VITE_SENTRY_DSN` (optional)

## Production Checklist

✅ **Security**
- [x] Environment variables for all secrets
- [x] Firebase Security Rules enabled
- [x] Rate limiting on Cloud Functions (10 req/hour for AI)
- [x] HTTPS-only via Firebase Hosting
- [x] Security headers (CSP, X-Frame-Options, etc.)

✅ **Legal & Compliance**
- [x] Privacy Policy page
- [x] Terms of Service page
- [x] GDPR cookie consent banner

✅ **SEO & Analytics**
- [x] Meta tags (title, description, OG tags)
- [x] robots.txt and sitemap.xml
- [x] Google Analytics 4 integration
- [x] Event tracking for key user actions

✅ **Monitoring**
- [x] Sentry error logging (frontend + backend)
- [x] Performance monitoring

✅ **CI/CD**
- [x] GitHub Actions for automated deployment
- [x] Linting on pull requests

## Project Structure

```
posterflow/
├── .github/workflows/     # CI/CD pipelines
├── functions/             # Firebase Cloud Functions
│   └── index.js          # AI generation, payments, rate limiting
├── public/               # Static assets
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/       # React components
│   │   ├── CookieConsent.jsx
│   │   └── ...
│   ├── pages/           # Route pages
│   │   ├── PrivacyPolicy.jsx
│   │   ├── TermsOfService.jsx
│   │   └── ...
│   ├── utils/           # Utility functions
│   │   ├── analyticsUtils.js  # GA4 tracking
│   │   └── sentry.js          # Error tracking
│   ├── firebase.js      # Firebase initialization
│   └── App.jsx         # Main app component
├── .env.example        # Environment variable template
├── firebase.json       # Firebase configuration
└── package.json

```

## Environment Variables

### Frontend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | Yes |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | Yes |
| `VITE_FIREBASE_MEASUREMENT_ID` | Google Analytics measurement ID | Yes |
| `VITE_SENTRY_DSN` | Sentry DSN for error tracking | No |

### Cloud Functions (Firebase Console)

| Variable | Description | Required |
|----------|-------------|----------|
| `HUGGINGFACE_API_KEY` | HuggingFace API key for AI generation | Yes |
| `PAYSTACK_SECRET_KEY` | Paystack secret key for payments | Yes |
| `SENTRY_DSN` | Sentry DSN for function error tracking | No |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For issues or questions, contact: support@posterflow.com

---

Built with ❤️ for Ghana
