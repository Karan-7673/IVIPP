import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Membershipplan2() {
    const navigate = useNavigate();
    const services = [
        {
            id: 1,
            path: "/perks",
            heading: "IVIPP PERKS",
            description: "With your 24/7 concierge you can contact us & send in requests for dinner reservations, tickets to the next event, table & bottle service at the hottest club, & Private parties and also personal lifestyle services.",
        },
        {
            id: 2,
            path: "/trips-and-events",
            heading: "TRIPS AND EVENTS",
            description: "We get all our iVipp members, celebrity friends, and sponsors together for mind blowing exclusive members only events.!! Members always enjoy exclusive invites and members only pricing.",
        },
        {
            id: 3,
            path: "/table-reservation",

            heading: "TABLE RESERVATIONS MADE EASY",
            description: "Members Get a 24/7 Concierge Line, We will reserve tables, pre-order food and beverages, and of course SKIP THE LINE.",
        },
        {
            id: 4,
            path: "/contact-ivipp",
            heading: "CONTACT IVIPP",
            description: "We make things easy for you, which allows you to live the most convenient life possible through our growing list of lifestyle service providers.",
        },

    ]
    const handleClick = (event, path) => {
        event.preventDefault();
        navigate(path);
    };
    return (
        <>
            <div className='bg-light' id='services'>
                <div className='container py-5'>
                    <div className='row justify-content-center d-flex' >
                        <h2 className='text-center py-md-2 fs-2 fw-bold '>Membership  Benefits</h2>
                        {services.map((service, index) => (
                            <div key={index} className='col-xl-3 col-lg-5  col-md-6 py-2 d-flex justify-content-center'>
                                <NavLink >
                                    <div className="card h-100 shadow" onClick={(event) => handleClick(event, service.path)}>
                                        <p className="card-title ">{service.heading}</p>
                                        <p className="small-desc">{service.description}</p>
                                        <div className="go-corner">
                                            <div className="go-arrow">→</div>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}
