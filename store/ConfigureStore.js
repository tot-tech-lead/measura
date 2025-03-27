import { combineReducers } from '@reduxjs/toolkit';
import CustomFileSystemStorage from './CustomFSStorage';
import ServicesReducer from './services/services';
import AdditionalReducer from './additionalServices/additionalServices';
import ProjectsReducer from './projects/projects';
import { persistReducer } from 'redux-persist';

const persist = (key, reducer) =>
  persistReducer(
    {
      key,
      storage: CustomFileSystemStorage, // Use the custom storage
    },
    reducer
  );

const combinePersistReducers = keys =>
  Object.keys(keys).reduce(
    (obj, key) => ({
      ...obj,
      [key]: persist(key, keys[key]),
    }),
    {}
  );

const reducers = combineReducers({
  ...combinePersistReducers({
    services: ServicesReducer,
    additionalServices: AdditionalReducer,
    projects: ProjectsReducer,
  }),
});

export default reducers;
