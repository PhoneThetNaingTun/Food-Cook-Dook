import { SatelliteAlt } from "@mui/icons-material";
import { Menu } from "@mui/material";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

// createSlice()
// createSlice({name,initialState,reducers:action})
// parameter htae ka state so dr ka initialState ka lr
//addMenu so dr ka action
// addMenu htae mr state and action(Payload) parameter lat kan

interface Menu {
  id: number;
  name: string;
  price: number;
}

interface Instate {
  menu: Menu[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: Instate = {
  menu: [],
  isLoading: false,
  error: null,
};
export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<Menu[]>) => {
      state.menu = action.payload;
    },
    addMenu: (state, action: PayloadAction<Menu>) => {
      //state = state + action.payload
      state.menu.push(action.payload);
    },
  },
});

export const { addMenu, setMenu } = menuSlice.actions;
//createSlice ka (action,reducer) ko return pyan
export default menuSlice.reducer;
