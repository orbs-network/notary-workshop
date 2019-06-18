import React, { useState } from 'react';
import { fileToHash } from './utils';
import './App.css';
import { createAccount, Client, argString } from 'orbs-client-sdk/dist/index.es';

function App() {

  const {publicKey, privateKey} = createAccount();
  const orbsClient = new Client('http://localhost:8080', 42, 'TEST_NET');

  const [file, setFile] = useState();

  const registerHandler = async () => {
    const fileHash = await fileToHash(file);
    const [tx] = orbsClient.createTransaction(
      publicKey,
      privateKey,
      'Notary',
      'register',
      [argString(fileHash)]
    );
    const receipt = await orbsClient.sendTransaction(tx);
    console.log(receipt); 
  };

  const verifyHandler = async () => {
    const fileHash = await fileToHash(file);
    const query = orbsClient.createQuery(
      publicKey,
      'Notary',
      'verify',
      [argString(fileHash)]
    );
    const response = await orbsClient.sendQuery(query);
    console.log(response);
  };

  return (
    <>
      <h1>Notary App</h1>
      <input type="file" onChange={ev => setFile(ev.target.files[0])} />
      <div>
        <button onClick={registerHandler}>Register</button>
        <button onClick={verifyHandler}>Verify</button>
      </div>
    </>
  );
}

export default App;
