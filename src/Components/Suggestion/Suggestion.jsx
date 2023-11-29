import React, { useEffect, useState } from 'react';
import './suggestion.css';
import { Link } from 'react-router-dom';

const Suggestion = () => {

  const [isLoading,setIsloadding]=useState(true);

  const [sugUsers,setSugUsers]=useState([]);
  const [userFollowings,setUserFollowings]=useState([]);
  const [mainUsername,setMainUsername]=useState('');

  useEffect(() => {
   fetch(`/profile`)
   .then(res=>res.json())
   .then((res)=>{
    setUserFollowings(res.followings);
    setMainUsername(res.username);
      if(res.followings){
          setIsloadding(false)
      }
  });
  
  }, []);
  useEffect(() => {
    fetch(`/users`)
    .then(res=>res.json())
    .then((res)=>{
      if(res){
        setSugUsers(res.filter((user)=>user.username!==mainUsername&&!userFollowings.includes(user.username)));
        // console.log(res.filter((user)=>user.username!==mainUsername&&!userFollowings.includes(user.username)));
        setIsloadding(false)
      }
  });
  },[mainUsername,userFollowings]);


    // Handle Unfollow User
    const handleUnFollow=(username)=>{
      fetch(`/users/unfollow/${username}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
        username:mainUsername,
      })
      })
      .then((res)=>{
        if (res) {
          if (res) {
            document.getElementById('followBtn').style.display='inline';
            document.getElementById('UnfollowBtn').style.display='none';
          }
        }
      });
    }; 


  // Handle follow User
  const handleFollow=(username)=>{
    fetch(`/users/follow/${username}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
      username:mainUsername,
    })
    })
    .then((res)=>{
      if (res) {
        document.getElementById('followBtn').style.display='none';
        document.getElementById('UnfollowBtn').style.display='inline';
      }
    });
  }; 


  // userFollowings.map((username)=>user.username!==username)

  return (
    <div className='suggetion'>
      {
        isLoading
        ?
        <div className="loder">
           <div className="ring"></div>
        </div>
        :
          <>
              <div className="sugggHeader">
                <h1>Suggestion Friends</h1>
               </div>

            <div className="suggPeople">
              {
                sugUsers.map((user)=>{
                  return(
                  
                    <div className="fluinfo" key={user.username}>
                      <ul>
                        <li><Link to={`/user/${user.username}`} className='flLink'>{user.username}</Link> &nbsp;&nbsp;&nbsp;&nbsp; 
                        <button id='UnfollowBtn' onClick={()=>{ handleUnFollow(user.username);}}>Unfollow</button>
                        <button id='followBtn' onClick={()=>{handleFollow(user.username);}}>Follow</button></li>
                        </ul>
                    </div>
                  
                  );
                })
              }
            </div>
            
          </>
      }
    </div>
  );
};
export default Suggestion;