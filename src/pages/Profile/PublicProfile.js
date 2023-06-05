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
    const cardCollection = props.cardCollection


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
            <div className="container mt-3">
                <h2 className="fw-semibold">Public Detail</h2>
                <p>This is people can see you profile. </p>
                <hr className="bg-danger border-4 border-top border-primary"></hr>
                <div className='row mb-3'>
                    <div className="col-12 col-md-4 justify-content-center d-flex">
                        <img
                            src={selectedImage}
                            className="rounded-top  profileimg"
                            style={{ aspectRatio: '4/5' }}
                            alt=""
                        />
                    </div>
                    <div className="col-12 col-md-8">
                        <div className='d-flex justify-content-center'>
                            <h4 className='fw-bold m-2'>{displayname}</h4>
                        </div>
                        <div className='row'>
                            <textarea
                                className="form-control pe-none"
                                value={bio}
                                rows="4"
                            ></textarea>
                        </div>

                    </div>
                </div>
                <hr className="bg-danger border-4 border-top border-primary"></hr>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>
                            <h5 className='fw-bold'>Collection - Cards</h5>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="container bg-secondary rounded">
                            <div className="row">
                                <div className="col">
                                    <table className="table">
                                        <tbody>
                                            {renderTableRows()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </AccordionDetails>
                </Accordion>

                <hr className="bg-danger border-4 border-top border-primary"></hr>
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
                <hr className="bg-danger border-4 border-top border-primary"></hr>
            </div>
        </div>
    )
}

export default PublicProfile