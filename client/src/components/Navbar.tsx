import { useState } from 'react'
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { logoutUser } from '../store/slices/userAuth';
import logo from '../assets/AMIRI Davis.png';



function Navbar() {
  const [nav, setNav] = useState(false);
  const userStatus = useSelector((state: RootState) => state.userAuth.userStatus)
  const isUserLogin = useSelector((state: RootState) => state.userAuth.isUserLogin);
  const dispatch = useDispatch();


  const handleClick = () => setNav(!nav)

  const handleSignOut = () => {
    dispatch(logoutUser());
  }

  return (
    <nav className='flex justify-between p-3 items-center border-b bg-[#92e0fff8] nav'>
      <Link to='/'><img className='w-10' src={logo} alt='logo'/></Link>
      <ul className='hidden  md:flex gap-6'>
        {
          !isUserLogin ? (
            <>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Sign Up</Link></li>
            </>
          ) : (
            <>
              {userStatus && <li><Link to='/upload-video'>Upload Video</Link></li>}
              <li><Link to='/videos/'>Videos</Link></li>
              <li onClick={handleSignOut}><Link to='/'>Sign Out</Link></li>
            </>
          )
        }
      </ul>
      <div className=' md:hidden z-10' onClick={handleClick}>
        {nav ? <FaTimes size={25} color='white' /> : <RxHamburgerMenu size={25}/>}
      </div>
      {/* Mobile Menu */}
      <ul
        className={`${
          nav
            ? 'text-white opacity-100 transform translate-x-0'
            : 'opacity-0 transform -translate-y-full'
        } transition-transform absolute top-0 left-0 w-full h-screen bg-zinc-800/80 flex flex-col justify-center items-center text-2xl`}
        onClick={() => setNav(false)}
      >
          {
          !isUserLogin ? (
            <>
            <li className='hover:text-teal-700'><Link to='/login'>Login</Link></li>
            <li className='hover:text-teal-700'><Link to='/signup'>Sign Up</Link></li>
            </>
          ) : (
            <>
              {userStatus && <li className='hover:text-teal-700'><Link to='/upload-video'>Upload Video</Link></li>}
              <li className='hover:text-teal-700'><Link to='/videos/'>Videos</Link></li>
              <li className='hover:text-teal-700' onClick={handleClick}><Link to='/'>Sign Out</Link></li>
            </>
          )
        }


      </ul>
    </nav>
  )
}

export default Navbar