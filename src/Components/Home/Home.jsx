import React, { useEffect, useState } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faEye, faPlus, faThumbsDown, faThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons';


 const Home =  () => {

  const [profileUsername,setProfileUsername]=useState('') 
  const [isLoadding,setIsloadding]=useState(true);

      useEffect(() => {
        fetch(`/profile`, {
          headers : {
          'Accept': 'application/json'
          }
        })
        .then(res=>res.json())
        .then((res)=>{
            setProfileUsername(res.username);
            if(res._id){
              setIsloadding(false);
            }
       });
      },[])
      

    const [timelinePosts,setTimelinePosts]=useState([]);
     

            useEffect(() => {
              fetch(`/post/timelinePosts/${profileUsername}`, {
                headers : {
                'Accept': 'application/json'
                }
              })
              .then(res=>res.json())
              .then((res)=>{
                setTimelinePosts(res);
                if(res){
                  setIsloadding(false);
                }
            });
            }, [profileUsername])
            
            const handleLike=(id)=>{
              fetch(`/post/like/${profileUsername}`,{
                  method:'PUT',
                  headers:{
                      'content-type':'application/json'
                  },
                  body:JSON.stringify({
                      postId:id
                  })
              })
              .then(res=>res.json())
              .then((res)=>{
                  if(res){
                      setIsloadding(false);
                      alert(res.message);
                      // window.location.reload(true);
                  }
              });
          }
  
          const handleDisLike=(id)=>{
              fetch(`/post/dislike/${profileUsername}`,{
                  method:'PUT',
                  headers:{
                      'content-type':'application/json'
                  },
                  body:JSON.stringify({
                      postId:id
                  })
              })
              .then(res=>res.json())
              .then((res)=>{
                  if(res){
                      setIsloadding(false);
                      alert(res.message);
                      // window.location.reload(true);
                  }
              });
          }

          // Handle Delete post
      const handleDeletePost=(id)=>{
        fetch(`/post/delete/${id}`,{
            method:'DELETE',
        })
        .then(res=>res.json())
        .then((res)=>{
            if(res){
                setIsloadding(false);
                alert(res.message);
                window.location.href='/home';
            }
        });
      };


  return (
    <div className='container'>
      
        <div className="homeHeader">
          <Link to={'/createPost'}><button className='createPostBtn'><FontAwesomeIcon icon={faPlus}/> Create A Post</button></Link>
        </div>

        {
          isLoadding===true? 
          <div className="loder">
                <div className="ring"></div>
          </div>
          : 
          <>
          <div className="timelinePosts">
            {
                        timelinePosts.map((post)=>{
                    
                            return(

                            <div className="posts" key={post._id}>
                                    
                                        <div className="postHeader">
                                                <div className="postUser">
                                                    <div className="postUserImg">
                                                        <img src={post.userPp} alt="/" />
                                                    </div>
                                                    <div className="postUserInfo">
                                                      <Link to={post.username===profileUsername ? `/${post.username}/profile` : `/user/${post.username}`} className='link'>
                                                      <h3>@{post.username}</h3>
                                                      </Link>
                                                    </div>
                                                </div>
                                            <div className="postBar">
                                            
                                            <Link to={`/post/view-post/${post._id}`}>
                                                <button className='postBarBtn'>
                                                <FontAwesomeIcon icon={faEye}/> 
                                                </button>
                                            </Link>
                                          
                                         {
                                              post.username===profileUsername?  <button className='postBarBtn' onClick={()=>handleDeletePost(post._id)}>   <FontAwesomeIcon icon={faTrash}/></button>:''
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
                                    <div className="like" style={{display:'flex',justifyContent:"centter", alignItems:"center"}}>
                                        <div style={{textAlign:'center'}}>
                                            <button className='likeBtn' onClick={()=>handleLike(post._id)} style={post.likes.includes(profileUsername)?{backgroundColor:'rgb(5, 80, 80)'}:{backgroundColor:''}}><FontAwesomeIcon icon={faThumbsUp}/> </button>
                                            <p>{post.likes.length} Likes</p>
                                        </div>
                                          <div style={{textAlign:'center'}}>
                                            <button className='dislikeBtn' onClick={()=>handleDisLike(post._id)} style={post.dislike.includes(profileUsername)?{backgroundColor:'rgb(5, 80, 80)'}:{backgroundColor:''}}><FontAwesomeIcon icon={faThumbsDown}/></button>
                                            <p>{post.dislike.length} UnLikes</p>
                                        </div>
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
  )
}
export default Home;