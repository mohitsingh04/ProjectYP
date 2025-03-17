import { API } from "../../context/Api";
import { STATUS_FETCH_REQUEST, STATUS_FETCH_SUCCESS, STATUS_FETCH_FAILURE, STATUS_ADD_REQUEST, STATUS_ADD_SUCCESS, STATUS_ADD_FAILURE, STATUS_UPDATE_REQUEST, STATUS_UPDATE_SUCCESS, STATUS_UPDATE_FAILURE, STATUS_DELETE_REQUEST, STATUS_DELETE_SUCCESS, STATUS_DELETE_FAILURE } from "../constants/constants";

export const getStatuses = () => async (dispatch) => {
    try {
        dispatch({ type: STATUS_FETCH_REQUEST });
        const { data } = await API.get(`/category`);
        dispatch({ type: STATUS_FETCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: STATUS_FETCH_FAILURE,
            // payload: error.message && error.message ? error.message : '',
        });
    }
};