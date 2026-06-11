import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import React, { useRef } from 'react'
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Membershipplan2 from './Membershipplan2';
import Table from './Table';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import Contact from './Contact';
import Footer from './Footer';
import { useOutletContext } from 'react-router-dom';

export default function Home() {
    const { section1Ref } = useOutletContext();

    return (
        <>

            <Hero />
            <About />
            <Membershipplan2 />
            <Table />
            <Gallery />
            <Testimonials />
            <Contact ref={section1Ref} />
            {/* <Footer /> */}


        </>
    )
}
