import React from 'react'
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";

export default function Table() {
    return (
        <>

            <div className='container py-5' id='Plan'>
                <h1 className='text-center '>Membership Plans</h1>
                <p className='text-center fs-5 py-2'>iVipp is a concierge service that provides exclusive access to the hottest nightclubs, restaurants and events. Skip the lines and be escorted directly to your table by an iVipp host.</p>
                <div className='row py-3 overflow-auto'>
                    <table>
                        <colgroup></colgroup>
                        <colgroup></colgroup>
                        <colgroup></colgroup>
                        <colgroup></colgroup>

                        <thead>
                            <tr>
                                <th></th>
                                <th>
                                    <h2>BASIC</h2>
                                    <p className='fw-bold'>$300.00</p>
                                </th>
                                <th>
                                    <div className='top-left-div'>
                                        <p className="promo">Most Liked! </p>
                                    </div>
                                    <h2>ALL ACCESS </h2>
                                    <p className='fw-bold'>$2200.00</p>
                                </th>
                                <th>
                                    <h2>COLLEGE</h2>
                                    <p className='fw-bold'>$200.00</p>
                                </th>
                            </tr>
                        </thead>

                        <tfoot>
                            <tr>
                                <th>&nbsp;</th>
                                <td><a href="#">Get A Membership</a></td>
                                <td><a href="#">Get A Membership</a></td>
                                <td><a href="#">Get A Membership</a></td>
                            </tr>
                        </tfoot>

                        <tbody>
                            <tr>
                                <th>Never Wait In Line With Our Skip The Line Service <span></span></th>
                                <td> <span className='text-danger'><ImCross /></span></td>
                                <td><span className='text-success'><FaCheck /></span></td>
                                <td><span className='text-success'><FaCheck /></span></td>
                            </tr>
                            <tr>
                                <th>24/7 Concierge Request Line</th>
                                <td><span className='text-danger'><ImCross /></span></td>
                                <td><span className='text-success'><FaCheck /></span></td>
                                <td><span className='text-success'><FaCheck /></span></td>
                            </tr>
                            <tr>
                                <th>Members Only iVipp Welcome Packages <span>Member Only Events with our celebrity guest. Access to iVipp Members Only Annual Party</span></th>
                                <td><span className='text-danger'><ImCross /></span></td>
                                <td><span className='text-success'><FaCheck /></span></td>
                                <td><span className='text-success'><FaCheck /></span></td>
                            </tr>
                            <tr>
                                <th>Birthday Perks <span>Exclusive Giveaways, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></th>
                                <td><span className='text-danger'><ImCross /></span></td>
                                <td><span className='text-success'><FaCheck /></span></td>
                                <td><span className='text-success'><FaCheck /></span></td>
                            </tr>
                            <tr>
                                <th>Exclusive access to iVipp Members Only Concerts & Live Streams. <span>Private Members Only VIP Dinners</span></th>
                                <td><span className='text-danger'><ImCross /></span></td>
                                <td><span className='text-success'><FaCheck /></span></td>
                                <td><span className='text-danger'><ImCross /></span></td>
                            </tr>
                            <tr>
                                <th>Exclusive access to iVipp Members Only Concerts & Live Streams. <span>Exclusive Food, Drink and Travel Discounts</span></th>
                                <td><span className='text-danger'><ImCross /></span></td>
                                <td><span className='text-success'><FaCheck /></span></td>
                                <td><span className='text-danger'><ImCross /></span></td>
                            </tr>
                            <tr>
                                <th> iVipp Discounts & Access to Events -No Rewards Dollars <span>Exclusive Food, Drink and Travel Discounts</span></th>
                                <td><span className='text-success'><FaCheck /></span></td>
                                <td><span className='text-success'><FaCheck /></span></td>
                                <td><span className='text-danger'><ImCross /></span></td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>



        </>
    )
}
