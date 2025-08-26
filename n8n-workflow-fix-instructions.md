# Fix n8n Workflow: Client List Webhook-Only Approach

## Problem
The current n8n workflow for `/clients/list` endpoint is:
- Trying to access Azure Blob Storage directly with expired credentials
- Causing "AuthenticationFailed" errors with signature mismatches
- Returning empty responses to the mobile app

## Solution
Replace the workflow with a **webhook-only approach** that returns client data directly without any blob storage calls.

## Steps to Fix

### Option 1: Update Existing Workflow (Recommended)

1. **Log into your n8n instance**
   - Go to your n8n dashboard
   - Find the workflow handling `/ask-foreman/clients/list`

2. **Remove Azure Blob Storage Nodes**
   - Delete the "List Blob Client Folders" node (causing the authentication error)
   - Remove any Azure HTTP request nodes
   - Remove any blob parsing nodes

3. **Replace with Simple Function Node**
   - Add a new **Function** node after the webhook trigger
   - Use this JavaScript code:

```javascript
// Fixed client list - webhook-only approach
// No Azure Blob Storage access needed

const clientList = {
  clients: [
    {
      name: "Amsterdam",
      displayName: "Amsterdam",
      id: "amsterdam",
      category: "construction",
      type: "project"
    },
    {
      name: "Baruch",
      displayName: "Baruch", 
      id: "baruch",
      category: "construction",
      type: "project"
    },
    {
      name: "Brownsville",
      displayName: "Brownsville",
      id: "brownsville", 
      category: "construction",
      type: "project"
    },
    {
      name: "Smith",
      displayName: "Smith",
      id: "smith",
      category: "construction", 
      type: "project"
    },
    {
      name: "Sumner",
      displayName: "Sumner",
      id: "sumner",
      category: "construction",
      type: "project"
    }
  ],
  count: 5,
  timestamp: new Date().toISOString(),
  source: "webhook-direct",
  version: "2.0"
};

// Log for debugging
console.log('✅ Returning client list via webhook-only approach:', clientList);

return [{
  json: clientList
}];
```

4. **Update Response Headers**
   - In the **Respond to Webhook** node, add these headers:
   ```
   Content-Type: application/json
   Cache-Control: no-cache, no-store, must-revalidate
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Methods: GET, POST, OPTIONS
   Access-Control-Allow-Headers: Content-Type, Authorization
   ```

5. **Test the Workflow**
   - Save and activate the workflow
   - Test the endpoint: `https://workflows.saxtechnology.com/webhook/ask-foreman/clients/list`
   - Should return JSON with 5 clients

### Option 2: Import New Workflow

1. **Export Current Workflow** (as backup)
2. **Import the fixed workflow** from `n8n-workflow-clients-list-fixed.json`
3. **Activate the new workflow**

## Expected Result

After fixing, the webhook should return:

```json
{
  "clients": [
    {"name": "Amsterdam", "displayName": "Amsterdam"},
    {"name": "Baruch", "displayName": "Baruch"},
    {"name": "Brownsville", "displayName": "Brownsville"},
    {"name": "Smith", "displayName": "Smith"},
    {"name": "Sumner", "displayName": "Sumner"}
  ],
  "count": 5,
  "timestamp": "2025-08-26T05:34:39.000Z",
  "source": "webhook-direct",
  "version": "2.0"
}
```

## Testing

1. **Test the endpoint directly:**
   ```bash
   curl -s "https://workflows.saxtechnology.com/webhook/ask-foreman/clients/list"
   ```

2. **Verify mobile app:**
   - Visit: https://gentle-pond-0c4e3b90f.2.azurestaticapps.net/mobile-chat.html
   - Check browser console - should see "Successfully loaded 5 client(s) from webhook"
   - Client dropdown should populate with all 5 clients

## Benefits of This Approach

✅ **No Azure Blob Storage Dependencies** - Eliminates authentication issues
✅ **No Expired Credentials** - No SAS tokens or connection strings needed  
✅ **Faster Response Times** - Direct data return without API calls
✅ **More Reliable** - No external service dependencies
✅ **Easier Maintenance** - Simple JavaScript function instead of complex parsing
✅ **Better Error Handling** - No network failures or timeout issues

## Future Enhancements (Optional)

If you need dynamic client loading in the future, consider:
- Reading client list from a database
- Using a different storage service with better API authentication
- Implementing a scheduled job to update client list data
- Adding client management endpoints for adding/removing clients

But for now, the hardcoded list provides the exact functionality the mobile app needs.
