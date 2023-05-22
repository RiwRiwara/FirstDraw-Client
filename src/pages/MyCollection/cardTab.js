import { Typography, Tabs, Tab, Box } from '@mui/material';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useNavigate } from "react-router-dom";

function Tab1Component(props) {
    let userID = props.id
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [limit, setLimit] = useState(5)
    const [offset, setOffset] = useState(0)
    const [viewMode, setViewMode] = useState('table');
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
    
    const getCollecton = () => {
        const response = axios.get(`${process.env.REACT_APP_API}/collections`, {
            params: {
                userId: userID
            },
        });
        console.log(response)
    }


    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            try {
                setSearchResults([]);
                setLoading(true)

                const levels = selectedFilters.level.join(",");
                const response = await axios.get(`${process.env.REACT_APP_API}/cards`, {
                    params: {
                        name: searchTerm,
                        frameType: selectedFilters.frameType,
                        type: selectedFilters.type,
                        attribute: selectedFilters.attribute,
                        defMin: selectedFilters.defMin,
                        defMax: selectedFilters.defMax,
                        atkMin: selectedFilters.atkMin,
                        atkMax: selectedFilters.atkMax,
                        race: selectedFilters.race,
                        level: levels,
                        offset: offset,
                        limit: limit,
                        sort: selectedFilters.sort,

                    },

                });
                setSearchResults(response.data);
                setOffset(limit);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, selectedFilters]);

    const handleViewToggle = () => {
        setViewMode((prevMode) => (prevMode === 'list' ? 'table' : 'list'));
    };

    const handleLoadMore = async () => {
        try {
            const levels = selectedFilters.level.join(",");
            setLoading(true)
            const response = await axios.get(`${process.env.REACT_APP_API}/cards`, {
                params: {
                    name: searchTerm,
                    frameType: selectedFilters.frameType,
                    type: selectedFilters.type,
                    attribute: selectedFilters.attribute,
                    defMin: selectedFilters.defMin,
                    defMax: selectedFilters.defMax,
                    atkMin: selectedFilters.atkMin,
                    atkMax: selectedFilters.atkMax,
                    race: selectedFilters.race,
                    level: levels,
                    offset: offset,
                    limit: limit,

                },
            });
            setSearchResults((prevResults) => [...prevResults, ...response.data]);
            setOffset((prevOffset) => prevOffset + limit);
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
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
                            <div className="image-container">
                                <img
                                    src={`${process.env.REACT_APP_CARD_IMG_SMALL_API}/${result.id}.jpg`}
                                    alt={result.name}
                                    className="img-fluid"
                                />
                            </div>
                        </td>
                    ))}
                </tr>
            );
            rows.push(row);
        }
        return rows;
    };
    const navigateToAnotherPage = (id) => {
        const destinationRoute = `/cards/${id}`;
        navigate(destinationRoute);
    };

    return (
        <div className='container'>
            {loading && (
                <div className="d-flex justify-content-center mt-3">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {!loading && searchResults.length === 0 && (
                <div className="h4 d-flex justify-content-center m-4">No cards found!</div>
            )}
            {viewMode === "table" && (
                <div className="container m-2 p-2 hov cardlist ">

                    {searchResults.map((result) => (
                        <a onClick={() => navigateToAnotherPage(result._id)}>
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
                            </div>
                        </a>
                    ))}


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


            {searchResults.length > 0 && (
                <div className="d-flex justify-content-center mt-3 mb-3">
                    <button className="btn btn-primary" onClick={handleLoadMore}>
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};
export default Tab1Component