import { useEffect, useState } from 'react'
import M from 'materialize-css'
import { useNavigate } from 'react-router-dom'
const CreatePost = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [caption, setCaption] = useState("")
    const [image, setImage] = useState("") // we need to store the image to a separate storege service and we will store its url in the database
    const [url, setUrl] = useState("")
    useEffect(() => {
        if (url) { // this ensure this function is not triggered when the component resender
            fetch("/createpost", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title, body: caption, url
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
                        navigate("/")
                    }
                })
                .catch(err => console.log(err))

        }
    }, [url]) //this will triggered when the url is changed
    const postData = () => {
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
    return (
        <div className='card'
            style={{
                margin: "5% auto",
                maxWidth: "50%",
                padding: "10px"
            }}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="caption"
                value={caption}
                onChange={e => setCaption(e.target.value)}
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
                className="waves-effect waves-light btn #039be5 blue darken-1"
                style={{ margin: "auto 40%", height: "62px", width: "100px", borderRadius: "10%" }}
                onClick={postData}
            >
                Post
            </button>


        </div>
    )
}

export default CreatePost
