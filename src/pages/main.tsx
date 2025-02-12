import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import '@rainbow-me/rainbowkit/styles.css';
import { useMintCertificate } from '../hooks/useContract';
import { useEffect, useState } from 'react';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../utils/abi';
import { log } from 'console';
import { useWriteContract } from 'wagmi';

const TRANSFERTRUST_CONTRACT_ADDRESS = CONTRACT_ADDRESS;

export default function Home() {
  const { writeContract } = useWriteContract();
  const { isConnected } = useAccount();
  const { mintCertificate } = useMintCertificate();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMint = async () => {
    try {
      setIsLoading(true);
      writeContract({
        abi: CONTRACT_ABI,
        address: TRANSFERTRUST_CONTRACT_ADDRESS,
        functionName: 'createCarStatusCertificate',
        args: [
          '3X4M3N54RB3T3',
          'Toyota',
          'Verso',
          2015,
          123456789,
          'No errors',
          987654321,
          'Service history',
          'Insurance history',
          10000,
        ],
      });
    } catch (error) {
      console.error('Minting failed:', error);
      alert('Failed to create certificate');
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null; // Render nothing on the server
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>TransferTrust App</title>
        <meta
          content='TransferTrust App for creating and managing vehicle certificates'
          name='TransferTrust App'
        />
        <img src='../styles/images/logo.png' rel='icon' />
      </Head>
      <nav className='bg-white shadow-lg'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex items-center'>
              <img
                src='../styles/images/logo.png'
                alt='TransferTrust Logo'
                title='TransferTrust Logo'
                className='h-8 w-8 mr-2 md:flex sm:hidden'
              />
              <h1 className='text-2xl font-bold text-gray-900'>
                TransferTrust®
              </h1>
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
              <h2 className='text-xl font-semibold mb-4'>
                Create New Vehicle Certificate
              </h2>
              <button
                onClick={handleMint}
                disabled={isLoading}
                className='bg-blue-500 text-white p-2 rounded'
              >
                {isLoading ? 'Creating...' : 'Create Certificate'}
              </button>
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
