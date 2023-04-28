import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const postData = () => {
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (!emailRegex.test(email)) {
      return M.toast({ html: "incorrect email format", classes: "#e53935 red darken-1" })
    }
    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#e53935 red darken-1" })
          // console.log(data.error)

        }
        else {
          M.toast({ html: "signed in successfully", classes: "#1de9b6 teal accent-3" })
          console.log(data)
          navigate('/');
        }
      })
      .catch(err => console.log(err))
  }
  return (
    <div className='mycard'>
      <div className='card auth-card input-field'>
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          className="waves-effect waves-light btn #039be5 light-blue darken-1"
          onClick={postData}
        >
          Login
        </button>

        <Link to="/signup">
          <h5>don't have an account ? </h5>
        </Link>
      </div>
    </div>
  )
}

export default Login
