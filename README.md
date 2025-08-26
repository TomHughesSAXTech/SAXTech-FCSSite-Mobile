# SAXTech FCS Mobile Version

This is a mobile-optimized version of your SAXTech FCSSite with a ChatGPT-inspired interface. The mobile version is completely separate from your desktop site, ensuring your perfect desktop version remains untouched.

## Features

### Mobile-First Design
- **ChatGPT-like Interface**: Clean, minimal design with excellent readability
- **Collapsible Sidebar**: Swipe or tap to access navigation
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Touch Optimized**: All interactive elements sized for touch
- **Smooth Animations**: Native-feeling transitions and interactions
- **Pull-to-Refresh**: Natural mobile gesture support
- **Floating Action Button**: Quick access to key actions

### Smart Detection & Routing
- Automatically detects mobile devices using multiple methods:
  - User agent detection
  - Screen size detection
  - Touch capability detection
- Respects user preferences with URL parameters:
  - `?mobile=true` forces mobile view
  - `?desktop=true` forces desktop view
- Saves user preference in localStorage

## File Structure

```
SAXTech-FCSSite-Mobile/
├── index.html                 # Detection & routing page
├── mobile.html               # Mobile version HTML
├── mobile.css                # Mobile-specific styles
├── mobile.js                 # Mobile interactions & functionality
├── staticwebapp.config.json  # Azure Static Web Apps configuration
└── README.md                 # This file
```

## Deployment Instructions

### Step 1: Prepare Your Files

1. **Update the Desktop Redirect**:
   - Open `index.html`
   - Find line 58: `document.write('<meta http-equiv="refresh" content="0; url=YOUR_DESKTOP_INDEX.html">')`
   - Replace `YOUR_DESKTOP_INDEX.html` with your actual desktop site's main HTML file name

2. **Copy Your Desktop Files**:
   - Copy all your existing desktop site files to this directory
   - Keep them exactly as they are - no modifications needed
   - The mobile detection will handle routing appropriately

### Step 2: Deploy to Azure Static Web Apps

#### Option A: GitHub Integration (Recommended)

1. **Create a GitHub Repository**:
   ```bash
   cd /Users/tom/Desktop/WARP/SAXTech-FCSSite-Mobile
   git init
   git add .
   git commit -m "Initial commit - Mobile version added"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/SAXTech-FCSSite.git
   git push -u origin main
   ```

2. **Connect to Azure Static Web Apps**:
   ```bash
   # Login to Azure
   az login
   
   # Create deployment token
   az staticwebapp secrets list \
     --name SAXTech-FCSSite \
     --resource-group SAXTech-AI \
     --query "properties.apiKey" \
     --output tsv
   ```

3. **Set up GitHub Action**:
   - Go to your GitHub repository settings
   - Add the deployment token as a secret named `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - The deployment will trigger automatically on push

#### Option B: Direct Azure CLI Deployment

1. **Build and Deploy**:
   ```bash
   # Install Azure Static Web Apps CLI
   npm install -g @azure/static-web-apps-cli
   
   # Deploy to existing app
   swa deploy ./SAXTech-FCSSite-Mobile \
     --deployment-token <YOUR_DEPLOYMENT_TOKEN> \
     --env production
   ```

### Step 3: Test Your Deployment

1. **Test Mobile Version**:
   - Visit your site on a mobile device
   - Should automatically load the mobile version
   - Or visit: `https://icy-river-05419180f.2.azurestaticapps.net/?mobile=true`

2. **Test Desktop Version**:
   - Visit your site on a desktop
   - Should load your original desktop site
   - Or visit: `https://icy-river-05419180f.2.azurestaticapps.net/?desktop=true`

3. **Test Theme Toggle**:
   - Click the sun/moon icon to switch themes
   - Preference is saved locally

4. **Test Navigation**:
   - Tap hamburger menu or swipe from left edge
   - Navigate between sections
   - Test smooth scrolling

## Customization Guide

### Modify Content
- Edit `mobile.html` to update text, sections, and structure
- Keep the existing class names for styling consistency

### Adjust Styling
- Edit `mobile.css` to change colors, spacing, or animations
- Theme colors are defined as CSS variables in `:root`

### Add Functionality
- Edit `mobile.js` to add new interactions or API integrations
- The form submission handler is ready for your backend integration

### Connect to Backend
Replace the simulated form submission in `mobile.js` (line 138) with your actual API:
```javascript
// Replace this section with your API call
fetch('your-api-endpoint', {
    method: 'POST',
    body: formData
}).then(response => {
    // Handle response
});
```

## Browser Compatibility

- ✅ iOS Safari 12+
- ✅ Chrome Mobile 80+
- ✅ Firefox Mobile 68+
- ✅ Samsung Internet 10+
- ✅ Edge Mobile 18+

## Performance Tips

1. **Image Optimization**: Use WebP format with fallbacks
2. **Lazy Loading**: Already implemented for images with `data-src`
3. **Caching**: Configure in `staticwebapp.config.json`
4. **CDN**: Azure Static Web Apps includes CDN by default

## Troubleshooting

### Mobile version not loading?
- Check browser console for errors
- Verify all files are uploaded
- Clear browser cache and localStorage

### Desktop users seeing mobile version?
- Add `?desktop=true` to force desktop view
- Check if tablet is being detected as mobile

### Styling issues?
- Ensure viewport meta tag is present
- Check for CSS conflicts with desktop styles

## Support

For issues or questions:
1. Check Azure Static Web Apps logs in Azure Portal
2. Review browser console for JavaScript errors
3. Test in multiple browsers/devices

## License

This mobile version maintains the same license as your original SAXTech FCSSite.

---

**Note**: Remember to update the `index.html` redirect URL and copy your desktop files before deploying!
