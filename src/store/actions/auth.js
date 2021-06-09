import axios from "axios";
import { HeaderConfig } from "./util";

const DJANGO_URL = "http://localhost:8000/api";

export const LoginAction = (data) => async (dispatch) => {
  dispatch({
    type: "LOGIN",
    payload: data,
  });
};

export const AuthError = () => async (dispatch) => {
  dispatch({
    type: "AUTH_ERROR"
  });
};



export const LogoutAction = () => async (dispatch) => {
  localStorage.removeItem('token');
  dispatch({
    type: "LOGOUT",
    payload: {},
  });
};



export const LoadUser = () => async (dispatch, getState) => {

  dispatch({ type: "USER_LOADING" });
  console.log("test1010")
  await axios
    .get(DJANGO_URL+'/auth/user', HeaderConfig(getState))
    .then((res) => {
      dispatch({
        type: "USER_LOADED",
        payload: res.data,
      });

      localStorage.setItem('user', res.data.user)
    })
    .catch((err) => {
      console.log(err, "eeeee")
      dispatch({
        type: "AUTH_ERROR",
      });
    });

};
// LOGIN USER
export const login = (user) => async (dispatch) => {

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request BodySELFIE_UPLOADED
  const body = JSON.stringify(user);

  await axios 
    .post(DJANGO_URL+'/auth/login', body, config)
    .then((res) => {
      
       dispatch({
        type: "LOGIN_SUCCESS",
        payload:res.data
      });
      console.log(res.data, "kund8i")
      localStorage.setItem('token', res.data.token)
    })
    .catch((err) => {
      dispatch({
        type: "LOGIN_FAIL",
      });
    });
};