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
