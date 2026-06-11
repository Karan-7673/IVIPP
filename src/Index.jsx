import React, { useRef } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Componenets/Navbar';

import Footer from './Componenets/Footer'

export default function Index() {
    const section1Ref = useRef(null);

    return (
        <>
            <Navbar section1Ref={section1Ref} />
            <Outlet context={{ section1Ref }} />
            <Footer />
        </>
    )
}
