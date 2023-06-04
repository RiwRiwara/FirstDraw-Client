import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import Select from 'react-select';
import {
  Typography, Grid, Box, Accordion, TableContainer, TableHead, TableRow, Paper, Button, Table, TableBody, TableCell,
  AccordionDetails, AccordionSummary, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText
} from '@mui/material';


import {
  levelOptions, typeOptions, raceOptions, frameOptions,
  attributeOptions, sortOption
} from '../../assets/data/data';
import "./style.css"
import Navbar from "../../components/common/navbar/navbar";
import PageTitle from "../../components/features/pageTitle";
import carddummy from "../../assets/images/dummycard.jpg"
import * as custom from "./customComponent";
import { debounce } from "lodash";
import * as customStyles from "./customStyles";
import Swal from "sweetalert2";
import uploadImageToAzure from "../../utils/UploadImageToAzure";
import deleteImageToAzure from "../../utils/deleteImageFromAzure";
import { cardSize } from "../../assets/data/metadata"
import { ExpandMore } from "@mui/icons-material";
import carddummysm from "../../assets/images/dummycardsmall.jpg";

const Request = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user")).data.user;
  const [selectedImage, setSelectedImage] = useState(carddummy);
  const [imgFile, setImagefile] = useState()
  const [file, setfile] = useState()
  const [reqData, setReqData] = useState({
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
    setReqData({
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

  const FormInputChange = debounce((e) => {
    if (e.target) {
      const { name, value } = e.target;
      if (name === "name" || name === "desc") {
        setReqData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      } else if (name === "def" || name === "atk") {
        setReqData((prevState) => ({
          ...prevState,
          [name]: parseInt(value),
        }));
      }
    }
  }, 300);

  const FormInputChangeSelection = (selectedOption, actionMeta) => {
    const { value } = selectedOption;
    const name = actionMeta.name;

    let updatedCardData = { ...reqData };

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
    setReqData(updatedCardData);
  };

  const handleFormSubmit = () => {
    axios
      .post(`${process.env.REACT_APP_API}/requests`, {
        user: userData,
        cardReq: reqData,
        userid: userData._id

      }).then((res) => {

        if (selectedImage != carddummy) {
          uploadImageToAzure(
            res.data._id,
            imgFile,
            file,
            "requestimg",
            cardSize[0].width,
            cardSize[0].height
          )
          resetToDefault()
          setSelectedImage(carddummy);
          setImagefile()
        }
        Swal.fire("Complete", "card has sending wait admin to response!", "success");

      })
      .catch((err) => {
        console.log(err)
      });
  };

  const sendRequestOnclick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure to send request to admin?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, send it!'
    }).then((result) => {
      if (result.isConfirmed) {
        handleFormSubmit()
        setRefresh(!refresh)
      } else {

      }
    });
  }

  const [refresh, setRefresh] = useState(false)
  const [reqDataShow, setReqDataShow] = useState([])
  useEffect(() => {
    const fecthSend = async () => {
      await axios.get(`${process.env.REACT_APP_API}/requests?userid=${userData._id}`).
        then((res) => {
          setReqDataShow(res.data)
        }).catch((err) => {
          console.log(err)
        })
    };
    fecthSend();
  }, [refresh]);

  return (
    <>
      <Navbar />
      <div className="container mt-3 min-vh-100">
        <PageTitle title="Request card" />

        <div className="mt-3 mb-4">
          <Divider className="mb-2" />
          <h3 className="fw-bold text-center">Enter your card data</h3>
          <div className="row g-3 mt-3">
            <div className='col-12 col-md-4 d-flex justify-content-center'>
              <div className="row d-flex justify-content-center">
                <img
                  src={selectedImage}
                  className="img-fluid mt-1 cardImgAdmin "
                  alt={"Name"}
                  style={{ "width": "75%" , borderRadius:"1rem"}}
                />
                <input
                  className="form-control "
                  type="file"
                  id="formFile"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ "width": "70%", "marginTop": "1rem", "borderRadius": "10px" }}
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
                          className="form-control"
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
                          value={typeOptions.find(option => option.value === reqData.type)}
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
                          value={frameOptions.find(option => option.value === reqData.frameType)}
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
                          value={raceOptions.find(option => option.value === reqData.race)}
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
                          value={attributeOptions.find(option => option.value === reqData.attribute)}
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
                          value={levelOptions.find(option => option.value === reqData.levelOptions)}
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
                        <input type="text" className="form-control"
                          name="atk"
                          id="formAtk"
                          onChange={FormInputChange}
                          aria-describedby="atkHelpId" placeholder="attack value" />

                      </custom.Item>
                    </Grid>
                    <Grid xs={2} sm={4} md={4} key={8}>
                      <custom.Item className='item-info  '>
                        <p className="fw-bold">Defense</p>
                        <input type="text" className="form-control"
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
              <button type="button" className="btn btn-primary w-100" onClick={sendRequestOnclick}>Send Request</button>
            </div>
          </div>

          <Divider className="mt-4 mb-2" />

          <Accordion className="mb-2 mt-2">
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h3 className=" fw-bold text-center">Your pending requested</h3>

            </AccordionSummary>
            <AccordionDetails>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 800 }} aria-label="simple table">
                <TableHead>
                  <TableRow >
                    <TableCell className="fw-bold">Image</TableCell>
                    <TableCell className="fw-bold">Requested Card</TableCell>
                    <TableCell className="fw-bold">Requested Date</TableCell>
                    <TableCell className="fw-bold">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reqDataShow.map((result) => (
                    (result.status === 'pending') && (
                      <TableRow key={result._id}>
                        <TableCell component="th" scope="row">
                          <img variant="square"
                          className="shadow-lg rounded-1 p-1"
                            alt="req card"
                            src={`https://firstdraw.blob.core.windows.net/requestimg/${result._id}.jpg`}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = carddummysm;
                            }}
                            style={{ width: "3rem", height: "4rem" ,}} />
                        </TableCell>
                        <TableCell >{result.cardReq.name}</TableCell>
                        <TableCell>{new Date(result.createdAt).toLocaleString()}</TableCell>
                        <TableCell>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            <div className="fw-bold" style={{ color: result.status === 'accepted' ? 'green' : 'red' }}>
                              {result.status}
                            </div>
                          </Typography>
                        </TableCell>
       
                      </TableRow>
                    )
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            </AccordionDetails>
          </Accordion>

          <Accordion className="mb-2 mt-2">
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h3 className=" fw-bold text-center">Your pending Response</h3>
            </AccordionSummary>
            <AccordionDetails>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 800 }} aria-label="simple table">
                <TableHead>
                  <TableRow >
                    <TableCell className="fw-bold">Image</TableCell>
                    <TableCell className="fw-bold">Requested Card</TableCell>
                    <TableCell className="fw-bold">Requested Date</TableCell>
                    <TableCell className="fw-bold">Status</TableCell>
                    <TableCell className="fw-bold">Note</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reqDataShow.map((result) => (
                    (result.status === 'accepted' || result.status === 'rejected') && (
                      <TableRow key={result._id}>
                        <TableCell component="th" scope="row">
                          <img variant="square"
                          className="shadow-lg rounded-1 p-1"
                            alt="req card"
                            src={`https://firstdraw.blob.core.windows.net/requestimg/${result._id}.jpg`}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = carddummysm;
                            }}
                            style={{ width: "3rem", height: "4rem" ,}} />
                        </TableCell>
                        <TableCell >{result.cardReq.name}</TableCell>
                        <TableCell>{new Date(result.updatedAt).toLocaleString()}</TableCell>
                        <TableCell>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            <div className="fw-bold" style={{ color: result.status === 'accepted' ? 'green' : 'red' }}>
                              {result.status}
                            </div>
                          </Typography>
                        </TableCell>
                        <TableCell>

                          <textarea rows="4" className="w-100" style={{pointerEvents:"none"}}>{result.note}</textarea>

                        </TableCell>
                   
                      </TableRow>
                    )
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            </AccordionDetails>

          </Accordion>




        </div>
      </div>
    </>

  );
};

export default Request;
