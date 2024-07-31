import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-black text-white'>
        <div className="mycontainer flex justify-between items-center h-14 px-4 py-5">
        <div className='logo font-bold text-white text-2xl'>
        <span className='text-green-700'> /&lt;</span>
        Pass
        <span className='text-green-700'>OP/&gt;</span>
        </div>
      <div >
        <a href='github.com'>
        <img className='invert p-4 w-16  rounded-3xl' src='/github.png' alt='github'/>
        </a>
        </div>
      </div> 
    </nav>
  )
}

export default Navbar
