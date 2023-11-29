import React, { useEffect, useState } from 'react';
import './setting.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link,useParams } from 'react-router-dom';

const Setting = () => {

    const [isLoadding,setIsloadding]=useState(true);
    const {user}=useParams();
    const [profuser,setUser]=useState({});

  
      useEffect(() => {
        fetch(`/users/${user}`)
        .then(res=>res.json())
        .then((res)=>{
          setUser(res);
          if(res){
            setIsloadding(false);
          }
      });
      }, [user]);
      const{_id,username,profilePhoto}=profuser;


      const handleDelete=()=>{

          fetch(`/users/${_id}`,{
            method:"DELETE"
          })
          .then(res=>res.json())
          .then((res)=>{
            if(res){
              setIsloadding(false);
            }
            alert(res.message);
            window.location.href="/"
        });
      };


       const handleControll=()=>{
            document.querySelector('.accountControll').style.display="block";
            document.querySelector('.settingCntrl').style.display="none";
        };
        const handleBack=()=>{
          document.querySelector('.accountControll').style.display="none";
          document.querySelector('.settingCntrl').style.display="flex";

        };

  return (
    <div className='settingCont'>
        <div className="settingHeader">
                <div className="back">
                    <button className="backBtn">
                    <FontAwesomeIcon icon={faArrowLeft}/>
                    </button>
                </div>
                <div className="info">
                  <h2>Settings</h2>
                </div>
        </div>

          {
            isLoadding===true?
            <div className="loder">
                <div className="ring"></div>
            </div>
            :
            <>
                  <div className="settingCntrl">

                    <ul>
                      <li>
                        <Link to={`/${user}/profile/edit`} className='setLink'>Edit Profile &nbsp; &nbsp; &nbsp;{'>'}</Link>
                      </li>
                      <li>
                          <button onClick={handleControll}>Account Control &nbsp;&nbsp;&nbsp;{'>'}</button>
                      </li>
                      <li>
                        <Link className='setLink'>Terms & Condition&nbsp;&nbsp;&nbsp;{'>'}</Link>
                      </li>
                      <li>
                        <Link className='setLink'>About Us&nbsp;&nbsp;&nbsp;{'>'}</Link>
                      </li>
                    </ul>

                  </div>
                <div className="accountControll">
                      <div className="accountControllHeader">
                        <div className="back">
                            <button onClick={handleBack} className="backBtn">
                            <FontAwesomeIcon icon={faArrowLeft}/>
                            </button>
                        </div>
                        <div className="info">
                          <h2>Account Controll</h2>
                        </div>
                      </div>
                  <div className="userInfo">
                          <div className="profilePhoto">
                              <img  className='Pp' src={profilePhoto} alt="User profile" />
                          </div>
                          <div className="profileOther">
                              <h2 id='username'>@{username}</h2>

                          </div>
                      </div>

                      <div className="deleteAct">
                          <button onClick={()=>{
                             document.querySelector('.sure').style.display="flex";
                          }}>Delete Your Account {username}</button>
                          <div className="sure">
                            {
                              isLoadding===true?<h1>Loading...</h1>
                              :
                              <>
                                 <h3>Are you sure you want to  delete your account..?</h3>
                                 <div className="controlBtn">
                                 <button id='noBtn'onClick={() => {document.querySelector('.sure').style.display="none";}}>NO</button>
                                 <button id='yesBtn'onClick={handleDelete}>YES</button>
                                 </div>
                              </>
                            }
                          </div>
                      </div>
                  </div>
            </>
          }
    </div>
  );
};
export default Setting;