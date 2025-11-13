# Deployment Guide

## Pre-Deployment Checklist

---

## 🌐 Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to [Vercel Dashboard](https://vercel.com/new)**
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your portfolio repository

3. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build` (auto-set)
   - Output Directory: `.next` (auto-set)

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add required variables:
     - **Name**: `BLOB_READ_WRITE_TOKEN`
     - **Value**: `vercel_blob_rw_wFjURVBnFINO2Piy_BCaJI1j89Y3Sn1H6XtcAshmmvgRyht`
   - Add optional variables for enhanced features:
     - **Name**: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (Optional - for better restaurant search)
     - **Value**: Your Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
     - **Note**: Without this, the app will use OpenStreetMap (free alternative)
   - Apply to: **All environments** (Production, Preview, Development)

5. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow prompts
   - Choose your project settings
   - Add environment variable when prompted

4. **Add Environment Variable (if not prompted)**
   ```bash
   vercel env add BLOB_READ_WRITE_TOKEN
   ```
   - Paste your token
   - Select all environments

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

 **Google Analytics** (if you want)
   ```bash
   npm install @next/third-parties
   ```
   Add to your layout.tsx:
   ```typescript
   import { GoogleAnalytics } from '@next/third-parties/google'
   
   // In your component
   <GoogleAnalytics gaId="G-XXXXXXXXXX" />
   ```
---

## 🐛 Troubleshooting

### Issue: Images not loading
**Solution**: Make sure `BLOB_READ_WRITE_TOKEN` is set in Vercel environment variables

### Issue: Build fails
**Solution**: Check build logs in Vercel dashboard
- Usually missing environment variables
- Or type errors in TypeScript

### Issue: 404 on routes
**Solution**: Next.js automatically handles routing. If you get 404s:
- Check file structure matches routes
- Ensure all files are committed to git

### Issue: Slow performance
**Solution**: 
- Vercel automatically optimizes
- Check image sizes (should be < 4.5MB)
- Use WebP format for images when possible


## 🔄 Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- ✅ Deploy every push to `main` branch (production)
- ✅ Create preview deployments for PRs
- ✅ Run builds and tests
- ✅ Update live site automatically

No manual deployment needed after initial setup!
