# Ask Foreman AI - Mobile Chat Deployment Guide

## Overview
This is the mobile chat interface for Ask Foreman AI, a construction industry AI assistant. The app is designed for mobile-first experience with real-time chat capabilities.

## Fixed Issues ✅

- ✅ **Removed Azure Blob Storage backup logic** - Now uses webhook-only approach
- ✅ **Fixed CORS errors** - No more direct blob storage access attempts
- ✅ **Updated placeholder text** - Now shows "Ask me anything..."
- ✅ **Enhanced mobile formatting** - Better message display and PDF viewer support
- ✅ **Added cache-busting headers** - Ensures fresh deployments load properly

## Deployment Instructions

### Prerequisites

1. **Azure Static Web Apps** resource already created at:
   - URL: `https://gentle-pond-0c4e3b90f.2.azurestaticapps.net`

2. **GitHub repository** - This will be connected for auto-deployment

### Step 1: Push to GitHub

```bash
# Add all files
git add .

# Commit changes
git commit -m "Fixed mobile chat - removed Azure Blob backup, added webhook-only approach"

# Create GitHub repository and push
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/SAXTech-FCSSite-Mobile.git
git push -u origin main
```

### Step 2: Connect to Azure Static Web Apps

1. **Get your deployment token** from Azure Portal:
   - Go to your Static Web App resource
   - Navigate to "Deployment tokens" in the left menu  
   - Copy the deployment token

2. **Add GitHub Secret**:
   - Go to your GitHub repository
   - Settings > Secrets and variables > Actions
   - Add new repository secret:
     - Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
     - Value: [Your deployment token from step 1]

### Step 3: Connect Repository in Azure

1. **In Azure Portal**:
   - Go to your Static Web App resource
   - Click "Manage deployment token" 
   - Click "Connect to source"
   - Select GitHub and authorize
   - Choose your repository: `SAXTech-FCSSite-Mobile`
   - Branch: `main`
   - Build presets: `Custom`
   - App location: `/`
   - Api location: (leave blank)
   - Output location: `/`

### Step 4: Verify Deployment

1. **Check GitHub Actions**:
   - Go to your repository > Actions tab
   - Verify the workflow is running successfully

2. **Test the deployed app**:
   - Visit: `https://gentle-pond-0c4e3b90f.2.azurestaticapps.net/mobile-chat.html`
   - Check browser console for version info:
     - Should see: "🚀 Mobile Chat v2.0 - NO AZURE BLOB BACKUP - Webhook Only"
     - Should NOT see: "Attempting to load clients from Azure Blob Storage..."

## File Structure

```
SAXTech-FCSSite-Mobile/
├── .github/
│   └── workflows/
│       └── azure-static-web-apps.yml  # Auto-deployment workflow
├── build/                             # Build directory with updated files
│   ├── mobile-chat.html              # Updated mobile chat
│   ├── test.html                     # Test framework
│   └── index.html                    # Landing page
├── mobile-chat.html                  # Main mobile chat interface
├── staticwebapp.config.json          # Azure configuration
└── README.md                        # This file
```

## Key Features

- **🤖 AI Construction Assistant**: Real-time chat with construction expertise
- **📱 Mobile-optimized**: Touch-friendly interface designed for phones
- **🎯 Client Context**: Project-specific document analysis
- **🔄 Auto-refresh**: Pull-to-refresh gesture support
- **🌙 Dark/Light Theme**: Persistent theme preferences
- **📄 PDF Viewer**: Integrated document viewing for AI responses

## Configuration

The app connects to these n8n webhook endpoints:
- Chat: `https://workflows.saxtechnology.com/webhook/ask-foreman/chat`
- Client List: `https://workflows.saxtechnology.com/webhook/ask-foreman/clients/list`

## Troubleshooting

### If you see old "backup" messages:
1. **Hard refresh** your browser (Cmd+Shift+R / Ctrl+Shift+R)
2. **Clear browser cache** completely
3. **Check console** for version stamp - should see v2.0

### If deployment fails:
1. **Check GitHub Actions logs** in your repository
2. **Verify deployment token** is correct in GitHub secrets
3. **Ensure Azure resource** is properly connected

### If chat doesn't work:
1. **Check network tab** - should only see webhook calls
2. **Verify webhook endpoints** are responding
3. **Check console** for JavaScript errors

## Support

- Azure Static Web Apps Documentation: https://docs.microsoft.com/en-us/azure/static-web-apps/
- GitHub Actions Documentation: https://docs.github.com/en/actions
🚀 Deployed Tue Aug 26 00:10:48 EDT 2025
