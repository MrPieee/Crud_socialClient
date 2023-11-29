import React, { useContext } from 'react'
import { LoginConext } from '../App';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
    const [loginAuth, setLoginAuth]=useContext(LoginConext);

    return loginAuth ?  <Outlet/> :<Navigate to={'/logIn'}/> ;
}

export default PrivateRoute
