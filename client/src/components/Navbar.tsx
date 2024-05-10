import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaTimes } from 'react-icons/fa'

function Navbar() {
  // nav is starting off false
  const [nav, setNav] = useState(false)
  // so when user clicks the hamburger button, it goes from false(!nav) to true(nav)
  const handleClick = () => setNav(!nav)

  return (
    <nav className='flex justify-between p-5 items-center border-b bg-[#e7e7e7d1] nav'>
      <h1 className='text-4xl logo'>navBAR.co</h1>
      <ul className='hidden  md:flex gap-6'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/features'>Features</Link></li>
        <li><Link to='/products'>Products</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/locations'>Locations</Link></li>
        <li><Link to='/contact'>Contact Us</Link></li>
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
          <li className='hover:text-teal-700'><Link to='/'>Home</Link></li>
          <li className='hover:text-teal-700'><Link to='/features'>Features</Link></li>
          <li className='hover:text-teal-700'><Link to='/products'>Products</Link></li>
          <li className='hover:text-teal-700'><Link to='/about'>About</Link></li>
          <li className='hover:text-teal-700'><Link to='/locations'>Locations</Link></li>
          <li className='hover:text-teal-700'><Link to='/contact'>Contact Us</Link></li>

      </ul>
    </nav>
  )
}

export default Navbar