import { useState } from 'react';
import './App.css';

//implementing wallet connect from Moralis
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Balances from './balances';

const router = createBrowserRouter([
  {
    path: '/balances',
    element: <Balances />,
  },
]);

function App() {
  const [balances, setBalances] = useState({});

  // return (
  //   <>
  //     <h1>TransferTrust</h1>
  //     <h3>
  //       A decentralized application (dApp) for secure verification and transfer
  //       of real assets
  //     </h3>
  //     <button>Start</button>
  //     <p>
  //       This application is a part of my final project for my remote studies as
  //       a Blockchain Developer at Medie Institutet, Stockholm
  //     </p>
  //   </>
  // );

  return <RouterProvider router={router} />;
}

export default App;
