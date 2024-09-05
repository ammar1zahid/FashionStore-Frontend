import { Dispatch } from "redux";
import { makeRequest } from "../axios";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";


interface User {
  username: string;
  password: string;
}


type AppDispatch = Dispatch;

export const login = async (dispatch: AppDispatch, user: User): Promise<void> => {
  dispatch(loginStart());
  try {
    const res = await makeRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log(err)
    dispatch(loginFailure());
  }
};
