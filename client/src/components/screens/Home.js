import { useEffect, useState } from "react";
import { useUserContext } from "../../App";



const Home = () => {
  const { state, dispact } = useUserContext()
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
  return (
    <div className='home'>
      {
        images.map((curElem) => {
          return (
            <div className='card home-card' key={curElem._id}>
              <h5>{curElem.postedBy.name}</h5>
              <div className='card-image'>
                <img src={curElem.photo} />
              </div>
              <div className='card-content'>
                {
                  curElem.like.includes(state._id)
                    ?
                    <i className="material-icons"
                      onClick={() => {
                        unLikePost(curElem._id)
                      }}>thumb_down</i> :
                    <i className="material-icons"
                      onClick={() => {
                        likePost(curElem._id)
                      }}
                    >thumb_up</i>
                }
                <h6 >{curElem.like.length} likes</h6>
                <h5>{curElem.title}</h5>
                <p>{curElem.body}</p>
                <div style={{ display: "flex" }}>
                  <input type="text" placeholder="add a comment" />
                  <div style={{ marginRight: "7%" }}>
                    <button className="waves-effect waves-light btn #0288d1 light-blue darken-2" >
                      post
                    </button>
                  </div>

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
