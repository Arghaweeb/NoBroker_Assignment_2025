# Deploying Cooking Companion to Vercel

## 🚀 Quick Deployment Guide

### Prerequisites

- [x] GitHub repository (you already have this!)
- [ ] Vercel account (free) - Sign up at https://vercel.com
- [ ] OpenAI API Key (you should already have this)

---

## Method 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Sign Up / Log In to Vercel

1. Go to https://vercel.com
2. Click "Sign Up" (or "Log In" if you have an account)
3. Choose "Continue with GitHub" for easiest integration
4. Authorize Vercel to access your GitHub repositories

### Step 2: Import Your Project

1. Once logged in, click "Add New..." → "Project"
2. You'll see a list of your GitHub repositories
3. Find `NoBroker_Assignment_2025` in the list
4. Click "Import" next to it

**If you don't see your repository:**
- Click "Adjust GitHub App Permissions"
- Select which repositories Vercel can access
- Make sure `NoBroker_Assignment_2025` is included

### Step 3: Configure Project Settings

Vercel will auto-detect that this is a Next.js project. You'll see:

```
Framework Preset: Next.js
Build Command: next build (auto-detected)
Output Directory: .next (auto-detected)
Install Command: npm install (auto-detected)
```

**Important: Choose which branch to deploy**
- Default: `main` branch
- For your current work: `claude/prepare-delivery-01G9Uw3kiCBWNeqCvQuD2CGL`

**Recommendation:** Merge your feature branch to `main` first, or deploy from your feature branch for preview.

### Step 4: Add Environment Variables

**CRITICAL:** You must add your OpenAI API key!

In the "Environment Variables" section, add:

```
Name:  OPENAI_API_KEY
Value: sk-proj-... (your actual OpenAI API key)
```

**To add:**
1. Click "Environment Variables" section
2. Enter `OPENAI_API_KEY` in the "Name" field
3. Paste your API key in the "Value" field
4. Click "Add"

**Where to find your API key:**
- Check your `.env.local` file locally (if you have it)
- Or get a new one from https://platform.openai.com/api-keys

### Step 5: Deploy!

1. Click "Deploy" button
2. Wait 2-3 minutes while Vercel:
   - Clones your repository
   - Installs dependencies
   - Builds your Next.js app
   - Deploys to production

You'll see a progress screen with build logs.

### Step 6: Success! 🎉

Once complete, you'll see:
- 🎊 Confetti animation
- Your live URL: `https://your-project-name.vercel.app`
- A preview screenshot

Click "Visit" to see your live app!

---

## Method 2: Deploy via Vercel CLI (Advanced)

If you prefer command line:

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login

```bash
vercel login
```

Follow the prompts to authenticate.

### Step 3: Deploy

```bash
# From your project root
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No (first time)
# - Project name? Press Enter (uses repo name)
# - Directory? ./ (current directory)
# - Override settings? No
```

### Step 4: Add Environment Variables

```bash
vercel env add OPENAI_API_KEY
```

Paste your API key when prompted.

Select: Production, Preview, Development (all)

### Step 5: Redeploy with Environment Variables

```bash
vercel --prod
```

---

## Post-Deployment

### Your URLs

Vercel gives you multiple URLs:

1. **Production URL:** `https://your-app.vercel.app`
   - Main production deployment
   - Updates when you push to main branch

2. **Preview URLs:** `https://your-app-git-branch-name.vercel.app`
   - Created for each branch/PR
   - Great for testing before merging

3. **Custom Domain (Optional):** `https://your-custom-domain.com`
   - Add in Project Settings → Domains

### Automatic Deployments

Vercel automatically deploys when you:
- Push to `main` branch → Production deployment
- Push to other branches → Preview deployment
- Open a Pull Request → Preview deployment with comment in PR

### Environment Variables Management

To update environment variables later:
1. Go to your project dashboard on Vercel
2. Click "Settings" tab
3. Click "Environment Variables"
4. Add/Edit/Delete variables
5. Redeploy for changes to take effect

---

## Important Configuration for This Project

### Environment Variables Required

```
OPENAI_API_KEY=sk-proj-...your-key-here...
```

**Without this, the AI recipe generation will not work!**

### Build Settings (Auto-Detected)

```
Framework: Next.js
Node Version: 18.x or higher
Build Command: next build
Output Directory: .next
Install Command: npm install
```

### Recommended Settings

