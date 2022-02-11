const router = require('express').Router();
const fs = require('fs');
const notesDB = require('../db/db.json');
// const store = require('../db/store');

router.get('/notes', (req, res) => {
  let notes = fs.readFileSync('./db/db.json', 'utf8');

  res.json(JSON.parse(notes));
});
// res.json(notes)

router.post('/notes', (req, res) => {
  let notes = fs.readFileSync('./db/db.json', 'utf8');
  const newNote = {
    ...req.body,
    id: notes.length.toString()   
  };

  const parsedNotes = JSON.parse(notes);
  parsedNotes.push(newNote);

  fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 2),
  (err, text) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("New note added!")
  });
  res.json(newNote);
});

// TODO: Add delete route
router.delete('/notes/:id', (req, res) => {
  let notes = fs.readFileSync('./db/db.json', 'utf8');
  const parsedNotes = JSON.parse(notes);

  const updatedNotes = parsedNotes.filter((note) => {
    return note.id !== req.params.id;
  });

  fs.writeFile('./db/db.json', JSON.stringify(updatedNotes),(err, text) => {
    if (err) {
      console.log(err);
      return;
    }
  });
  res.json(updatedNotes);
});

module.exports = router;