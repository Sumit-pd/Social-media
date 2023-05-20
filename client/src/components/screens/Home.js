import { useEffect, useState } from "react";
import { useUserContext } from "../../App";



const Home = () => {
  const { state, dispatch } = useUserContext()
  const [images, setImages] = useState([]);
  // const [likes, setLikes] = useState(images.like.length);

  useEffect(() => {
    fetch("/allpost", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(data => {
        setImages(data.posts)
        // console.log(data)
      })
  }, [])
  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId: id
      })
    })
      .then(res => res.json())
      .then(result => {
        //this is to update the likes array
        const newArr = images.map(curElem => {
          if (curElem._id === result) {
            return result
          }
          else {
            return curElem;
          }
        })
        setImages(newArr);
        // setLikes(newArr.like.length)
      })
      .catch(err => console.log(err))
  }
  const unLikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId: id
      })
    })
      .then(res => res.json())
      .then(result => {
        //this is to update the likes array
        const newArr = images.map(curElem => {
          if (curElem._id === result) {
            return result
          }
          else {
            return curElem;
          }
        })
        setImages(newArr);
        // setLikes(newArr.like.length)
      })
      .catch(err => console.log(err))
  }

  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        text,
        postId
      })
    })
      .then(res => res.json())
      .then(result => {
        // console.log(result)
        const newArr = images.map(curElem => {
          if (curElem._id === result) {
            return result
          }
          else {
            return curElem;
          }
        })
        setImages(newArr);
        // setLikes(newArr.like.length)
      })
      .catch(err => console.log(err))

  }

  const deletePost = (postId) => {
    fetch(`/deletePost/${postId}`, {
      method: 'delete',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      },
    })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        const newData = images.filter(curElem => {
          return curElem._id !== result._id ;
        })
        setImages(newData)
      })
      .catch(err => console.log(err))
  }
  return (
    <div className='home'>
      {
        images.map((curElem) => {
          return (
            <div className='card home-card' key={curElem._id}>
              <h5>
                {curElem.postedBy.name}
                {
                  //we will only be adding the delete icon if the post belongs to the loggedIn user
                  curElem.postedBy._id === state._id && <i className="material-icons" style={{ float: "right" }} onClick={() => deletePost(curElem._id)}>delete</i>
                }
              </h5>
              <div className='card-image'>
                <img src={curElem.photo} />
              </div>
              <div className='card-content'>
                {
                  curElem.like.includes(state._id)
                    ?
                    <i className="material-icons" onClick={() => unLikePost(curElem._id)}>
                      thumb_down
                    </i> :
                    <i className="material-icons" onClick={() => likePost(curElem._id)}>
                      thumb_up
                    </i>
                }
                <h6 >{curElem.like.length} likes</h6>
                <h5>{curElem.title}</h5>
                <p>{curElem.body}</p>
                {
                  curElem.comments.map(records => {
                    {/* console.log(records) */ }
                    return (<h6 key={records._id}>
                      <span style={{ fontWeight: "500" }}>{records.postedBy.name}</span> <span>{records.text}</span>
                    </h6>)
                  })
                }
                <div style={{ display: "flex" }}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      makeComment(e.target[0].value, curElem._id) //this will log the 0th index of the form array which is the input tag 
                    }} >
                    <input type="text" placeholder="add a comment" />
                    <div style={{ marginRight: "7%" }}>
                      <button className="waves-effect waves-light btn #0288d1 light-blue darken-2" >post</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Home
