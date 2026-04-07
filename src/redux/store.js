import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice"
import locationReducer from "./locationSlice"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "../api/baseApi";
import { rtkErrorLogger } from "./rtkErrorLogger";

const persistedAuth = persistReducer({ key: "localease_auth", storage, whitelist: ["user"] }, authReducer);
const persistedTheme = persistReducer({ key: "localease_theme", storage }, themeReducer);
const persistedLocation = persistReducer({ key: "localease_location", storage }, locationReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuth,
        theme: persistedTheme,
        location: persistedLocation,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: { ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/PURGE", "persist/REGISTER"] },
        }).concat(baseApi.middleware, rtkErrorLogger),

})
export const persistor = persistStore(store)