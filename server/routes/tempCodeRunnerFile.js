router.delete('/deletePost/:postId', login, (req, res) => {
    Post.findOne({ id: req.params.id }) // finding the post id
        .populate("postedBy", "_id")
        .then(post => {
            if (post.postedBy._id.toString() === req.user._id.toString()) {
                //this is for conversion of the object to string without this will never be true
                post.remove()
                    .then(result => {
                        return res.json(result)
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => {
            return res.status(422).json({ error: err })
        })

});
