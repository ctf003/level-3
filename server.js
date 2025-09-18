// Enhanced CTF server with misdirection and real exploit path
// WARNING: Set FLAG_REAL environment variable for production

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Environment variables
const FLAG_REAL = process.env.FLAG_REAL || 'flag{JAMUN_TREE_IN_FRONT_OF_PHARMACY}';
const DECOY_ACCESS_COUNT = { count: 0 };
const UI_LOGS = [];

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// Logging middleware for decoy file access
app.use('/flag/goal.txt', (req, res, next) => {
  DECOY_ACCESS_COUNT.count++;
  const logEntry = {
    timestamp: new Date().toISOString(),
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('User-Agent'),
    method: req.method,
    path: req.path,
    type: 'decoy_file_access'
  };
  UI_LOGS.push(logEntry);
  console.log(`[DECOY ACCESS #${DECOY_ACCESS_COUNT.count}]`, logEntry);
  next();
});

// UI event logging endpoint
app.post('/ui-log', (req, res) => {
  const { event, path: eventPath, clientTime, teamId } = req.body;
  
  const logEntry = {
    timestamp: new Date().toISOString(),
    clientTime: clientTime || null,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('User-Agent'),
    event: event || 'unknown',
    path: eventPath || null,
    teamId: teamId || null,
    type: 'ui_interaction'
  };
  
  UI_LOGS.push(logEntry);
  console.log('[UI EVENT]', logEntry);
  
  res.json({ success: true, logged: true });
});

// Decoy endpoints
app.get('/flag', (req, res) => {
  res.type('text/plain');
  res.send('you are on the right path, just follow your goal\n');
});

// Decoy flag file (public)
app.get('/flag/goal.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(__dirname, 'flag', 'goal.txt'));
});

// Fake admin endpoint (decoy)
app.get('/admin', (req, res) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('User-Agent'),
    type: 'fake_admin_access'
  };
  UI_LOGS.push(logEntry);
  
  res.json({
    status: "maintenance", 
    note: "flags moved to new system",
    message: "Try the main download button on homepage",
    debug_info: "Check robots.txt for development endpoints",
    hint: "Production flags may use different access patterns"
  });
});

// Simplified download endpoint - easier discovery path
app.get('/download', (req, res) => {
  // Simple discovery message to guide users to the right path
  const logEntry = {
    timestamp: new Date().toISOString(),
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('User-Agent'),
    type: 'download_endpoint_access'
  };
  UI_LOGS.push(logEntry);
  
  res.type('text/plain');
  res.send('you are on the right path, focus on your goal');
});

// Real flag endpoint - accessible after discovery
app.get('/download/goal.txt', (req, res) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('User-Agent'),
    type: 'real_flag_access'
  };
  UI_LOGS.push(logEntry);
  console.log('[REAL FLAG ACCESSED!]', logEntry);
  
  res.type('text/plain');
  res.send(FLAG_REAL);
});

// Alternative real exploit - handshake mechanism
app.post('/handshake', (req, res) => {
  const { token, verify } = req.body;
  
  // This is another way to get the real flag - if someone discovers the right token
  if (token === 'pharmacy_tree' && verify === 'jamun') {
    const logEntry = {
      timestamp: new Date().toISOString(),
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent'),
      type: 'handshake_success'
    };
    UI_LOGS.push(logEntry);
    console.log('[HANDSHAKE SUCCESS!]', logEntry);
    
    res.json({
      success: true,
      flag: FLAG_REAL,
      message: 'Handshake verified'
    });
    return;
  }
  
  res.status(403).json({
    success: false,
    message: 'Invalid handshake parameters',
    hint: 'Handshake requires both token and verify fields',
    example_format: '{"token": "something", "verify": "something"}',
    note: 'Consider the challenge theme and context for credential hints'
  });
});

// Logs viewing endpoint (for admin analysis)
app.get('/view-logs', (req, res) => {
  const adminKey = req.query.key;
  if (adminKey !== 'admin123') {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  
  res.json({
    decoyAccessCount: DECOY_ACCESS_COUNT.count,
    totalLogs: UI_LOGS.length,
    recentLogs: UI_LOGS.slice(-20),
    realFlagAccessed: UI_LOGS.filter(log => log.type === 'real_flag_access').length
  });
});

app.listen(PORT, () => {
  console.log(`Enhanced CTF challenge with misdirection running on http://localhost:${PORT}`);
  console.log(`Real flag set: ${FLAG_REAL.substring(0, 10)}...`);
  console.log(`Decoy file: /flag/goal.txt`);
  console.log(`Real exploit paths: /download?id=real_flag, POST /handshake`);
});


