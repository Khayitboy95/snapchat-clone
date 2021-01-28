import TextFields from '@material-ui/icons/TextFields';
import Create from '@material-ui/icons/Create';
import Close from '@material-ui/icons/Close';
import Note from '@material-ui/icons/Note';
import MusicNote from '@material-ui/icons/MusicNote';
import AttachFile from '@material-ui/icons/AttachFile';
import Crop from '@material-ui/icons/Crop';
import Timer from '@material-ui/icons/Timer';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { resetCameraImage } from '../redux/cameraReducer';
import './Preview.css'
import { Send } from '@material-ui/icons';
import { v4 as uuid} from 'uuid';
import { db, storage } from './../firebase';
import firebase from 'firebase';

const Preview = () => {

    const cameraImage = useSelector((state) => state.camera.cameraImage);
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.app.user);
    useEffect(() => {
        if(!cameraImage){
            history.replace('/')
        }
    }, [cameraImage, history]);

    const closePreview = () => {
        dispatch(resetCameraImage());
        history.replace('/');
    }
    const sendPost = () => {
        const id = uuid();
        const uploadTask = storage.ref(`posts/${id}`).putString(cameraImage, 'data_url');
        uploadTask.on('state_changed', null, (error) => {
            // error function
            console.log(error);
        }, () => {
            // complete function
            storage.ref('posts').child(id).getDownloadURL().then(url => {
                db.collection('posts').add({
                    imageUrl: url,
                    username: user.username,
                    read: false,
                    profilePic: user.profilePic,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
                history.replace('/chats')
            });
        });
    }

    return (
        <div className='preview'>
            <Close onClick={closePreview} className='preview__close' />
            <div className="preview__toolbarRight">
                <TextFields />
                <Create />
                <Note />
                <MusicNote />
                <AttachFile />
                <Crop />
                <Timer />
            </div>
            <img src={cameraImage} alt=""/>
            <div onClick={sendPost} className="preview__footer">
                <h2>Send Now</h2>
                <Send fontSize="small" className='preview__send' />
            </div>
        </div>
    )
}


export default Preview;