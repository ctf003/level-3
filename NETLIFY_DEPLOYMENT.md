# Netlify Deployment Guide

## ✅ Setup Complete!

I've converted your Express.js CTF challenge to work with Netlify Functions. Here's what was done:

### 🔧 **Changes Made:**

1. **Created Netlify Functions:**
   - `netlify/functions/download.js` - Returns "you are on the right path, focus on your goal"
   - `netlify/functions/download-goal.js` - Returns the REAL flag
   - `netlify/functions/handshake.js` - Alternative authentication method
   - `netlify/functions/admin.js` - Fake admin endpoint
   - `netlify/functions/ui-log.js` - UI interaction logging
   - Updated existing `goal.js` and `flag.js` for decoy flags

2. **Updated Configuration:**
   - `netlify.toml` - All endpoint redirects configured
   - `.gitignore` - Proper files excluded from Git

## 🚀 **Deployment Steps:**

### 1. **Push to GitHub:**
```bash
git add .
git commit -m "Convert CTF challenge to Netlify Functions"
git push origin main
```

### 2. **Deploy to Netlify:**
1. Go to [netlify.com](https://netlify.com)
2. Click "Import from Git"
3. Select your GitHub repository
4. **Build settings:**
   - Build command: (leave empty)
   - Publish directory: `public`
5. Click "Deploy site"

### 3. **Set Environment Variable (Optional):**
If you want a custom flag:
1. Go to Site Settings → Environment Variables
2. Add: `FLAG_REAL` = `your_custom_flag_here`
3. Redeploy the site

## 🎯 **Challenge Will Work Like This:**

**Discovery Path:**
1. `your-site.netlify.app/robots.txt` → Shows hidden endpoints
2. `your-site.netlify.app/download` → Shows guidance message
3. `your-site.netlify.app/download/goal.txt` → **REAL FLAG!**

**Alternative Path:**
```bash
curl -X POST https://your-site.netlify.app/handshake \
  -H "Content-Type: application/json" \
  -d '{"token":"pharmacy_tree","verify":"jamun"}'
```

## ✅ **Testing After Deployment:**

```bash
# Test robots.txt
curl https://your-site.netlify.app/robots.txt

# Test decoy flag (should return decoy)
curl https://your-site.netlify.app/flag/goal.txt

# Test real flag path
curl https://your-site.netlify.app/download
curl https://your-site.netlify.app/download/goal.txt

# Test handshake method
curl -X POST https://your-site.netlify.app/handshake \
  -H "Content-Type: application/json" \
  -d '{"token":"pharmacy_tree","verify":"jamun"}'
```

## 🎉 **You're All Set!**

The challenge is now ready for Netlify deployment and will work exactly the same as your local version!

**Note:** The `server.js` file is no longer needed for deployment (it's in .gitignore) but kept for local testing if needed.
