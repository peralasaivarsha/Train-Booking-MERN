import React, { useContext, useEffect, useState } from 'react'
import '../styles/BookTrain.css'
import { GeneralContext } from '../context/GeneralContext';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BookTrain = () => {

  const {id} = useParams();

  const [trainName, setTrainName] = useState('');
  const [trainNumber, setTrainNumber] = useState('');
  const [basePrice, setBasePrice] = useState(0);
  const [StartStation, setStartStation] = useState('');
  const [destinationStation, setDestinationStation] = useState('');


  useEffect(()=>{
    fetchTrainData();
  }, [])

  const fetchTrainData = async () =>{
    await axios.get(`http://localhost:6001/fetch-train/${id}`).then(
      (response) =>{
        setTrainName(response.data.trainName);
        setTrainNumber(response.data.trainNumber);
        setBasePrice(response.data.basePrice);
        setStartStation(response.data.origin);
        setDestinationStation(response.data.destination);

      }
    )
  }


  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [coachType, setCoachType] = useState('');
  const {ticketBookingDate} = useContext(GeneralContext);
  const [journeyDate, setJourneyDate] = useState(ticketBookingDate);

  const [numberOfPassengers, setNumberOfPassengers] = useState(0);
  const [passengerDetails, setPassengerDetails] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const price = {'s2': 1, 'sleeper': 2, '3ac': 3, '2ac': 4, '1ac': 5}
  

  const handlePassengerChange = (event) => {
    const value = parseInt(event.target.value);
    setNumberOfPassengers(value);
    };

  const handlePassengerDetailsChange = (index, key, value) => {
    setPassengerDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index] = { ...updatedDetails[index], [key]: value };
      return updatedDetails;
    });
    
  };

  useEffect(()=>{
    if(price[coachType] * basePrice * numberOfPassengers){
      setTotalPrice(price[coachType] * basePrice * numberOfPassengers);
    }
  },[numberOfPassengers, coachType])


  const navigate = useNavigate();
  const bookTrain = async ()=>{



    const inputs = {user: localStorage.getItem('userId'), train: id, trainName, trainNumber, StartStation, destinationStation, email, mobile, passengers: passengerDetails, totalPrice, journeyDate, coachClass: coachType} 
    
    await axios.post('http://localhost:6001/book-ticket', inputs).then(
      (response)=>{
        alert("booking successful");
        navigate('/bookings');
      }
    ).catch((err)=>{
      alert("Booking failed!!")
    })
  }



  

  return (
    <div className='BookTrainPage'>

      <div className="BookingTrainPageContainer">
        <h2>Book ticket</h2>
      <span>
        <p><b>Train Name: </b> {trainName}</p>
        <p><b>Train No: </b> {trainNumber}</p>
      </span>
      <span>
        <p><b>Base price: </b> {basePrice}</p>
      </span>
      
      <span>
        <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInputemail" value={email} onChange={(e)=> setEmail(e.target.value)} />
                <label htmlFor="floatingInputemail">Email</label>
          </div>
          <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInputmobile" value={mobile} onChange={(e)=> setMobile(e.target.value)} />
                <label htmlFor="floatingInputmobile">Mobile</label>
          </div>
      </span>
      <span className='span3'>
        <div className="no-of-passengers">
          <div className="form-floating mb-3">
                <input type="number" className="form-control" id="floatingInputreturnDate" value={numberOfPassengers} onChange={handlePassengerChange} />
                <label htmlFor="floatingInputreturnDate">No of passengers</label>
          </div>
        </div>
        <div className="form-floating mb-3">
                <input type="date" className="form-control" id="floatingInputreturnDate" value={journeyDate} onChange={(e)=>setJourneyDate(e.target.value)} />
                <label htmlFor="floatingInputreturnDate">Journey date</label>
        </div>
        <div className="form-floating">
                      <select className="form-select form-select-sm mb-3" defaultValue="" aria-label=".form-select-sm example" value={coachType} onChange={(e) => setCoachType(e.target.value) }>
                        <option value="" disabled>Select</option>
                        <option value="s2">Seater (General)</option>
                        <option value="sleeper">Sleeper</option>
                        <option value="3ac">3 tier AC</option>
                        <option value="2ac">2 tier AC</option>
                        <option value="1ac">1 tier AC</option>
                      </select>
                      <label htmlFor="floatingSelect">Coach type</label>
                    </div>

      </span>

      <div className="new-passengers">
          {Array.from({ length: numberOfPassengers }).map((_, index) => (
            <div className='new-passenger' key={index}>
              <h4>Passenger {index + 1}</h4>
              <div className="new-passenger-inputs">

                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInputpassengerName" value={passengerDetails[index]?.name || ''} onChange={(event) => handlePassengerDetailsChange(index, 'name', event.target.value) } />
                    <label htmlFor="floatingInputpassengerName">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                        <input type="number" className="form-control" id="floatingInputpassengerAge" value={passengerDetails[index]?.age || ''} onChange={(event) => handlePassengerDetailsChange(index, 'age', event.target.value) } />
                        <label htmlFor="floatingInputpassengerAge">Age</label>
                  </div>
                  

              </div>
            </div>
          ))}

      </div>
      
      <h6><b>Total price</b>: {totalPrice}</h6>
      <button className='btn btn-primary' onClick={bookTrain}>Book now</button>
    </div>
    </div>
  )
}

export default BookTrain