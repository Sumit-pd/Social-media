import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CreatePost from './screens/CreatePost'
import { useUserContext } from '../App'

const Navbar = () => {
    const { state, dispatch } = useUserContext();
    const navigate = useNavigate();
    return (
        <div>
            <nav>
                <div className="nav-wrapper white">
                    <a href="/" className="brand-logo left">Instagram</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="profile">Profile</Link></li>
                        <li><Link to="create">Create Post</Link></li>
                        <li><button
                            className="waves-effect waves-light btn #d32f2f red darken-2"
                            onClick={() => {
                                localStorage.clear();
                                dispatch({ type: "CLEAR" });
                                navigate('/login')
                            }}
                        >Logout</button></li>
                    </ul>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
