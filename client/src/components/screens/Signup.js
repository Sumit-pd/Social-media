import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='mycard'>
      <div className='card auth-card input-field'>
        <h2>Instagram</h2>
        <input type="text" placeholder="name" />
        <input type="text" placeholder="email" />
        <input type="text" placeholder="password" />
        <a className="waves-effect waves-light btn #039be5 light-blue darken-1">Signup</a>
        <Link to="/login">
          <h5>already have an account ? </h5>
        </Link>
      </div>
    </div>
  )
}

export default Signup
