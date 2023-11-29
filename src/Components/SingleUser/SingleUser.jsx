import React, { useEffect, useState } from 'react';
import './singleUSer.css';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faComment, faEye, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const SingleUser = () => {
 
  const [isLoadding,setIsloadding]=useState(true);

  const {thatsUsername}=useParams();
  const [user,setUser]=useState({});
  const [userPosts,setUserPosts]=useState([]);

  const [mainUserFollwing,setMaiUserFollwing]=useState([]);
  const [mainUsername,setMaiUsername]=useState('');

// Cheaking User
  useEffect(() => {
    fetch(`/users`)
    .then(res=>res.json())
    .then((res)=>{
      if(res){
        if(!res.find((user)=>user.username === thatsUsername)){
          window.location.href=`/home`;
        }
      }
  });
  },[thatsUsername]);


  // Main User data 
  useEffect(() => {
    fetch(`/profile`)
    .then(res=>res.json())
    .then((res)=>{
      setMaiUserFollwing(res.followings);
      setMaiUsername(res.username);
      setIsloadding(false);
  });
  },[]);

  // Single User data 
    useEffect(() => {
      fetch(`/users/${thatsUsername}`)
      .then(res=>res.json())
      .then((res)=>{
        setUser(res);
        if(res){
          setIsloadding(false);
        }
    });
    }, [thatsUsername])
    
 if (thatsUsername===mainUsername) {
  window.location.href=`/${mainUsername}/profile`;
 }

 

 

 const{name,_id,username,profilePhoto,bio,}=user;

// fetch User Posts
       useEffect(() => {
        fetch(`/post/userPosts/${_id}`)
        .then(res=>res.json())
        .then((res)=>{
            setUserPosts(res.reverse());
            if(res){
              setIsloadding(false);
            }

        });
       },[_id])
       const [isUser]=mainUserFollwing.filter((fl)=>fl===username);
       const [isFlLoadding,setIsFlloadding]=useState(false);

// Handle follow User
       const handleFollow=()=>{
        setIsFlloadding(true);
          fetch(`/users/follow/${username}`,{
            method:"PUT",
            headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
            username:mainUsername,
          })
          })
          .then(res=>res.json())
          .then((res)=>{
              if(res){
                setIsFlloadding(false);
                window.location.href=`/user/${username}`;
              }
          });
       };

// Handle Unfollow User
      const handleUnFollow=()=>{
        setIsFlloadding(true);
        fetch(`/users/unfollow/${username}`,{
          method:"PUT",
          headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
          username:mainUsername,
        })
        })
        .then(res=>res.json())
        .then((res)=>{
            if(res){
              setIsFlloadding(false);
              window.location.href=`/user/${username}`;
            }
        });
      };  



  return (
    <div className='singleUser'>
          {
            isLoadding===true?
            <div className="loder">
                <div className="ring"></div>
            </div>
            :<>
            
            <div className="profileHeader">
                  <div className="back">
                      <button className="backBtn">
                      <FontAwesomeIcon icon={faArrowLeft}/>
                      </button>
                  </div>
                  <div className="info">
                      <h2>{username}</h2>
                      <p>{userPosts.length}posts</p>
                      
                  </div>
              </div>
              <div className="userInfo">
                  <div className="profilePhoto">
                      <img  className='Pp' src={profilePhoto} alt="User profile" />
                  </div>
                  <div className="profileOther">
                      <p id='name'>{name}</p>
                      <p id='username'>@{username}</p>
                      <p id='bio'>{bio}</p>
                      {/* <h4 id='join'>Joined In {updatedAt}</h4> */}
                      <div className="follow">
                          <Link to={`/${username}/follows`}> <p>Followings</p> </Link>
                          <Link to={`/${username}/follows`}> <p>Followers</p> </Link>
                      </div>
                  </div>
                  <div className="followBtn">
                    
                       {
                        isFlLoadding ?<h1>...</h1>
                        : 
                        <>
                           {
                            isUser
                            ?<button id='uFlBt' onClick={handleUnFollow}>Unfollow</button>
                            :<button id='flBt' onClick={handleFollow}>Follow</button>
                          }
                        </>

                       }
                     
                  </div>
              </div><hr />

              <div className="userPosts">
                <h3 className="head"><span>P</span>osts</h3>
                {
                    userPosts.map((post)=>{
                
                        return(

                             <div className="posts" key={post._id}>
                                 
                                     <div className="postHeader">
                                            <div className="postUser">
                                                <div className="postUserImg">
                                                    <img src={profilePhoto} alt="/" />
                                                </div>
                                                <div className="postUserInfo">
                                                    <Link to={`/user/${username}`} className='link'><h3>@{username}</h3></Link>
                                                </div>
                                            </div>
                                      <div className="postBar">
                                         
                                          <Link to={`/post/view-post/${post._id}`}><button className='postBarBtn'><FontAwesomeIcon icon={faEye}/> </button></Link>
                                         
                                         </div>
                                     
                                     </div>
                                     <Link className='postLink' to={`/post/view-post/${post._id}`}>
                                        <div className="postBody">
                                            <h3>{post.title}</h3>
                                            <p>{post.dsc}</p>
                                        </div><hr />
                                    </Link>
                                 <div className="postFotter">
                                    <div className="like">
                                        <button className='likeBtn'><FontAwesomeIcon icon={faThumbsUp}/> </button>
                                        <button className='dislikeBtn'><FontAwesomeIcon icon={faThumbsDown}/></button>
                                    </div>
                                    <div className="comment">
                                      <button className='commentBtn'><FontAwesomeIcon icon={faComment}/></button>
                                    </div>
                                 </div>
                                 
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
export default SingleUser;