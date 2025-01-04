import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import '@rainbow-me/rainbowkit/styles.css';
import { implementContract } from '../hooks/useContract';
import { useState } from 'react';
import { CONTRACT_ADDRESS } from '../utils/config';

const TRANSFERTRUST_CONTRACT_ADDRESS = CONTRACT_ADDRESS;

export default function Home() {
  const { isConnected } = useAccount();
  const contract = implementContract();
  const [vehicles, setVehicles] = useState({
    vin: '',
    make: '',
    model: '',
    year: '',
    currentMileage: '',
    cpuErrors: '',
    lastServiceMileage: '',
    serviceHistory: '',
    insuranceHistory: '',
    price: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVehicles({
      ...vehicles,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const tx = await contract?.createCarStatusCertificate(
        vehicles.vin,
        vehicles.make,
        vehicles.model,
        parseInt(vehicles.year),
        parseInt(vehicles.currentMileage),
        vehicles.cpuErrors,
        parseInt(vehicles.lastServiceMileage),
        vehicles.serviceHistory,
        vehicles.insuranceHistory,
        parseInt(vehicles.price)
      );
      await tx.wait();
      console.log('Certificate created successfully:', tx);
      alert('Certificate created successfully');
    } catch (error) {
      console.error('Error creating certificate:', error);
      alert('Error creating certificate');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>TransferTrust App</title>
        <meta
          content='TransferTrust App for creating and managing vehicle certificates'
          name='TransferTrust App'
        />
        <link src='./src/styles/images/logo.png' rel='icon' />
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
              <div className='flex flex-col'>
                <input
                  type='text'
                  name='vin'
                  placeholder='VIN'
                  onChange={handleChange}
                />
                <input
                  type='text'
                  name='make'
                  placeholder='Make'
                  onChange={handleChange}
                />
                <input
                  type='text'
                  name='model'
                  placeholder='Model'
                  onChange={handleChange}
                />
                <input
                  type='number'
                  name='year'
                  placeholder='Year'
                  onChange={handleChange}
                />
                <input
                  type='number'
                  name='currentMileage'
                  placeholder='Current Mileage'
                  onChange={handleChange}
                />
                <input
                  type='text'
                  name='cpuErrors'
                  placeholder='CPU Errors'
                  onChange={handleChange}
                />
                <input
                  type='number'
                  name='lastServiceMileage'
                  placeholder='Last Service Mileage'
                  onChange={handleChange}
                />
                <input
                  type='text'
                  name='serviceHistory'
                  placeholder='Service History'
                  onChange={handleChange}
                />
                <input
                  type='text'
                  name='insuranceHistory'
                  placeholder='Insurance History'
                  onChange={handleChange}
                />
                <input
                  type='number'
                  name='price'
                  placeholder='Price'
                  onChange={handleChange}
                />
                <button
                  className='iekbcc0 iekbcc9 ju367v78 ju367v7t ju367v9i ju367vn ju367vei ju367vf3 ju367v16 ju367v1h ju367v2g ju367v8u _12cbo8i3 ju367v8r _12cbo8i4 _12cbo8i6'
                  onClick={handleSubmit}
                >
                  Create Certificate
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
