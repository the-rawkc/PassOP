import React from 'react'

const Footer = () => {
  return (
    <div className='bg-black text-white flex flex-col justify-center items-center w-full'>
        <div className='logo font-bold text-white text-2xl'>
        <span className='text-green-700'> /&lt;</span>
            Pass
        <span className='text-green-700'>OP/&gt;</span>
        </div>
        <div className='flex'>Created with <img src='/heart.webp' alt=''className=' w-8 mx-2 ' /> by The-RAWK-C
        </div>
    </div>
  )
}

export default Footer
