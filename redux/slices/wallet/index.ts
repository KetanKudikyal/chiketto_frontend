import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BeaconWallet} from '@taquito/beacon-wallet';
import {NetworkType} from '@airgap/beacon-types';


type WalletProps = {
     walletAddress: string;
     loading: 'idle' | 'pending'
}


export const initialState = {
     walletAddress: "Whatsup nigga",
     loading: 'idle'
};

export const connectWallet = createAsyncThunk(
     'connectWallet',
     // if you type your function argument here
     async (userId: number) => {
          const request = await fetch(`https://reqres.in/api/users/${userId}`)
          const response = await request.json()
          const walletAddress = response.data.first_name
          return walletAddress
     }
)


export const walletAddressSlicer = createSlice({
     name: 'walletAddress',
     initialState,
     reducers: {
          setWalletAddress: (state: { walletAddress: string; }, action: PayloadAction<WalletProps>) => {
               state.walletAddress = action.payload.walletAddress;
          },
     },
     extraReducers: (builder) => {
          builder.addCase(connectWallet.pending, (state, action) => {
               if (state.loading === 'idle') {
                    state.loading = 'pending'
                    state.walletAddress = ""
               }
          })
               .addCase(connectWallet.fulfilled, (state, action: PayloadAction<WalletProps>) => {
                    console.log(action)
                    if (
                         state.loading === 'pending'
                    ) {
                         state.loading = 'idle'
                         state.walletAddress = action.payload.walletAddress
                    }
               })
               .addCase(connectWallet.rejected, (state, action) => {
                    if (
                         state.loading === 'pending'
                    ) {
                         state.loading = 'idle'
                         state.walletAddress = ""
                    }
               })
     },
});

// Action creators are generated for each case reducer function
export const { setWalletAddress } = walletAddressSlicer.actions;


export default walletAddressSlicer.reducer;