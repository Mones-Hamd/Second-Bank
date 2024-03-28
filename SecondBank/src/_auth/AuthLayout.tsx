import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const AuthLayout = () => {
    const isAuthinticated = false
  return (
   <>
    {isAuthinticated? (
        <Navigate to='/'/>
    ):(
        <>
             <img 
                src='../../public/assets/images/side.jpeg' 
                alt='sign-image'
                className=' hidden md:block h-screen w-1/3 object-cover bg-no-repeat'/>
            <section className='flex flex-1 justify-center items-center flex-col py-10'>
                <Outlet />
            </section>
           
        </>
    )}
   </>
  )
}

export default AuthLayout