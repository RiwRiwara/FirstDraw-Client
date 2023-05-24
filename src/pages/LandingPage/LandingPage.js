import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import Navbar from "../../components/common/navbar/navbar";
import axios from "axios";
import Select from 'react-select';
import * as customStyles from "./customStyles";
import { levelOptions, typeOptions, raceOptions, frameOptions, attributeOptions } from '../../assets/data/data';
import makeAnimated from 'react-select/animated';
import { Typography, Skeleton, Box, Slider } from '@mui/material';
import { useNavigate } from "react-router-dom";

const animatedComponents = makeAnimated();
const minDistance = 5;


export default function LandingPage() {
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
  const resetFilters = () => {
    setSelectedFilters({
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

    setSearchTerm("");
    setAtk([0, 100]);
    setDef([0, 100]);

  };

  useEffect(() => {
    setLoading(true)
    const delayDebounceFn = setTimeout(async () => {
      try {
        setSearchResults([]);


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


  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setOffset(0);
  };

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
  const handleRandom = async () => {
    try {
      setSearchResults([]);
      setLoading(true);

      const response = await axios.get(`${process.env.REACT_APP_API}/cards`, {
        params: {
          ran: limit,
        },
      });

      setSearchResults(response.data);
      setOffset(limit);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleFilterToggle = () => {
    setShowFilter(!showFilter);
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
                   <div className="image-container d-flex justify-content-center  tableimg" style={{ position: 'relative' }}>
                <a
                  onClick={() => navigateToAnotherPage(result._id)}
                  style={{ cursor: 'zoom-in' }}
                >
                  <img
                    src={`${process.env.REACT_APP_CARD_IMG_SMALL_API}/${result.id}.jpg`}
                    alt={result.name}
                    className="img-fluid"
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

  const [atkValue, setAtk] = React.useState([0, 100]);
  const minAtk = atkValue[0] * 100;
  const maxAtk = atkValue[1] * 100;
  const handleChangeAtk = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    const updatedAtkValue = [...newValue];

    if (activeThumb === 0) {
      updatedAtkValue[0] = Math.min(newValue[0], atkValue[1] - minDistance);
    } else {
      updatedAtkValue[1] = Math.max(newValue[1], atkValue[0] + minDistance);
    }
    setAtk(updatedAtkValue);
    const updatedFilters = { ...selectedFilters, atkMin: updatedAtkValue[0] * 100, atkMax: updatedAtkValue[1] * 100 };
    setSelectedFilters(updatedFilters);
  };
  const [defValue, setDef] = React.useState([0, 100]);
  const minDef = defValue[0] * 100;
  const maxDef = defValue[1] * 100;
  const handleChangeDef = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    const updatedDefValue = [...newValue];

    if (activeThumb === 0) {
      updatedDefValue[0] = Math.min(newValue[0], defValue[1] - minDistance);
    } else {
      updatedDefValue[1] = Math.max(newValue[1], defValue[0] + minDistance);
    }
    setDef(updatedDefValue);
    const updatedFilters = { ...selectedFilters, defMin: updatedDefValue[0] * 100, defMax: updatedDefValue[1] * 100 };
    setSelectedFilters(updatedFilters);
  };

  const handleFilterChange = (selectedOption, actionMeta) => {
    const { value } = selectedOption;
    const name = actionMeta.name;

    let updatedFilters = { ...selectedFilters };

    switch (name) {
      case "type":
        updatedFilters = { ...updatedFilters, type: value };
        break;
      case "race":
        updatedFilters = { ...updatedFilters, race: value };
        break;
      case "FrameType":
        updatedFilters = { ...updatedFilters, frameType: value };
        break;
      case "attribute":
        updatedFilters = { ...updatedFilters, attribute: value };
        break;
      case "levels":
        const selectedValues = selectedOption.map(option => option.value);
        if (selectedValues.includes(0)) {
          updatedFilters = { ...updatedFilters, level: [0] };
        } else {
          updatedFilters = { ...updatedFilters, level: selectedValues };
        }
        break;
      default:
        console.log(selectedOption);
        break;
    }

    setSelectedFilters(updatedFilters);
    // console.log(updatedFilters); // Log the updated filter values
  };

  const navigateToAnotherPage = (id) => {
    const destinationRoute = `/cards/${id}`;
    navigate(destinationRoute, { state: "search" });
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-3">

        <h2 className="fw-bold">Yu-Gi-Oh! Card Database</h2>
        <div className="mb-1">
          <div className="input-group rounded">
            <input
              type="search"
              className="form-control searching"
              placeholder="Search Yu-Gi-Oh! card database"
              aria-label="Search"
              aria-describedby="search-addon"
              value={searchTerm}
              onChange={handleInputChange}
            />

            <button className="btn btn-outline-primary" type="button" onClick={handleRandom}>
              Random
            </button>
          </div>

          <div className="d-flex justify-content-center fs-2 mt-2">
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-outline-primary" onClick={handleViewToggle}>
                <i className={viewMode === 'list' ? 'bi bi-table' : 'bi bi-list-ul'}></i> {viewMode === 'list' ? 'Table View' : 'List View'}
              </button>
              <button type="button" className="btn btn-outline-primary" onClick={handleFilterToggle}>
                <i className="bi bi-funnel-fill"></i> Filter
              </button>
              <button type="button" className="btn btn-outline-primary" onClick={resetFilters}>
                <i className="bi bi-arrow-clockwise"></i>
              </button>

            </div>
            <select className="form-select ms-2 w-25" aria-label="Default select example" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
              <option value={5}>Load 5</option>
              <option value={10}>Load 10</option>
              <option value={30}>Load 30</option>
              <option value={50}>Load 50</option>
            </select>


          </div>
          {showFilter && (
            <form className={`container mt-3 p-2 filter bg-secondary rounded p-3 ${showFilter ? 'slide-in' : 'slide-out'}`}>
              <div className="row">
                <div className="col-12 col-md-2 sel">
                  <Select
                    className="basic-single"
                    isSearchable={true}
                    classNamePrefix="select"
                    defaultValue={typeOptions[0]}
                    menuPortalTarget={document.body}
                    name="type"
                    value={typeOptions.find(option => option.value === selectedFilters.type)}
                    options={typeOptions}
                    styles={customStyles.customStyles}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-12 col-md-2 sel">
                  <Select
                    className="basic-single"
                    isSearchable={true}
                    classNamePrefix="select"
                    defaultValue={raceOptions[0]}
                    menuPortalTarget={document.body}
                    name="race"
                    value={raceOptions.find(option => option.value === selectedFilters.race)}
                    options={raceOptions}
                    styles={customStyles.customStyles}
                    onChange={handleFilterChange}

                  />
                </div>
                <div className="col-12 col-md-2 sel">
                  <Select
                    className="basic-single"
                    isSearchable={true}
                    classNamePrefix="select"
                    defaultValue={frameOptions[0]}
                    menuPortalTarget={document.body}
                    name="FrameType"
                    value={frameOptions.find(option => option.value === selectedFilters.frameType)}
                    options={frameOptions}
                    styles={customStyles.customStyles}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-12 col-md-2 sel">
                  <Select
                    className="basic-single"
                    isSearchable={true}
                    classNamePrefix="select"
                    defaultValue={attributeOptions[0]}
                    menuPortalTarget={document.body}
                    value={attributeOptions.find(option => option.value === selectedFilters.attribute)}
                    name="attribute"
                    options={attributeOptions}
                    styles={customStyles.customStyles}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-12 col-md-4 sel">
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={[levelOptions[0]]}
                    menuPortalTarget={document.body}
                    isMulti
                    value={levelOptions.filter(option => selectedFilters.level.includes(option.value))}
                    name="levels"
                    options={levelOptions}
                    className="basic-multi-select sel"
                    classNamePrefix="select"
                    styles={customStyles.customStyles}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 ">
                    <Typography variant="h6" gutterBottom>
                      Attack
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Box className="flex-start" marginRight={2}>{minAtk}</Box>
                      <Slider
                        aria-label="ATK"
                        value={atkValue}
                        onChange={handleChangeAtk}
                        disableSwap
                      />
                      <Box className="flex-end" marginLeft={2}>{maxAtk}</Box>
                    </Box>
                  </div>
                  <div className="col-12 col-md-6 ">
                    <Typography variant="h6" gutterBottom>
                      Defense
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Box className="flex-start" marginRight={2}>{minDef}</Box>
                      <Slider
                        aria-label="ATK"
                        value={defValue}
                        onChange={handleChangeDef}
                        disableSwap
                      />
                      <Box className="flex-end" marginLeft={2}>{maxDef}</Box>
                    </Box>
                  </div>
                </div>
              </div>
            </form>
          )}

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
        </div>}






      </div>
    </div>
  );
}
