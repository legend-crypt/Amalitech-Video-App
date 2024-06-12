import Landing from "./pages/Landing";
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
import Videos from "./pages/Videos";
import RetriveVideo from "./pages/RetriveVideo";
import ProtectedPage from "./components/ProtectedPage";



function App() {
  return (
    <div className="bg-primary-950">
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
        <Route path="/videos/" element={<ProtectedPage Component={<Videos/>}/>} />
        <Route path="video/:videoId" element={<ProtectedPage Component={<RetriveVideo />} />} />
      </Routes>

    </div>
  )
}

export default App
