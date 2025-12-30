'use client';

// import { RelayIDL } from '@relay/anchor';
import relayIdl from '../../../anchor/target/idl/relay.json';

import { Program } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';



// Define the interface for the relay entry state
interface RelayEntryState {
  owner: PublicKey;
  title: string;
  message: string;
  recipient: string;
  enc: boolean;
}


interface CreateEntryArgs {
  title: string;
  message: string;
  owner: PublicKey;
  recipient: string;
  enc: boolean;

}

export function useRelayProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = new PublicKey("74sJMY922tbcPNrATAaNuLUPLkkF5HgMMCY3kp85pcSL");
  // const programId = new PublicKey("KBScsXsbBp8cTgzkML8bFRvoYb5E3fRGpxxsaU4hzRz");
  // const programId = new PublicKey("DBPA83yqVRDspVi2sXGWPQbFR4AwuBpFZY79GyKHb53N");

  const idl: any = (relayIdl as any).default ?? relayIdl;


// ✅ DEBUG BLOCK
  console.log("==== RELAY DEBUG START ====");
  console.log("cluster:", cluster);
  console.log("rpc endpoint:", (connection as any)?.rpcEndpoint);
  console.log("provider:", {
    hasProvider: !!provider,
    hasConnection: !!provider?.connection,
    hasWallet: !!provider?.wallet,
    publicKey: provider?.wallet?.publicKey?.toBase58?.(),
  });
  console.log("programId:", programId?.toBase58?.());

  console.log("idl typeof:", typeof idl);
  console.log("idl keys:", idl ? Object.keys(idl) : idl);
  console.log("idl.name:", idl?.name);
  console.log("idl.metadata:", idl?.metadata);
  console.log("idl.version:", idl?.version);

  console.log("idl.instructions length:", idl?.instructions?.length);
  console.log("idl.accounts length:", idl?.accounts?.length);
  console.log("idl.types length:", idl?.types?.length);

  // show first instruction/account if present
  console.log("idl.instructions[0]:", idl?.instructions?.[0]);
  console.log("idl.accounts[0]:", idl?.accounts?.[0]);
  console.log("==== RELAY DEBUG END ====");

  // ✅ Hard guard so it fails with a clear message (instead of Anchor exploding)
  if (!idl || !Array.isArray(idl.instructions)) {
    throw new Error(
      `Relay IDL is not valid. Got: ${JSON.stringify(
        { keys: idl ? Object.keys(idl) : null, idlType: typeof idl },
        null,
        2
      )}`
    );
  }

  // If provider wallet isn't ready yet, don’t construct program yet
  if (!provider?.wallet?.publicKey) {
    console.warn("Provider wallet not ready yet. Skipping Program init.");
    return { program: null };
  }

  // const program = new Program(idl, programId, provider);
  const program = new Program(idl, provider);


  // const program = new Program(RelayIDL, programId, provider);
  // let program;

  // try {
  //   program = new Program(RelayIDL, programId, provider);
  // } catch (error) {
  //   console.error("Failed to initialize program:", error);
  //   return { instructions: [] };
  // }

  // if (!program) {
  //   console.error("Program is not defined");
  //   return { instructions: [] };
  // }

  const accounts = useQuery({
    queryKey: ['relay', 'all', { cluster }],
    queryFn: () => program.account.relayEntryState.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const createEntry = useMutation<string, Error, CreateEntryArgs>({
    mutationKey: ['relayEntry', 'create', { cluster }],
    mutationFn: async ({ title, message, owner, recipient, enc }) => {
      const [relayEntryAddress] = await PublicKey.findProgramAddress(
        [Buffer.from(title), owner.toBuffer()],
        programId
      );
  
      return program.methods
        .createRelayEntry(title, message,  recipient, enc)
        .accounts({
          relayEntry: relayEntryAddress,
        })
        .rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      accounts.refetch();
    },
    onError: (error) => {
      toast.error(`Failed to create relay entry: ${error.message}`);
    },
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    createEntry,
  };
}

export function useRelayProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = useRelayProgram();
  const programId = new PublicKey("8sddtWW1q7fwzspAfZj4zNpeQjpvmD3EeCCEfnc3JnuP");

  const accountQuery = useQuery({
    queryKey: ['relay', 'fetch', { cluster, account }],
    queryFn: () => program.account.relayEntryState.fetch(account),
  });

  const updateEntry = useMutation<string, Error, CreateEntryArgs>({
    mutationKey: ['relayEntry', 'update', { cluster }],
    mutationFn: async ({ title, message, owner, recipient, enc }) => {
      const [relayEntryAddress] = await PublicKey.findProgramAddress(
        [Buffer.from(title), owner.toBuffer()],
        programId
      );
  
      return program.methods
        .updateRelayEntry(title, message, recipient, enc)
        .accounts({
          relayEntry: relayEntryAddress,
        })
        .rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      accounts.refetch();
    },
    onError: (error) => {
      toast.error(`Failed to update relay entry: ${error.message}`);
    },
  });

  const deleteEntry = useMutation({
    mutationKey: ['relay', 'deleteEntry', { cluster, account }],
    mutationFn: (title: string) =>
      program.methods.deleteRelayEntry(title).accounts({ relayEntry: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
  });

  return {
    accountQuery,
    updateEntry, 
    deleteEntry
  };
}
