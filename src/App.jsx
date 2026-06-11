import { useEffect, useLayoutEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Componenets/Home';
import VoiceRecognition from './Componenets/VoiceRecognition';
import Tripsandevent from './Componenets/Plans/Tripsandevent';
import Index from './Index';
import Ivippperks from './Componenets/Plans/Ivippperks';
import Tablereservation from './Componenets/Plans/Tablereservation';
import Contactivipp from './Componenets/Plans/Contactivipp';
import Demo from './Componenets/Demo';
import Demo2 from './Componenets/Demo2';
import Demo3 from './Componenets/Demo3';
import Demo4 from './Componenets/Demo4';
import Sample from './Componenets/Sample';
import Podcast from './Componenets/podcast/Podcast';


const App = () => {
  // const location = useLocation();
  // useLayoutEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location]);

  return (
    <>
      <Router >
        <Routes>
          <Route path="/" element={<Index />} >
            <Route index element={<Home />}></Route>
            <Route path="/voice" element={<VoiceRecognition />} ></Route>
            <Route path="/trips-and-events" element={<Tripsandevent />} ></Route>
            <Route path="/perks" element={<Ivippperks />}></Route >
            <Route path="/table-reservation" element={<Tablereservation />}> </Route>
            <Route path="/contact-ivipp" element={<Contactivipp />} ></Route>
          </Route >
        
        </Routes>
      </Router>
    </>
  )
}

export default App
