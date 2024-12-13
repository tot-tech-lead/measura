import 'react-native-get-random-values';
import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid';

const initialState = {
    services: new Array(0)
};

const serviceSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
        addNew: (state, action) => {
            const uniqueId = uuidv4();
            state.services.push({
                ...action.payload,
                id: uniqueId,
            });
        },
        deleteOne: (state, action) => {
            return state.services.filter(item => item.id !== action.payload);
        },
        editOne: (state, action) => {
            return state.services.map(item =>
                item.id === action.payload.id ? {...item, ...action.payload} : item
            );
        },
    },
});

export const {addNew, deleteOne, editOne} = serviceSlice.actions;
export default serviceSlice.reducer;
