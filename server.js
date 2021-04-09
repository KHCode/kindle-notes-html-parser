const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const docx = require('docx');
const { Paragraph } = require('docx');
// const fs = require('fs');
const multer  = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ dest: 'uploads/', storage: storage });
// const fetch = require('node-fetch');
// const htmlParser = require('node-html-parser')
const jsdom = require('jsdom');
const { default: Notes } = require('./utils/Notes');
const { JSDOM } = jsdom;
const port = process.env.PORT || 8080;




// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/send-file', upload.single('kindle-notes'), (req, res) => {
  console.log(req.file);
  const buf = Buffer.from(req.file.buffer, 'utf8');  
//   console.log(buf.toString());
  const doc = (new JSDOM(buf.toString())).window.document;
  const title = doc.querySelector('.bookTitle');
  const author = doc.querySelector('.authors');
  const DocNotes = new Notes(title, author);

  res.locals.notesArray = Array.from(doc.querySelectorAll('<div>')).filter(node => {
      return node.className === 'noteHeading' || node.className === 'noteText';
  }).forEach(el => {
      if(el.className === 'noteHeading') {
        const removeSpan = el.querySelector('<span>');
        if(removeSpan) el.removeChild(removeSpan);
      }

      if(el.classname === 'noteHeading') {

      }
       
  })


//   [];
//   res.locals.pageNumArray = [];
//   doc.querySelectorAll('.noteText').forEach(node => {
//       res.locals.notesArray.append(node.textContent);
//     //   console.log(node.textContent);
//   });
//   doc.querySelectorAll('.noteHeader').forEach((node, index) => {
//       //if noteHeader has substring 'Highlight' in textContent and previous noteHeading has substring 'Note' in textContent, 
//             //then create new paragraph with textContent from corresponding noteText
//       //if noteHeader has substring 'Highlight' in textContent and previous noteHeading has substring 'Highlight' in textContent, 
//             //then concatenate textContent from corresponding noteText to textContent from previous paragraph with new paragraph
//       //if noteHeader has substring 'Note' in textContent, then create new paragraph as child of previous paragraph
//       const paragraph = new Paragraph({
//           text: `${res.locals.notesArray[index]}, `,
//           bullet: {
//               level: 0
//           }
//       })
//       res.locals.pageNumArray.append(node.textContent);
//   })



  res.redirect('http://localhost:3000');
})


app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});