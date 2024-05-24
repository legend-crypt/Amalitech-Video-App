import Landing from "./components/landing";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Verification from "./pages/Verification";
import VerificationRequest from "./pages/VerificationRequest";
import PasswordResetRequest from "./pages/PasswordResetRequest";
import ResetPassword from "./pages/ResetPassword";
import PasswordResetVerify from "./pages/PasswordResetVerify";
import {Route, Routes} from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadVideo from "./pages/UploadVideo";



function App() {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/verification' element={<Verification />} />
        <Route path='/verification-request' element={<VerificationRequest />} />
        <Route path='/password-reset-request' element={<PasswordResetRequest />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/password-reset-verify' element={<PasswordResetVerify />} />
        <Route path="/upload-video" element={<UploadVideo />} />
      </Routes>

    </>
  )
}

export default App
