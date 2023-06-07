import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Typography, Tabs, Tab, Box, Skeleton, Grid, AccordionDetails,
    Paper, styled, Button, Card, CardContent, IconButton, Tooltip, Zoom, Accordion, AccordionSummary
} from '@mui/material';
import carddummysm from "../../assets/images/dummycardsmall.jpg";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function PublicProfile(props) {
    const navigate = useNavigate()
    const selectedImage = props.img;
    const displayname = props.displayname;
    const bio = props.bio;
    const email = props.email;
    const cardCollection = props.cardCollection
    console.log(cardCollection)

    const navigateToAnotherPage = (path) => {
        const destinationRoute = `${path}`;
        navigate(destinationRoute);
    };

    const renderTableRows = () => {
        const itemsPerRowDesktop = 5;
        const rows = [];
        for (let i = 0; i < cardCollection.length; i += itemsPerRowDesktop) {
            const rowResults = cardCollection.slice(i, i + itemsPerRowDesktop);
            const row = (
                <tr key={i}>
                    {rowResults.map((result, index) => (
                        <td key={index} className="timg">
                            <div className="image-container d-flex justify-content-center tableimg" style={{ position: 'relative' }}>
                                <a
                                    onClick={() => { navigate(`/cards/${result._id}`) }}
                                    style={{ cursor: 'zoom-in' }}>
                                    <img
                                        src={`${process.env.REACT_APP_CARD_IMG_SMALL_API}/${result.id}.jpg`}
                                        className="img-fluid w-75"
                                        alt={result.name}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = carddummysm;
                                        }}
                                    />
                                </a>
                            </div>
                        </td>
                    ))}
                </tr>
            );
            rows.push(row);
        }
        return rows;
    };
    return (
        <div>
            <div className="container mt-2 p-2">
                <h2 className="fw-semibold">Public Detail</h2>
                <p>This is people can see you profile. </p>

                <div className='d-flex justify-content-center'>
                    <h3 className='fw-bold m-2'>{displayname}</h3>
                </div>
                <hr className="bg-danger border-4 border-top border-primary"></hr>
                <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={4} sm={8} md={4} key={"PP1"}>
                        <div className='d-flex justify-content-center'>
                            <img
                                src={selectedImage}
                                className="rounded profileimg"
                                style={{ width: '15rem', height: "16rem" }}
                                alt=""
                            />
                        </div>
                    </Grid>
                    <Grid item xs={4} sm={8} md={8} key={"PP2"}>
                        <div className='bg-secondary p-2 rounded mb-3'>
                            {email}
                        </div>
                        <div className='bg-secondary p-2 rounded' style={{minHeight:"10rem"}}>
                            {bio}
                        </div>
                    </Grid>
                </Grid>
                <hr className="bg-danger border-4 border-top border-primary"></hr>

                {/* <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>
                            <h5 className='fw-bold'>Collection - Cards</h5>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails> */}
                <h4 className='fw-bold'>Collection - Cards</h4>
                <div className="container bg-secondary rounded">
                    <div className="row">
                        <div className="col">
                            <table className="table">
                                <tbody>
                                    
                                {cardCollection && (renderTableRows())}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* </AccordionDetails>
                </Accordion> */}

                {/* <hr className="bg-danger border-4 border-top border-primary"></hr>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>
                            <h5 className='fw-bold'>Collection - Decks</h5>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>


                    </AccordionDetails>
                </Accordion>
                <hr className="bg-danger border-4 border-top border-primary"></hr> */}
            </div>
        </div>
    )
}

export default PublicProfile