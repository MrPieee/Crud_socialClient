import React,{ useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom';
import './createpost.css';

function CreatePost() {
    
    const navigate =useNavigate();
  const [postUser,setPostUser]=useState({});
  useEffect(() => {
   fetch(`/profile`)
   .then(res=>res.json())
   .then((res)=>{
      setPostUser(res);
  });
  
  }, []);

  const [post,setPost]=useState({
    title:'',
    dsc:'',
  });
    
    const hanldleInp=(e)=>{
        setPost({
            ...post,
            [e.target.name]:e.target.value
        });
    };

    const hanlePost=()=>{
        const {title,dsc}=post;
        if(title && dsc){
            fetch(`/post/postIn`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    title:title,
                    dsc:dsc,
                    userId:postUser._id,
                    username:postUser.username,
                    userProfile:postUser.profilePhoto,
                })
            })
            .then(res=>res.json())
            .then((res)=>{
               alert(res.message);
                navigate('/',{
                    replace:true,
                });
            });
            // console.log(post)
            // console.log(userId)
        }
    };

    return (
        <div className='container'>
            <div className="createPost">
            <form onSubmit={(e)=>e.preventDefault()}className='postForm' >
                {/* <input onChange={hanldleInp} className='nameEmail' type="text" name="author" required placeholder='Author Name'/>
                <input onChange={hanldleInp} className='nameEmail' type="email" name="email" required placeholder='Author Email'/><br /> */}
                <input onChange={hanldleInp} className='title' type="text"name='title' required placeholder='Post Title'/><br />
                <textarea onChange={hanldleInp} name="dsc" id="textarea" required placeholder="What's Your Mind .?"></textarea><br />
                <button className='postBtn'  onClick={hanlePost} type='submit'>Post</button>
            </form>
        </div>
        </div>
    )
}

export default CreatePost;
