import React, { useContext, useEffect, useState } from 'react'
import '../styles/LandingPage.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GeneralContext } from '../context/GeneralContext';

const LandingPage = () => {

  const [error, setError] = useState('');
  const [checkBox, setCheckBox] = useState(false);


  const [departureStation, setDepartureStation] = useState('');
  const [destinationStation, setDestinationStation] = useState('');
  const [departureDate, setDepartureDate] = useState();
  const [returnDate, setReturnDate] = useState();



  const navigate = useNavigate();
  useEffect(()=>{
    
    if(localStorage.getItem('userType') === 'admin'){
      navigate('/admin');
    }
  }, []);

  const [trains, setTrains] = useState([]);

  
  const fetchTrains = async () =>{

    if(checkBox){

      if(departureStation !== "" && destinationStation !== "" && departureDate && returnDate){
        const date = new Date();
        const date1 = new Date(departureDate);
        const date2 = new Date(returnDate);
        if(date1 > date && date2 > date1){
          setError("");
          await axios.get('http://localhost:6001/fetch-trains').then(
              (response)=>{
                setTrains(response.data);
                console.log(response.data)
              }
           )
        } else{
          setError("Please check the dates");
        }

         
      }
      else{
        setError("Please fill all the inputs");
      }

    }else{
      if(departureStation !== "" && destinationStation !== "" && departureDate){
        const date = new Date();
        const date1 = new Date(departureDate);
        if(date1 >= date){
          setError("");
          await axios.get('http://localhost:6001/fetch-trains').then(
              (response)=>{
                setTrains(response.data);
                console.log(response.data)
              }
           )
        } else{
          setError("Please check the dates");
        }

         
      }
      else{
        setError("Please fill all the inputs");
      }
    }
    }

    const {setTicketBookingDate} = useContext(GeneralContext);
    const userId = localStorage.getItem('userId');

    const handleTicketBooking = async (trainId, origin, destination) =>{
      if(userId){

          if(origin === departureStation){
            setTicketBookingDate(departureDate);
            navigate(`/book-train/${trainId}`);
          } else if(destination === departureStation){
            setTicketBookingDate(returnDate);
            navigate(`/book-train/${trainId}`);
          }
      }else{
        navigate('/auth');
      }
    }

  return (
    <div className="landingPage">
        <div className="landingHero">


          <div className="landingHero-title">
            <h1 className="banner-h1">On track to new adventures</h1>
            <p className="banner-p">Let the journey be your destination as you traverse landscapes steeped in history, culture, and untold tales, awakening a sense of wonder that transcends the ordinary and propels you into the extraordinary.</p>
            </div>

          

          <div className="train-search-container input-container mb-4">

                  {/* <h3>Journey details</h3> */}
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" value="" onChange={(e)=>setCheckBox(e.target.checked)} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Return journey</label>
                  </div>
                  <div className='train-search-container-body'>

                    <div className="form-floating">
                      <select className="form-select form-select-sm mb-3"  aria-label=".form-select-sm example" value={departureStation} onChange={(e)=>setDepartureStation(e.target.value)}>
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
                      <label htmlFor="floatingSelect">Departure station</label>
                    </div>
                    <div className="form-floating">
                      <select className="form-select form-select-sm mb-3"  aria-label=".form-select-sm example" value={destinationStation} onChange={(e)=>setDestinationStation(e.target.value)}>
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
                      <input type="date" className="form-control" id="floatingInputstartDate" value={departureDate} onChange={(e)=>setDepartureDate(e.target.value)}/>
                      <label htmlFor="floatingInputstartDate">Journey date</label>
                    </div>
                    {checkBox ?
                    
                      <div className="form-floating mb-3">
                        <input type="date" className="form-control" id="floatingInputreturnDate" value={returnDate} onChange={(e)=>setReturnDate(e.target.value)}/>
                        <label htmlFor="floatingInputreturnDate">Return date</label>
                      </div>
                    
                    :
                    
                    ""}
                    <div>
                      <button className="btn btn-primary" onClick={fetchTrains}>Search</button>
                    </div>

                  </div>
                  <p>{error}</p>
              </div>
                  
                {trains.length > 0 
                ?
                <>
                {
                  trains.filter(train => train.origin === departureStation && train.destination === destinationStation).length > 0 ? 
                  <>
                  <div className="availableTrainsContainer">
                    <h1>Available Trains</h1>

                    <div className="trains">

                      {checkBox ?
                      
                      <>
                        {trains.filter(train => (train.origin === departureStation && train.destination === destinationStation ) || (train.origin === destinationStation && train.destination === departureStation)).map((train)=>{
                        return(

                        <div className="train" key={train._id}>
                            <div>
                                <p> <b>{train.trainName}</b></p>
                                <p ><b>Train Number:</b> {train.trainNumber}</p>
                            </div>
                            <div>
                                <p ><b>Start Station:</b> {train.origin}</p>
                                <p ><b>Departure Time:</b> {train.departureTime}</p>
                            </div>
                            <div>
                                <p ><b>Destination Station:</b> {train.destination}</p>
                                <p ><b>Arrival Time:</b> {train.arrivalTime}</p>
                            </div>
                            <div>
                                <p ><b>Starting Price:</b> {train.basePrice}</p>
                                <p ><b>Available Seats:</b> {train.totalSeats}</p>
                            </div>
                            <button className="button btn btn-primary" onClick={()=>handleTicketBooking(train._id, train.origin, train.destination)}>Book Now</button>
                        </div>
                        )
                      })}
                      </>
                      :
                      <>
                      {trains.filter(train => train.origin === departureStation && train.destination === destinationStation).map((train)=>{
                        return(

                        <div className="train">
                            <div>
                                <p> <b>{train.trainName}</b></p>
                                <p ><b>Train Number:</b> {train.trainNumber}</p>
                            </div>
                            <div>
                                <p ><b>Start Station:</b> {train.origin}</p>
                                <p ><b>Departure Time:</b> {train.departureTime}</p>
                            </div>
                            <div>
                                <p ><b>Destination Station:</b> {train.destination}</p>
                                <p ><b>Arrival Time:</b> {train.arrivalTime}</p>
                            </div>
                            <div>
                                <p ><b>Starting Price:</b> {train.basePrice}</p>
                                <p ><b>Available Seats:</b> {train.totalSeats}</p>
                            </div>
                            <button className="button btn btn-primary" onClick={()=>handleTicketBooking(train._id, train.origin, train.destination)}>Book Now</button>
                        </div>
                        )
                      })}
                      </>}

                      

                    </div>
                  </div>
                  </>
                  :
                  <>
                   <div className="availableTrainsContainer">
                    <h1> No Trains</h1>
                    </div>
                  </>
                }
                </>
                :
                <></>
                }
         
                
                  
   






        </div>
        <section id="about" className="section-about  p-4">
        <div className="container">
            <h2 className="section-title">About Us</h2>
            <p className="section-description">
                &nbsp; &nbsp;&nbsp; &nbsp; Welcome to our train ticket booking app, where we are dedicated to providing you with an exceptional travel experience from start to finish. Whether you're embarking on a daily commute, planning an exciting cross-country adventure, or seeking a leisurely scenic route, our app offers an extensive selection of train options to cater to your unique travel preferences.
            </p>
            <p className="section-description">
                &nbsp; &nbsp;&nbsp; &nbsp; We understand the importance of convenience and efficiency in your travel plans. Our user-friendly interface allows you to effortlessly browse through a wide range of train schedules, compare fares, and choose the most suitable seating options. With just a few taps, you can secure your train tickets and be one step closer to your desired destination. Our intuitive booking process enables you to customize your travel preferences, such as selecting specific departure times, opting for a window seat, or accommodating any special requirements.
            </p>
            <p className="section-description">
                &nbsp; &nbsp;&nbsp; &nbsp; With our train ticket booking app, you can embrace the joy of exploring new destinations, immerse yourself in breathtaking scenery, and create cherished memories along the way. Start your journey today and let us be your trusted companion in making your train travel dreams a reality. Experience the convenience, reliability, and comfort that our app offers, and embark on unforgettable train adventures with confidence.
            </p>

            <span><h5>2023 Rail Connect - &copy; All rights reserved</h5></span>

        </div>
    </section>
    </div>
  )
}

export default LandingPage