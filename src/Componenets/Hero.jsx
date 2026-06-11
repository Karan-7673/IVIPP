import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules';
import { MdKeyboardVoice } from "react-icons/md";


// Import your images
import curouselimage1 from '../assets/curousel-2.jpg';
import curouselimage2 from '../assets/curousel-1.jpg';
import curouselimage3 from '../assets/curousel-3.jpg';
import curouselimage4 from '../assets/curousel-4.jpg';


export default function Hero() {
    return (
        <>

            <div className='container-fluid ' >
                <div className='row'>

                    <Swiper

                        spaceBetween={0}
                        centeredSlides={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        effect={'fade'}
                        pagination={{
                            clickable: true,
                        }}
                        loop={true}
                        navigation={false}
                        modules={[EffectFade, Autoplay, Pagination, Navigation]}
                        className="mySwiper"

                    >
                        <SwiperSlide >
                            <img src={curouselimage1} alt="Slide 1" className='object-fit-cover' />
                            <div className="overlay">
                                <h1
                                    className='display-4 fw-bold' >
                                    The <span className='text-green'> IVIPP </span> Experience</h1>
                                <h6 className='line-height'> Unlock the hassle free lifestyle you really deserve. Everything you need in one place. Lifestyle management + VIP Access Across the Globe. Get Your "Members Only Code" & Activate Your Global VIP Pass</h6>
                                <div className='py-3'>
                                    <button className='btn btn-green py-2 px-2 text-white' >Get Membership</button>
                                </div>
                            </div>

                        </SwiperSlide>
                        <SwiperSlide >
                            <img src={curouselimage2} alt="Slide 2" className='object-fit-cover' />
                            <div className="overlay">
                                <h1 className='display-4 fw-bold' >
                                    The <span className='text-green'> IVIPP </span> Experience</h1>
                                <h6 className='fs-5'>Unforgettable Events</h6>
                                <h6 className='line-height'> Front-row access to top concerts.
                                    VIP perks for live streams.
                                    Enjoy premium entertainment anytime, anywhere.</h6>
                                <div className='py-3'>
                                    <button className='btn btn-green py-2 px-2 text-white'>Get Membership</button>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={curouselimage3} alt="Slide 3" className='object-fit-cover' />
                            <div className="overlay">
                                <h1 className='display-4 fw-bold' >
                                    The <span className='text-green'> IVIPP </span> Experience</h1>
                                <h6 className='fs-5'>Guard, Premium Security Services</h6>

                                <h6 className='line-height'> Expert, trained security personnel.
                                    Customized protection plans.
                                    24/7 monitoring and quick response.</h6>
                                <div className='py-3'>
                                    <button className='btn btn-green py-2 px-2 text-white'>Get Membership</button>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={curouselimage4} alt="Slide 3" className='object-fit-cover' />
                            <div className="overlay">
                                <h1 className='display-4 fw-bold' >
                                    The <span className='text-green'> IVIPP </span> Experience</h1>
                                <h6 className='fs-5'>Ultimate Entertainment Experience
                                    Exclusive Access</h6>


                                <h6 className='line-height'>Personalized planning for your style.
                                    VIP access to top parties globally.
                                    Comprehensive services from decor to entertainment.
                                </h6>
                                <div className='py-3'>
                                    <button className='btn btn-green py-2 px-2 text-white'>Get Membership</button>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    <div>

                    </div>
                </div>
            </div>

        </>

    )
}
