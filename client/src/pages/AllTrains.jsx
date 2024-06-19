import React, { useState } from 'react'
import '../styles/AllTrains.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AllTrains = () => {

  const [trains, setTrains] = useState([]);
  const navigate = useNavigate();

  
  const fetchTrains = async () =>{
    await axios.get('http://localhost:6001/fetch-trains').then(
      (response)=>{
        setTrains(response.data);
        console.log(response.data)
      }
      )
    }
    
    useState(()=>{
      fetchTrains();
    }, [])
    
  return (
    <div className="allTrainsPage">
      <h1>All Trains</h1>

      <div className="allTrains">

        {trains.map((train)=>{
          return(

              <div className="allTrains-train" key={train._id}>
                <p><b>Train ID:</b> {train._id}</p>
                <span>
                  <p><b>Train no:</b> {train.trainNumber}</p>
                  <p><b>Train name:</b> {train.trainName}</p>
                </span>
                <span>
                  <p><b>Starting station:</b> {train.origin}</p>
                  <p><b>Departure time:</b> {train.departureTime}</p>
                </span>
                <span>
                  <p><b>Destination:</b> {train.destination}</p>
                  <p><b>Arrival time:</b> {train.arrivalTime}</p>
                </span>
                <span>
                  <p><b>Base price:</b> {train.basePrice}</p>
                  <p><b>Total seats:</b> {train.totalSeats}</p>
                </span>
                <div>
                  <button className="btn btn-primary" onClick={()=> navigate(`/edit-train/${train._id}`)}>Edit details</button>
                </div>
              </div>
          )
        })}






      </div>
    </div>
  )
}

export default AllTrains