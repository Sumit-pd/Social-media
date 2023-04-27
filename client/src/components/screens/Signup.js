import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from "materialize-css"


const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  // const history = useHistory() ;

  const postData = () => {
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    // var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!emailRegex.test(email)) {
      return M.toast({ html: "invalid email", classes: "#e53935 red darken-1" })
    }
    // if (!password.test(password)) {
    //   return M.toast({ html: "", classes: "#e53935 red darken-1" })
    // }
    fetch("http://localhost:3000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, password, email
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#e53935 red darken-1" }) // this will send message present in the error section
          // console.log(data)
        }
        else {
          M.toast({ html: data.message, classes: "#1de9b6 teal accent-3" })
          navigate("/login")
        }
      })

  }
  return (
    <div className='mycard'>
      <div className='card auth-card input-field'>
        <h2>Instagram</h2>
        <input type="text"
          placeholder="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
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
        >Signup</button>
        <Link to="/login">
          <h5 >already have an account ? </h5>
        </Link>
      </div>
    </div>
  )
}

export default Signup
