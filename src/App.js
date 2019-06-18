import React, { useState } from 'react';
import { fileToHash } from './utils';
import './App.css';

function App() {

  const [file, setFile] = useState();

  const registerHandler = async () => {
    const fileHash = await fileToHash(file);
    console.log(fileHash);
  };

  return (
    <>
      <h1>Notary App</h1>
      <input type="file" onChange={ev => setFile(ev.target.files[0])} />
      <div>
        <button onClick={registerHandler}>Register</button>
        <button>Verify</button>
      </div>
      <div>
        <p>Results</p>
      </div>
    </>
  );
}

export default App;
