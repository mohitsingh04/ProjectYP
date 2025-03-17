import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE } from "../constants/constants";

let initialState = {
    users: {},
}

const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REGISTER_SUCCESS:
            return ({
                ...state,
                users: {
                    ...state.users,
                    users: [...state.users.users, action.payload]
                }
            });
        case USER_LOGIN_SUCCESS:
            return ({
                ...state,
                user: action.payload
            });
        default:
            return state;
    }
};


export default userAuthReducer;