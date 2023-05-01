import { FcLike } from "react-icons/fc";
import { useEffect, useState } from "react";



const Home = () => {



  const [images, setImages] = useState([]);



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
                <FcLike />
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
