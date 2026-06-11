import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import reviewimag1 from "../assets/testimonial/volunteer-3.png"
import reviewimag2 from "../assets/testimonial/volunteer-8.png"
import reviewimag3 from "../assets/testimonial/volunteer-9.png"
import reviewimag4 from "../assets/testimonial/volunteer-10.png"
import { FaStar } from "react-icons/fa6";

function SampleNextArrow(props) {
    const { style } = props;
    return <div style={{ ...style, }} />;
}

function SamplePrevArrow(props) {
    const { style } = props;
    return <div style={{ ...style, }} />;
}

function Testimonials() {

    const content = [
        {
            reviewr_img: reviewimag3,
            quote:
                '"Their lifestyle management service has transformed my travels. Every trip is perfectly organized, stress-free, and luxurious. Highly recommend! "'
            ,
            name: "Olivia J.  ",
            Des: "Consultant",
        },
        {
            reviewr_img: reviewimag4,
            quote:
                '"The global VIP access is incredible. I’ve experienced the best hotels, restaurants, and services around the world. Its a whole new level of travel!"',
            name: "Jane Smith",
            Des: "Founder & CEO",
        },

        {
            reviewr_img: reviewimag1,
            quote:
                '"The VIP access to exclusive parties is fantastic. They take care of everything, and all I do is show up and have a great time. Brilliant service!"',
            name: "Kevin Anderson",
            Des: "Emma L.",
        },

        {
            reviewr_img: reviewimag2,
            quote:
                '"I have never felt more secure. The customized protection plans and 24/7 monitoring are exactly what I needed for peace of mind."',
            name: "David Jones",
            Des: "Advisor",
        },
    ];

    const settings = {
        dots: false,
        infinite: true,
        fade: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 8000,
        waitForAnimate: false,
        // cssEase: "linear",
        PauseonHover: true,
    };
    return (
        <>
            <div id="review" className="py-5">
                <h4 className="text-center text-black py-3">Here's what our members have to say
                </h4>
                <div className="container text-white px-md-5 py-5 bg-light py-3">
                    <div className="row px-md-5 ">
                        <div className="slick text-black   px-5 " >
                            <Slider {...settings}>
                                {content.map((content, index) => (
                                    <div className="p-md-3 px-md-5 text-center align-self-center " key={index}>
                                        <p className="d-flex justify-content-center"  >
                                            <img src={content.reviewr_img} alt={`gallary-image-${index + 1}`} className="text-center align-content-center  border-radius" width={"150px"} height={"150px"} />
                                        </p>
                                        <p className="fw-semibold  text-green">-{content.name}</p>
                                        <span className="text-warning"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span>
                                        <h4 className="fs-6 px-3 py-2">{content.quote}</h4>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Testimonials;
