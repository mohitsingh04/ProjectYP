import { API } from "../../context/Api";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAILURE,
  USER_FORGOT_PASSWORD,
  FORGOT_PASSWORD_FAILURE,
  USER_RESET_PASSWORD,
  RESET_PASSWORD_FAILURE,
  USER_CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAILURE,
  VERIFY_USER_EMAIL,
  VERIFY_USER_EMAIL_FAILURE,
  USER_PROFILE_REQUEST,
  USER_PROFILE_FAILURE,
  GET_AUTH_USER_REQUEST,
  GET_AUTH_USER_FAILURE,
} from "../constants/constants";
import { toast } from "react-toastify";

export const register = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const { data } = await API.post("/register", userInfo);
    if (data.message) {
      toast.success(data.message);
      window.location.href = "/login";
    } else {
      toast.error(data.error);
    }
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      // payload: error.message && error.message ? error.message : '',
    });
  }
};

export const login = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await API.post("/login", userInfo);
    if (data.message) {
      localStorage.setItem("accessToken", data.accessToken);
      toast.success(data.message);
      window.location.href = "/dashboard";
    } else {
      toast.error(data.error);
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
    });
  }
};

export const forgotPassword = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: USER_FORGOT_PASSWORD });
    const { data } = await API.post("/forgot-password", userInfo);
    if (data.message) {
      toast.success(data.message);
    } else {
      toast.error(data.error);
    }
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAILURE,
    });
  }
};

export const resetPassword = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: USER_RESET_PASSWORD });
    const { data } = await API.post("/reset", userInfo);
    if (data.message) {
      toast.success(data.message);
    } else {
      toast.error(data.error);
    }
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAILURE,
    });
  }
};

export const changePassword = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: USER_CHANGE_PASSWORD });
    const { data } = await API.post("/change-password", userInfo);
    if (data.message) {
      toast.success(data.message);
    } else {
      toast.error(data.error);
    }
  } catch (error) {
    dispatch({
      type: CHANGE_PASSWORD_FAILURE,
    });
  }
};

export const verifyEmail = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_USER_EMAIL });
    const { data } = await API.post("/verify-email", userInfo);
    if (data.message) {
      toast.success(data.message);
    } else {
      toast.error(data.error);
    }
  } catch (error) {
    dispatch({
      type: VERIFY_USER_EMAIL_FAILURE,
    });
  }
};

export const updateUser = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });
    const { data } = await API.patch(`/user/${userInfo.uniqueId}`, userInfo);
    if (data.message) {
      toast.success(data.message);
    } else {
      toast.error(data.error);
    }
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAILURE,
    });
  }
};

export const getAuthUser = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: GET_AUTH_USER_REQUEST });
    const { data } = await API.get("/profile", userInfo);
    if (data.message) {
      toast.success(data.message);
    } else {
      toast.error(data.error);
    }
  } catch (error) {
    dispatch({
      type: GET_AUTH_USER_FAILURE,
    });
  }
};
