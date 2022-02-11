// TODO: Create functions for getNotes addNote and removeNote
const fs = require('fs');
const path = require('path');
const db = require('./db.json');

const util = require('util');
const req = require('express/lib/request');
const res = require('express/lib/response');
// const uuidv1 = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  // constructor() {
  //   this.lastId = 0;
  // }

  read() {
    return readFileAsync('db/db.json', 'utf8');
  }

  write() {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }

  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;

      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = []
      }
      return parsedNotes;
    });
  }  

  addNote(note) {
    //const { title, text } = note;
    // parsedNotes.push(note);
    // fs.writeFileSync(
    //   path.join(__dirname, './db.json'),
    //   JSON.stringify({ notes: parsedNotes }, null, 2)
    // );
    // return note;
    // if (!title || !text) {
    //   throw new Error("Note title and text cannot be empty");
    // }

    const newNote = {
      ...req.body,
      // id: ++this.lastId
    };

    let data = fs.readFileSync('db/db.json', 'utf8');
    const parsedData = JSON.parse(data);
    parsedData.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err, text) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Works', text);
    });
    console.log("successfully added new note");

    res.json(data);

    // return this.getNotes()
    // .then((notes) => [...notes, note])
    // .then((updatedNotes) => this.write(updatedNotes))
    // .then(() => note);
  }
}



// function getNotes() {

//   fs.readFile(`./db.json`, 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//     } else {
//       const parsedNotes = JSON.parse(data);
//       return parsedNotes;
//     }
//   })
// };

// function addNote(body, notes) {
//   const note = body;
//   notes.push(note);
//   fs.writeFileSync(
//     path.join(__dirname, './db.json'),
//     JSON.stringify({ notes }, null, 2)
//   );
//   return note;
// };

// const store = { getNotes, addNote };

module.exports = new Store();