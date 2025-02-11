import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract } from 'wagmi';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import '@rainbow-me/rainbowkit/styles.css';
import { useEffect, useState } from 'react';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../utils/abi';

const TRANSFERTRUST_CONTRACT_ADDRESS = CONTRACT_ADDRESS;

export default function CertificatePage() {
  const { isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tokenId, setTokenId] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    data: certificate,
    isLoading: isCertificateLoading,
    readContract,
    error,
  } = useReadContract({
    abi: CONTRACT_ABI,
    address: TRANSFERTRUST_CONTRACT_ADDRESS,
    functionName: 'getCarDetails',
    args: [+tokenId],
    enabled: Boolean(tokenId) && tokenId.length > 0,
  });

  /* const readNFT = async () => {
  //   try {
  //     setIsLoading(true);
  //     readContract({
  //       abi: CONTRACT_ABI,
  //       address: TRANSFERTRUST_CONTRACT_ADDRESS,
  //       functionName: 'createCarStatusCertificate',
  //       args: [
  //         'VIN123',
  //         'Toyota',
  //         'Corolla',
  //         BigInt(2021),
  //         BigInt(1000),
  //         'No errors',
  //         BigInt(500),
  //         'Service history',
  //         'Insurance history',
  //         BigInt(10000),
  //       ],
  //     });
  //   } catch (error) {
  //     console.error('Reading NFT failed:', error);
  //     alert('Failed to create certificate');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }; */

  const readNFT = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenId(e.target.value);
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
          name='description'
        />
        <img src='../styles/images/logo.png' rel='icon' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>TransferTrust®</h1>

        {isConnected ? (
          <div className='mt-8'>
            <input
              type='text'
              placeholder='Enter Token ID'
              value={tokenId}
              onChange={readNFT}
              className='border border-gray-300 rounded-md px-4 py-2'
            />

            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}

            {certificate && (
              <div className='mt-4'>
                <h2>NFT Data:</h2>
                <pre>{certificate.vin}</pre>
                <pre>{certificate.make}</pre>
                <pre>{certificate.model}</pre>
                <pre>{certificate.mileage}</pre>
                <pre>{certificate.cpuErrors}</pre>
                <pre>{certificate.serviceHistory}</pre>
                <pre>{certificate.insuranceHistory}</pre>
              </div>
            )}
          </div>
        ) : (
          <ConnectButton />
        )}
      </main>
    </div>
  );
}

{
  /* <div className='flex justify-between h-16'>
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
                onClick={readNFT}
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
} */
}
