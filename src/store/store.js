import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import serviceReducer from "./features/serviceSlice";
import contactReducer from "../store/features/contactSlice";

// const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: userReducer,
    contact: contactReducer,
    service: serviceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// export const persistor = persistStore(store);
