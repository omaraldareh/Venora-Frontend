import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
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
import API from './api/axios';
import MyBookings from './pages/MyBookings';
import NotFound from './pages/NotFound';

function App() {
  const [isServerReady, setIsServerReady] = useState(false);
  const [loadingText, setLoadingText] = useState("Waking up the server, please wait...");

  useEffect(() => {
    let isMounted = true;
    

    const messages = [
      "Waking up the server, please wait...",
      "Preparing luxury venues for you...",
      "Connecting to the database...",
      "Almost there, finalizing connection..."
    ];
    let msgIndex = 0;

    const intervalId = setInterval(() => {
      msgIndex = (msgIndex + 1) % messages.length;
      if (isMounted) setLoadingText(messages[msgIndex]);
    }, 6000);

    const checkServerHealth = async () => {
      try {
        await API.get("/health");
        if (isMounted) {
          setIsServerReady(true);
          clearInterval(intervalId);
        }
      } catch (error) {
        console.log("Server is still sleeping, retrying in 3 seconds...");
        console.log(error);
        setTimeout(checkServerHealth, 3000);
      }
    };

    checkServerHealth();

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  if (!isServerReady) {
    return (
      <div className="min-h-screen bg-[#020817] flex flex-col justify-center items-center px-4">
        <div className="relative flex items-center justify-center mb-6">
          <div className="animate-ping absolute inline-flex h-20 w-20 rounded-full bg-[#D4A353]/10 opacity-75"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#D4A353]"></div>
        </div>
        
        <h1 className="text-2xl font-serif text-white tracking-widest mb-2 font-bold animate-pulse">
          VENORA
        </h1>

        <p className="text-gray-400 text-sm font-mono tracking-wide max-w-xs text-center duration-500 transition-all">
          {loadingText}
        </p>
      </div>
    );
  }

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
        <Route path="MyBookings" element={<MyBookings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;