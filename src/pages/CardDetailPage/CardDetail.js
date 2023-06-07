import React, { useEffect, useState } from 'react';
import Navbar from '../../components/common/navbar/navbar';
import "./style.css";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import * as custom from "./customComponent";
import Grid from '@mui/material/Unstable_Grid2';
import FullScreenDialog from './addCollection';
import carddummy from "../../assets/images/dummycard.jpg"
import levelIcon from "../../assets/icons/level.png"

function CardDetail(props) {

    const navigate = useNavigate();
    const { slug } = useParams();
    const [card, setCard] = useState(null);
    const [cardimg, setCardimg] = useState(carddummy)

    // Get the props from the previous page
    const location = useLocation();
    const previousPageProps = location.state;

    useEffect(() => {
        const fetchCardBySlug = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/cards?id=${slug}`);
                setCard(response.data[0]);
                console.log(response)
            } catch (error) {
                console.error(error);
            }
        };
        fetchCardBySlug();
    }, [slug]);



    return (
        <>
            <Navbar />
            <div className='container mb-3'  style={{ paddingTop: "5rem" }}>
                {card ? (
                    <div >
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover"
                                style={{ cursor: 'pointer' }}
                                color="inherit" onClick={() => { navigate(-1); }}>
                                Back
                            </Link>
                            <Typography color="text.primary">{card.name}</Typography>
                        </Breadcrumbs>

                        <div className="row g-3 mt-4">
                            <div className='col-12 col-md-4 d-flex justify-content-center'>
                                <img
                                    src={`https://firstdraw.blob.core.windows.net/cardimgs/${card.id}.jpg`}
                                    className="img-fluid rounded-start mt-1 cardImg"
                                    alt={card.name}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = carddummy; // Use the value of carddummy directly
                                    }}
                                />


                            </div>
                            <div className='col-12 col-md-8'>
                                <h2 className='fw-bold d-flex justify-content-center '>{card.name}</h2>
                                <div className='row '>
                                    <Box sx={{ flexGrow: 1 }} className="mt-2">
                                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                            <Grid xs={2} sm={4} md={4} key={1}>
                                                <custom.Item className='item-info bg-primary '>
                                                    <p className='text-white'>Type</p>
                                                    <span className='fw-bold sub-info text-white'>{card.type}</span>
                                                </custom.Item>
                                            </Grid>
                                            <Grid xs={2} sm={4} md={4} key={2}>
                                                <custom.Item className='item-info bg-primary '>
                                                    <p className='text-white'>Race</p>
                                                    <span className='fw-bold sub-info text-white'>{card.race}</span>
                                                </custom.Item>
                                            </Grid>
                                            {card.attribute && (
                                                <Grid xs={2} sm={4} md={4} key={3}>
                                                    <custom.Item className='item-info bg-primary '>
                                                        <p className='text-white'>Attribute</p>
                                                        <span className='fw-bold sub-info text-white'>{card.attribute}</span>
                                                    </custom.Item>
                                                </Grid>
                                            )}
                                            {card.level && (
                                                <Grid xs={2} sm={4} md={4} key={4}>
                                                    <custom.Item className='item-info bg-primary '>

                                                        <p className='text-white'>Level</p>
                                                        <span className='fw-bold sub-info text-white'>{card.level} &nbsp;</span>
                                                        <img style={{widows:"1.1rem", height:"1.1rem"}} src={levelIcon} />
                                                    </custom.Item>
                                                </Grid>
                                            )}
                                            {(card.atk || card.atk ===0) && (
                                                <Grid xs={2} sm={4} md={4} key={5}>
                                                    <custom.Item className='item-info bg-primary '>
                                                        <p className='text-white'>Attack</p>
                                                        <span className='fw-bold sub-info text-white'>{card.atk}</span>
                            
                                                    </custom.Item>
                                                </Grid>
                                            )}
                                            {(card.def || card.def===0) && (
                                                <Grid xs={2} sm={4} md={4} key={6}>
                                                    <custom.Item className='item-info bg-primary '>
                                                        <p className='text-white'>Defense</p>
                                                        <span className='fw-bold sub-info text-white'>{card.def}</span>
                                                    </custom.Item>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Box>

                                    <Box className="mt-3 container mb-3">
                                        <Typography variant="h5" className='fw-bold' gutterBottom>
                                            Description
                                        </Typography>
                                        <Typography variant="body1">
                                            {card.desc}
                                        </Typography>
                                    </Box>
                                    <FullScreenDialog
                                        card={card}
                                    />

                                </div>
                            </div>
                        </div>

                    </div>
                ) : (
                    <p>Loading card...</p>
                )}
            </div>
        </>
    )
}

export default CardDetail;
