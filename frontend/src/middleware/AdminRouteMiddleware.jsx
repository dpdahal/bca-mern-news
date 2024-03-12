import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import "../scss/Admin.scss";
import API from "../API";

export default function AdminRouteMiddleware() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let token = localStorage.getItem("token") ?? "";
  const checkToken = () => {
    API.get("/login/token-verify", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if(response.data.status){
        setIsLogin(true);
        setIsLoading(false);
      }else{
        setIsLogin(false);
        setIsLoading(false);
      }    

    }).catch(error => {

    });
  }
  useEffect(() => {
    checkToken();

  }, []);

 


  return (
    <>
      {isLoading ? <h1>Loading...</h1> : <div>

        {isLogin ?

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

          window.location.href = "/"
        }
      </div>


      }

    </>
  )

}
