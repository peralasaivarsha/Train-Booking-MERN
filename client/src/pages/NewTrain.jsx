import React, { useState } from 'react'
import '../styles/NewTrain.css'
import axios from 'axios';

const NewTrain = () => {
 
  const [trainName, setTrainName] = useState('');
  const [trainNum, setTrainNum] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [startTime, setStartTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [totalSeats, setTotalSeats] = useState(0);
  const [basePrice, setBasePrice] = useState(0);

  const handleSubmit = async () =>{

    const inputs = {trainName, trainNumber: trainNum, origin, destination, departureTime: startTime, arrivalTime, basePrice, totalSeats};

    await axios.post('http://localhost:6001/add-train', inputs).then(
      async (response)=>{
        alert('train added successfully!!');
        setTrainName('');
        setTrainNum('');
        setOrigin('');
        setStartTime('');
        setArrivalTime('');
        setDestination('');
        setBasePrice(0);
        setTotalSeats(0);
      }
    )

  }

  


  return (
    <div className='NewTrainPage'>

      <div className="NewTrainPageContainer">

        <h2>Add new train</h2>
      
      <span className='newTrainSpan1'>
        <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInputemail" value={trainName} onChange={(e)=> setTrainName(e.target.value)} />
                <label htmlFor="floatingInputemail">Train Name</label>
          </div>
          <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInputmobile" value={trainNum} onChange={(e)=> setTrainNum(e.target.value)} />
                <label htmlFor="floatingInputmobile">Train Number</label>
          </div>
      </span>
      <span>
      <div className="form-floating">
          <select className="form-select form-select-sm mb-3" aria-label=".form-select-sm example" value={origin} onChange={(e)=> setOrigin(e.target.value)} >
            <option value="" selected disabled>Select</option>
            <option value="Chennai">Chennai Central</option>
            <option value="Banglore">Banglore Majestic</option>
            <option value="Hyderabad">Hyderabad Central</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Indore">Indore</option>
            <option value="Delhi">Delhi</option>
            <option value="Pune">Pune</option>
            <option value="Trivendrum">Trivendrum</option>
            <option value="Bhopal">Bhopal</option>
            <option value="Kolkata">Kolkata</option>
            <option value="varanasi">varanasi</option>
            <option value="Jaipur">Jaipur</option>
          </select>
          <label htmlFor="floatingSelect">Origin station</label>
        </div>
          <div className="form-floating mb-3">
                <input type="time" className="form-control" id="floatingInputmobile" value={startTime} onChange={(e)=> setStartTime(e.target.value)} />
                <label htmlFor="floatingInputmobile">Departure Time</label>
          </div>
      </span>
      <span>
          <div className="form-floating">
            <select className="form-select form-select-sm mb-3" aria-label=".form-select-sm example" value={destination} onChange={(e)=> setDestination(e.target.value)} >
              <option value="" selected disabled>Select</option>
              <option value="Chennai">Chennai Central</option>
              <option value="Banglore">Banglore Majestic</option>
              <option value="Hyderabad">Hyderabad Central</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Indore">Indore</option>
              <option value="Delhi">Delhi</option>
              <option value="Pune">Pune</option>
              <option value="Trivendrum">Trivendrum</option>
              <option value="Bhopal">Bhopal</option>
              <option value="Kolkata">Kolkata</option>
              <option value="varanasi">varanasi</option>
              <option value="Jaipur">Jaipur</option>
            </select>
            <label htmlFor="floatingSelect">Destination station</label>
          </div>
          <div className="form-floating mb-3">
                <input type="time" className="form-control" id="floatingInputArrivalTime" value={arrivalTime} onChange={(e)=> setArrivalTime(e.target.value)} />
                <label htmlFor="floatingInputArrivalTime">Arrival time</label>
          </div>
      </span>
      <span className='newTrainSpan2'>
        <div className="form-floating mb-3">
                <input type="number" className="form-control" id="floatingInpuSeats" value={totalSeats} onChange={(e)=> setTotalSeats(e.target.value)} />
                <label htmlhtmlFor="floatingInpuSeats">Total seats</label>
          </div>
          <div className="form-floating mb-3">
                <input type="number" className="form-control" id="floatingInputBasePrice" value={basePrice} onChange={(e)=> setBasePrice(e.target.value)} />
                <label htmlhtmlFor="floatingInputBasePrice">Base price</label>
          </div>
      </span>
      
      <button className='btn btn-primary' onClick={handleSubmit}>Add now</button>
    </div>
    </div>
  )
}

export default NewTrain