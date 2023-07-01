import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from "materialize-css"


const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [image, setImage] = useState()
  const [url, setUrl] = useState();


  useEffect(() => {
    if(url){
      uploadFields()
    }
  }, [url])
  const uploadPic = () => {
    const formData = new FormData(); //this is used for file uploading
    //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#uploading_a_file 
    formData.append("file", image);
    formData.append("upload_preset", "insta-clone")
    formData.append("cloud_name", "sumit21") // these two are datas of the cloudnary
    fetch("https://api.cloudinary.com/v1_1/sumit21/image/upload", {
      method: "post",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        setUrl(data.url) //asyncronus 
      })
      .catch(err => console.log(err))
    // does not directly return the JSON response body but instead returns a promise that resolves with a Response object.

  }

  const uploadFields = () => {
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    // var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!emailRegex.test(email)) {
      return M.toast({ html: "incorrect email format", classes: "#e53935 red darken-1" })
    }
    // if (!password.test(password)) {
    //   return M.toast({ html: "", classes: "#e53935 red darken-1" })
    // }
    fetch("/signup", {
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
        }
        else {
          M.toast({ html: data.message, classes: "#1de9b6 teal accent-3" })
          // console.log(data)
          navigate("/login")
        }
      })
      .catch(err => console.log(err))
  }

  const postData = () => {
    if (image) {
      uploadPic()
    }
    else {
      uploadFields()
    }


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
        <input type="text"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div className="file-field input-field">
          <div className="btn #039be5 blue darken-1">
            <span>Upload Image</span>
            <input
              type="file"
              onChange={e => setImage(e.target.files[0])} // in the 0th index there will be a file object
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
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
