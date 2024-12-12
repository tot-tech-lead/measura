import {combineReducers} from "@reduxjs/toolkit";
import {documentDirectory, EncodingType} from "expo-file-system";
import {createExpoFileSystemStorage} from "redux-persist-expo-file-system-storage";

import CounterReducer from "./counter/counter";
import {persistReducer} from "redux-persist";

console.log('Document Directory:', documentDirectory);

export const expoFileSystemStorage = createExpoFileSystemStorage({
    storagePath: `${documentDirectory}customPathName/`,
    encoding: EncodingType.UTF8,
    debug: true,
});

const persist = (key, reducer) =>
    persistReducer(
        {
            key,
            storage: expoFileSystemStorage,
        },
        reducer
    );

const combinePersistReducers = (keys) =>
    Object.keys(keys).reduce(
        (obj, key) => ({
            ...obj,
            [key]: persist(key, keys[key]),
        }),
        {}
    );

const reducers = combineReducers({
    ...combinePersistReducers({
        count: CounterReducer,
    }),
});

export default reducers;
