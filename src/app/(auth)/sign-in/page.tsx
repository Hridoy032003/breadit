import Navbar from '@/components/Navbar'
import SignIn from '@/components/SignIn'
import React from 'react'

const page = () => {
  return (
     <div className='absolute inset-0'>
       <Navbar/> 
      <div className='h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20'>
      
      <SignIn/>
        {/* <SignIn /> */}
      </div>
    </div>
  )
}

export default page