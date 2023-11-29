import React, { useEffect, useState } from 'react';
import './oUfollow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';

 const OUfollow = () => {
 const {ohterUser}=useParams();
  const [isLoading,setIsloadding]=useState(true);
  const [userFollowings,setUserFollowings]=useState([]);
  const [userFollowers,setUserFollowers]=useState([]);

  useEffect(() => {
   fetch(`/users/${ohterUser}`)
   .then(res=>res.json())
   .then((res)=>{
    setUserFollowings(res.followings);
    setUserFollowers(res.followers);
      if(res.followings && res.followers){
          setIsloadding(false)
      }
  });
  
  }, [ohterUser]);

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
                                  <div className="fluinfo">
                                    <ul>
                                      <li>
                                        <Link to={`/user/${username}`} className='flLink'>{username}</Link> 
                                      </li>
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
                            <div className="fluinfo">
                              <ul>
                                <li>
                                    <Link to={`/user/${username}`} className='flLink' >{username}</Link>
                                </li>
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
export default OUfollow;