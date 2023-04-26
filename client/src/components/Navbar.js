import React from 'react'
import { Link } from 'react-router-dom'
import CreatePost from './screens/CreatePost'
const Navbar = () => {
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
                    </ul>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
