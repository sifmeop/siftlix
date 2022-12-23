import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMovieCard } from 'models/movie.interface'

interface FavoritesState {
  favorites: IMovieCard[]
}

const initialState: FavoritesState = {
  favorites: []
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<IMovieCard[]>) => {
      state.favorites = action.payload
    }
  }
})

export const favoritesReducer = favoritesSlice.reducer
export const { addFavorite } = favoritesSlice.actions
