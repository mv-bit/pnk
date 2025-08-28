const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3222;

// Serve static files from the current directory
app.use(express.static('.'));

// Health check endpoints for Railway
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        service: 'logistics-showcase'
    });
});

app.get('/healthz', (req, res) => {
    res.status(200).send('OK');
});

// Route to serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'properties.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});