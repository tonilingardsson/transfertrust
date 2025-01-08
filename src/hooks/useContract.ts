import {
  useReadContract,
  useWriteContract,
  usePublicClient,
  useWalletClient,
} from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../utils/abi';
import carData from '../data/carCertificate.json';

export const implementContract = () => {
  const provider = usePublicClient();
  const { data: signer } = useWalletClient();

  const contract = useWriteContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: CONTRACT_ABI,
    signerOrProvider: signer || provider,
  });

  return contract;
};

export function useProposeSale() {
  const { writeContract } = useWriteContract();

  const proposeSale = async (tokenId: string, buyerAddress: string) => {
    try {
      const { write } = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'transferFrom',
        args: [tokenId, buyerAddress],
      });
      return write();
    } catch (error) {
      console.error('Propose sale error:', error);
      throw error;
    }
  };

  return { proposeSale };
}

export function useMintCertificate() {
  const { writeContract } = useWriteContract();

  const mintCertificate = async () => {
    try {
      const { write } = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'createCarStatusCertificate',
        args: [
          carData.vin,
          carData.make,
          carData.model,
          carData.year,
          carData.currentMileage,
          carData.cpuErrors,
          carData.lastServiceMileage,
          carData.serviceHistory,
          carData.insuranceHistory,
          carData.price,
        ],
      });
      return write();
    } catch (error) {
      console.error('Minting error:', error);
      throw error;
    }
  };

  return { mintCertificate };
}
