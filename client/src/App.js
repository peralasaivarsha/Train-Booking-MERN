import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Authenticate from './pages/Authenticate';
import Bookings from './pages/Bookings';
import Admin from './pages/Admin';
import AllUsers from './pages/AllUsers';
import AllBookings from './pages/AllBookings';
import AllTrains from './pages/AllTrains';
import NewTrain from './pages/NewTrain';
import {Routes, Route} from 'react-router-dom'
import LoginProtector from './RouteProtectors/LoginProtector';
import AuthProtector from './RouteProtectors/AuthProtector';
import BookTrain from './pages/BookTrain';
import EditTrain from './pages/EditTrain';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route exact path = '' element={<LandingPage />} />
        <Route path='/auth' element={<LoginProtector> <Authenticate /> </LoginProtector>} />
        <Route path='/book-train/:id' element={<AuthProtector> <BookTrain /> </AuthProtector>} />
        <Route path='/bookings' element={<AuthProtector> <Bookings /> </AuthProtector>} />
        <Route path='/admin' element={<AuthProtector><Admin /> </AuthProtector>} />
        <Route path='/all-users' element={<AuthProtector><AllUsers /> </AuthProtector>} />
        <Route path='/all-bookings' element={<AuthProtector><AllBookings /> </AuthProtector>} />
        <Route path='/all-trains' element={<AuthProtector><AllTrains /> </AuthProtector>} />
        <Route path='/new-train' element={<AuthProtector><NewTrain /> </AuthProtector>} />
        <Route path='/edit-train/:id' element={<AuthProtector><EditTrain /> </AuthProtector>} />
      </Routes>

    </div>
  );
}

export default App;
