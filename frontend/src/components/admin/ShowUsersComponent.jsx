import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import API from '../../API';


export default function ShowUsersComponent() {
  let token = localStorage.getItem("token") ?? "";
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getUser = () => {
    API.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      setUsers(response.data);
      setIsLoading(false);
    }).catch(error => {
    });
  }
  useEffect(() => {
    getUser();
  }, []);

  const deleteUser = (id) => {
    API.delete(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      Swal.fire({
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500
      });
      getUser();

    }).catch(error => {
    });

  }



  return (
    <div>
      <h1>Show users components</h1>

      {isLoading ? <h1>Loading...</h1> :
        <table className='table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.role}</td>
                  <td><img src={user.image} alt={user.name} width="50" height="50" /></td>
                  <td>
                    <button>Edit</button>
                    <button onClick={()=>deleteUser(user._id)}>Delete</button>
                  </td>
                </tr>)

            })}
          </tbody>
        </table>

      }


    </div>
  )
}
