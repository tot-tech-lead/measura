import 'react-native-get-random-values';
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  projects: new Array(0),
};

const additionalServiceSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addNew: (state, action) => {
      const uniqueId = uuidv4();
      state.projects.push({
        ...action.payload,
        id: uniqueId,
      });
    },
    deleteOne: (state, action) => {
      return {
        projects: state.projects.filter(item => item.id !== action.payload),
      };
    },
    editOne: (state, action) => {
      return {
        projects: state.projects.map(item =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
      };
    },
  },
});

export const { addNew, deleteOne, editOne } = additionalServiceSlice.actions;
export default additionalServiceSlice.reducer;
