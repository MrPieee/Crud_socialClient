import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';



export const Register = () => {

    const [error,setError]=useState('');
    const navigate=useNavigate();
    const [signUpUser,setSignUpUser]=useState({
        email:'',
        username:'',
        password:'',
    });

      // SignUp Controll

      const hanldeSignupInfo=(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setSignUpUser({...signUpUser,[name]:value});
    };
    const handleSignUp=async()=>{
        if (signUpUser) {
            const {email,username,password}=signUpUser;
           await fetch("/signUp",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:email,
                    username:username,
                    password:password
                })
            }).then(res=>res.json())
            .then((res)=>{
                alert(res.message);
                navigate("/logIn");
            })
            .catch((error)=>{
                setError(error.message);
            });
        }
    };

    const showPassWord=()=>{
        document.getElementById('password').type="text";
      };
      const HidePassWord=()=>{
        document.getElementById('password').type="password";
    };

  return (
    <div>
        <h1>Register</h1>

        <div className="emailSignUp">
            <form className='signUpForm' onSubmit={(e)=>e.preventDefault()}>
                <input onChangeCapture={hanldeSignupInfo} required type="email" name="email" id='email' placeholder='Set an email' />
                <input onChangeCapture={hanldeSignupInfo} required type="text" name='username' id='username' placeholder='Give A Unique Username' />
                <input onChangeCapture={hanldeSignupInfo} onMouseUp={showPassWord} onMouseOut={HidePassWord} required type="password" id='password' name="password"  placeholder='Set a strong Password'/>
                <button type='submit' onClick={handleSignUp}>SignUp</button>
            </form>
            <p className='error' style={{color:'red'}}>{error}</p>
            <p>Already Have an Account.?-{">"} <Link to={'/logIn'}><button >LogIn</button></Link></p>
        </div>

    </div>
  );
};
