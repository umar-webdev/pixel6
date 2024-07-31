import React from 'react'
import menu from '../assets/menu-svgrepo-com.svg'
import logo from '../assets/pixel6.jpg'

const Navbar = () => {
  return (
    <div>
        

<nav>
  <div className=" flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logo} style={{mixBlendMode:'darken'}} className="h-20" alt="Pixel" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
    </a>
    <button data-collapse-toggle="navbar-hamburger" type="button" className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
      <span className="sr-only"></span>
      <img src={menu} className='h-16 w-16' alt="" />
    </button>
    <div className="hidden w-full" id="navbar-hamburger">
    
    </div>
  </div>
</nav>

    </div>
  )
}

export default Navbar