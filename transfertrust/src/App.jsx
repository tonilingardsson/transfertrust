import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>TransferTrust</h1>
      <h3>
        A decentralized application (dApp) for secure verification and transfer
        of real assets
      </h3>
      <button>Start</button>
      <p>
        This application is a part of my final project for my remote studies as
        a Blockchain Developer at Medie Institutet, Stockholm
      </p>
    </>
  );
}

export default App;
