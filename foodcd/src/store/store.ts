import { configureStore } from "@reduxjs/toolkit";
import  menuSlice  from "./sclices/menuSclice";


//configureStore ko redux Toolkit ka nay import lote
//const sotre htae htae p  export lote
//configureStore mr parameter lat kan
//parameter ka object{}
//object htae me reducer htae
//{reducer:{}}
//reducer htae me sclice tay pr
//eg. reducer :{sclice1,sclice2}

export const store = configureStore({
    reducer:{menu: menuSlice}
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch