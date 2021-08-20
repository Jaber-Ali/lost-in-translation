import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getTextDataWithId, deleteTextData } from '../../api/translation/translationAPI';
import { getUserData } from '../../api/user/userAPI';
import { POST_LIMIT } from '../../resource/constants';
import { getStorage } from '../../storage';
import Post from "./Post"


const Profile = (props) => {
    const history = useHistory();

    const [posts, setPosts] = useState([]);
    const [limitPosts, setLimitPosts] = useState([]);

    /**
     * Runs first time this page opens, 
     * and when the username gets updated 
     * (when the user logs out on this page).
     */
    useEffect(() => {
        if (!getStorage("username")) {
            history.push('/');
        } else if(posts.length === 0){
            getUserPosts();
            props.handleTitle("Profile");
        }
    },[props.user])

/**
* Gets all posts and the first 10 posts by the currently logged in user
* and updates the states.
*/
    async function getUserPosts() {
        const userId = (await getUserData(getStorage("username")))[0].id;
        const p = (await getTextDataWithId(userId, 0));
        const lp = (await getTextDataWithId(userId, POST_LIMIT));
        setPosts(p);
        setLimitPosts(lp);
    }

/**
* Removes all posts by the logged in user.
*/
    async function handleClearHistory() {
        for (const post of posts)
            (await deleteTextData(post.id))
        setPosts([]);
        setLimitPosts([]);
    }

    return (
        <div className="Profile">
            <div className="button-group">
                <button id="clearTranslationsBtn" onClick={handleClearHistory} className="btn btn-danger" >Clear history</button>
            </div>
            <div className="posts-field-container">
                <div className="posts-field-info bold-text">Posts</div>
                <div className="posts-field">
                    <ul id="post-list" className="bold-text">
                        {
                            limitPosts && limitPosts.map((s, i) => <Post key={i} post={s} />)
                        }
                    </ul>
                </div>
            </div>
        </div>


    );
}

export default Profile;
