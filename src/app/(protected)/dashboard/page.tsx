"use client"
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeUser, setUser } from '@/store/slices/user';
import React from 'react'

const DashBoard = () => {
  const state = useAppSelector(state => state.user)
  return (
    <>
      <div>
        <h1 className='text-2xl'>Welcome, Let's Create and Manage events</h1>
        <p className='text-lg'>You are logged in as {JSON.stringify(state)}</p>
        {/* <button onClick={() => dispatch(setUser({ id: "asd", name: "John Doe", email: "as" }))}>Click</button> */}
        {/* <button onClick={() => dispatch(removeUser())}>Click rm</button> */}

      </div>
    </>
  )
}

export default DashBoard