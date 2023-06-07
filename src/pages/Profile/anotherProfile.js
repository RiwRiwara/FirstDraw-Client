import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {
    Typography, Tabs, Tab, Box, Skeleton, Grid, AccordionDetails,
    Paper, styled, Button, Card, CardContent, IconButton, Tooltip, Zoom, Accordion, AccordionSummary, Stack, Divider
} from '@mui/material';
import carddummysm from "../../assets/images/dummycardsmall.jpg";
import Navbar from '../../components/common/navbar/navbar';
import axios from 'axios';
import Swal from "sweetalert2";
import profile from "../../assets/images/dummy-profile.png";
import PageTitle from '../../components/features/pageTitle';


function AnotherProfile() {
    const navigate = useNavigate()
    const { userid } = useParams();
    const [currentUser, setUser] = useState()
    const [isLoading, setLoading] = useState(false)
    const [cardCollection, setCardCollection] = useState([])




    useEffect(() => {
        async function fetchUser() {
            return axios.get(`${process.env.REACT_APP_API}/user?id=${userid}`)
                .then((res) => {
                    setUser(res.data);
                    return res.data;
                })
                .catch((err) => {
                    Swal.fire("Notification", err.response.data.error, "error");
                });
        }

        async function fetchCard(user) {
            if (!user || !user._id) {
                return;
            }

            const collectionResponse = await axios.get(`${process.env.REACT_APP_API}/collections/?userId=${user._id}&type=card`);
            const itemIds = collectionResponse.data[0]?.itemIds;

            if (!itemIds || itemIds.length === 0) {
                Swal.fire("Notification", "No cards available", "info");
                return;
            }

            const cardResponses = await Promise.all(
                itemIds.map(itemId => axios.get(`${process.env.REACT_APP_API}/cards/?id=${itemId}`))
            );

            const searchResults = cardResponses.map(response => response.data[0]).filter(result => result !== undefined);
            setCardCollection(searchResults);
        }

        async function fetchData() {
            setLoading(true);
            const user = await fetchUser(); // Wait for user data to be fetched
            await fetchCard(user); // Then fetch card data with the user data
            setLoading(false); // Set loading to false only after both requests are complete
        }

        fetchData();
    }, []);


    const navigateToAnotherPage = (path) => {
        const destinationRoute = `${path}`;
        navigate(destinationRoute);
    };

    const renderTableRows = () => {
        if (cardCollection.length === 0) {

        } else {
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
        }
    };
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "5rem" }}>
                {(!isLoading && currentUser) ? (
                    <div className='container'>
                        <PageTitle title="View user detail." />
                        <div className="container mt-2 p-2">
                            <div className='d-flex justify-content-center'>
                                <Stack
                                    direction="row"
                                    divider={<Divider orientation="vertical" flexItem />}
                                    spacing={2}>
                                    <h4 className='fw-bold'>{currentUser.displayname}</h4>

                                    <h4 className='fw-bold'>
                                        {currentUser.tier === "Silver" ? "Silver" : currentUser.tier === "Blue" ? "Blue-Eye" : "Dragon"}
                                    </h4>
                                    {/* <h4 className='fw-bold'>Item 3</h4> */}
                                </Stack>
                            </div>

                            <hr className="bg-danger border-4 border-top border-primary"></hr>
                            <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
                                <Grid item xs={4} sm={8} md={4} key={"PP1"}>
                                    <div className='d-flex justify-content-center'>
                                        <img
                                            src={currentUser.profile_img || profile}
                                            className="rounded profileimg"
                                            style={{ width: '15rem', height: "16rem" }}
                                            alt=""
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={4} sm={8} md={8} key={"PP2"}>
                                    <div className='bg-secondary p-2 rounded mb-3'>
                                        {currentUser.email}
                                    </div>
                                    <div className='bg-secondary p-2 rounded' style={{ minHeight: "10rem" }}>
                                        {currentUser.bio}
                                    </div>
                                </Grid>
                            </Grid>
                            <hr className="bg-danger border-4 border-top border-primary"></hr>
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
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="container mt-2 p-2">
                            <p>Loading  . . . </p>
                        </div>
                    </>
                )}

            </div>


        </div>
    )
}

export default AnotherProfile