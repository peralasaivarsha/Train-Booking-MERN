import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { User, Train, Booking } from './schemas.js';

const app = express();

app.use(express.json());
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

// mongoose setup

const PORT = 6001;
mongoose.connect('mongodb://localhost:27017/TrainBookingMERN', { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(()=>{

    // All the client-server activites


    app.post('/register', async (req, res) => {
        const { username, email, usertype, password } = req.body;
        try {
          
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                email,
                usertype,
                password: hashedPassword
            });
            const userCreated = await newUser.save();
            return res.status(201).json(userCreated);

        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'Server Error' });
        }
    });


    app.post('/login', async (req, res) => {
        const { email, password } = req.body;
        try {

            const user = await User.findOne({ email });
    
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            } else{
                
                return res.json(user);
            }
          
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'Server Error' });
        }
    });
      


    // fetch all users

    app.get('/fetch-users', async (req, res)=>{

        try{
            const users = await User.find();
            res.json(users);

        }catch(err){
            res.status(500).json({message: 'error occured'});
        }
    })


    // Add train

    app.post('/add-train', async (req, res)=>{
        const {trainName, trainNumber, origin, destination, departureTime, arrivalTime, basePrice, totalSeats} = req.body;
        try{

            const train = new Train({trainName, trainNumber, origin, destination, departureTime, arrivalTime, basePrice, totalSeats});
            const newTrain = train.save();

            res.json({message: 'train added'});

        }catch(err){
            console.log(err);
        }
    })

    // update train
    
    app.put('/update-train', async (req, res)=>{
        const {trainId, trainName, trainNumber, origin, destination, departureTime, arrivalTime, basePrice, totalSeats} = req.body;
        try{

            const train = await Train.findById(trainId)

            train.trainName = trainName;
            train.trainNumber = trainNumber;
            train.origin = origin;
            train.destination = destination;
            train.departureTime = departureTime;
            train.arrivalTime = arrivalTime;
            train.basePrice = basePrice;
            train.totalSeats = totalSeats;

            const newTrain = train.save();

            res.json({message: 'train updated'});

        }catch(err){
            console.log(err);
        }
    })

    // fetch trains

    app.get('/fetch-trains', async (req, res)=>{
        
        try{
            const trains = await Train.find();
            res.json(trains);

        }catch(err){
            console.log(err);
        }
    })


    // fetch train

    app.get('/fetch-train/:id', async (req, res)=>{
        const id = await req.params.id;
        console.log(req.params.id)
        try{
            const train = await Train.findById(req.params.id);
            console.log(train);
            res.json(train);

        }catch(err){
            console.log(err);
        }
    })

    // fetch all bookings

    app.get('/fetch-bookings', async (req, res)=>{
        
        try{
            const bookings = await Booking.find();
            res.json(bookings);

        }catch(err){
            console.log(err);
        }
    })

    // Book train

    app.post('/book-ticket', async (req, res)=>{
        const {user, train, trainName, trainNumber,  StartStation, destinationStation, email, mobile, passengers, totalPrice, journeyDate, coachClass} = req.body;
        try{

            
            const bookings = await Booking.find({train: train, journeyDate: journeyDate, coachClass: coachClass});
            const numBookedSeats = bookings.reduce((acc, booking) => acc + booking.passengers.length, 0);
            
            let seats = "";
            const seatCode = {'s2': 'G', 'sleeper': 'SL', '3ac': 'C', '2ac': 'B', '1ac': 'A'};
            let coach = seatCode[coachClass];
            coach = coach.concat(Math.floor((numBookedSeats%70 ) + 1), " - ")
            for(let i = numBookedSeats + 1; i< numBookedSeats + passengers.length+1; i++){
                if(seats === ""){
                    seats = seats.concat( i);
                }else{
                    seats = seats.concat(", ", i);
                }
            }

            seats = coach.concat(seats);


            const booking = new Booking({user, train, trainName, trainNumber, StartStation, destinationStation, email, mobile, passengers, totalPrice, journeyDate, coachClass, seats});
            await booking.save();

            res.json({message: 'Booking successful!!'});

        }catch(err){
            console.log(err);
        }
    })


    // cancel ticket

    app.put('/cancel-ticket/:id', async (req, res)=>{
        const id = await req.params.id;
        try{
            const booking = await Booking.findById(req.params.id);
            booking.bookingStatus = 'cancelled';
            await booking.save();
            res.json({message: "booking cancelled"});

        }catch(err){
            console.log(err);
        }
    })



        app.listen(PORT, ()=>{
            console.log(`Running @ ${PORT}`);
        });
    }
).catch((e)=> console.log(`Error in db connection ${e}`));