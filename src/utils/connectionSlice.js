import { createSlice } from "@reduxjs/toolkit";

const connectionslice = createSlice({
    name: "connection",
    initialState: null,
    reducers:{
        addConnection:(state, action)=>{
            return action.payload 
        },
        removeConnection:(state, action)=>{
            return null
        }
    }
});

export const {addConnection , removeConnection} = connectionslice.actions;

export default  connectionslice.reducer;
