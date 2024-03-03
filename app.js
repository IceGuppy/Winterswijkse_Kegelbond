const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');
const app = express();
const port = 3000;

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'uploads/'),
    filename: function (req, file, cb) {
        cb(null, 'herenteams-klasse-1-en-2-competitie-2023.pdf');
    }
});

const upload = multer({ storage });

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/download', async (req, res) => {
    const filePath = path.join(__dirname, 'uploads', 'herenteams-klasse-1-en-2-competitie-2023.pdf');

    try {
        // Check if the file exists
        await fs.access(filePath);
        res.download(filePath);
    } catch (error) {
        res.status(404).send('File not found');
    }
});

app.post('/upload', upload.single('file'), (req, res) => {
    // Ensure the file was actually uploaded
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    res.send('File uploaded successfully!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
