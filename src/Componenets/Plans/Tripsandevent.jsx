import React from 'react'
import ivipp from "../../assets/member-image.jpeg"

export default function Tripsandevent() {
    return (

        <div className='bg-dark'>
            <div className='container py-5 text-white'>
                <div className='row py-3'>
                    <h2 className='text-center py-5'>MEMBERSHIP BENIFITS</h2>
                    <div className='col-md-6 justify-content-center'>
                        <h3 className='text-green'>TRIPS AND EVENTS</h3>
                        iVipp = CONVENIENCE ON-DEMAND
                        <p>
                            Experience the epitome of luxury and convenience with our comprehensive membership packages, encompassing an extensive array of elite services tailored to your lifestyle needs. From private travel management and personal chauffeur services, available in every city, to access to a network of celebrity chefs crafting culinary masterpieces just for you, we ensure every aspect of your life is seamlessly managed. Our expertise extends to real estate acquisition and management, investment and financial services management, as well as domestic services assistance. With our personal and corporate concierge programs, dedicated personal assistants, and VIP event access, you’ll enjoy exclusive privileges and unparalleled convenience. Plus, rest assured with our top-notch security services, providing peace of mind wherever you go. Welcome to a world where luxury meets personalized service at every turn.
                        </p>
                    </div>
                    <div className='col-md-6 text-center'>
                        <img src={ivipp} alt="" className='img-fluid' width={"500px"} />
                    </div>
                </div>
            </div>
        </div>

    )
}
