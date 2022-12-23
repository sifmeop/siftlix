import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './slices/userSlice'
import { theMovieDB } from './api/theMovieDB'
import { favoritesReducer } from './slices/favoritesSlice'
import { reviewsReducer } from './slices/reviewsSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    favorites: favoritesReducer,
    reviews: reviewsReducer,
    [theMovieDB.reducerPath]: theMovieDB.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(theMovieDB.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
