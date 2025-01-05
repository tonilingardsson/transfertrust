import {
  useReadContract,
  useWriteContract,
  usePublicClient,
  useWalletClient,
} from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../utils/abi';

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
