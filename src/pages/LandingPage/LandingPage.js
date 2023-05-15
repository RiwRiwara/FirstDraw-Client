import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import Navbar from "../../components/common/navbar/navbar";
import axios from "axios";

export default function LandingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [viewMode, setViewMode] = useState('table');
  const [searchResults, setSearchResults] = useState([]);
  const [showFilter, setShowFilter] = useState(false); // State for showing/hiding the filter zone


  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      setSearchResults([]);
      const response = await axios.get(`${process.env.REACT_APP_API}/cards`, {
        params: {
          name: searchTerm,
          offset: offset,
          limit: limit,
        },
      });
      setSearchResults(response.data);
      setOffset(limit);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        setSearchResults([]);

        const response = await axios.get(`${process.env.REACT_APP_API}/cards`, {
          params: {
            name: searchTerm,
            offset: offset,
            limit: limit,
          },
        });

        setSearchResults(response.data);
        setOffset(limit);


      } catch (error) {
        console.error(error);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setOffset(0);
  };


  const handleViewToggle = () => {
    setViewMode((prevMode) => (prevMode === 'list' ? 'table' : 'list'));
  };

  const handleLoadMore = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/cards`, {
        params: {
          name: searchTerm,
          offset: offset,
          limit: limit,
        },
      });
      setSearchResults((prevResults) => [...prevResults, ...response.data]);
      setOffset((prevOffset) => prevOffset + limit);
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
            {/* <button className="btn btn-outline-primary" type="button" onClick={handleSearch}>
              <i className="bi bi-search"></i>
            </button> */}
          </div>

          <div className="d-flex justify-content-center fs-2 mt-2">
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-outline-primary" onClick={handleViewToggle}>
                <i className={viewMode === 'list' ? 'bi bi-table' : 'bi bi-list-ul'}></i> {viewMode === 'list' ? 'Table View' : 'List View'}
              </button>
              <button type="button" className="btn btn-outline-primary" onClick={handleFilterToggle}>
                <i className="bi bi-funnel-fill"></i> Filter
              </button>
            </div>
            <select className="form-select ms-2 w-25" aria-label="Default select example" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
              <option value={5}>Load 5</option>
              <option value={10}>Load 10</option>
              <option value={30}>Load 30</option>
              <option value={50}>Load 50</option>
            </select>
            {/* Filter zone */}

          </div>
{showFilter && (
  <div className="container mt-3 fade-in shadow-sm p-2 filter">
    <h5 className="fw-bold ">Filter Options</h5>
   <div className="row">
      <div className="col-12 col-md-3">
      <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle w-100" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
    Select an option
  </button>
  <ul class="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
    <li><a class="dropdown-item" href="#">Option 1</a></li>
    <li><a class="dropdown-item" href="#">Option 2</a></li>
    <li><a class="dropdown-item" href="#">Option 3</a></li>
  </ul>
</div>

      </div>
      <div className="col-12 col-md-3">asdasdasdasdsds</div>
      <div className="col-12 col-md-3">asdasdasdasdsds</div>
      <div className="col-12 col-md-3">asdasdasdasdsds</div>
   </div>
  </div>
)}


        </div>

        {viewMode === "table" && (
          <div className="container m-2 p-2 hov cardlist">
            {searchResults.map((result) => (
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
            ))}


          </div>
        )}
        {viewMode ==="list" &&(
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
    </div>
  );
}
