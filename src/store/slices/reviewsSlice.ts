import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMovieCard } from 'models/movie.interface'

interface ReviewsState {
  reviews: IMovieCard[]
}

const initialState: ReviewsState = {
  reviews: []
}

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReviews: (state, action: PayloadAction<IMovieCard[]>) => {
      state.reviews = action.payload
    }
  }
})

export const reviewsReducer = reviewsSlice.reducer
export const { addReviews } = reviewsSlice.actions
