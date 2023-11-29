import React, { useEffect, useState } from 'react';
import './editProfile.css';
import { useParams,useNavigate } from 'react-router-dom';

 const EditProfile = () => {
    const navigate=useNavigate();
    const {user}=useParams();
    const [userId,setUserId]=useState('');
    const [userInfo,setUserInfo]=useState({});
    const [userNewdata,setUserNewdata]=useState({
        name:'',
        // profilePhoto:'',
        bio:''
    });
    useEffect(() => {
        fetch(`/users/${user}`)
        .then(res=>res.json())
        .then((res)=>{
            setUserId(res._id);
            setUserInfo(res);
            // console.log(res._id)
       });
       }, []);

       const newData=(e)=>{
        setUserNewdata({
            ...userNewdata,
            [e.target.name]:e.target.value
        });
       };

    const handleUpdate=async()=>{
        const {name,bio}=userNewdata;
        if(name && bio){
           await fetch(`/users/${userId}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name:name,
                    bio:bio
                })
            })
            .then(res=>res.json())
            .then((res)=>{
                alert(res.message);
                navigate(`/${userInfo.username}/profile`);
           });
        }
    };

  return (
    <div>
        <div className="editProfile">
            <form className="editProfileForm" onSubmit={(e)=>{e.preventDefault()}}>
                <input onChange={newData} required type="text" placeholder='Set you Name' name='name' id='name' />
                <textarea onChange={newData} required placeholder='Add your Bio' type="text" name='bio' id='bio'></textarea>
                <button className='updateBtn' onClick={handleUpdate} type='submit'>Update</button>
            </form>
        </div>
    </div>
  );
};
export default EditProfile;