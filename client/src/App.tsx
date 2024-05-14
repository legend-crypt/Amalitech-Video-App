import Landing from "./components/landing";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Verification from "./pages/Verification";
import VerificationRequest from "./pages/VerificationRequest";
import PasswordResetRequest from "./pages/PasswordResetRequest";
import ResetPassword from "./pages/ResetPassword";
import PasswordResetVerify from "./pages/PasswordResetVerify";


function App() {
  return (
    <>

      <Navbar />
      {/* <Landing /> */}
      {/* < Login/> */}
      {/* <Signup/> */}
      {/* <Verification/>
      <VerificationRequest /> */}
      <PasswordResetRequest />
      <ResetPassword />
      <PasswordResetVerify />

    </>
  )
}

export default App
