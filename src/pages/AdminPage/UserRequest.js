import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import "./Adminstyle.css"
import Navbar from "../../components/common/navbar/navbar";
import carddummy from "../../assets/images/dummycard.jpg"
import PageTitle from "../../components/features/pageTitle";
import {
  Typography, Grid, Box, TableContainer, TableHead, TableRow, Paper, Button, Table, TableBody, TableCell,
  AccordionDetails, AccordionSummary, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText, Accordion, Alert, AlertTitle
} from '@mui/material';

import carddummysm from "../../assets/images/dummycardsmall.jpg"
import Swal from "sweetalert2";
import { Expand } from "@mui/icons-material";
import deleteImageFromAzure from "../../utils/deleteImageFromAzure";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const UserRequest = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(carddummy);
  const [imgFile, setImagefile] = useState()
  const [file, setfile] = useState()

  const [refresh, setRefresh] = useState(false)
  const [reqDataShow, setReqDataShow] = useState([])
  useEffect(() => {
    const fecthSend = async () => {
      await axios.get(`${process.env.REACT_APP_API}/requests?all`).
        then((res) => {
          setReqDataShow(res.data)
        }).catch((err) => {
          console.log(err)
        })
    };
    fecthSend();
  }, [refresh]);

  const actionButton = (e, rid) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Yes"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (e === "APPROVE") {
            await axios.put(`${process.env.REACT_APP_API}/requests/${rid}`,
              {
                status: "accepted",
                note: document.getElementById("txtarea").value
              })
              navigate('/admin/request', { replace: true } );
          } else if (e === "REJECT") {
            await axios.put(`${process.env.REACT_APP_API}/requests/${rid}`,
              {
                status: "rejected",
                note: document.getElementById("txtarea").value
              })
          } else if (e === "DELETE") {
            await axios.delete(`${process.env.REACT_APP_API}/requests/${rid}`).then((res) => {
              try {
                deleteImageFromAzure("requestimg", `${rid}.jpg`)
              } catch {
              }
              console.log("Success : " + res)
              Swal.fire(
                'Response',
                'Action complete.',
                'success'
              )
            }).catch((err) => {
              console.log("web error : " + err)
            })


          }

        } catch (error) {
          Swal.fire(
            'Response',
            'Action Denied.',
            'error'
          )
        }

        setRefresh(!refresh)

      }
    })
  }
  const navi = (res) => {
    navigate('/admin/card', { state: { res } });
  };

  const { state } = useLocation();


  return (
    <>
      <Navbar />

      {(state && state.res && state.res.data && state.res.id) ? (
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          If you already add card by request you must APPROVE  — <strong>If browser caches clear you will re add card!</strong>
        </Alert>

      ) : (
        <></>
      )}

      <div className="container mt-3 min-vh-100">
        <PageTitle title={"User Request"} />
        <Divider className="mt-4 mb-4" />
        <div>
          <Accordion className="mb-2 mt-2" defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<Expand />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <div className="h5 fw-bold">Active Requested</div>
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
                      <TableCell className="fw-bold">Type</TableCell>
                      <TableCell className="fw-bold">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {reqDataShow.map((result, index) => (
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
                              style={{ width: "3rem", height: "4rem", }} />
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
                          <TableCell >
                            <textarea rows={3} placeholder=". . ." className="w-100" id="txtarea">

                            </textarea>
                          </TableCell>
                          <TableCell >
                          <div className="fw-bold" style={{ color: result.type === 'card' ? 'green' : 'blue' }}>
                                {result.type}
                              </div>
                          </TableCell>
                          <TableCell >
                            <Grid container spacing={1} columns={{ xs: 8, sm: 8, md: 8 }}>
                              <Grid item xs={5} md={5}>
                                <button
                                  type="button"
                                  value="APPROVE"
                                  class="btn btn-success m-1 w-100"
                                  disabled={!(state && state.res && state.res.data && state.res.id === result._id)}
                                  onClick={(e) => { actionButton(e.target.value, result._id) }}
                                >
                                  APPROVE
                                </button>
                              </Grid>
                              <Grid item xs={3} md={3}>
                                <button type="button" value="ADD" class="btn btn-primary m-1 w-100"
                                  onClick={() => { navi(result) }}>ADD</button>
                              </Grid>
                            </Grid>
                            <Grid item xs={8} md={8}>
                              <button type="button" value="REJECT" class="btn btn-danger m-1 w-100"
                                onClick={(e) => { actionButton(e.target.value, result._id) }}>REJECT</button>
                            </Grid>
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
              expandIcon={<Expand />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <div className="h5 fw-bold">All Requested</div>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="simple table">
                  <TableHead>
                    <TableRow >
                      <TableCell className="fw-bold">No.</TableCell>
                      <TableCell className="fw-bold">Image</TableCell>
                      <TableCell className="fw-bold">Requested Card</TableCell>
                      <TableCell className="fw-bold">Requested Date</TableCell>
                      <TableCell className="fw-bold">Status</TableCell>
                      <TableCell className="fw-bold">Note</TableCell>
                      <TableCell className="fw-bold">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {reqDataShow.map((result, index) => (
                      (true) && (
                        <TableRow key={result._id}>
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <img variant="square"
                              className="shadow-lg rounded-1 p-1"
                              alt="req card"
                              src={`https://firstdraw.blob.core.windows.net/requestimg/${result._id}.jpg`}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = carddummysm;
                              }}
                              style={{ width: "3rem", height: "4rem", }} />
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
                          <TableCell >
                            <textarea rows={3} placeholder=". . ." className="w-100" id="txtarea" style={{ pointerEvents: "none" }}>
                              {result.note}
                            </textarea>
                          </TableCell>
                          <TableCell >
                            <button type="button" value="DELETE" class="btn btn-danger m-1 w-100"
                              onClick={(e) => { actionButton(e.target.value, result._id) }}>DELETE</button>
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

export default UserRequest;
