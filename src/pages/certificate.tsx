import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useContractRead, useReadContract } from 'wagmi';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import '@rainbow-me/rainbowkit/styles.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../utils/abi';

export default function CertificatePage() {
  const { readContract } = useReadContract();
  const { address } = useAccount();
  const { isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Render nothing on the server
  }

  const certificate = async (tokenId: any) => {
    try {
      setIsLoading(true);
      const certificate = await readContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: 'getCertificate',
      });
      console.log('Certificate:', certificate);
      return certificate;
    } catch (error) {
      console.error('Reading failed:', error);
      alert('Failed to read certificate');
      throw error;
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Certificate</title>
        <meta name='description' content='Certificate' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Certificate</h1>

        <p className={styles.description}>
          {isConnected ? (
            <button onClick={certificate} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Read certificate'}
            </button>
          ) : (
            <ConnectButton />
          )}
        </p>
      </main>
    </div>
  );
}
