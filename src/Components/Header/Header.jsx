import React, {  useEffect, useState } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faHome, faMagnifyingGlass, faMessage, faSignOut, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';

const Header = () => {

  const [user,setUser]=useState({});
  
   useEffect(() => {
    fetch(`/profile`)
    .then(res=>res.json())
    .then(res=>setUser(res));
   
   }, [])
   
  
// console.log(user.username)

    const handleLogOut=async()=>{
    await fetch(`/logOut`,{
      method:"POST"
    })
      .then(res=>res.json())
      .then((res)=>{
        alert(res.message);
        window.location.href="/"
      });
    };
  return (
    <div className='headerContainer'>
        <nav>
          
          <div className="logo"><h1><Link className='logoLink' to={'/'}>kala<span>Ster</span></Link></h1></div>
            <ul>
            
            
                
                <li className='search'><input type="text" placeholder='Search KalaSter' name="search" /><button className='searchBtn'><FontAwesomeIcon icon={faMagnifyingGlass}/></button></li>

                <Link className='link' to='/'><li className='link_list'><FontAwesomeIcon icon={faHome}/><span>Home</span></li></Link>

                <Link className='link' to={`/${user.username}/profile`}><li className='link_list'><FontAwesomeIcon icon={faUser}/><span>Profile</span></li></Link>

                <Link className='link' to={`/${user.username}/follower`}><li className='link_list'><FontAwesomeIcon icon={faUsers}/><span>Follower</span></li></Link>

               <Link className='link' to='/Message'><li className='link_list'><FontAwesomeIcon icon={faMessage}/><span>Message</span></li></Link>

               <Link className='link' to={`/${user.username}/setting`}> <li className='link_list'><FontAwesomeIcon icon={faGear}/><span>Setting</span></li></Link>

                <li><button className='logOutBtn' onClick={handleLogOut}><span>Log Out</span> <FontAwesomeIcon icon={faSignOut} style={{ transform: 'rotate(90deg)'}}/></button></li>
            </ul>
        </nav>
    </div>
  );
};

export default Header;