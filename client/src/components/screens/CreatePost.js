
const CreatePost = () => {
    return (
        <div className='card'
            style={{
                margin: "5% auto",
                maxWidth: "50%",
                padding: "10px"
            }}>
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="caption" />
            <div className="file-field input-field">
                <div className="btn #039be5 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>

            <button className="waves-effect waves-light btn #039be5 blue darken-1" style={{margin : "auto 40%" , height : "62px" , width : "100px" , borderRadius : "10%"}}>Post</button>


        </div>
    )
}

export default CreatePost
