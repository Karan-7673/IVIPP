import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import gallleryimage1 from "../assets/gallery-image-6.jpg"
import gallleryimage2 from "../assets/gallery-image-2.jpg"
import gallleryimage3 from "../assets/gallery-image-3.jpg"
import gallleryimage4 from "../assets/gallery-image-4.jpg"
import gallleryimage5 from "../assets/gallery-image-5.jpg"
import gallleryimage6 from "../assets/gallery-image-1.jpg"
import gallleryimage7 from "../assets/gallery-image-7.jpg"
import gallleryimage8 from "../assets/gallery-image-8.jpg"
import gallleryimage9 from "../assets/gallery-image-9.jpg"
import gallleryimage10 from "../assets/gallery-image-10.jpg"
import gallleryimage11 from "../assets/gallery-image-11.jpg"
// import gallleryimage7 from "../assets/gallery-image-7.jpg"

export default function Gallery() {

    const images = [
        gallleryimage1,
        gallleryimage2,
        gallleryimage3,
        gallleryimage4,
        gallleryimage5,
        gallleryimage8,
        gallleryimage10,

    ];
    const images2 = [
        gallleryimage7,
        gallleryimage9,
        gallleryimage11,
        gallleryimage6,
    ]
    const settings = {
        dots: false,
        className: "center",
        lazyLoad: false,
        centerMode: true,
        infinite: true,
        autoplay: true,
        centerPadding: "0px",
        slidesToShow: 3,
        speed: 5000,
        autoplaySpeed: 5000,
        rows: 1,
        cssEase: "linear",
        slidesPerRow: 1,
        pauseOnHover: false,
        arrows: false,
        rtl: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,

                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 1,
                    infinite: true,
                }
            }
        ]
    };
    const settings2 = {
        dots: false,
        className: "center",
        lazyLoad: false,
        centerMode: true,
        infinite: true,
        autoplay: true,
        centerPadding: "0px",
        slidesToShow: 3,
        speed: 5000,
        autoplaySpeed: 5000,
        rows: 1,
        cssEase: "linear",
        slidesPerRow: 1,
        pauseOnHover: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,

                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 1,
                    infinite: true,
                }
            }
        ]
    };
    return (
        <>


            <div className="conatiner-fluid  m-0 px-0 px-md-3 px-lg-5 ">
                <div className="row m-0 px-md-2 px-lg-5 p">
                    <h1 className="text-center py-3">24*7 <span className="text-green">Concierge </span></h1>
                    <p className="text-center pb-3">
                        iVipp service allows you to live the most convenient life possible through our growing list of lifestyle service providers delivered to you right from our app.
                    </p>
                    <div className="slider-container p-0">
                        <Slider {...settings}>
                            {images.map((image, index) => (
                                <div key={index} className="">
                                    <div className="" style={{ backgroundImage: `url(${image})` }}></div>
                                    <div className="slider-image">
                                        <img
                                            src={image}
                                            className="text-center w-100"
                                        // style={{ height: "300px", width: "auto",  }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="slider-container p-0">
                        <Slider {...settings2}>
                            {images2.map((image, index) => (
                                <div key={index} className="">
                                    <div className="" style={{ backgroundImage: `url(${image})` }}></div>
                                    <div className="slider-image">
                                        <img
                                            src={image}
                                            className="text-center w-100"
                                        // style={{ height: "300px", width: "auto" }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>





        </>
    )
}
