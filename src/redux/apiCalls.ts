import { Dispatch } from "redux";
import { makeRequest } from "../axios";
import { 
  start, 
  failure, 
  loginSuccess, 
  registerSuccess, 
  updateUserSuccess, 
  addPaymentSuccess, 
  editPaymentSuccess, 
  deletePaymentSuccess, 
  fetchPaymentsSuccess, 
  IPaymentMethod
} from "./userRedux";
import { addProductToWishlist, removeProductFromWishlist, setWishlist } from "./wishlistRedux";
import { startAddress, failureAddress, setAddresses, addAddressSuccess, updateAddressSuccess, deleteAddressSuccess } from "./addressRedux";
import { RatingStart, getRatingSuccess, getProductRatingSuccess, addOrUpdateRatingSuccess, deleteRatingSuccess, RatingFailure } from "./RattingRedux";
import {
  CommentStart,
  getCommentsSuccess,
  addCommentSuccess,
  deleteCommentSuccess,
  CommentFailure,
} from "./commentRedux";


interface User {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

interface UpdateUserData {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

interface IComment {
  _id?: string;
  userId?: string;
  productId?: string;
  comment: string;
  createdAt?: string;
}

type AppDispatch = Dispatch;

// User Authentication API calls
export const login = async (dispatch: AppDispatch, user: User): Promise<void> => {
  dispatch(start());
  try {
    const res = await makeRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(failure());
  }
};

export const register = async (dispatch: AppDispatch, user: User): Promise<void> => {
  dispatch(start());
  try {
    await makeRequest.post("/auth/register", user);
    dispatch(registerSuccess());
  } catch (err) {
    console.log(err);
    dispatch(failure());
  }
};

// Fetch and manage wishlist API calls
export const getWishlist = async (dispatch: Dispatch, userId: string) => {
  try {
    const res = await makeRequest.get(`/wishlist/${userId}`);
    dispatch(setWishlist(res.data));
  } catch (err) {
    console.error("Error fetching wishlist", err);
  }
};

export const addToWishlist = async (dispatch: Dispatch, userId: string, productId: string) => {
  try {
    const res = await makeRequest.post(`/wishlist/${userId}`, { productId });
    dispatch(addProductToWishlist(res.data));
  } catch (err) {
    console.error("Error adding product to wishlist", err);
  }
};

export const removeFromWishlist = async (dispatch: Dispatch, userId: string, productId: string) => {
  try {
    await makeRequest.delete(`/wishlist/${userId}/${productId}`);
    dispatch(removeProductFromWishlist(productId));
  } catch (err) {
    console.error("Error removing product from wishlist", err);
  }
};

// User update API call
export const updateUser = async (dispatch: AppDispatch, userId: string, updateData: UpdateUserData): Promise<void> => {
  dispatch(start());
  try {
    const res = await makeRequest.put(`/users/${userId}`, updateData);
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    console.log("Error updating user:", err);
    dispatch(failure());
  }
};

// Address management API calls
export const getAddresses = async (dispatch: Dispatch, userId: string) => {
  dispatch(start());
  try {
    const res = await makeRequest.get(`/address/${userId}`);
    dispatch(setAddresses(res.data));
  } catch (err) {
    console.error("Error fetching addresses", err);
    dispatch(failure());
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addAddress = async (dispatch: Dispatch, userId: string, addressData: any) => {
  dispatch(startAddress());
  try {
    const res = await makeRequest.post(`/address/${userId}`, addressData);
    dispatch(addAddressSuccess(res.data));
  } catch (err) {
    console.error("Error adding address", err);
    dispatch(failureAddress());
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateAddress = async (dispatch: Dispatch, userId: string, addressId: string, addressData: any) => {
  dispatch(startAddress());
  try {
    const res = await makeRequest.put(`/address/${userId}/${addressId}`, addressData);
    dispatch(updateAddressSuccess(res.data));
  } catch (err) {
    console.error("Error updating address", err);
    dispatch(failureAddress());
  }
};

export const deleteAddress = async (dispatch: Dispatch, userId: string, addressId: string) => {
  dispatch(startAddress());
  try {
    await makeRequest.delete(`/address/${userId}/${addressId}`);
    dispatch(deleteAddressSuccess(addressId));
  } catch (err) {
    console.error("Error deleting address", err);
    dispatch(failureAddress());
  }
};

// Payment method management API calls

// Fetch Payment Methods
export const fetchPayments = async (dispatch: AppDispatch, userId: string) => {
  dispatch(start());
  try {
    const res = await makeRequest.get(`/users/get-payment/${userId}`);
    dispatch(fetchPaymentsSuccess(res.data));
  } catch (err) {
    console.log("Error fetching payments:", err);
    dispatch(failure());
  }
};

// Add Payment Method
export const addPayment = async (dispatch: AppDispatch, userId: string, paymentMethod: IPaymentMethod) => {
  dispatch(start());
  try {
    console.log("In payment add", paymentMethod)
    const res = await makeRequest.post(`/users/add-payment/${userId}`, paymentMethod);
    console.log("Add response: ",res.data)
    dispatch(addPaymentSuccess(res.data));
  } catch (err) {
    console.log("Error adding payment:", err);
    dispatch(failure());
  }
};

// Edit Payment Method
export const editPayment = async (dispatch: AppDispatch, userId: string, paymentMethodId: string, paymentMethod: IPaymentMethod) => {
  dispatch(start());
  try {
    const res = await makeRequest.put(`/users/${userId}/payment-method/${paymentMethodId}`, paymentMethod);
    dispatch(editPaymentSuccess(res.data));
  } catch (err) {
    console.log("Error editing payment:", err);
    dispatch(failure());
  }
};

export const deletePayment = async (dispatch: AppDispatch, userId: string, paymentMethodId: string) => {
  dispatch(start());
  try {
    const res = await makeRequest.delete(`/users/delete-payment/${userId}/${paymentMethodId}`);
    // Dispatch the updated payment methods array from the response
    dispatch(deletePaymentSuccess(res.data)); // `res.data` contains the updated array
  } catch (err) {
    console.log("Error deleting payment:", err);
    dispatch(failure());
  }
};


//Rating Api call Functions

// Fetch a user's product rating
export const fetchUserProductRating = async (dispatch: Dispatch, userId: string, productId: string) => {
  console.log("in fetching")
  dispatch(RatingStart());
  try {
    console.log("in try fetchUserProductRating fetching")
    const res = await makeRequest.get(`/rating/userProduct/${userId}/${productId}`);
     console.log("user rating from api: ",res.data)
    dispatch(getRatingSuccess(res.data));
  } catch (err) {
    console.log("Error catch fetch fetchUserProductRating: ",err)
    dispatch(RatingFailure());
  }
};

// Fetch overall product rating (average and total)
export const fetchProductRating = async (dispatch: Dispatch, productId: string) => {
  dispatch(RatingStart());
  try {
    const res = await makeRequest.get(`/rating/product/${productId}`);

    // Check if the response data is null or if there are no ratings
    if (!res.data || (res.data && res.data.rating === null)) {
      // If no rating data is returned, set the Redux productRating to null
      dispatch(getProductRatingSuccess(null));
    } else {
      // If rating data is returned, dispatch it to Redux
      dispatch(getProductRatingSuccess(res.data));
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error fetching product rating:", err);

    // Set the Redux state to null if an error occurs
    dispatch(getProductRatingSuccess(null));
    dispatch(RatingFailure());
  }
};




// Add or update a rating
export const addOrUpdateRating = async (dispatch: Dispatch, userId: string, productId: string, rating: number) => {
  dispatch(RatingStart());
  try {
    const res = await makeRequest.post(`/rating/addOrUpdate`, { userId, productId, rating });
    dispatch(addOrUpdateRatingSuccess(res.data.rating));
  } catch (err) {
    console.log("Error: ",err)
    dispatch(RatingFailure());
  }
};

// Delete a rating
export const deleteRating = async (dispatch: Dispatch, userId: string, productId: string) => {
  dispatch(RatingStart());
  try {
    await makeRequest.delete(`/rating/${userId}/${productId}`);
    dispatch(deleteRatingSuccess({ userId, productId }));
  } catch (err) {
    console.log("Error: ",err)
    dispatch(RatingFailure());
  }
};

// comments

// Fetch all comments for a specific product
export const fetchComments = async (productId:string, dispatch:AppDispatch) => {
  dispatch(CommentStart());
  try {
    const res = await makeRequest.get(`/comments/product/${productId}`);
    dispatch(getCommentsSuccess(res.data));
  } catch (err) {
    console.log("Error: ",err)
    dispatch(CommentFailure());
  }
};

// Add a new comment
export const addComment = async (commentData:IComment, dispatch:AppDispatch) => {
  dispatch(CommentStart());
  try {
    const res = await makeRequest.post("/comments", commentData);
    dispatch(addCommentSuccess(res.data));
  } catch (err) {
    console.log("Error: ",err)
    dispatch(CommentFailure());
  }
};

// Delete a comment
export const deleteComment = async (commentId:string, dispatch:AppDispatch) => {
  dispatch(CommentStart());
  try {
    await makeRequest.delete(`/comments/${commentId}`);
    dispatch(deleteCommentSuccess({ _id: commentId }));
  } catch (err) {
    console.log("Error: ",err)
    dispatch(CommentFailure());
  }
};