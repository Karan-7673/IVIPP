import React, { useState } from 'react';
import CityMap from './Citymap.jsx';
import barimage from '../../assets/barimage.jpeg'
// import barimage from '../../assets/barimage.jpeg'
export default function Mainmap() {
    const [hoveredProfile, setHoveredProfile] = useState(null);

    const handleHoverProfile = (profileId) => {
        setHoveredProfile(profileId);
        console.log("Hovered profile ID:", profileId);
    };

    const profiles = [
        {
            id: 1,
            Image: barimage,
            iconUrl1: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png',
            name: "Ghost Bar ",
            latitude: 32.691860,
            longitude: -96.880013,
            profession: "Founder & Chief Executive officer",
        },
        {
            id: 2,
            iconUrl1: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png',
            name: "Last Change Bar & Package",
            profession: "Accountant",
            latitude: 40.7128,
            longitude: -74.0060,

        },
        {
            id: 3,
            iconUrl1: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png',
            name: "CHEFS",
            latitude: 25.7617,
            longitude: -80.1918,
            profession: "Designer",
        },
        {
            id: 4,
            name: "Orlando's Night Club SPC 43",
            latitude: 34.0522,
            longitude: -118.2437,
            profession: "Engineer",
        },
        {
            id: 5,
            name: "El Charro Mexican Restaurants",
            latitude: 34.0522,
            longitude: -110.2437,
            profession: "Doctor",
        },
        {
            id: 6,
            name: "Fasslers Hall ",
            latitude: 36.1699,
            longitude: -115.255,
            profession: "Engineer",
        },
        {
            id: 7,
            name: "Bar Louie-The District",
            latitude: 34.0522,
            longitude: -115.2437,
            profession: "Scientist",
        },
        {
            id: 8,
            name: "Dalton's Corner Bar And Grill ",
            latitude: 40.7128,
            longitude: -74.600,
            profession: "Law",
        },
        {
            id: 9,
            name: "Mia's Bar",
            latitude: 39.9526,
            longitude: -75.1652,
        },
        // {
        //     id: 10,
        //     name: "Alexander White",
        //     latitude: 34.0522,
        //     longitude: -114.2437,
        //     profession: "Architect",
        // },
        // {
        //     id: 11,
        //     name: "Charlotte Harris",
        //     latitude: 32.877750,
        //     longitude: -84.458230,
        //     profession: "Financial Analyst",
        // },
        // {
        //     id: 12,
        //     name: "Liam Lewis",
        //     latitude: 33.877750,
        //     longitude: -80.458230,
        //     profession: "Construction Worker",
        // },
        // {
        //     id: 13,
        //     latitude: 33.877750,
        //     longitude: -84.458230,

        // },

    ];
    return (
        <>
            <div className='container  justify-content-center'>
                <h2 className='text-center px-5 '>GLOBAL <span className='text-green'> REACH </span>, GLOBAL <span className='text-green'> IMPACT</span>
                </h2>
                <p className='py-1 text-center'>
                    With more than 1,800 staff members across 21 countries, we are on hand to assist in 30 different languages, 24 hours a day, 365 days a year.
                </p>
                <div className='py-4 ' style={{ height: '60vh', width: '100%', }}>
                    <CityMap profiles={profiles} onHoverProfile={handleHoverProfile} />

                </div>
            </div>
        </>
    )
}
