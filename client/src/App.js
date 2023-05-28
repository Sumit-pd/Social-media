import { createContext, useContext, useEffect, useReducer } from "react";
import Navbar from "./components/Navbar";
import "./App.css"
import { BrowserRouter, Route, Routes, useNavigate, } from "react-router-dom";
import Home from "./components/screens/Home"
import Profile from "./components/screens/Profile"
import Login from "./components/screens/Login"
import Signup from "./components/screens/Signup"
import Error from "./components/screens/Error";
import CreatePost from "./components/screens/CreatePost";
import UserProfile from "./components/screens/UserProfile";
import SubscriberPost from "./components/screens/SubscriberPost";
import { initialState, UserReducer } from "./reducer/UserReducer";


const UserContext = createContext();


export const useUserContext = () => {
  return useContext(UserContext);
}
const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useUserContext();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      /*if the user exists */
      dispatch({ type: "USER", payload: user })
      // navigate('/')

    }
    else {
      navigate("/login")
    }
  }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={<SubscriberPost />} />
        <Route path="/myprofile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Error />} />
        <Route path="create" element={<CreatePost />} />
        <Route path="/profile/:userid" element={<UserProfile />} />
        <Route path="/explore" element={<Home/>} />
      </Routes>
    </>
  )
}

function App() {

  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }} >
        <BrowserRouter>
          <Navbar />
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}

export default App;
