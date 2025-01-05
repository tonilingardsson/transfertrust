import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import '@rainbow-me/rainbowkit/styles.css';
import { implementContract } from '../hooks/useContract';
import { useState } from 'react';
import { CONTRACT_ADDRESS } from '../utils/abi';
import { parseEther } from 'viem';
import { useProposeSale } from '../hooks/useContract';

const TRANSFERTRUST_CONTRACT_ADDRESS = CONTRACT_ADDRESS;

export default function Home() {
  const { isConnected } = useAccount();
  const { proposeSale } = useProposeSale();
  const contract = implementContract();
  const [tokenId, setTokenId] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleProposeSale = async () => {
    if (!tokenId || !buyerAddress) return;

    try {
      setIsLoading(true);
      await proposeSale(tokenId, buyerAddress);
      alert('Sale proposed successfully');
    } catch (error) {
      console.error('Error proposing sale:', error);
      alert('Error proposing sale');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>TransferTrust App</title>
        <meta
          content='TransferTrust App, a decentralized application for managing vehicle certificates'
          name='TransferTrust App'
        />
        <link href='./logo.png' rel='icon' />
      </Head>
      <nav className='bg-white shadow-lg'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex items-center'>
              <img
                src='../styles/images/logo.png'
                alt='TransferTrust Logo'
                className='h-8 w-8 mr-2'
              />
              <h1 className='text-2xl font-bold text-gray-900'>Logo here!</h1>
              <h3>Sell your car with TransferTrust</h3>
            </div>
            <div className='flex items-center'>
              <ConnectButton />
            </div>
          </div>
        </div>
      </nav>

      <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
        {isConnected ? (
          <section className='grid grid-cols-1 gap-6'>
            <article className='bg-white shadow sm:rounded-lg p-6'>
              <h2 className='text-xl font-semibold mb-4'>Propose Sale</h2>
              <div className='flex flex-col'>
                <input
                  type='text'
                  placeholder='Token ID'
                  value={tokenId}
                  onChange={(e) => setTokenId(e.target.value)}
                  className='mb-2 p-2 border rounded'
                />
                <input
                  type='text'
                  placeholder='Buyer Address'
                  value={buyerAddress}
                  onChange={(e) => setBuyerAddress(e.target.value)}
                  className='mb-2 p-2 border rounded'
                />
                <button
                  onClick={handleProposeSale}
                  disabled={isLoading}
                  className='bg-blue-500 text-white p-2 rounded'
                >
                  {isLoading ? 'Processing...' : 'Transfer Ownership'}
                </button>
              </div>
            </article>
          </section>
        ) : (
          <div className='text-center py-12'>
            <h2 className='text-2xl font-semibold text-gray-900'>
              Please connect your wallet to use TransferTrust
            </h2>
            <p className='mt-2 text-gray-600'>
              Connect your wallet to create and manage vehicle certificates
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
