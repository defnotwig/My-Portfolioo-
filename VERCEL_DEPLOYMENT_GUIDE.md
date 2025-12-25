# 🚀 Complete Vercel Deployment Guide - Portfolio (Frontend + Backend)

This guide will walk you through deploying your **full-stack portfolio** on Vercel with separate frontend (client) and backend (server) projects.

---

## 📋 Overview

Your portfolio consists of:
- **Frontend (Client)**: Vite + React app
- **Backend (Server)**: Express.js + MongoDB API

We'll deploy these as **two separate Vercel projects** that communicate with each other.

---

## 🔧 Prerequisites

Before starting, make sure you have:
- [ ] A [Vercel account](https://vercel.com/signup) (free tier works)
- [ ] A [GitHub account](https://github.com) with your code pushed
- [ ] Your MongoDB Atlas connection string ready
- [ ] (Optional) OpenAI/Gemini API key for AI chat feature

---

## 📁 STEP 1: Prepare Your Repository

### 1.1 Push Code to GitHub

If not already done, push your portfolio to GitHub:

```powershell
# Navigate to your portfolio root
cd "C:\Users\Ludwig Rivera\Downloads\My Portfolio"

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Portfolio with client and server"

# Add your GitHub remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to main branch
git push -u origin main
```

---

## 🖥️ STEP 2: Deploy the Backend (Server) First

We deploy the backend first so we can get the API URL for the frontend.

### 2.1 Go to Vercel Dashboard

1. Open [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**

### 2.2 Import Your Repository

1. Connect your GitHub account if not connected
2. Find and select your portfolio repository
3. Click **"Import"**

### 2.3 Configure Backend Deployment

On the configuration screen, set the following:

| Setting | Value |
|---------|-------|
| **Project Name** | `portfolio-backend` (or any name you prefer) |
| **Framework Preset** | `Other` |
| **Root Directory** | Click **"Edit"** → Enter `server` → Click **"Continue"** |
| **Build Command** | Leave empty (we use serverless functions) |
| **Output Directory** | Leave empty |
| **Install Command** | `npm install` |

### 2.4 Add Environment Variables

Click **"Environment Variables"** and add these:

| Name | Value |
|------|-------|
| `PORT` | `5501` |
| `MONGO_URI` | `mongodb+srv://ludwigrivera13:humbleludwig13pogi@cluster0.typrbgy.mongodb.net/gabriel_portfolio?retryWrites=true&w=majority&appName=Cluster0` |
| `CLIENT_ORIGIN` | `https://your-frontend-name.vercel.app` (update after frontend deploy) |
| `NODE_ENV` | `production` |
| `OPENAI_API_KEY` | *(your key if using AI chat)* |
| `GEMINI_API_KEY` | *(your key if using Gemini)* |
| `GEMINI_MODEL` | `gemini-2.5-pro` *(if using Gemini)* |

### 2.5 Deploy Backend

1. Click **"Deploy"**
2. Wait for deployment to complete (2-3 minutes)
3. **Copy your backend URL** - it will look like: `https://portfolio-backend-xxxx.vercel.app`

### 2.6 Test Backend

Visit your backend health endpoint to verify:
```
https://YOUR-BACKEND-URL.vercel.app/api/health
```

You should see: `{"status":"ok"}`

---

## 🎨 STEP 3: Deploy the Frontend (Client)

### 3.1 Create New Project

1. Go back to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Select the **same repository** again

### 3.2 Configure Frontend Deployment

| Setting | Value |
|---------|-------|
| **Project Name** | `gabriel-ludwig-rivera` (or your preferred name) |
| **Framework Preset** | `Vite` (should auto-detect) |
| **Root Directory** | Click **"Edit"** → Enter `client` → Click **"Continue"** |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### 3.3 Add Environment Variables

Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://YOUR-BACKEND-URL.vercel.app` |

> ⚠️ **Important**: Replace `YOUR-BACKEND-URL` with the actual backend URL from Step 2.5

### 3.4 Deploy Frontend

1. Click **"Deploy"**
2. Wait for deployment to complete (2-3 minutes)
3. **Copy your frontend URL** - it will look like: `https://gabriel-ludwig-rivera.vercel.app`

---

## 🔄 STEP 4: Update Backend CORS Settings

Now that you have both URLs, update the backend to allow requests from the frontend.

### 4.1 Update Backend Environment Variables

1. Go to your **backend project** on Vercel dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Find `CLIENT_ORIGIN` and update it to your frontend URL:
   ```
   https://gabriel-ludwig-rivera.vercel.app
   ```
4. Click **"Save"**

### 4.2 Redeploy Backend

1. Go to **"Deployments"** tab
2. Find the latest deployment
3. Click the **"..."** menu → **"Redeploy"**
4. Confirm the redeployment

---

## 🌐 STEP 5: Configure Custom Domain (Optional)

### 5.1 Add Domain to Frontend

1. Go to your **frontend project** dashboard
2. Click **"Settings"** → **"Domains"**
3. Enter your domain: `gabrielludwig.dev`
4. Click **"Add"**
5. Follow Vercel's DNS instructions for your domain registrar

### 5.2 Update Backend CORS for Custom Domain

If you added a custom domain, update the backend `CLIENT_ORIGIN`:

1. Go to backend project → **"Settings"** → **"Environment Variables"**
2. Update `CLIENT_ORIGIN` to include your domain:
   ```
   https://gabrielludwig.dev
   ```
3. Redeploy the backend

---

## 🗄️ STEP 6: Seed Database (First Time Only)

If your database is empty, you need to seed it with initial data.

### Option A: Seed via Environment Variable

1. Go to backend project → **"Settings"** → **"Environment Variables"**
2. Add: `SEED_ON_BOOT` = `true`
3. Redeploy the backend
4. After successful deployment, **remove** or set `SEED_ON_BOOT` = `false`
5. Redeploy again to prevent re-seeding

### Option B: Seed Locally (Recommended)

```powershell
# Navigate to server directory
cd "C:\Users\Ludwig Rivera\Downloads\My Portfolio\server"

# Create .env file with production MongoDB URI
# (already exists based on .env.example)

# Run seed script
npm run seed
```

---

## ✅ STEP 7: Verify Deployment

### 7.1 Test Backend Endpoints

Open these URLs in your browser (replace with your actual backend URL):

| Endpoint | Expected Result |
|----------|-----------------|
| `/api/health` | `{"status":"ok"}` |
| `/api/about` | Your about data |
| `/api/projects` | Your projects list |
| `/api/experience` | Your experience data |
| `/api/certifications` | Your certifications |
| `/api/recommendations` | Your recommendations |

### 7.2 Test Frontend

1. Open your frontend URL
2. Verify all sections load correctly:
   - [ ] Hero section
   - [ ] About section
   - [ ] Experience section
   - [ ] Projects section
   - [ ] Certifications section
   - [ ] Recommendations section
   - [ ] Chat widget (if using AI)
3. Check browser console for any errors (F12 → Console)

---

## 🔧 Troubleshooting

### Common Issues

#### ❌ "CORS Error" in Browser Console

**Solution**: Make sure `CLIENT_ORIGIN` in backend matches your frontend URL exactly (including `https://`)

#### ❌ "Failed to fetch" Errors

**Solution**: 
1. Check that `VITE_API_URL` in frontend points to correct backend URL
2. Verify backend is deployed and `/api/health` returns OK

#### ❌ "MongoDB Connection Error"

**Solution**:
1. Verify `MONGO_URI` is correct in backend environment variables
2. Check MongoDB Atlas → Network Access → Add `0.0.0.0/0` to allow all IPs

#### ❌ Build Fails on Vercel

**Solution**:
1. Check the build logs for specific error
2. Make sure `Root Directory` is set correctly (`client` or `server`)
3. Verify all dependencies are in `package.json`

#### ❌ Backend Returns 404

**Solution**: The `vercel.json` in the server folder handles routing. Make sure:
1. File exists at `server/vercel.json`
2. Routes point to `src/index.js`

---

## 📝 Environment Variables Summary

### Backend (server)
```env
PORT=5501
MONGO_URI=your_mongodb_connection_string
CLIENT_ORIGIN=https://your-frontend.vercel.app
NODE_ENV=production
OPENAI_API_KEY=sk-xxx (optional)
GEMINI_API_KEY=xxx (optional)
GEMINI_MODEL=gemini-2.5-pro (optional)
```

### Frontend (client)
```env
VITE_API_URL=https://your-backend.vercel.app
```

---

## 🔄 Automatic Deployments

Once configured, Vercel will automatically deploy when you push to your main branch:

```powershell
# Make changes to your code
git add .
git commit -m "Update portfolio"
git push origin main
```

Both frontend and backend will automatically redeploy! 🎉

---

## 📊 Quick Reference - Your URLs

After deployment, fill in your actual URLs:

| Project | URL |
|---------|-----|
| **Frontend** | `https://______________________.vercel.app` |
| **Backend API** | `https://______________________.vercel.app` |
| **Health Check** | `https://______________________.vercel.app/api/health` |
| **Custom Domain** | `https://gabrielludwig.dev` (if configured) |

---

## 🎉 Congratulations!

Your full-stack portfolio is now live on Vercel with:
- ✅ Vite + React frontend
- ✅ Express.js + MongoDB backend
- ✅ Serverless functions for API
- ✅ Automatic deployments from GitHub
- ✅ Free SSL certificates
- ✅ Global CDN for fast loading

---

*Last updated: December 26, 2025*
