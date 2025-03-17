import { combineReducers } from "@reduxjs/toolkit";
import userAuthReducer from "./reducers/authReducer";
import { alertsSlice } from "./reducers/alertReducer";

const reducer = combineReducers({
    userAuth: userAuthReducer,
    alerts: alertsSlice.reducer
});

export default reducer;