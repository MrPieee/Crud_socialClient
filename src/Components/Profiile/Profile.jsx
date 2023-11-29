import React, { useEffect, useState } from 'react';
import './profile.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil, faThumbsUp,faThumbsDown, faComment, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';


 const Profile = () => {

    const [isLoading,setIsloadding]=useState(true);
    const [user,setUser]=useState({});
    const [userPosts,setUserPosts]=useState([]);
    useEffect(() => {
     fetch(`/profile`)
     .then(res=>res.json())
     .then((res)=>{
        setUser(res);
        if(res){
            setIsloadding(false)
        }
    });
    
    }, []);
    const{name,_id,username,profilePhoto,bio,}=user;
    
       useEffect(() => {
        fetch(`/post/userPosts/${_id}`)
        .then(res=>res.json())
        .then((res)=>{
            setUserPosts(res.reverse());
            if(res){
                setIsloadding(false)
            }
       });
       }, [_id])
       
       
   
    // console.log(_id);
    // console.log(userPosts);
    

  return (
    <div className='profile'>
            <div className="profileHeader">
                <div className="back">
                    <button className="backBtn">
                    <FontAwesomeIcon icon={faArrowLeft}/>
                    </button>
                </div>
                <div className="info">
                    <h2>{username}</h2>
                    <p>{userPosts.length} posts</p>
                </div>
            </div>
       {
         isLoading===true? 
         <div className="loder">
                <div className="ring"></div>
        </div>
         :
         <>
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
                        <Link to={`/${username}/follower`}> <p>Following</p> </Link>
                        <Link to={`/${username}/follower`}> <p>Follower</p> </Link>
                    </div>
                 </div>
                 <div className="edit">
                    <Link to={`/${user.username}/profile/edit`}><button> <FontAwesomeIcon icon={faPencil}/> Edit Profile</button></Link>
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
                                                    <Link to={post.user===_id?`/${username}/profile`:`/user/${username}`} className='link'><h3>@{username}</h3></Link>
                                                </div>
                                            </div>
                                         <div className="postBar">
                                         
                                         <Link to={`/post/view-post/${post._id}`}><button className='postBarBtn'><FontAwesomeIcon icon={faEye}/> </button></Link>
                                         {/* {
                                              post.user===_id?  <button className='postBarBtn'><FontAwesomeIcon icon={faPencil}/> </button>:''
                                         } */}
                                       
                                         {
                                              post.user===_id?  <button className='postBarBtn'><FontAwesomeIcon icon={faTrash}/> </button>:''
                                         }
                                         
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
export default Profile;