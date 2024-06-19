import React, { useEffect, useState } from 'react'
import '../styles/Admin.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Admin = () => {

  const navigate = useNavigate();

  const [userCount, setUserCount] = useState(0);
  const [bookingCount, setbookingCount] = useState(0);
  const [trainsCount, settrainsCount] = useState(0);


  useEffect(()=>{

    fetchData();
  }, [])

  const fetchData = async () =>{
    await axios.get('http://localhost:6001/fetch-users').then(
      (response)=>{
        
        setUserCount(response.data.length);
        
      }
    );
    await axios.get('http://localhost:6001/fetch-bookings').then(
      (response)=>{
        setbookingCount(response.data.length);
      }
    );
    await axios.get('http://localhost:6001/fetch-trains').then(
      (response)=>{
        settrainsCount(response.data.length);
      }
    );
  }

  return (
    <>

      <div className="admin-page">

        <div className="card admin-card users-card">
            <h4>Users</h4>
            <p> {userCount} </p>
            <button className="btn btn-primary" onClick={()=>navigate('/all-users')}>View all</button>
        </div>

        <div className="card admin-card transactions-card">
            <h4>Bookings</h4>
            <p> {bookingCount} </p>
            <button className="btn btn-primary" onClick={()=>navigate('/all-bookings')}>View all</button>
        </div>

        <div className="card admin-card deposits-card">
            <h4>Trains</h4>
            <p> {trainsCount} </p>
            <button className="btn btn-primary" onClick={()=>navigate('/all-trains')}>View all</button>
        </div>

        <div className="card admin-card loans-card">
            <h4>New Train</h4>
            <p> (new route) </p>
            <button className="btn btn-primary" onClick={()=>navigate('/new-train')}>Add now</button>
        </div>

    </div>
    
    </>
  )
}

export default Admin