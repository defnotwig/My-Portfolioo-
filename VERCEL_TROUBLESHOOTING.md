# 🔧 Vercel Deployment Troubleshooting Guide

## ✅ What We Fixed

I've updated your backend code to handle serverless functions better:
1. **Better error handling** in the serverless function
2. **Connection reuse** for MongoDB (prevents timeouts)
3. **Serverless-friendly timeouts** for database connections

---

## 🚀 Next Steps (Do These Now!)

### Step 1: Configure MongoDB Atlas Network Access

This is **CRITICAL** - your MongoDB needs to allow Vercel's servers:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Select your cluster (Cluster0)
3. Click **"Network Access"** in the left sidebar
4. Click **"Add IP Address"**
5. Click **"Allow Access From Anywhere"**
6. Enter IP: `0.0.0.0/0`
7. Click **"Confirm"**

> ⚠️ **This is the #1 cause of serverless function crashes!**

---

### Step 2: Wait for Auto-Deployment

Your code has been pushed to GitHub. Vercel will automatically redeploy both projects:

1. **Backend**: `portfolio-backend-three-teal.vercel.app`
2. **Frontend**: `gabriel-ludwig-rivera.vercel.app`

Wait 2-3 minutes for both deployments to complete.

---

### Step 3: Check Backend Logs

After deployment completes:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on **"portfolio-backend"** project
3. Click **"Deployments"** tab
4. Click on the latest deployment
5. Scroll down to **"Runtime Logs"** tab
6. Look for errors or success messages

**What to look for:**
- ✅ `"✅ MongoDB connected"` - Good!
- ✅ `"✅ Using existing MongoDB connection"` - Good!
- ❌ `"Connection timeout"` - MongoDB Network Access issue
- ❌ `"Authentication failed"` - Check MONGO_URI credentials

---

### Step 4: Test Backend Endpoints

Once deployed, test these URLs:

| Endpoint | URL | Expected Result |
|----------|-----|-----------------|
| Health Check | `https://portfolio-backend-three-teal.vercel.app/api/health` | `{"status":"ok"}` |
| About | `https://portfolio-backend-three-teal.vercel.app/api/about` | Your about data |
| Projects | `https://portfolio-backend-three-teal.vercel.app/api/projects` | Your projects list |

**If you get errors:**
- Check Runtime Logs on Vercel
- Verify MongoDB Network Access is set to `0.0.0.0/0`
- Check that MONGO_URI environment variable is correct

---

### Step 5: Verify Frontend

Open your frontend: `https://gabriel-ludwig-rivera.vercel.app`

**Expected behavior:**
- ✅ All sections load with content
- ✅ No errors in browser console (F12)
- ✅ Chat widget works (if configured)

**If you see "Unable to load content":**
- The backend is still not working
- Check backend logs first
- Make sure `VITE_API_URL` in frontend points to: `https://portfolio-backend-three-teal.vercel.app`

---

## 🔍 Common Issues & Solutions

### Issue 1: Backend Still Crashes

**Symptoms:** 500 error, "Function Invocation Failed"

**Solutions:**
1. ✅ MongoDB Network Access not set to `0.0.0.0/0` - **Do this first!**
2. Check MONGO_URI is correct (no typos)
3. Verify MongoDB cluster is running (not paused)
4. Check Runtime Logs for specific error

---

### Issue 2: CORS Errors in Frontend

**Symptoms:** Browser console shows "CORS policy" error

**Solution:**
1. Go to backend project → Settings → Environment Variables
2. Verify `CLIENT_ORIGIN` = `https://gabriel-ludwig-rivera.vercel.app`
3. No trailing slash!
4. Redeploy backend after changing

---

### Issue 3: Frontend Shows "Unable to load content"

**Symptoms:** White page or error messages

**Solutions:**
1. Check if backend is working (test `/api/health`)
2. Verify `VITE_API_URL` in frontend environment variables
3. Open browser console (F12) for specific errors
4. Make sure CORS is configured correctly

---

### Issue 4: Empty Data / No Projects Showing

**Symptoms:** Page loads but no content

**Solution:** Database needs seeding

**Option A - Seed Locally:**
```powershell
cd "C:\Users\Ludwig Rivera\Downloads\My Portfolio\server"
npm run seed
```

**Option B - Seed via Vercel:**
1. Backend project → Settings → Environment Variables
2. Add: `SEED_ON_BOOT` = `true`
3. Redeploy backend
4. **Important:** After successful deployment, remove or set to `false`
5. Redeploy again

---

### Issue 5: Build Fails

**Symptoms:** Deployment shows "Build Failed"

**Solutions:**
1. Check Build Logs for specific error
2. Verify `Root Directory` is set correctly:
   - Backend: `server`
   - Frontend: `client`
3. Check all dependencies are in `package.json`
4. Make sure Node.js version is compatible

---

## 📊 How to Check Runtime Logs

### Backend Logs:
1. Vercel Dashboard → portfolio-backend project
2. Click "Deployments" tab
3. Click latest deployment
4. Scroll to "Runtime Logs" tab
5. **Or** go to Functions tab → Click function → View Logs

### Frontend Logs (Browser):
1. Open your site: `https://gabriel-ludwig-rivera.vercel.app`
2. Press F12 (Developer Tools)
3. Click "Console" tab
4. Look for red errors

---

## ✅ Success Checklist

After following all steps, verify:

- [ ] MongoDB Atlas Network Access allows `0.0.0.0/0`
- [ ] Backend deployment shows "Ready" status
- [ ] Backend health check returns `{"status":"ok"}`
- [ ] Backend API endpoints return data
- [ ] Frontend deployment shows "Ready" status
- [ ] Frontend loads without errors
- [ ] All portfolio sections display correctly
- [ ] No CORS errors in browser console
- [ ] Chat widget works (if configured)

---

## 📞 Still Having Issues?

If problems persist after following this guide:

1. **Check Runtime Logs** - Most errors show here
2. **Verify Environment Variables** - Common source of issues
3. **Test Locally First** - Make sure it works on your machine
4. **Check MongoDB Atlas Status** - Cluster might be paused

### Your Current URLs:
- **Backend**: `https://portfolio-backend-three-teal.vercel.app`
- **Frontend**: `https://gabriel-ludwig-rivera.vercel.app`

---

## 🎯 Quick Test Commands

Test backend from command line:

```powershell
# Test health endpoint
curl https://portfolio-backend-three-teal.vercel.app/api/health

# Test about endpoint
curl https://portfolio-backend-three-teal.vercel.app/api/about

# Test projects endpoint
curl https://portfolio-backend-three-teal.vercel.app/api/projects
```

---

*Last updated: December 26, 2025*
