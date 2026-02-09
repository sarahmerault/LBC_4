import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from "../hooks/UseAuth";


const PrivateRoutes = () => {

    const {user,loading}=useAuth()
    //PENDANT LE CHARGEMENT 
    if(loading)
        
        return <p>chargement.............</p>
        //SI USER outlet  SINON login
        return user?<Outlet/>:<Navigate to="/login"/>
 
}

export default PrivateRoutes