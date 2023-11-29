import React, { useEffect, useState } from 'react';
import './veiwPost.css';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faThumbsDown, faThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons';



const ViewPost = () => {

    const [isLoadding,setIsloadding]=useState(true);
    const {postId}=useParams();
    
    const [profileUsername,setProfileUsername]=useState(''); 

        fetch(`/post/allposts`)
        .then(res=>res.json())
        .then((res)=>{
            if(res){
                if(!res.find((post)=>post._id === postId)){
                  window.location.href=`/home`;
                }
              }
       });


    useEffect(() => {
        fetch(`/profile`)
        .then(res=>res.json())
        .then((res)=>{
            setProfileUsername(res.username);
            if(res.username){
                setIsloadding(false);
              }
       });
    },[])

     const [post,setPost]=useState({});
        const [like,setLike]=useState([]);
        const [dislike,setDisike]=useState([]);
        useEffect(() => {
            fetch(`/post/singlePost/${postId}`)
            .then(res=>res.json())
            .then((res)=>{
                setPost(res);
                if(res){
                    setIsloadding(false);
                    setLike(res.likes);
                    setDisike(res.dislike);
                  }
           });
        }, [postId])
       
       const{_id,title,dsc,username,userPp}=post;

    //    Handle Like
        const handleLike=()=>{
            fetch(`/post/like/${profileUsername}`,{
                method:'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({
                    postId:_id
                })
            })
            .then(res=>res.json())
            .then((res)=>{
                if(res){
                    setIsloadding(false);
                    alert(res.message);
                    window.location.reload(true);
                }
            });
        }

    //    Handle Like

        const handleDisLike=()=>{
            fetch(`/post/dislike/${profileUsername}`,{
                method:'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({
                    postId:_id
                })
            })
            .then(res=>res.json())
            .then((res)=>{
                if(res){
                    setIsloadding(false);
                    alert(res.message);
                    window.location.reload(true);
                }
            });
        };

    // Handle Delete post
      const handleDeletePost=()=>{
        fetch(`/post/delete/${_id}`,{
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
    <div>
            
           {
            isLoadding ===true ? 
            <div className="loder">
                <div className="ring"></div>
            </div>
            :
            <div className="posts" key={post._id}>
                                 
                 <div className="postHeader">
                        <div className="postUser">
                            <div className="postUserImg">
                                <img src={userPp} alt="/" />
                            </div>
                            <div className="postUserInfo">
                                <Link to={username===profileUsername ?`/${username}/profile`:`/user/${username}`} className='link'><h3>@{username}</h3></Link>
                            </div>
                        </div>
                     <div className="postBar">
                     
                     {/* {
                          post.user===_id?  <button className='postBarBtn'><FontAwesomeIcon icon={faPencil}/> </button>:''
                     } */}
                   
                     {
                         username===profileUsername?  <button onClick={handleDeletePost} className='postBarBtn'><FontAwesomeIcon icon={faTrash}/> </button>:''
                     }
                     
                     </div>
                 
                 </div>
                <div className="postBody">
                    <h3>{title}</h3>
                    <p>{dsc}</p>
                </div><hr />
                <div className="postFotter">
                   <div className="like" style={{display:'flex',justifyContent:"centter",alignItems:"center"}}>
                       <div style={{textAlign:'center'}}>
                       <button className='likeBtn' onClick={handleLike} style={like.includes(profileUsername)?{backgroundColor:'rgb(5, 80, 80)'}:{backgroundColor:''}}><FontAwesomeIcon icon={faThumbsUp}/> </button>
                       <p>{like.length} Likes</p>
                       </div>
                       <div style={{textAlign:'center'}}>
                       <button className='dislikeBtn' onClick={handleDisLike} style={dislike.includes(profileUsername)?{backgroundColor:'rgb(5, 80, 80)'}:{backgroundColor:''}}><FontAwesomeIcon icon={faThumbsDown}/></button>
                       <p>{dislike.length} UnLikes</p>
                       </div>
                   </div>
                   <div className="comment">
                     <button className='commentBtn'><FontAwesomeIcon icon={faComment}/></button>
                   </div>
                </div>
                             
            </div> 
           }                  

    </div>
  );
};
export  default ViewPost;