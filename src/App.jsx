import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ChooseAccount from './pages/ChooseAccount';
import Otp from './pages/otp';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import Browse from './pages/Browse';
import ViewDetails from './pages/ViewDetails';
import BookingPage from './pages/BookingPage';
import ProviderDashboard from './pages/ProviderDashboard';
import ProviderBookingsPage from './components/ProviderDashboard/ProviderBookingsPage';
import CreateHall from './pages/CreateHall';
import EditHall from './pages/EditHall';
import AdminPage from './pages/AdminPage';
import PendingHalls from './pages/Admin/PendingHalls';
import AllUsers from './pages/Admin/AllUsers';
import AllProviders from './pages/Admin/AllProviders';
import AllBookings from './pages/Admin/AllBookings';
import AllReviews from './pages/Admin/AllReviews';
import Favourite from './pages/Favourite';
import About from './pages/About';
// import ReviewsSection from './components/ReviewLayout/ReviewsSection';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/ChooseAccount' element={<ChooseAccount />}/>
        <Route path='/verifyOtp' element={<Otp />} />
        <Route path='/forgetPassword' element={<ForgetPassword />}/>
        <Route path='/resetPassword' element={<ResetPassword />}/>
        <Route path='/browse' element={<Browse />}/>
        <Route path="/browse/:id" element={<ViewDetails />} />
        <Route path="/browse/:id/book" element={<BookingPage />} />
        <Route path='/provider/dashboard' element={<ProviderDashboard />} />
        <Route path="/provider/bookings" element={<ProviderBookingsPage />} />
        <Route path='/provider/add-hall' element={<CreateHall />} />
        <Route path='/hall/updateHall/:id' element={<EditHall />} />
        <Route path='/admin/dashboard' element={<AdminPage />} />
        <Route path='/admin/pending-halls' element={<PendingHalls />} />
        <Route path='/admin/users' element={<AllUsers />} />
        <Route path='/admin/providers' element={<AllProviders />} />
        <Route path='/admin/bookings' element={<AllBookings />} />
        <Route path='/admin/reviews' element={<AllReviews />} />
        <Route path='/MyFavourite' element={<Favourite />} />
        <Route path='/AboutUs' element={<About />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
