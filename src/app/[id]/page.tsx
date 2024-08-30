"use client"
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'


const GuestPortal = () => {
    const path = usePathname().split("/")[1];

    useEffect(()=>{
        
    })


    return (
        <>
            <div>
                <h1>Guest Portal</h1>
                <h2>{path}</h2>
            </div>
        </>
    )
}

export default GuestPortal