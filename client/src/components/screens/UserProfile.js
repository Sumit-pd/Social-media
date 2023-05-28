import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../App';

const UserProfile = () => {
  const { state, dispatch } = useUserContext();
  const [profileData, setProfileData] = useState(null);
  const { userid } = useParams();
  const [isFollow, setIsFollow] = useState(
    state ? (state.following ? state.following.includes(userid) : false) : false
  )
  // console.log(userid)
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(result => {
        setProfileData(result)
      })
  }, [])

  const followUser = () => {
    fetch("/follow", {
      method: 'put',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt'),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ followId: userid })
    })
      .then(res => res.json())
      .then(result => {
        // console.log(result)

        dispatch({ type: "UPDATE", payload: { followers: profileData.followers, following: profileData.following } })
        localStorage.setItem("user", JSON.stringify(profileData))
        setProfileData(prevData => {
          return {
            ...prevData,
            user: {
              ...prevData.user,
              followers: [...prevData.user.followers, result._id]
            }
          }
        })
        setIsFollow(false);
      })
      .catch(err => console.log(err))

  }
  const unFollowUser = () => {
    fetch("/unfollow", {
      method: 'put',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt'),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ unfollowId: userid })
    })
      .then(res => res.json())
      .then(result => {
        // console.log(result)

        dispatch({ type: "UPDATE", payload: { followers: profileData.followers, following: profileData.following } })
        localStorage.setItem("user", JSON.stringify(profileData))
        setProfileData(prevData => {
          const followArr = prevData.user.followers.filter(item => item !== result._id) // here we are removing the data of the user that has unfollowed
          return {
            ...prevData,
            user: {
              ...prevData.user,
              followers: followArr
            }
          }
        })
        setIsFollow(true)
      })
      .catch(err => console.log(err))

  }

  return (
    <>
      {
        profileData ?
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
                <h4>{profileData.user.name}</h4>
                <div style={{ display: "flex", justifyContent: 'space-between', width: "111%" }}>

                  <h6> {profileData.posts.length} posts</h6>
                  <h6> {profileData.user.followers.length} followers</h6>
                  <h6> {profileData.user.following.length} following</h6>
                  {
                    isFollow === true ?
                      <button
                        className="waves-effect waves-light btn #039be5 light-blue darken-1"
                        onClick={followUser}
                      >follow</button>
                      : <button
                        className="waves-effect waves-light btn #039be5 light-blue darken-1"
                        onClick={unFollowUser}
                      >unfollow</button>

                  }


                </div>
              </div>
            </div>
            <div className='gallery'>
              {
                profileData.posts.map(curElem => {
                  return (
                    <img className='item' src={curElem.photo} alt="photo not avilable" key={curElem._id} />
                  )
                })
              }
            </div>
          </div> : <h2>loading...!</h2>
      }
    </>
  )
}

export default UserProfile
