import React from 'react'
import { Outlet } from 'react-router-dom';
import  "../scss/Admin.scss";

export default function AdminRouteMiddleware() {
    let loginToke=true;
  return (
    <>
    {loginToke ? 
    
    <div className="admin-panel">
    <div className="top-header">
        <div className="container-box">
             <div className="header-container">
                 <div className="companyname">
                     <h1>BCA News</h1>
                 </div>
                 <div className="logout-section">
                     <button>Logout</button>
                 </div>
             </div>
        </div>
    </div>
    <div className="aside-bar">
         <ul>
         <li>Dashboard</li>
         <li>Show Users</li>
         </ul>
    </div>
    <div className="main">
     <div className="container-box">
         <Outlet />
         </div>
    </div>
 </div>
    
    : 
    
    window.location.href="/"
    }
    
    </>
  
  )
}
