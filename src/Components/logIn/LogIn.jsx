import React, { useContext, useState } from 'react';
import './logIn.css';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from '../../firebaseConfig';
import {initializeApp} from 'firebase/app';
import { Link} from 'react-router-dom';
import { LoginConext } from '../../App';
// import Cookies from 'js-cookie';
// import { getCookie, storeCoooke } from '../Cookies/Cookies';

const app = initializeApp(firebaseConfig);


export const LogIn = () => {
    const [loginAuth] = useContext(LoginConext);
        
        const [error,setError]=useState('');
        // const navigate=useNavigate();

// Google Sign In

    const [uinfo,setUinfo]=useState({});

    const handleGoogleLogIn=()=>{
        const googleProvaider = new GoogleAuthProvider();

        const auth = getAuth(app);
        signInWithPopup(auth, googleProvaider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
                if (user) {
                    setUinfo(user);
                };
                console.log(user)
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            setError({errorCode:errorCode,errorMessage:errorMessage});
          });
          console.log(uinfo);
         console.log(error);
    };
    
    // Email Sign in 

  
    // LogIn Controll
    const [logInUser,setLogInUser]=useState({
        email:'',
        password:'',
    });

    const hanldeLogInInfo=(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setLogInUser({...logInUser,[name]:value});
    };

    const handleLogIn=async()=>{
        const {email,password}=logInUser;
        if (email&&password) {
            await fetch("/logIn",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:email,
                    password:password
                })
            }).then(res=>res.json())
            .then((res)=>{
               alert(res.message);
               window.location.href="/home";
            })
            .catch((error)=>{
                setError(error.message);
            });
        };
    };

    // console.log(getCookie('userToken'));

    const showPassWord=()=>{
        document.getElementById('password').type="text";
      };
      const HidePassWord=()=>{
        document.getElementById('password').type="password";
    };
    // setTimeout(() => {
    //     document.querySelector('.error').style.display="none";
    // }, 3000);
  return (
    <div>
       {
        loginAuth ?'':(
            <>
                <h1>LogIn</h1>
                {/* log in with google */}
        
        
                <div className="emailLogIn">
                    <form  className='LogInForm' onSubmit={(e)=>e.preventDefault()}>
                        <input onChangeCapture={hanldeLogInInfo} required type="email" name="email" placeholder='Give an email' />
                        <input onChangeCapture={hanldeLogInInfo} onMouseUp={showPassWord} onMouseOut={HidePassWord} required type="password" name="password" id='password'  placeholder='Give your Password'/>
                        <button type='submit' onClick={handleLogIn}>LogIn</button>
                    </form>
                    <p className='error' style={{color:'red'}}>{error}</p>
                    <p>No Have Account.?-{">"} <Link to={'/register'}><button>SignUp</button></Link></p>
                    
                </div>
                <div className="googleLogIn">
                <button onClick={handleGoogleLogIn}>LogIn With Google</button>
                </div>
            </>
        )
       }
    </div>
  );
};
