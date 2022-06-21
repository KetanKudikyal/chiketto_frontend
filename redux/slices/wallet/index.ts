import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { wallet } from "../../../common/wallet";
import { NETWORK } from "../../../globals";
import { NetworkType } from "@airgap/beacon-types";

type WalletProps = {
    walletAddress: string;
    loading: "idle" | "pending";
};

export const initialState = {
    walletAddress: "",
    loading: "idle",
};

export const connectWallet = createAsyncThunk(
    "connectWallet",
    // if you type your function argument here
    async () => {
        let account = await wallet.client.getActiveAccount();
        await wallet.disconnect();
        // debugger
        if (!account) {
            await wallet.requestPermissions({
                network: { type: NETWORK as NetworkType },
            });
            return await wallet.getPKH();
        }
        // debugger
        return account.address;
    }
);

export const fetchWallet = createAsyncThunk(
    "fetchWallet",
    // if you type your function argument here
    async () => {
        let account = await wallet.client.getActiveAccount();
        if (account) {
            return account.address;
        }
    }
);

export const disconnectWallet = createAsyncThunk(
    "disconnectWallet",
    async () => {
        await wallet.clearActiveAccount();
        await wallet.disconnect();
    }
);

export const walletAddressSlicer = createSlice({
    name: "walletAddress",
    initialState,
    reducers: {
        setWalletAddress: (
            state: { walletAddress: string },
            action: PayloadAction<WalletProps>
        ) => {
            state.walletAddress = action.payload.walletAddress;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(connectWallet.pending, (state, action) => {
                console.log(state.loading);
                if (state.loading === "idle") {
                    state.loading = "pending";
                    state.walletAddress = "";
                }
            })
            .addCase(connectWallet.fulfilled, (state, action) => {
                console.log("hggg", action.payload);
                if (state.loading === "pending") {
                    state.loading = "idle";
                    state.walletAddress = action.payload;
                }
            })
            .addCase(connectWallet.rejected, (state, action) => {
                if (state.loading === "pending") {
                    state.loading = "idle";
                    state.walletAddress = "";
                }
            });
        builder
            .addCase(disconnectWallet.pending, (state, action) => {
                if (state.loading === "idle") {
                    state.loading = "pending";
                    state.walletAddress = state.walletAddress;
                }
            })
            .addCase(disconnectWallet.fulfilled, (state, action) => {
                if (state.loading === "pending") {
                    state.loading = "idle";
                    state.walletAddress = "";
                }
            })
            .addCase(disconnectWallet.rejected, (state, action) => {
                if (state.loading === "pending") {
                    state.loading = "idle";
                    state.walletAddress = state.walletAddress;
                }
            });
        builder
            .addCase(fetchWallet.pending, (state, action) => {
                console.log(state.loading);
                if (state.loading === "idle") {
                    state.loading = "pending";
                    state.walletAddress = "";
                }
            })
            .addCase(fetchWallet.fulfilled, (state, action) => {
                if (state.loading === "pending") {
                    state.loading = "idle";
                    state.walletAddress = action.payload || "";
                }
            })
            .addCase(fetchWallet.rejected, (state, action) => {
                if (state.loading === "pending") {
                    state.loading = "idle";
                    state.walletAddress = "";
                }
            });
    },
});

// Action creators are generated for each case reducer function
export const { setWalletAddress } = walletAddressSlicer.actions;

export default walletAddressSlicer.reducer;
