import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { StoreType } from "./types";

interface AppState {
    login: StoreType | null;
    fromStoreApp: boolean
}

const initialState: AppState = {
    login: null,
    fromStoreApp: false
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoginReducer: (state, action: PayloadAction<StoreType>) => {
            state.login = action.payload;
        },
        clearLoginReducer: (state) => {
            state.login = null;
        },
        setFromStoreApp: (state, action: PayloadAction<boolean>) => {
            state.fromStoreApp = action.payload;
        }
    }
});

export const { setLoginReducer, clearLoginReducer, setFromStoreApp } = appSlice.actions;
export const getLoginSelector = (state: RootState) => state.app.login;
export const getFromStoreApp = (state: RootState) => state.app.fromStoreApp;
export default appSlice.reducer;