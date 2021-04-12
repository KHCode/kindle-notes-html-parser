import  Notes from '../utils/Notes';
import NotesListItem from '../utils/NotesListItem';
import { Document, Paragraph, TextRun } from 'docx';
import formidable from 'formidable';
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

export const config = {
  api: {
    bodyParser: false,
  },
};

const kindleParser =  async (req, res) => {
  console.log(req.file);
  const buf = Buffer.from(req.file.buffer, 'utf8');  
//   console.log(buf.toString());
  const doc = (new JSDOM(buf.toString())).window.document;
  const title = doc.querySelector('.bookTitle').textContent;
  const author = doc.querySelector('.authors').textContent.split(',');
  const citation = doc.querySelector('.citation').textContent;
  // const DocNotes = new Notes(title, author, citation);
  let notesNodes = new Map();

  doc.querySelectorAll('div').forEach((div) => {
    let nodeText = "",
    nodeKey = {},
    textArray = [];
    //check each div's class
    if (div.className === "noteHeading") {
      textArray = div.textContent.split(' ')
      nodeKey.nodeType = textArray[0]; //first word of the div's textContent should either be 'Highlight' or 'Note'
      nodeKey.nodeLocation = textArray[textArray.length - 1]; //last word of the div's textContent should be location number
      nodeText = div.nextElementSibling.textContent; //entire textContent of div's nextElementSibling
    }

    if(div.className === "sectionHeading") {
      nodeKey.nodeType = "Chapter";
      nodeKey.nodeLocation = {};
      nodeText = div.textContent;
    }

    notesNodes.set(nodeKey, nodeText);
  })

  let wordDoc = new Document({
    sections: [{
      children: []
    }]
  }) 
  for (let  [key, value] of notesNodes) {
    let paragraph;
    if (key === "Chapter"){
      paragraph = new Paragraph({
        text: value,
        bullet: { level: 0 }
      })//instanciate a Paragraph object with bullet point level set to 0
    }

    if (key === "Highlight") {
      paragraph = new Paragraph({
        text: value,
        bullet: { level: 1 }
      })//instanciate a Paragraph object with bullet point level set to 1
    }

    if (key === "Note") {
      paragraph = new Paragraph({
        text: value,
        bullet: { level: 2 }
      })//instanciate a Paragraph object with bullet point level set to 2
    }
      
    wordDoc.sections.children.push(paragraph);//add instanciated Paragraph to wordDoc
  }
}

export default kindleParser;