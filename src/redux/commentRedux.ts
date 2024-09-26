import { createSlice } from "@reduxjs/toolkit";


// Define the IComment interface to store the necessary data
export interface IComment {
  _id?: string;
  userId?: string;
  productId?: string;
  comment: string;
  createdAt?: string;
}

interface CommentState {
  comments: IComment[];
  isFetching: boolean;
  error: boolean;
}

const initialState: CommentState = {
  comments: [],  // Array of comments
  isFetching: false,
  error: false,
};

// Redux slice to handle comment actions and state
const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    // Start fetching comments
    CommentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    resetComments: (state) => {
      state.comments = [];
    },
    // Successful fetch of comments for a specific product
    getCommentsSuccess: (state, action) => {
      state.isFetching = false;
      state.comments = action.payload;
    },
    // Successful addition of a comment
    addCommentSuccess: (state, action) => {
      state.isFetching = false;
      state.comments.push(action.payload);
    },
    // Successful deletion of a comment
    deleteCommentSuccess: (state, action) => {
      state.isFetching = false;
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload._id
      );
    },
    // Failure case for any comment operation
    CommentFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

// Export actions
export const {
  CommentStart,
  getCommentsSuccess,
  addCommentSuccess,
  deleteCommentSuccess,
  CommentFailure,
  resetComments,
} = commentsSlice.actions;

// Export reducer
export default commentsSlice.reducer;
