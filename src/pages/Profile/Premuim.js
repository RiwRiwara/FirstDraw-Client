import React, { useEffect, useState } from 'react';
import silver from "../../assets/images/silver_image.jpg"
import blue from "../../assets/images/blue_image.jpg"
import dragon from "../../assets/images/dargon_image.png"
import "./style.css";
import { Stack } from '@mui/material';

function Premium() {

    return (
        <div>
            <div className='container mt-3'>
                <h2 className='fw-bold'>Go Premium!</h2>

                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                    <div className="card m-4 silverCard " >
                        <img src={silver}
                            className="card-img-top"
                            alt="silver"
                        />
                        <div className="card-body">
                            <p className="card-text fw-bold">SILVER FANG</p>
                            <ui>
                                <li>Normal User</li>
                                <li>50 Cards</li>
                                {/* <li>2 Decks</li> */}
                            </ui>
                        </div>
                    </div>
                    <div className="card m-4 blueCard" >
                        <img src={blue}
                            className="card-img-top"
                            alt="blue"
                        />
                        <div className="card-body ">
                            <p className="card-text fw-bold"  >BLUE EYE</p>
                            <ui>
                                <li>Higher User</li>
                                <li>Blue Eye Profile</li>
                                <li>100 Cards</li>
                                {/* <li>10 Decks</li> */}
                            </ui>
                        </div>
                    </div>
                    <div className="card m-4 dragonCard" >
                        <img src={dragon}
                            className="card-img-top"
                            alt="dragon"
                        />
                        <div className="card-body">
                            <p className="card-text fw-bold">Dragon Of Ra</p>
                            <ui>
                                <li>Superior User</li>
                                <li>Ra Profile</li>
                                <li>Unlimited Cards</li>
                                {/* <li>Unlimited Decks</li> */}
                            </ui>
                        </div>
                    </div>
                </Stack>



            </div>
        </div>
    )
}

export default Premium