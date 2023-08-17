import { combineReducers, configureStore, } from "@reduxjs/toolkit";
import { persistReducer, persistStore, } from "redux-persist"
import createFilter from "redux-persist-transform-filter"
import userSlice from "../features/userSlice";
import storage from "redux-persist/lib/storage"

// saveUserOnlyFilter
const saveUserOnlyFilter = createFilter('user', ["user.user"])

// persist config
const persistConfig = {
    key: "user",
    storage,
    whitelist: ["user"],
    transforms: [saveUserOnlyFilter]
}
const rootRedducer = combineReducers({
    user: userSlice
})
const persitedReducer = persistReducer(persistConfig, rootRedducer)

export const store = configureStore({
    reducer: persitedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
    devTools: true
})


export const persistor = persistStore(store)
