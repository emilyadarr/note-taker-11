const router = require('express').Router();
const { notes } = require('../../db/db.json');

router.get('/notes', (req, res) => {
  let results = notes;
  res.json(results);
});

router.post('/notes', (req, res) => {
  //req.body.id = notes.length.toString();

  if (!req.body) {
    res.status(400).send('Note is not properly formatted');
  } else {
    
  }
});

// TODO: Add delete route

module.exports  = router;