import { combineReducers } from '@reduxjs/toolkit';
import walletAddress from './wallet';


export const rootReducer = combineReducers({
     walletAddress: walletAddress,
});

export type RootState = ReturnType<typeof rootReducer>;