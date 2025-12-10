import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import serviceReducer from "./features/serviceSlice";
import contactReducer from "../store/features/contactSlice";
import userServiceReducer from "./features/userServiceSlice";
import accountReducer from "./features/userAcountUpdateSlice";
import blogReducer from "./features/blogSlice";
import reviewReducer from "./features/reviewSlice";

// const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: userReducer,
    contact: contactReducer,
    service: serviceReducer,
    userService: userServiceReducer,
    userAcount: accountReducer,
    blog: blogReducer,
    review: reviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// export const persistor = persistStore(store);
