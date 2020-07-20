import { createStore } from "redux";

const initialstate = {
    user: {
        email: "",
        isAuthenticated: false,
        userId: ""
    },
}

function reducer(state = initialstate, action) {
    if (action.type === "LOGIN") {
        state.user = action.payload.isAuthenticated;
        // state.user.isAuthenticated = true;
    } else if (action.type === "LOGOUT") {
        state.user.isAuthenticated = false;
    } else if (action.type === "SETUSERID") {
        state.user.userId = action.payload.userId;
        console.log(state.user.userId)
    }
    state = { ...state }
    return state;
}

const store = createStore(reducer);

export default store;