import React from 'react';
import aboutus from "../assets/member-image.jpeg"

export default function About() {
    return (
        <>
            {/* <div className='container py-5 ' id='aboutus'>
                <div className='row text-center justify-content-center py-5'>
                    <div className='col-md-8 border py-5 bg-light'>
                        <h1>
                            iVipp Is the Ultimate Lifestyle Management resource, providing you with the best global bespoke concierge services.
                        </h1>
                        <button className='btn btn-primary my-3 py-2'>Become A Member</button>
                        <div>
                            
                        </div>
                    </div>
                </div>
            </div> */}
            <div className='container py-md-5 pb-md-5' id='aboutus'>
                <div className='row justify-content-center'>
                    <div className='col-lg-5 col-md-9 py-2 py-lg-0   text-center py-3 py-lg-3 order-0 order-md-1'>
                        <img src={aboutus} alt="" 
                        // data-aos="fade-up" 
                        className='w-100 h-100 rounded-3' />
                    </div>
                    <div className='col-lg-6 d-flex px-3 align-items-center' >
                        <div className=''>
                            <h2 className='fs-2  fw-semibold border-bottom' data-aos="fade-up" data-aos-duration="1500">About <span className='text-green'> IVIPP </span></h2>
                            <p className=' py-3' data-aos="fade-up" data-aos-duration="2000">
                                In today's world of travel, security concerns can often cast a shadow over the excitement of exploring new destinations. IVIPP was created to transform this experience. We go beyond simply offering security; we elevate it to an art form. Imagine leaving behind the stress of long security lines and cumbersome procedures. IVIPP streamlines the entire process, ensuring a smooth and effortless journey from the moment you embark on your adventure.
                            </p>
                            <p className='' data-aos="fade-up" data-aos-duration="2000">
                                IVIPP isn't just about getting you there safely; it's about unlocking the true magic of travel. We seamlessly blend cutting-edge security with luxurious experiences, empowering you to fully embrace the thrill of discovery. With IVIPP, you can create unforgettable memories that will be forever etched in your mind, all while knowing you're enveloped in a secure and lavish cocoon. Let IVIPP transform your next trip from a logistical hurdle into an extraordinary adventure.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
