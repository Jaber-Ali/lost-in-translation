const Post = props => {

    return (
        <li id="post-list-element">
            {props.post.text}
        </li>
    )
}

export default Post;