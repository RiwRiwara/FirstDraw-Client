import {
    Typography, Tabs, Tab, Box, Skeleton, Grid
    , Paper, styled, Button, Card, CardContent, IconButton, Tooltip, Zoom
} from '@mui/material';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DeleteOutline } from '@mui/icons-material';
import "./style.css"

function Tab1Component(props) {
    let userID = props.id
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [limit, setLimit] = useState(5)
    const [offset, setOffset] = useState(0)
    const [toggle, setToggle] = useState(true)
    const [collectionId, setCId] = useState()
    const [viewMode, setViewMode] = useState('table');
    const [subViewList, setSubViewLsit] = useState('+');
    const [searchResults, setSearchResults] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({
        type: "",
        race: "",
        frameType: "",
        attribute: "",
        level: [0],
        defMax: 10000,
        defMin: 0,
        atkMax: 10000,
        atkMin: 0,
        sort: "az"
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchCollection = async () => {
            try {
                const collectionResponse = await axios.get(`${process.env.REACT_APP_API}/collections`, {
                    params: {
                        userId: userID,
                        type: "card"
                    }
                });

                const itemIds = collectionResponse.data[0].itemIds;
                setCId(collectionResponse.data[0]._id)
                const cardResponses = await Promise.all(
                    itemIds.map(itemId => axios.get(`${process.env.REACT_APP_API}/cards/?id=${itemId}`))
                );

                const searchResults = cardResponses.map(response => response.data[0]);

                setSearchResults(searchResults);
                setOffset(limit);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCollection();
    }, [props, toggle]);

    useEffect(() => {
        if (searchTerm === "") {
            setSearchResults([])
            setToggle(!toggle)
        } else {
            const filteredResults = searchResults.filter((result) =>
                result.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(filteredResults);
        }
    }, [searchTerm]);

    const deleteItemFromCollection = async (itemId) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API}/collections/${collectionId}`, {
                removeItems: [itemId],
            });

            console.log(response.data); 
            setToggle(!toggle)

        } catch (error) {
            console.error(error);
        }
    };

    const handleViewToggle = () => {
        setViewMode((prevMode) => (prevMode === 'list' ? 'table' : 'list'));
    };
    const handleViewSubToggle = () => {
        setSubViewLsit((prevMode) => (prevMode === '-' ? '+' : '-'));
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        setOffset(0);
    };
    const renderTableRows = () => {
        const itemsPerRowDesktop = 5;
        const rows = [];
        for (let i = 0; i < searchResults.length; i += itemsPerRowDesktop) {
            const rowResults = searchResults.slice(i, i + itemsPerRowDesktop);
            const row = (
                <tr key={i}>
                    {rowResults.map((result, index) => (
                        <td key={index} className="timg">
                            <div className="image-container d-flex justify-content-center tableimg" style={{ position: 'relative' }}>
                                <a
                                    onClick={() => navigateToAnotherPage(`/cards/${result._id}`)}
                                    style={{ cursor: 'zoom-in' }}>
                                    <img
                                        src={`${process.env.REACT_APP_CARD_IMG_SMALL_API}/${result.id}.jpg`}
                                        alt={result.name}
                                        className="img-fluid"
                                    />
                                </a>
                                <Tooltip title="Remove from collection." TransitionComponent={Zoom} className='bg-primary'>
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            top: '0rem',
                                            right: '0.5rem',
                                            '@media (max-width: 768px)': {
                                                top: '0rem',
                                                right: '0rem',
                                            },
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log(e);
                                        }}
                                    >
                                        <i class="bi bi-trash fw-bold" style={{ color: 'white', fontSize: '0.5em' }}></i>
                                    </IconButton>
                                </Tooltip>

                            </div>


                        </td>
                    ))}
                </tr>
            );
            rows.push(row);
        }
        return rows;
    };
    const navigateToAnotherPage = (path) => {
        const destinationRoute = `${path}`;
        navigate(destinationRoute);
    };

    return (
        <div className='container'>

            <div className='container mt-2 mb-3'>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={9}>
                            <div className="gbox">
                                <input
                                    type="search"
                                    className="form-control searching"
                                    placeholder="Search card in collection."
                                    aria-label="Search"
                                    aria-describedby="search-addon"
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div>
                                <button className="btn btn-outline-primary w-100 fw-bold fs-6" type="button" onClick={() => navigateToAnotherPage("/")}>
                                    Add Card! <i class="bi bi-file-plus fs-6 m-1"></i>
                                </button>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3} >

                            <button
                                type="button"
                                className={`btn btn-primary ${viewMode === 'table' ? 'w-75' : 'w-100'}`}
                                onClick={handleViewToggle}
                                style={{ marginRight: "0.5rem" }}
                            >
                                <i className={viewMode === 'list' ? 'bi bi-table' : 'bi bi-list-ul'}></i>
                                {viewMode === 'list' ? 'Table View' : 'List View'}
                            </button>
                            {viewMode !== 'list' && (
                                <Tooltip title="Toggle list view" TransitionComponent={Zoom}>
                                    <button
                                        type="button"
                                        className={`btn btn-primary w-auto fw-bold `}
                                        onClick={handleViewSubToggle}
                                    >
                                        {subViewList}
                                    </button></Tooltip>
                            )}


                        </Grid>
                        <Grid item xs={12} md={9}>
                            <div className="container">.</div>
                        </Grid>
                    </Grid>
                </Box>
            </div>

            {loading ? (
                <div className="card mb-3 p-1">
                    <div className="row g-0">
                        <div className="col-md-4 col-12 w-auto fcol">
                            <Skeleton variant="rectangular" width={170} height={210} />
                        </div>
                        <div className="col-md-10 col-12">
                            <Skeleton />
                            <div className="card-body">
                                <hr className="border-1 border-top border-primary" />
                                <div className="">
                                    <Skeleton animation="wave" />
                                </div>
                                <hr className="border-1 border-top border-primary" />
                                <Skeleton animation="wave" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : !loading && searchResults.length === 0 ? (
                <div className="h4 d-flex justify-content-center m-4">
                    No cards found!
                </div>

            ) : <div>
                {viewMode === "table" && (
                    <div>
                        {subViewList === "+" && (
                            <div className="container m-2 p-2 hov cardlist ">
                                {searchResults.map((result) => (
                                    <a onClick={() => navigateToAnotherPage(`/cards/${result._id}`)}>
                                        <div className="card mb-3 p-1" key={result.id}>
                                            <div className="row g-0">
                                                <div className="col-md-4 col-12 w-auto fcol">
                                                    <img
                                                        src={`${process.env.REACT_APP_CARD_IMG_SMALL_API}/${result.id}.jpg`}
                                                        className="img-fluid rounded-start mt-1"
                                                        alt={result.name}
                                                    />
                                                </div>
                                                <div className="col-md-10 col-12">
                                                    <div className="card-body">
                                                        <h5 className="card-title fw-bold ">{result.name}</h5>
                                                        <hr className="border-1 border-top border-primary"></hr>
                                                        <div className="">
                                                            [{result.type}]&nbsp;&nbsp;[{result.race}]&nbsp;&nbsp;
                                                            {(result.atk !== null && result.atk !== undefined) && (
                                                                <span>
                                                                    <i className="fa-solid fa-hand-fist"></i>
                                                                    {result.atk}&nbsp;&nbsp;
                                                                </span>
                                                            )}
                                                            {(result.def !== null && result.def !== undefined) && (
                                                                <span>
                                                                    <i className="fa-solid fa-shield"></i>
                                                                    {result.def}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <hr className="border-1 border-top border-primary"></hr>

                                                        <p className="card-text">{result.desc}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <Tooltip title="Remove from collection." TransitionComponent={Zoom}>
                                                <IconButton
                                                    sx={{
                                                        position: 'absolute',
                                                        top: { xs: '0rem', sm: '0.5rem' },
                                                        bottom: { xs: 'auto', sm: 'auto' },
                                                        right: { xs: '0rem', sm: '0.5rem' },
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteItemFromCollection(result._id)
                                                    }}
                                                >
                                                    <DeleteOutline />
                                                </IconButton>
                                            </Tooltip>
                                        </div>

                                    </a>
                                ))}

                            </div>

                        )}

                        {subViewList === "-" && (
                            <div className="container m-2 p-2 hov cardlist">
                                {searchResults.map((result, index) => (
                                    <a
                                        onClick={() => navigateToAnotherPage(`/cards/${result._id}`)}
                                        key={result.id}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <Card sx={{ display: 'flex', m: 0 }} className="lsmall m-1">
                                            <div className="col-md-4 col-12 w-auto fcol">
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginRight: '0.5rem', marginLeft: '0.5rem' }}>
                                                        {index + 1}.
                                                    </Typography>
                                                    <img
                                                        src={`${process.env.REACT_APP_CARD_IMG_SMALL_API}/${result.id}.jpg`}
                                                        className="img-fluid rounded-start mt-1"
                                                        alt={result.name}
                                                        style={{ height: '80px' }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-8 col-12 w-100">
                                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>

                                                    <div className='container '>
                                                        <div className='h5 fw-bold'>
                                                            {result.name}
                                                        </div>
                                                        <p className='container' style={{ fontSize: "0.5rem" }}>
                                                            <span className="info">{`[${result.type}]`}</span>
                                                            <span className="info">{`[${result.race}]`}</span>
                                                            {(result.atk !== null && result.atk !== undefined) && (
                                                                <span>
                                                                    <i className="fa-solid fa-hand-fist"></i>
                                                                    <span className="info">{`${result.atk}`}</span>
                                                                </span>
                                                            )}
                                                            {(result.def !== null && result.def !== undefined) && (
                                                                <span>
                                                                    <i className="fa-solid fa-shield"></i>
                                                                    <span className="info">{`${result.def}`}</span>
                                                                </span>
                                                            )}
                                                        </p>

                                                    </div>
                                                </CardContent>
                                            </div>
                                            <Tooltip title="Remove from collection." TransitionComponent={Zoom}>
                                                <IconButton
                                                    sx={{
                                                        position: 'absolute',
                                                        top: { xs: '0rem', sm: '0.5rem' },
                                                        bottom: { xs: 'auto', sm: 'auto' },
                                                        right: { xs: '0rem', sm: '0.5rem' },
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        console.log(e);
                                                    }}
                                                >
                                                    <DeleteOutline />
                                                </IconButton>
                                            </Tooltip>
                                        </Card>

                                    </a>
                                ))}
                            </div>
                        )}

                    </div>

                )}


                {viewMode === "list" && (
                    <div className="container">
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
                )}


            </div>}


        </div>
    );
};
export default Tab1Component

