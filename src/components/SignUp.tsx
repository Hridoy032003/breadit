import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import UserAuthForm from './UserAuthForm'

const SignIn = () => {
  return (
   <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <Image
          src='/logo.png'
          alt='Breadit Logo'
          width={52}
          height={52}
          className='mx-auto'
        />
        <h1 className='text-2xl font-semibold tracking-tight'>Join Us</h1>
        <p className='text-sm max-w-xs mx-auto'>
          By continuing, you are setting up a Breadit account and agree to our
          User Agreement and Privacy Policy.
        </p>
      </div>
      <UserAuthForm />
      <p className='px-8 text-center text-sm text-muted-foreground'>
        Already have an account?{' '}
        <Link
          href='/sign-in'
          className='hover:text-brand text-sm underline underline-offset-4'>
          Sign Up
        </Link>
      </p>
    </div>
  )
}

export default SignIn