import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { NETWORK, RPC_NODE } from "../globals";
import { NetworkType } from "@airgap/beacon-types";

// Beacon Wallet instance
export const wallet = new BeaconWallet({
    name: "Sizzler Network Dapp",
    preferredNetwork: NETWORK as NetworkType,
});

// Tezos instance
export const tezos = new TezosToolkit(RPC_NODE);
tezos.setWalletProvider(wallet);
