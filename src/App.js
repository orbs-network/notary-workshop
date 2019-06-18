import React from 'react';
import './App.css';

function App() {
  return (
    <>
      <h1>Notary App</h1>
      <input type="file" />
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
