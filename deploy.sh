#!/bin/bash

# Exit immediately if any command exits with a non-zero status
set -e

echo "🚀 Starting portfolio refactoring deployment sequence..."

# 1. Build Vite production assets
echo "📦 Building production assets with Vite..."
npm run build

# 2. Add all changes to git
echo "🌿 Staging files for Git..."
git add .

# 3. Commit changes
echo "💾 Committing changes to Git..."
git commit -m "feat: complete cheerful UI portfolio overhaul with full repo datasets and testing sandbox" || echo "⚠️ Nothing to commit or commit failed, proceeding..."

# 4. Push to remote repository
echo "📤 Pushing to GitHub remote main branch..."
git push origin main

# 5. Deploy to Firebase Hosting
echo "🔥 Deploying to Firebase Hosting..."
firebase deploy --only hosting:main

echo "✅ Portfolio deployment complete and live!"
