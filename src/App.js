import React, { useState } from 'react';
import './App.css';

function App() {

  const [file, setFile] = useState();

  return (
    <>
      <h1>Notary App</h1>
      <input type="file" onChange={ev => setFile(ev.target.files[0])} />
      <div>
        <button>Register</button>
        <button>Verify</button>
      </div>
      <div>
        <p>Results</p>
      </div>
    </>
  );
}

export default App;
