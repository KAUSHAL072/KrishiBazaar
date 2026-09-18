# 🚀 Krishi Bazaar (कृषि बाज़ार) — Multi-Cloud Deployment Guide

This project is a **pure client-side Single-Page Application (SPA)** with zero backend database dependencies. It is 100% pre-configured for **Google Cloud (Firebase Hosting & Cloud Run)**, **Vercel**, and **GitHub Pages**.

---

## 🌟 Quick Hosting Comparison

| Provider | Google Cloud Native? | Deployment Method | Free Tier? | Recommended For |
| :--- | :---: | :--- | :---: | :--- |
| **Firebase Hosting** | **Yes (Google Cloud)** | Firebase CLI / Web Console / GitHub Actions | ✅ 10 GB Storage, 360 MB/day egress | **Best Google Cloud choice** for static web apps & SPAs. |
| **Google Cloud Run** | **Yes (Google Cloud)** | `gcloud run deploy --source .` | ✅ 2 Million requests/month | **Enterprise GCP** containers with custom VPC/load balancers. |
| **Google Cloud Storage** | **Yes (Google Cloud)** | `gcloud storage cp` | ✅ Pay-per-byte (cents) | Direct object storage hosting. |
| **Vercel** | No (Third-party) | 1-Click via [vercel.com/new](https://vercel.com/new) | ✅ 100 GB Bandwidth | **Instant 1-Click** live HTTPS preview. |
| **GitHub Pages** | No (Third-party) | Git Push to `main` branch | ✅ Unlimited for public repos | Quick portfolio & open-source demos. |

---

## 🥇 Option 1: Google Cloud Firebase Hosting (Recommended)

Firebase Hosting is Google Cloud's official globally distributed SSD CDN with automatic SSL certificates and instant SPA rewrite support.

### Method A: Via Command Line (3 Steps)
If you have Node.js / npm installed:
```powershell
# 1. Install Firebase CLI globally
npm install -g firebase-tools

# 2. Login to your Google Account
firebase login

# 3. Deploy instantly (using the pre-configured firebase.json)
firebase deploy
```

### Method B: Zero-Install via Web Console & GitHub Actions
1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** and name it (e.g., `krishi-bazaar`).
3. Under the left navigation, click **Build** ➔ **Hosting** ➔ **Get Started**.
4. Choose **Set up automatic builds with GitHub** and connect your repository.
5. Every push to `main` will automatically deploy live to `https://krishi-bazaar.web.app`!

---

## 🥈 Option 2: Google Cloud Run (Containerized Microservice)

The repository includes a production-grade [`Dockerfile`](./Dockerfile) and [`nginx.conf`](./nginx.conf) (Alpine Nginx, 15 MB image, port 8080).

### Method A: Via Google Cloud Shell (Zero Local Tools Needed)
1. Open [Google Cloud Shell](https://shell.cloud.google.com/) in your browser.
2. Clone or upload your project folder.
3. Run the single command:
```bash
gcloud run deploy krishi-bazaar \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated
```
4. Cloud Run will automatically build the container image via Google Cloud Build and give you a live HTTPS URL:
```
Service [krishi-bazaar] revision [krishi-bazaar-00001] has been deployed and is serving 100 percent of traffic.
Service URL: https://krishi-bazaar-xxxxxxxx-el.a.run.app
```

### Method B: Via Local `gcloud` CLI
```powershell
gcloud auth login
gcloud config set project YOUR_GCP_PROJECT_ID
gcloud run deploy krishi-bazaar --source . --region asia-south1 --allow-unauthenticated
```

---

## 🥉 Option 3: Google Cloud Storage (GCS) Static Web Bucket

If you want a simple Google Cloud Storage bucket hosting:
```powershell
# 1. Create a bucket in Mumbai (asia-south1)
gcloud storage buckets create gs://krishi-bazaar-app --location=asia-south1

# 2. Upload files
gcloud storage cp index.html app.js gs://krishi-bazaar-app/

# 3. Set public read permissions
gcloud storage buckets add-iam-policy-binding gs://krishi-bazaar-app \
  --member=allUsers \
  --role=roles/storage.objectViewer

# 4. Set main page suffix for web hosting
gcloud storage buckets update gs://krishi-bazaar-app \
  --web-main-page-suffix=index.html
```

---

## ⚡ Option 4: Instant 1-Click Deployment on Vercel

The project contains a pre-configured [`vercel.json`](./vercel.json):

1. Go to [vercel.com/new](https://vercel.com/new).
2. Connect your GitHub account and select this repository (or drag & drop the folder).
3. Leave all build settings as default (Framework Preset: **Other**).
4. Click **Deploy**.
5. Your app is live with a free `*.vercel.app` domain and automatic SSL in less than 30 seconds!

---

## 🌐 Option 5: Free GitHub Pages Deployment

1. Push this repository to GitHub.
2. In your GitHub repository, go to **Settings** ➔ **Pages**.
3. Under **Build and deployment** ➔ **Source**, select **Deploy from a branch**.
4. Set Branch to `main` and Folder to `/ (root)`.
5. Click **Save**. Within 1 minute, your site will be live at:
   `https://<your-github-username>.github.io/<repo-name>/`

---

## 🔒 Mandatory Production Requirements (Pre-Verified)

- [x] **HTTPS Enabled**: Mandatory for Web Speech API (`speechSynthesis`, `webkitSpeechRecognition`) and GPS navigation.
- [x] **SPA Routing**: Sub-routes rewrite to `index.html`.
- [x] **MIME Types**: Correct headers for JavaScript, HTML, and images.
- [x] **Zero Database Backend**: All state, AIS-140 GPS routing, and mock APMC records execute autonomously in client browser memory.
