import "./Adminstyle.css"
import { cardSize } from "../../assets/data/metadata"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import * as customStyles from "./customStyles";
import {
  levelOptions, typeOptions, raceOptions, frameOptions,
  attributeOptions, sortOption
} from '../../assets/data/data';
import makeAnimated from 'react-select/animated';
import {
  Typography, Skeleton, Slider, Grid, Box, Link, Accordion, Alert, Zoom, Tooltip, IconButton,
  AccordionDetails, AccordionSummary, Divider, TextField, Snackbar, ToggleButton, ToggleButtonGroup
} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/navbar/navbar"
import * as custom from "./customComponent";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import carddummy from "../../assets/images/dummycard.jpg"
import uploadImageToAzure from "../../utils/UploadImageToAzure";
import deleteImageToAzure from "../../utils/deleteImageFromAzure";
import Swal from "sweetalert2";
import { debounce } from "lodash";


const animatedComponents = makeAnimated();
const minDistance = 5;


export default function CardManager() {

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5)
  const [offset, setOffset] = useState(0)
  const [viewMode, setViewMode] = useState('table');
  const [searchResults, setSearchResults] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [ShowAlert, setShowAlert] = useState(false);
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

  // Form data
  const [selectedImage, setSelectedImage] = useState(carddummy);
  const [imgFile, setImagefile] = useState()
  const [file, setfile] = useState()
  const [cardData, setCarddata] = useState({
    name: "",
    type: "",
    race: "",
    frameType: "",
    attribute: "",
    level: "",
    def: 0,
    atk: 0,
    desc: ""
  });
  const resetToDefault = () => {
    setCarddata({
      name: "",
      type: "",
      race: "",
      frameType: "",
      attribute: "",
      level: "",
      def: 0,
      atk: 0,
      desc: ""
    });
    document.getElementById("formName").value = ""
    document.getElementById("formDef").value = ""
    document.getElementById("formAtk").value = ""
    document.getElementById("formDesc").value = ""
  };

  const validateCardData = () => {
    const errors = {};
    if (!imgFile) {
      errors.err = "Image is required";
    } else
      if (cardData.name.trim() === "") {
        errors.err = "Name is required";
      } else if (cardData.type.trim() === "") {
        errors.err = "Type is required";
      } else if (cardData.level < 1 || cardData.level > 15) {
        errors.err = "Level must be between 1 and 15";
      } else if (cardData.race.trim() === "") {
        errors.err = "Race is required";
      } else if (cardData.frameType.trim() === "") {
        errors.err = "Frame Type is required";
      } else if (cardData.attribute.trim() === "") {
        errors.err = "Attribute is required";
      } else if (cardData.desc.trim() === "") {
        errors.err = "Description is required";
      } else if (cardData.frameType.trim() === "") {
        errors.err = "frameType is required";
      }
    return errors;
  };

  const FormInputChange = debounce((e) => {
    if (e.target) {
      const { name, value } = e.target;
      if (name === "name" || name === "desc") {
        setCarddata((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      } else if (name === "def" || name === "atk") {
        setCarddata((prevState) => ({
          ...prevState,
          [name]: parseInt(value),
        }));
      }
    }
  }, 300);



  const FormInputChangeSelection = (selectedOption, actionMeta) => {
    const { value } = selectedOption;
    const name = actionMeta.name;

    let updatedCardData = { ...cardData };

    switch (name) {
      case "type":
        updatedCardData = { ...updatedCardData, type: value };
        break;
      case "race":
        updatedCardData = { ...updatedCardData, race: value };
        break;
      case "frameType":
        updatedCardData = { ...updatedCardData, frameType: value };
        break;
      case "attribute":
        updatedCardData = { ...updatedCardData, attribute: value };
        break;
      case "level":
        updatedCardData = { ...updatedCardData, level: value };
        break;
      default:
        console.log(selectedOption);
        break;
    }
    setCarddata(updatedCardData);
    // console.log(updatedCardData)
  };
  const [validateText, setValidateText] = useState("err")

  const handleFormSubmit = () => {
    const errors = validateCardData();
    if (Object.keys(errors).length === 0) {
      axios
        .post(`${process.env.REACT_APP_API}/cards/create`, cardData).then((res) => {
          console.log(res.data.id)

          uploadImageToAzure(
            res.data.id,
            imgFile,
            file,
            "cardimgsmall",
            cardSize[1].width,
            cardSize[1].height
          )
          uploadImageToAzure(
            res.data.id,
            imgFile,
            file,
            "cardimgs",
            cardSize[0].width,
            cardSize[0].height
          )
          setValidateText({ err: "success", txt: "Update card complete!" })
          resetToDefault()
          setSelectedImage(carddummy);
          setImagefile()
        })
        .catch((err) => {
          setValidateText({ err: "invalid", txt: "Error! to update." })
        });


      setShowAlert(true);
      console.log("Data is valid:", cardData);
    } else {
      setValidateText({ err: "invalid", txt: errors.err })
      setShowAlert(true);

      console.log("Validation errors:", errors);
    }
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
            <td className="timg">
              <div className="image-container d-flex justify-content-center  tableimg" style={{ position: 'relative' }}>
                <a
                  style={{ cursor: 'pointer' }}
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
      case "sortBy":
        updatedFilters = { ...updatedFilters, sort: value };
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
  };

  const navigateToAnotherPage = (id) => {
    const destinationRoute = `/cards/${id}`;
    navigate(destinationRoute, { state: "search" });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    setImagefile(reader)
    setfile(file)
  };


  const handleCloseAction = () => {
    setShowAlert(false);
  };
  const deleteCardFromDatabase = async (itemId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${process.env.REACT_APP_API}/cards/${itemId}`)
          console.log(response.data);
          setSearchTerm("")
          deleteImageToAzure("cardimgs", `${itemId}.jpg`)
          deleteImageToAzure("cardimgsmall", `${itemId}.jpg`)
        } catch (error) {
          console.error(error);
        }
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  };

  const [toggleValue, setToggleValue] = useState("createCard")
  const handleChangeToggle = () => {
    if (toggleValue === "createCard") {
      resetToDefault()
      setToggleValue("updateCard")
    } else {

      setToggleValue("createCard")
    }
  }
  const [isEdit, setIsEdit] = useState(false)

  return (
    <div >
      <Navbar />

      <div className="container mt-3 min-vh-100">
        <h2 className="fw-bold ">Card Manager</h2>

        <div >
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover"
              style={{ cursor: 'pointer' }}
              color="inherit" onClick={() => { navigate(-1); }}>
              Back
            </Link>
            <Typography color="text.primary">Card manager</Typography>
          </Breadcrumbs>

          <div className='container mt-3 mb-3'>
            <ToggleButtonGroup
              className="m-1 d-flex justify-content-center"
              value={toggleValue}
              exclusive
              onChange={handleChangeToggle}
            >
              <ToggleButton
                className={`fw-bold fs-5 text-primary ${toggleValue === "createCard" ? "bg-primary text-white" : "bg-secondary "}`}
                value="createCard">Create Card</ToggleButton>
              <ToggleButton
                className={`fw-bold fs-5 text-primary ${toggleValue === "updateCard" ? "bg-primary text-white" : "bg-secondary"}`} v
                alue="updateCard">Update Card</ToggleButton>
            </ToggleButtonGroup>

            <Divider />

            <div style={{ position: 'relative' }}>
              {!isEdit && toggleValue === "updateCard" && (
                <div className="backdrop" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={()=>{window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });}}>
                  <span className="centered-text">Please select Card</span>
                </div>
              )}
              <div className="row g-3 mt-3">
                <div className='col-12 col-md-4 d-flex justify-content-center'>
                  <div className="row d-flex justify-content-center">
                    <img
                      src={selectedImage}
                      className="img-fluid rounded-start mt-1 cardImgAdmin "
                      alt={"Name"}
                      style={{ "width": "75%" }}
                    />
                    <input
                      className="form-control "
                      type="file"
                      id="formFile"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ "width": "70%", "marginTop": "1rem" }}
                    />
                  </div>
                </div>
                <div className='col-12 col-md-8'>

                  <div className='row' >
                    <Box sx={{ flexGrow: 1 }} className="mt-2" >
                      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid xs={2} sm={4} md={4} key={1}>
                          <custom.Item className='item-info '>
                            <p className="fw-bold">Card name</p>
                            <input
                              type="text"
                              class="form-control"
                              name="name"
                              id="formName"
                              onChange={FormInputChange}
                              aria-describedby="nameHelpId"
                              placeholder="name" />
                          </custom.Item>
                        </Grid>
                        <Grid xs={2} sm={4} md={4} key={2}>
                          <custom.Item className='item-info '>
                            <p className="fw-bold">Type</p>
                            <Select
                              className="basic-single"
                              isSearchable={true}
                              classNamePrefix="select"
                              defaultValue={typeOptions[0]}
                              menuPortalTarget={document.body}
                              name="type"
                              value={typeOptions.find(option => option.value === cardData.type)}
                              options={typeOptions}
                              styles={customStyles.customStyles}
                              onChange={FormInputChangeSelection}
                            />
                          </custom.Item>
                        </Grid>
                        <Grid xs={2} sm={4} md={4} key={3}>
                          <custom.Item className='item-info '>
                            <p className="fw-bold">FrameType</p>
                            <Select
                              className="basic-single"
                              isSearchable={true}
                              classNamePrefix="select"
                              defaultValue={frameOptions[0]}
                              menuPortalTarget={document.body}
                              name="frameType"
                              options={frameOptions}
                              styles={customStyles.customStyles}
                              value={frameOptions.find(option => option.value === cardData.frameType)}
                              onChange={FormInputChangeSelection}
                            />
                          </custom.Item>
                        </Grid>
                        <Grid xs={2} sm={4} md={4} key={4}>
                          <custom.Item className='item-info '>
                            <p className="fw-bold">Race</p>
                            <Select
                              className="basic-single"
                              isSearchable={true}
                              classNamePrefix="select"
                              defaultValue={raceOptions[0]}
                              menuPortalTarget={document.body}
                              name="race"
                              options={raceOptions}
                              styles={customStyles.customStyles}
                              value={raceOptions.find(option => option.value === cardData.race)}
                              onChange={FormInputChangeSelection}
                            />
                          </custom.Item>
                        </Grid>
                        <Grid xs={2} sm={4} md={4} key={5}>
                          <custom.Item className='item-info'>
                            <p className="fw-bold">Attribute</p>
                            <Select
                              className="basic-single"
                              isSearchable={true}
                              classNamePrefix="select"
                              defaultValue={attributeOptions[0]}
                              menuPortalTarget={document.body}
                              value={attributeOptions.find(option => option.value === cardData.attribute)}
                              name="attribute"
                              options={attributeOptions}
                              styles={customStyles.customStyles}
                              onChange={FormInputChangeSelection}
                            />
                          </custom.Item>
                        </Grid>
                        <Grid xs={2} sm={4} md={4} key={6}>
                          <custom.Item className='item-info'>
                            <p className="fw-bold">Level</p>
                            <Select
                              className="basic-single"
                              isSearchable={true}
                              classNamePrefix="select"
                              defaultValue={levelOptions[1]}
                              menuPortalTarget={document.body}
                              value={levelOptions.find(option => option.value === cardData.levelOptions)}
                              name="level"
                              options={levelOptions}
                              styles={customStyles.customStyles}
                              onChange={FormInputChangeSelection}
                            />
                          </custom.Item>
                        </Grid>
                        <Grid xs={2} sm={4} md={4} key={7}>
                          <custom.Item className='item-info '>
                            <p className="fw-bold">Attack</p>
                            <input type="text" class="form-control"
                              name="atk"
                              id="formAtk"
                              onChange={FormInputChange}
                              aria-describedby="atkHelpId" placeholder="attack value" />

                          </custom.Item>
                        </Grid>
                        <Grid xs={2} sm={4} md={4} key={8}>
                          <custom.Item className='item-info  '>
                            <p className="fw-bold">Defense</p>
                            <input type="text" class="form-control"
                              name="def"
                              id="formDef"
                              onChange={FormInputChange}
                              aria-describedby="defHelpId" placeholder="defense value" />

                          </custom.Item>
                        </Grid>
                        <Grid xs={12} sm={12} md={12} key={9}>
                          <custom.Item className='item-info '>
                            <p className="fw-bold">Card Description</p>
                            <textarea
                              placeholder="card detail"
                              className="form-control"
                              name="desc"
                              id="formDesc"
                              onChange={FormInputChange}
                              rows="4"
                            ></textarea>

                          </custom.Item>
                        </Grid>
                      </Grid>
                    </Box>
                  </div>

                </div>
              </div>
              {toggleValue === "createCard" ? (
                <>
                  <button type="button" class="btn btn-primary w-100" onClick={handleFormSubmit}>Create Card</button>
                </>
              ) : (
                <>
                  <button type="button" class="btn btn-primary w-100" onClick={() => { console.log(999) }}>Update Card</button>
                </>
              )}
            </div>

          </div>


        </div>

        <Accordion className="mb-2 mt-2">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h3 className=" fw-bold text-center">Select Cards to update & delete</h3>
          </AccordionSummary>
          <AccordionDetails>
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
                    <div className="col-12 col-md-2 sel">
                      <Select
                        className="basic-single"
                        isSearchable={true}
                        classNamePrefix="select"
                        defaultValue={[sortOption[0]]}
                        menuPortalTarget={document.body}
                        name="sortBy"
                        value={sortOption.filter(option => option.value === selectedFilters.sort)}
                        options={sortOption}
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
            <div>
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
                      <a onClick={() => { console.log(55) }}>

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
                                deleteCardFromDatabase(result._id)
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
          </AccordionDetails>
        </Accordion>

      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={ShowAlert}
        autoHideDuration={6000}
        onClose={handleCloseAction}
      >
        <Alert severity={validateText.err === "success" ? "success" : "error"} >
          {validateText.txt}
        </Alert>
      </Snackbar>

    </div>
  );
}
