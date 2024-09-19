import { Dispatch } from "redux";
import { makeRequest } from "../axios";
import { start, failure, loginSuccess, registerSuccess } from "./userRedux";
import { addProductToWishlist, removeProductFromWishlist, setWishlist } from "./wishlistRedux";

interface User {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

type AppDispatch = Dispatch;

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await makeRequest.post("/auth/register", user);
    dispatch(registerSuccess());
    // Optionally log in the user after registration:
    // dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(failure());
  }
};

// Fetch user's wishlist from backend
export const getWishlist = async (dispatch: Dispatch, userId: string) => {
  try {
    const res = await makeRequest.get(`/wishlist/${userId}`);
    dispatch(setWishlist(res.data));
  } catch (err) {
    console.error("Error fetching wishlist", err);
  }
};

// Add a product to wishlist
export const addToWishlist = async (
  dispatch: Dispatch,
  userId: string,
  productId: string
) => {
  try {
    const res = await makeRequest.post(`/wishlist/${userId}`, { productId });
    dispatch(addProductToWishlist(res.data)); 
  } catch (err) {
    console.error("Error adding product to wishlist", err);
  }
};

// Remove a product from wishlist
export const removeFromWishlist = async (

  dispatch: Dispatch,
  userId: string,
  productId: string
) => {
  try {
  
    await makeRequest.delete(`/wishlist/${userId}/${productId}`);
    dispatch(removeProductFromWishlist(productId));
  } catch (err) {
    console.error("Error removing product from wishlist", err);
  }
};
