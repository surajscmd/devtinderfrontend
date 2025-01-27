import { createSlice } from "@reduxjs/toolkit";

const requestslice = createSlice({
    name: "request",
    initialState: null,
    reducers:{
        addrequest:(state, action)=>{
            return action.payload 
        },
        removerequest:(state, action)=>{
            const newArr = state.filter((req)=> req._id !== action.payload)
            return newArr;
        }
    }
});

export const {addrequest , removerequest} = requestslice.actions;

export default  requestslice.reducer;