const express = require('express');
const path = require('path');
const cors = require('cors');
var multer  = require('multer')
const storage = multer.memoryStorage();
var upload = multer({ dest: 'uploads/', storage: storage });
// const fetch = require('node-fetch');
// const htmlParser = require('node-html-parser')
const port = process.env.PORT || 8080;
const app = express();

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
  console.log(buf.toString());
  res.redirect('/');
})


app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});