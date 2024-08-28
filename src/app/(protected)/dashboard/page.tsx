"use client"
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUser } from '@/store/slices/user';
import { getClientData } from '@/utils/getClientData';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

const DashBoard = () => {
  const state = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const signout = () => {
    localStorage.removeItem("gift-app-token");
    router.push("/");
  }

  useEffect(()=>{
    const resolve = async () => {
      const tkn = localStorage.getItem("gift-app-token");
      const res = await getClientData(tkn!);
      dispatch(setUser(res));
    }
    resolve();
  },[])

  return (
    <>
      <div>
        <h1 className='text-2xl'>Welcome, Let's Create and Manage events</h1>
        <p className='text-lg'>You are logged in as {JSON.stringify(state)}</p>
        {/* <button onClick={() => dispatch(setUser({ id: "asd", name: "John Doe", email: "as" }))}>Click</button> */}
        <button onClick={signout}>Click rm</button>

      </div>
    </>
  )
}

export default DashBoard