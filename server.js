const express = require('express');
const path = require('path');

const app = express();
const PORT = 3222;

// Serve static files from the current directory
app.use(express.static('.'));

// Route to serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'design.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});