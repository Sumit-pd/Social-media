import M from "materialize-css";
// import {useNavigate} from "react-router-dom"
const initialState = "";
const UserReducer = (state, action) => {
    // const navigate = useNavigate()
    if (action.type === "USER") {
        return action.payload;
    }

    if (action.type === "CLEAR") {
        M.toast({ html: "User LoggedOut", classes: "#e53935 red darken-1" });
        // navigate("/"); // Navigate to home page when user logs out
        return null;
    }

    return state;
};

export { initialState, UserReducer };
