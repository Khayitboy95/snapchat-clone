import { Avatar } from '@material-ui/core'
import { RadioButtonUnchecked } from '@material-ui/icons'
import ChatBubble from '@material-ui/icons/ChatBubble'
import Search from '@material-ui/icons/Search'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { auth, db } from '../firebase'
import { resetCameraImage } from '../redux/cameraReducer'
import Chat from './Chat'
import './Chats.css'

const Chats = () => {

    const [posts, setPosts] = useState([]);
    const user = useSelector((state) => state.app.user);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })))
        })
    }, [])

    const takeSnap = () => {
        dispatch(resetCameraImage());
        history.push("/");
    }

    return (
        <div className="chats">
            <div className="chats__header">
                <Avatar src={user.profilePic} onClick={() => auth.signOut()} className="chats__avatar" />
                <div className="chats__search">
                    <Search className="chats__searchIcon" />
                    <input type="text" placeholder="Friends" />
                </div>
                <ChatBubble className="chats__chatIcon" />
            </div>
            <div className="chat__posts">
                {
                    posts.map(({ id, data: {profilePic, username, timestamp, imageUrl, read},}) => (
                        <Chat key={id} id={id} username={username} timestamp={timestamp} profilePic={profilePic} imageUrl={imageUrl} read={read} />
                    ))
                }
            </div>
            <RadioButtonUnchecked fontSize="large" className="chats__takePicIcon" onClick={takeSnap} />
        </div>
    )
}

export default Chats;