1. **Enable Analytics** (Free on Vercel)
   - Go to Analytics tab
   - Enable Web Analytics
   - Track page views and performance

2. **Enable Speed Insights** (Free)
   - Go to Speed Insights tab
   - Enable to monitor Core Web Vitals

3. **Set up Custom Domain** (Optional)
   - Settings → Domains
   - Add your custom domain
   - Follow DNS configuration steps

---

## Troubleshooting

### Build Fails with "Module not found"

**Solution:** Make sure all dependencies are in `package.json`
```bash
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

### Environment Variable Not Working

**Solution:**
1. Check spelling of variable name (must be exact: `OPENAI_API_KEY`)
2. Make sure it's added for the correct environment (Production)
3. Trigger a redeploy after adding variables

### Build Success but App Shows Errors

**Solution:** Check the Function Logs
1. Go to Vercel Dashboard → Your Project
2. Click "Functions" tab
3. View runtime logs for errors

### "API Key is missing" Error

**Solution:**
1. Verify environment variable is set in Vercel dashboard
2. Variable name must match exactly: `OPENAI_API_KEY`
3. Redeploy after adding the variable

### TypeScript Build Errors

**Solution:**
```bash
npm run build
```
Fix any TypeScript errors locally, then push.

---

## Testing Your Deployment

### 1. Basic Functionality Test

- [ ] App loads without errors
- [ ] Navigation works (Smart Scanner, Recipe Library, Shopping List)
- [ ] Can add ingredients
- [ ] Can generate recipes (tests API key)
- [ ] Can save recipes to library
- [ ] Can add items to shopping list
- [ ] Cooking mode loads
- [ ] Timers work

### 2. Check API Integration

1. Add ingredients: egg, tomato, cheese
2. Click "Generate Recipes"
3. Should see AI-generated recipes (not fallback)
4. If you see fallback recipes, check environment variables

### 3. Performance Check

Use Vercel's Speed Insights or:
- Google PageSpeed Insights: https://pagespeed.web.dev/
- Enter your Vercel URL
- Check performance score

---

## Recommended: Merge to Main Branch First

Before deploying to production, I recommend merging your feature branch:

```bash
# Switch to main branch
git checkout main

# Pull latest changes
git pull origin main

# Merge your feature branch
git merge claude/prepare-delivery-01G9Uw3kiCBWNeqCvQuD2CGL

# Push to main
git push origin main
```

Then deploy the `main` branch on Vercel.

---

## Cost & Limits

### Vercel Free Tier (Hobby)

- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ 100 GB bandwidth/month
- ✅ Serverless Functions
- ✅ Edge Network (CDN)
- ✅ Web Analytics

**This is MORE than enough for a portfolio/demo project!**

### OpenAI API Costs

This is separate from Vercel:
- Pay-per-use based on API calls
- GPT-4 costs ~$0.03 per recipe generation
- Set usage limits in OpenAI dashboard
- Add credits as needed

---

## Next Steps After Deployment

1. **Share Your Link!**
   - Add to your resume
   - Share on LinkedIn
   - Include in portfolio

2. **Monitor Usage**
   - Check Vercel Analytics
   - Monitor OpenAI API usage

3. **Update Your README**
   - Add "Live Demo" link
   - Update with deployment badge

4. **Optional Enhancements**
   - Add custom domain
   - Enable preview comments
   - Set up automatic preview deployments for PRs

---

## Quick Reference Commands

```bash
# Deploy to Vercel (CLI)
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]

# Add environment variable
vercel env add OPENAI_API_KEY

# Pull environment variables locally
vercel env pull
```

---

## Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Vercel Support:** https://vercel.com/support
- **Community:** https://github.com/vercel/vercel/discussions

---

## Summary Checklist

Before you deploy:
- [ ] All code committed and pushed to GitHub
- [ ] Vercel account created
- [ ] Repository connected to Vercel
- [ ] OpenAI API key ready
- [ ] Choose deployment branch (main recommended)

During deployment:
- [ ] Import project on Vercel
- [ ] Add `OPENAI_API_KEY` environment variable
- [ ] Click Deploy
- [ ] Wait for build to complete

After deployment:
- [ ] Test live app
- [ ] Verify AI recipe generation works
- [ ] Share your link!

---

🎉 **That's it! Your Cooking Companion app will be live on the internet!**

Your deployment URL will be something like:
`https://nobroker-assignment-2025.vercel.app`

Good luck with your deployment! 🚀
