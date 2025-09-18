# Direct Hide S3 3 - Enhanced Misdirection CTF Challenge

A sophisticated web-based CTF challenge featuring advanced UI misdirection techniques designed to waste the time of casual solvers while preserving legitimate exploit paths for skilled attackers.

## Challenge Overview

### 🎯 **Objective**
- **Type**: Web Exploitation + Misdirection
- **Difficulty**: Intermediate to Advanced
- **Real Flag**: `flag{JAMUN_TREE_IN_FRONT_OF_PHARMACY}` (server-side only)
- **Decoy Flag**: `decoy{YOU_FELL_FOR_IT}` (public file)

### 🕸️ **Misdirection Strategy**
This challenge intentionally misleads casual solvers with convincing fake paths while maintaining real vulnerability for proper exploitation.

## Setup Instructions

### Prerequisites
- Node.js (v14+ recommended)
- npm

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Set environment variables (production)**:
```bash
# Set real flag (never in code!)
export FLAG_REAL="flag{YOUR_PRODUCTION_FLAG}"

# Optional team salt for validation
export TEAM_SALT="team_prefix_"

# Custom port
export PORT=3000
```

3. **Start the server**:
```bash
npm start
```

4. **Access the challenge**:
   - Homepage: `http://localhost:3000/`
   - Decoy flag: `http://localhost:3000/flag/goal.txt`

## Misdirection Elements

### 1. **Primary Fake Download Button**
- Prominent "Download Flag Now" button with security badge
- Animated progress bar and confetti on "success"
- Fetches and displays decoy flag: `decoy{YOU_FELL_FOR_IT}`
- Convincing success modal makes players think they've won

### 2. **Fake UI Elements**
- **Breadcrumbs**: `Home › flag › goal.txt` (leads to decoy)
- **Help Tooltip**: "If you can't find the flag, try our quick download"
- **Admin Link**: `/admin` returns maintenance JSON (decoy)
- **System Info**: Shows fake operational status

### 3. **Fake Terminal Widget**
- Interactive terminal with realistic commands
- `get-flag` command returns decoy flag
- Terminal looks professional but contains no real vulnerability
- Commands: `help`, `get-flag`, `status`, `clear`, `exit`

### 4. **Visual Misdirection**
- Pulsing security badge with "SECURE" text
- Status lights and indicators
- Professional matrix-themed design
- Hint text: "Temporary files may be visible at /flag/goal.txt"

## Real Exploit Paths (For Advanced Users)

### 🎯 **Path 1: IDOR/Direct Object Reference**
```bash
# Try different file IDs to access real flag
curl "http://localhost:3000/download?id=real_flag"
curl "http://localhost:3000/download?id=production"
curl "http://localhost:3000/download?id=live"
```

### 🎯 **Path 2: Handshake Authentication**
```bash
# POST request with correct token and verify parameters
curl -X POST -H "Content-Type: application/json" \
  -d '{"token":"pharmacy_tree","verify":"jamun"}' \
  http://localhost:3000/handshake
```

## Logging & Analytics

### UI Event Tracking
All fake interactions are logged via `POST /ui-log`:
- Button clicks
- Terminal commands  
- Breadcrumb navigation
- Tooltip interactions
- Admin link access

### Decoy File Access
Access to `/flag/goal.txt` is automatically logged with:
- IP address
- User agent
- Access count
- Timestamp

### View Logs
```bash
# Access logs (admin only)
curl "http://localhost:3000/view-logs?key=admin123"
```

## Security Features

### ✅ **Client-Side Security**
- No real flags in HTML/JS/CSS
- Only decoy flag in public files
- Real flag stored in environment variable only
- All UI interactions logged for abuse detection

### ✅ **Server-Side Protection**
- Real flag never exposed via static files
- Exploit requires knowledge of specific endpoints/parameters
- All access attempts logged
- Multiple alternative exploit paths available

## File Structure

```
├── public/
│   ├── index.html          # Enhanced UI with misdirection
│   ├── styles.css          # Matrix theme with animations
│   └── flag/
│       └── goal.txt        # Decoy flag (public)
├── flag/
│   └── goal.txt           # Decoy flag (server-side backup)
├── server.js              # Enhanced server with exploits
├── package.json           # Dependencies
└── README.md             # This file
```

## Testing Checklist

### ✅ **Decoy System Tests**
```bash
# 1. Decoy file accessible
curl http://localhost:3000/flag/goal.txt
# Expected: decoy{YOU_FELL_FOR_IT}

# 2. UI download button works
# Click "Download Flag Now" → should show decoy with animations

# 3. Terminal get-flag command
# Open terminal → type "get-flag" → should return decoy

# 4. Admin endpoint returns decoy JSON
curl http://localhost:3000/admin
# Expected: {"status":"maintenance",...}
```

### ✅ **Real Exploit Tests**
```bash
# 1. IDOR exploit works
curl "http://localhost:3000/download?id=real_flag"
# Expected: flag{JAMUN_TREE_IN_FRONT_OF_PHARMACY}

# 2. Handshake exploit works  
curl -X POST -H "Content-Type: application/json" \
  -d '{"token":"pharmacy_tree","verify":"jamun"}' \
  http://localhost:3000/handshake
# Expected: {"success":true,"flag":"flag{JAMUN_TREE_IN_FRONT_OF_PHARMACY}"}
```

### ✅ **Security Audit**
```bash
# Search for real flags in client files
grep -r "flag{" public/
# Should only find: decoy{YOU_FELL_FOR_IT}

# Verify no real flag in source
grep -r "JAMUN_TREE" public/
# Should return nothing
```

## Advanced Challenge Mechanics

### 🎭 **Psychology of Misdirection**
1. **Instant Gratification**: Prominent download button gives immediate "reward"
2. **Authority Indicators**: Security badges and system status create trust
3. **Confirmation Bias**: Success animations convince users they've succeeded
4. **Path Dependency**: Breadcrumbs guide users to intended decoy route
5. **Technical Credibility**: Professional terminal and admin interfaces

### 🔍 **Skill Differentiation**
- **Casual CTF Players**: Stop at decoy flag, feel satisfied
- **Intermediate Players**: Might explore further but get caught in additional decoys  
- **Advanced Players**: Ignore UI entirely, enumerate endpoints, find real exploits

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `FLAG_REAL` | The actual flag (NEVER in code) | `flag{JAMUN_TREE_IN_FRONT_OF_PHARMACY}` |
| `TEAM_SALT` | Optional team identifier prefix | `""` |
| `PORT` | Server port | `3000` |

## Production Deployment

### Security Checklist
- [ ] Set `FLAG_REAL` environment variable
- [ ] Remove default flag from server.js
- [ ] Configure proper access logging
- [ ] Set up monitoring for real flag access
- [ ] Test all decoy and real exploit paths

### Monitoring
- Watch `/view-logs` for real flag access attempts
- Monitor decoy access count vs real flag access ratio
- Track which misdirection elements are most effective

## Challenge Solution (Spoiler)

### For Admins Only
The challenge requires discovering and exploiting one of two server-side vulnerabilities:

1. **IDOR Vulnerability**: `/download` endpoint with `id` parameter
2. **Authentication Bypass**: `/handshake` endpoint with specific tokens

Both require parameter enumeration and can't be solved through the misleading UI alone.

---

**⚠️ Warning**: This challenge contains intentional vulnerabilities for educational purposes. Do not deploy in production environments without proper security review.