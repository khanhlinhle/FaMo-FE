import { createStore } from "redux";

const initialstate = {
    user: {
        email: "",
        isAuthenticated: false
    },
}

function reducer(state = initialstate, action) {
    if (action.type === "LOGIN") {
        state.user = action.payload;
        state.user.isAuthenticated = true;
    } else if (action.type === "LOGOUT") {
        state.user.isAuthenticated = false;
    }
    return state;
}

const store = createStore(reducer);

export default store;