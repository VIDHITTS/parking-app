# Deployment Guide

## Supabase Setup

1. Go to [Supabase](https://supabase.com) and create a new project
2. Once created, go to **SQL Editor**
3. Copy the content from `database/schema.sql`
4. Run the SQL to create all tables and policies
5. Go to **Project Settings > API** to get:
   - `Project URL` (SUPABASE_URL)
   - `anon public` key (SUPABASE_KEY)

## Backend Deployment (Render)

1. Go to [Render](https://render.com)
2. Click **New** > **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: parking-app-backend
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Add Environment Variables:
   ```
   PORT=5000
   NODE_ENV=production
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   JWT_SECRET=your_strong_secret_key
   FRONTEND_URL=your_vercel_frontend_url
   ```
6. Click **Create Web Service**
7. Wait for deployment to complete
8. Copy the deployed URL (e.g., `https://parking-app-backend.onrender.com`)

## Frontend Deployment (Vercel)

1. Go to [Vercel](https://vercel.com)
2. Click **Add New** > **Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables:
   ```
   VITE_API_URL=your_render_backend_url
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_KEY=your_supabase_anon_key
   ```
6. Click **Deploy**
7. Wait for deployment to complete
8. Your app will be live at `https://your-app.vercel.app`

## Post-Deployment

1. Update backend CORS settings:
   - Add your Vercel frontend URL to `allowedOrigins` in `backend/src/server.js`
   - Redeploy backend on Render

2. Test the application:
   - Visit your Vercel URL
   - Try signing up with Admin/Manager role
   - Test all features

3. Submit:
   - Share the live Vercel URL
   - Share GitHub repository (optional)

## Troubleshooting

### Backend Issues
- Check Render logs for errors
- Verify all environment variables are set correctly
- Ensure Supabase connection is working

### Frontend Issues
- Check browser console for errors
- Verify API_URL is pointing to Render backend
- Check Network tab for failed API calls

### Database Issues
- Verify SQL schema was executed successfully
- Check Supabase logs
- Ensure RLS policies are configured correctly
