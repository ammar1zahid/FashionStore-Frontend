import { createSlice } from "@reduxjs/toolkit";

// Define the IRating interface to store the necessary data
export interface IRating {
  _id: string;
  userId: string;
  productId: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

interface ProductRating {
  _id: string;
  averageRating: number;
  totalRatings: number;
}

interface RatingState {
  ratings: IRating[];
  productRating: ProductRating | null;
  isFetching: boolean;
  error: boolean;
}

const initialState: RatingState = {
  ratings: [],
  productRating: null,
  isFetching: false,
  error: false,
};

// Redux slice to handle rating actions and state
const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    // Start fetching ratings
    RatingStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    resetRatings: (state) => {
      state.productRating = null;
      state.ratings = [];
    },
    // Successful fetch for a user's product rating
    getRatingSuccess: (state, action) => {
      console.log("In rating success");
      state.isFetching = false;
      const existingRatingIndex = state.ratings.findIndex(
        (r) => r.userId === action.payload.userId && r.productId === action.payload.productId
      );
      if (existingRatingIndex >= 0) {
        state.ratings[existingRatingIndex] = action.payload;
      } else {
        state.ratings.push(action.payload);
      }
    },
    // Successful fetch for overall product rating
    getProductRatingSuccess: (state, action) => {
      console.log("in getProductRatingSuccess");
      state.isFetching = false;
      state.productRating = action.payload;
    },
    // Successful addition or update of a rating
    addOrUpdateRatingSuccess: (state, action) => {
      state.isFetching = false;
      const index = state.ratings.findIndex(
        (rating) => rating.userId === action.payload.userId && rating.productId === action.payload.productId
      );
      if (index >= 0) {
        state.ratings[index] = action.payload; // Update existing rating
      } else {
        state.ratings.push(action.payload); // Add new rating
      }

      // Update the product rating based on the updated ratings array
      const totalRatings = state.ratings.length;
      const averageRating =
        totalRatings > 0
          ? state.ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
          : 0;

      state.productRating = {
        _id: action.payload.productId, // Set the product ID
        averageRating: averageRating,
        totalRatings: totalRatings,
      };
    },
    // Successful deletion of a rating
    deleteRatingSuccess: (state, action) => {
      state.isFetching = false;
      state.ratings = state.ratings.filter(
        (rating) => rating.userId !== action.payload.userId || rating.productId !== action.payload.productId
      );

      // Update the product rating after deletion
      const totalRatings = state.ratings.length;
      const averageRating =
        totalRatings > 0
          ? state.ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
          : 0;

      state.productRating = {
        _id: action.payload.productId,
        averageRating: averageRating,
        totalRatings: totalRatings,
      };
    },
    // Failure case for any rating operation
    RatingFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

// Export actions
export const {
  RatingStart,
  getRatingSuccess,
  getProductRatingSuccess,
  addOrUpdateRatingSuccess,
  deleteRatingSuccess,
  RatingFailure,
  resetRatings,
} = ratingSlice.actions;

// Export reducer
export default ratingSlice.reducer;
