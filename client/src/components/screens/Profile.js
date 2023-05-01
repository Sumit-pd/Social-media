import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../App';

const Profile = () => {
  const { state, dispatch } = useUserContext();
  const [myPics, setMyPics] = useState([]);
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(result => {
        setMyPics(result.posts)
        // console.log(result)
      })
  }, [])
  return (
    <div style={{ maxWidth: "70%", margin: "0px auto" }} >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey"

        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80%" }}
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          />
        </div>
        <div>
          <h4>{state.name}</h4>
          <div style={{ display: "flex", justifyContent: 'space-between', width: "111%" }}>

            <h6> 5 posts</h6>
            <h6> 1005 followers</h6>
            <h6> 425 following</h6>

          </div>
        </div>
      </div>
      <div className='gallery'>
        {
          myPics.map(curElem => {
            return (
              <img className='item' src={curElem.photo} alt="photo not avilable" key={curElem._id} />
            )
          })
        }
        {/* <img className='item' src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
        <img className='item' src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
        <img className='item' src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
        <img className='item' src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
        <img className='item' src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
        <img className='item' src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" /> */}
      </div>
    </div>
  )
}

export default Profile
