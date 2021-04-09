// import { Request } from 'react-axios';
import axios from 'axios';
import './App.css';
// import htmlParser from 'html-react-parser';
import { useState } from 'react';

function App() {
  const [ file, setFile ] = useState("");

  const handleUpload = (event) => {
    setFile(event.target.files[0]);
  }

  const handleSubmit = () => {
    console.log(`App.js, line 15: ${file}`);
    // const formData = new FormData();
    // formData.append('file', file)
    axios.post('http://localhost:8080/send-file', file)
      .then(res => console.log(`App.js, line 19: ${res}`))
  }

  return (
    <div className="App">
      <form action="" method="post" encType="multipart/form-data">
        <input type="file" name="kindle-notes" onChange={handleUpload} />
        <input type="submit"  formAction="http://localhost:8080/send-file" onClick={handleSubmit} />
      </form>
    </div>
  );
}

export default App;
