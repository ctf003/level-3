# 🎯 EASY GUIDE TO FIND THE REAL FLAG

**The decoy flag `decoy{YOU_FELL_FOR_IT}` is NOT the real one!**

## Step 1: Ignore the Website UI
- Don't click the download button ❌
- Don't use the terminal widget ❌  
- Don't follow breadcrumbs ❌

## Step 2: Follow the Discovery Path

### **Method A - Simple Discovery (EASIEST)**
1. Make sure the server is running: `npm start`
2. Check: `http://localhost:3000/robots.txt`
3. You'll see hidden endpoints like `/download`
4. Visit: `http://localhost:3000/download`
5. You'll get a hint: "you are on the right path, focus on your goal"
6. Try: `http://localhost:3000/download/goal.txt`

**Expected result:** You should get the real flag!

### **Method B - Authentication Bypass (Alternative)**
1. Use curl or a REST client
2. Send a POST request to: `http://localhost:3000/handshake`
3. With this JSON body:
```json
{
  "token": "pharmacy_tree",
  "verify": "jamun"
}
```

## Windows Commands (Copy-Paste Ready):

```powershell
# Method A - Simple discovery
curl "http://localhost:3000/robots.txt"
curl "http://localhost:3000/download"
curl "http://localhost:3000/download/goal.txt"

# Method B - Authentication bypass  
curl -X POST -H "Content-Type: application/json" -d "{\"token\":\"pharmacy_tree\",\"verify\":\"jamun\"}" http://localhost:3000/handshake
```

## What You're Learning:
- **Information Disclosure**: Using robots.txt for reconnaissance
- **Directory Traversal**: Exploring hidden paths and endpoints
- **Authentication Bypass**: Using undocumented API endpoints
- **UI Misdirection**: How attackers ignore fancy interfaces and go straight to the backend

## Real Flag Format:
`flag{JAMUN_TREE_IN_FRONT_OF_PHARMACY}`

## Discovery Path:
1. `robots.txt` → reveals `/download` endpoint
2. `/download` → hints "focus on your goal"
3. `/download/goal.txt` → contains real flag!

## Pro Tip:
Real security vulnerabilities rarely have big shiny buttons - they're usually hidden in the backend APIs!
