import './App.css';
import store from './redux/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import WebcamCapture from './components/WebcamCapture';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Preview from './components/Preview';
import Chats from './components/Chats';
import ChatView from './components/ChatView';
import Login from './components/Login';
import { auth } from './firebase';
import { login, logout } from './redux/appReducer';
import { useEffect } from 'react';

function App() {

  const user = useSelector((state) => state.app.user);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid
        }))
      } else {
        dispatch(logout());
      }
    })
  }, [])

  return (
    <div className="app">
      {!user ? (
        <Login />
      ):(
        <>
          <img className="app__logo" src="https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg" alt=""/>
          <div className="app_body">
            <div className="app__bodyBackground">
              <Switch>
                <Route path='/chats/view'>
                  <ChatView />
                </Route>
                <Route path='/chats'>
                  <Chats />
                </Route>
                <Route path='/preview'>
                  <Preview />
                </Route>
                <Route exact path='/'>
                  <WebcamCapture />
                </Route>
              </Switch>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


const MainApp = () => {
  return (
    <Provider store={store}  >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
}

export default MainApp;
