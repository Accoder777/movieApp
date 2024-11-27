import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiController } from "../service/apiControl";

export const store= configureStore({
    reducer: {
        [apiController.reducerPath] : apiController.reducer
    },
     // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiController.middleware),
})

setupListeners(store.dispatch)