import { STATUS_FETCH_REQUEST, STATUS_FETCH_SUCCESS, STATUS_FETCH_FAILURE, STATUS_ADD_REQUEST, STATUS_ADD_SUCCESS, STATUS_ADD_FAILURE, STATUS_UPDATE_REQUEST, STATUS_UPDATE_SUCCESS, STATUS_UPDATE_FAILURE, STATUS_DELETE_REQUEST, STATUS_DELETE_SUCCESS, STATUS_DELETE_FAILURE } from "../constants/constants";

const initialState = {
    statuses: [],
    loading: false,
    error: null
};

const statusReducer = (state = initialState, action) => {
    switch (action.type) {
        case STATUS_FETCH_REQUEST:
            return { ...state, loading: true };
        case STATUS_FETCH_SUCCESS:
            return { ...state, loading: false, statuses: action.payload };
        case STATUS_FETCH_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default statusReducer;