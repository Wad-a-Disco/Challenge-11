const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// API Routes

// Get existing notes
app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read notes from the database.' });
    }

    let notes = [];

    try {
      notes = JSON.parse(data);
    } catch (parseErr) {
      console.error(parseErr);
      return res.status(500).json({ error: 'Failed to parse notes from the database.' });
    }

    res.json(notes);
  });
});

// Create a new note
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read notes from the database.' });
    }

    let notes = [];

    try {
      notes = JSON.parse(data);
    } catch (parseErr) {
      console.error(parseErr);
      return res.status(500).json({ error: 'Failed to parse notes from the database.' });
    }

    const noteWithId = {
      id: generateUniqueId(),
      title: newNote.title,
      text: newNote.text,
    };

    notes.push(noteWithId);

    fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(notes), (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
        return res.status(500).json({ error: 'Failed to write notes to the database.' });
      }

      res.json(noteWithId);
    });
  });
});

// Serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the notes page
app.get('/notes.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Helper function to generate a unique ID
function generateUniqueId() {
  return Date.now().toString();
}
