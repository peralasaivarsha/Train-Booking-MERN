import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import '../styles/allUsers.css'
import axios from 'axios';

const AllUsers = () => {

  const [users, setUsers] = useState([]);

  useEffect(()=>{
    fetchUsers();
  },[]);

  const fetchUsers = async () =>{
    await axios.get('http://localhost:6001/fetch-users').then(
      (response) =>{
        setUsers(response.data);
      }
    )
  }

  return (
    <>
      <Navbar />

      <div class="all-users-page">
        <h2>All users</h2>
        <div class="all-users">

        {users.filter(user=> user.usertype !== 'admin').map((user)=>{
            return(

              <div class="user" key={user._id}>
                  <p><b>UserId </b>{user._id}</p>
                  <p><b>Username </b>{user.username}</p>
                  <p><b>Email </b>{user.email}</p>
              </div>
            )
          })}
            
        </div>
    </div>
    </>
  )
}

export default AllUsers