import React, { useEffect, useState } from 'react';
import './follower.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

 const Follower = () => {
 
  const [isLoading,setIsloadding]=useState(true);
  const [userFollowings,setUserFollowings]=useState([]);
  const [userFollowers,setUserFollowers]=useState([]);
  const [mainUsername,setMainUsername]=useState('')

  useEffect(() => {
   fetch(`/profile`)
   .then(res=>res.json())
   .then((res)=>{
    setUserFollowings(res.followings);
    setUserFollowers(res.followers);
    setMainUsername(res.username);
      if(res.followings && res.followers){
          setIsloadding(false)
      }
  });
  
  }, []);

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

    const handleFollowingCont=()=>{
      document.getElementById('following').style.display='flex';
      document.getElementById('follower').style.display='none';
    };
    
    const handleFollowerCont=()=>{
      document.getElementById('following').style.display='none';
      document.getElementById('follower').style.display='flex';
    }

  return (
    <div className='followContainer'>
      <div className="followHeader">
                <div className="back">
                    <button className="backBtn">
                    <FontAwesomeIcon icon={faArrowLeft}/>
                    </button>
                </div>
                <div className="info">
                  <h2>Follower</h2>
                </div>
            </div>
          {
            isLoading===true ?
            <div className="loder">
                <div className="ring"></div>
            </div>
            :
            <>
                  <div className="followHandler">
                    <button onClick={handleFollowingCont}>Followings</button>
                    <button onClick={handleFollowerCont}>Follower</button>
                  </div>

                  <div className="following" id='following'>
                    <h3>Followings</h3>
                      
                          {
                            userFollowings.map((username)=>{
                              return(
                                  <div className="fluinfo" key={username}>
                                    <ul>
                                      <li><Link to={`/user/${username}`} className='flLink'>{username}</Link> &nbsp;&nbsp;&nbsp;&nbsp; 
                                      <button id='UnfollowBtn' onClick={()=>{
                                        handleUnFollow(username);
                                        }}>Unfollow</button>
                                         <button id='followBtn' onClick={()=>{
                                          handleFollow(username);
                                          }}>Follow</button></li>
                                    </ul>
                                  </div>
                              )
                            })
                          }
                  
                  </div>

                  <div className="follower" id='follower'>
                    <h3>Followers</h3>
                      {
                      userFollowers.map((username)=>{
                        return(
                            <div className="fluinfo" key={username}>
                              <ul>
                                <li><Link to={`/user/${username}`} className='flLink' >{username}</Link> &nbsp;&nbsp;</li>
                              </ul>
                            </div>
                        )
                      })
                    }
                  </div>
            </>
          }

    </div>
  );
};
export default Follower;