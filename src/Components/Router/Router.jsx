import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import CreatePost from '../CreatePost/CreatePost';
import { LogIn } from '../logIn/LogIn';
import { LoginConext } from '../../App';
import PrivateRoute from '../PrivateRoute.js';
import { Register } from '../Register/Register.jsx';
import Profile from '../Profiile/Profile.jsx';
import Follower from '../Follower/Follower.jsx';
import EditProfile from '../EditProfile/EditProfile.js';
import ViewPost from '../ViewPost/ViewPost.jsx';
import SingleUser from '../SingleUser/SingleUser.jsx';
import Setting from '../Setting/Setting.jsx';
import OUfollow from '../OUfollow/OUfollow.jsx';


const Router = props => {

  const [loginAuth]=useContext(LoginConext);
  return (
    <div>

        <Routes>
            <Route path='/' element={<Navigate to={loginAuth ? '/home' : '/register'}/>}/>
            <Route path='*' element={<Navigate to={loginAuth ? '/home' : '/register'}/>}/>
            {
              loginAuth ? <Route path='/logIn' element={<Navigate to={'/home'}/>} /> :<Route path='/logIn' element={<LogIn/>} />
            }
            {
              loginAuth ?  <Route path='/register' element={<Navigate to={'/home'}/>} /> : <Route path='/register' element={<Register/>} />
            }

            <Route path='/*' element={<PrivateRoute/>}>
               <Route  path='home' element={<Home/>}/>
               <Route path='createPost' element={<CreatePost/>}/>
               <Route path=':user/profile' element={<Profile/>}/>
               <Route path=':user/profile/edit' element={<EditProfile/>}/>
               <Route path=':user/follower' element={<Follower/>}/>
               <Route path=':user/setting' element={<Setting/>}/>
               <Route path='user/:thatsUsername' element={<SingleUser/>}/>
               <Route path=':ohterUser/follows' element={<OUfollow/>}/>
               <Route path='post/view-post/:postId' element={<ViewPost/>}/>
              
            </Route>
            
        </Routes>

    </div>
  );
};

export default Router;