import React from 'react'
import footer from "../assets/logo.png"
import apple from "../assets/apple-appstore.png"
import playstore from "../assets/Play-store.png"
import { FaInstagram } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";
import { CiYoutube } from "react-icons/ci";
import { Link } from 'react-router-dom';

export default function Footer() {
    const handleMapLocation = (location) => {

        const destination = encodeURIComponent(location);
        const currentLocation = "current+location"; // You can replace this with a fixed location if needed
        const mapsUrl = `https://www.google.com/maps/place/3350+Riverwood+Pkwy+%231900,+Atlanta,+GA+30339,+USA/@33.877849,-84.460616,17z/data=!3m1!4b1!4m6!3m5!1s0x88f5103f4874abfb:0xbe8a38a6ac0a24c5!8m2!3d33.877849!4d-84.4580411!16s%2Fg%2F11qz9tc9_r?entry=ttu`;

        window.open(mapsUrl, '_blank');
    };
    return (
        <>

            <div className='container-fluid bg-footer p-0p'>
                {/* <p className='fs-5 text-center py-3 text-white border-bottom'>IVIPP</p> */}
                <div className='row m-0 text-white px-5 py-5 justify-content-center'>
                    <div className='col-md-2 '>
                        <a href="#">
                            <img src={footer} alt="" width={"100px"} />
                        </a>
                    </div>
                    <div className='col-md-3 '>
                        <div>
                            <h6>Membership</h6>
                            <div>

                                <span className='m-0 footer-text text-hover-color'>IVIPP BASIC</span>
                            </div>
                            <span className='footer-text text-hover-color'>ALL ACCESS MEMBERSHIP</span>
                        </div>
                    </div>
                    <div className='col-md-4  '>
                        <div>
                            <h6>Contact</h6>
                            <div>
                                <span onClick={handleMapLocation} className='footer-text text-hover-color'>3350 Riverwood Pkwy SE, Suite 1900 Atlanta, GA 30339</span>
                            </div>
                            <a href="tel:980-477-5133">
                                <span className='m-0 footer-text text-hover-color'>980-477-5133</span>
                            </a>
                        </div>
                    </div>
                    <div className='col-md-2 '>
                        <div>
                            <h6>Follow Us</h6>
                            <Link to="https://www.instagram.com/ivippapp/?hl=en">
                                <span className='m-0 footer-text text-hover-color fs-5'><FaInstagram /> <span className='fs-14px'> </span>
                                </span>
                            </Link>
                            <span className='m-0 footer-text text-hover-color px-2 fs-5'><FiFacebook /> <span className='fs-14px'> </span></span>
                            <sapn className='m-0 footer-text text-hover-color fs-5'><CiYoutube /> <span className='fs-14px'> </span></sapn>

                        </div>
                    </div>
                </div>
                <div className='row justify-content-center py-3 pb-5 m-0'>
                    <div className='col-md-6 text-center' >
                        <Link to="https://apps.apple.com/us/app/ivipp-members-only/id1491558204">
                            <img src={apple} alt="" className='px-5' width={"250px"} />
                        </Link>
                        <Link to="https://play.google.com/store/apps/details?id=com.ivipp.ivipp">
                            <img src={playstore} alt="" className='px-5' width={"250px"} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className='bg-black-light py-2'>
                <p className='text-center m-0 fs-14px footer-text'>
                    IVIPP.COM © 2024 ALL RIGHTS RESERVED.
                </p>
            </div>

        </>
    )
}
