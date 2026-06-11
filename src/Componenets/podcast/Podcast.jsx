import React from 'react'
import img1 from "../../assets/bg-image.png"

export default function Podcast() {
    const podcstcard = [
        {
            image: img1,
            date: " aug 09",
            time: "5"
        },
        {
            image: img1,
            date: "aug 09",
            time: "5"
        },
    ]
    return (
        <>
            <div className='container '>
                <div className='row row-cols-lg-5 row-cols-md-4 row-cols-1'>
                    {
                        
                    }
                    <div className='col'>
                        <div>
                            <img src={img1} alt="" />
                        </div>
                        <p>Aug 09 </p>
                        <p> min</p>
                    </div>

                </div>
            </div>
        </>
    )
}
