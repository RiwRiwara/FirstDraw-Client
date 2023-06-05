import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import uploadImageToAzure from "../../utils/UploadImage";
import "./Adminstyle.css"
import Navbar from "../../components/common/navbar/navbar";
import PageTitle from "../../components/features/pageTitle";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {
  FormLabel, Radio, RadioGroup, Grid, Box, Button, FormControlLabel, InputLabel, MenuItem, CircularProgress,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Switch, Backdrop, TextField, Divider
} from '@mui/material';
import proimg from "../../assets/images/dummy-profile.png"
import _ from 'lodash';
import React from "react";
import Swal from "sweetalert2";
import SearchIcon from '@mui/icons-material/Search';
import deleteImageFromAzure from "../../utils/deleteImageFromAzure";

const UserManager = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [allUsersData, setAllUsers] = useState([])
  const [nameUser, setNameUser] = useState("")
  const [currentUser, setCurrent] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false)
  const handleClickOpen = (user) => {
    setRole(user.role)
    setTier(user.tier)
    setCurrent(user)
    setSelectedImage(user.profile_img)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API}/users`, {
        params: {
          displayname: nameUser
        }
      }).then((res) => {
        setIsLoading(false);
        setAllUsers(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }, [nameUser, refresh])
  const searchUser = _.debounce((value) => {
    setNameUser(value);
  }, 500);

  const handleSearchChange = (event) => {
    searchUser(event.target.value);
  };


  const [selectedImage, setSelectedImage] = useState(proimg);
  const [imgFile, setImagefile] = useState()
  const [file, setfile] = useState()
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
  const saveOnclick = async () => {
    if (selectedImage === currentUser.profile_img) {
      // Swal.fire("Warning", "Please select a proimg image", "warning");
    } else {
      const timestamp = Date.now();
      const imageUrl = `${process.env.REACT_APP_AZURE_API}/userprofile/${currentUser._id}_profile.jpeg?t=${timestamp}`;

      axios
        .put(`${process.env.REACT_APP_API}/user/${currentUser.email}`, {
          profile_img: imageUrl,
        })
        .then((res) => {
          uploadImageToAzure(imgFile, file, currentUser._id)
          Swal.fire("Complete", "user data has been changed!", "success");
        })
        .catch((err) => {
          Swal.fire("Incompleted!", "Data not updated", "error");
        });

    }


  };
  const [roleSelected, setRole] = useState()
  const [tierSelected, setTier] = useState()

  const updateOnclick = () => {
    if (!(document.getElementById("urepassword").value === document.getElementById("upassword").value)) {
      Swal.fire("Changes are not saved", "new password not matching.", "error");
      return
    }
    let updateData = {
      displayname: document.getElementById("uname").value,
      email: document.getElementById("uemail").value,
      password: document.getElementById("upassword").value,
      bio: document.getElementById("ubio").value,
      role: roleSelected,
      tier: tierSelected,
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure to keep this change?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`${process.env.REACT_APP_API}/user/${currentUser.email}`, updateData)
          .then((res) => {
            saveOnclick()
            Swal.fire("Update user complete!", "", "success");
            setRefresh(!refresh)
          })
          .catch((err) => {
            console.log(err)
            Swal.fire("Incompleted!", err.response.data.error, "error");
          });

      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  const deleteUserOnclick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure to take action",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.REACT_APP_API}/user/${currentUser._id}`).then((res) => {
            Swal.fire("Delete user complete", "", "success");
            deleteImageFromAzure("userprofile", `${currentUser._id}_profile.jpeg`)
            setRefresh(!refresh)
            setOpen(false)
          }).catch((err) => {
            Swal.fire("Delete user not complete", "", "Error");
          })
      }
    })

  }
  return (
    <>
      <Navbar />
      <div className="container mt-3 min-vh-100">
        <PageTitle title="User Manager" />
        <div className="mt-3 mb-3">
          <div className="input-group rounded">
            <div className="input-group rounded">
              <input
                id="searching"
                name="searching"
                type="search"
                className="form-control searching"
                placeholder="Enter name of user"
                aria-label="Search"
                aria-describedby="search-addon"
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <Backdrop open={isLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <div className="container m-2">
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {allUsersData.map((user) => (
                <Grid item xs={2} sm={2} md={2}>
                  <div className="d-flex justify-content-center cardImgAdmin" style={{ cursor: "pointer", borderRadius: "1rem" }}
                    onClick={() => { handleClickOpen(user) }}>
                    <div style={{ position: 'relative' }}>
                      <img
                        src={user.profile_img || proimg}
                        className="profileimg mb-3"
                        style={{ aspectRatio: "4/5", borderRadius: "5px", width: '10rem' }}
                        alt="user item"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = proimg;
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        background: `${user.tier === "Silver" ? 'silver' : user.tier === "Blue" ? 'blue' : user.tier === "Dragon" ? 'gold' : 'white'}`,
                        color: '#fff',
                        width: '100%',
                        padding: '5px',
                        borderRadius: "5px"
                      }}>
                        <Typography gutterBottom component="div">
                          <p className="fw-bold text-white">{user.displayname || "Guest"}</p>
                        </Typography>
                      </div>
                    </div>
                    <Typography variant="body2" >
                      {user.description}
                    </Typography></div>
                </Grid>
              ))}
            </Grid>
          </div>
        )}

      </div >
      <Dialog maxWidth={"md"} open={open} onClose={handleClose}>
        {currentUser && (
          <div className="container p-2 rounded mt-1 bg-secondary">
            <div className="input-grou d-flex justify-content-between">

              <h3 className="fw-bold">{currentUser.displayname || "Guest"}</h3> <SearchIcon className="fs-1" />
            </div>
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={4} sm={8} md={3}>
                <div className="d-flex justify-content-center m-2 p-1">
                  <img
                    src={selectedImage || proimg}
                    style={{
                      height: "15rem",
                      width: "10rem",
                      borderRadius: "5px",
                    }}
                    alt="user item"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = proimg;
                    }}
                  />
                </div>
                <input
                  className="form-control w-100"
                  type="file"
                  id="formFile"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Grid>

              <Grid item xs={4} sm={8} md={9}>
                <div className="container p-2">

                  <Grid container columns={{ xs: 2, sm: 2, md: 6 }} spacing={1}>
                    <Grid item xs={2} sm={2} md={6}>
                      <TextField id="uemail"
                        defaultValue={currentUser.email}
                        label="Email" variant="outlined" className="w-100 m-1" />
                    </Grid>
                    <Grid item xs={2} sm={2} md={6}>
                      <TextField id="uname"
                        defaultValue={currentUser.displayname}
                        label="Displayname" variant="outlined" className="w-100 m-1" />
                    </Grid>
                    <Grid item xs={2} sm={2} md={3}>

                      <TextField id="upassword" label="Password"
                        type="password"
                        className="w-100 m-1"
                        autoComplete="current-password"
                      />
                    </Grid>
                    <Grid item xs={2} sm={2} md={3}>

                      <TextField id="urepassword" label="Re - password"
                        type="password"
                        className="w-100 m-1"
                        autoComplete="current-password"
                      />
                    </Grid>
                    <Grid item xs={2} sm={2} md={6}>
                      <TextField id="ubio" label="Bio" multiline maxRows={4}
                        className="w-100 m-1"
                        defaultValue={currentUser.bio}
                      />
                    </Grid>

                    <Grid item xs={2} sm={2} md={2}>
                      <div className="shadow-sm p-1">
                        <FormControl>
                          <FormLabel id="roleTitle">Role</FormLabel>
                          <RadioGroup
                            row
                            id="role"
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="roleRadio"
                            onChange={(e) => { setRole(e.target.value) }}
                            defaultValue={currentUser.role}
                          >
                            <FormControlLabel value="User" control={<Radio />} label="User" />
                            <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </Grid>
                    <Grid item xs={2} sm={2} md={4}>
                      <div className="shadow-sm p-1">
                        <FormControl>
                          <FormLabel id="tierTitle">Tier</FormLabel>
                          <RadioGroup
                            row
                            id="tier"
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="roleRadio"
                            onChange={(e) => { setTier(e.target.value) }}
                            defaultValue={currentUser.tier}
                          >
                            <FormControlLabel value="Silver" control={<Radio />} label="Silver" />
                            <FormControlLabel value="Blue" control={<Radio />} label="Blue-Eyes" />
                            <FormControlLabel value="Dragon" control={<Radio />} label="Winged Dragon of Ra" />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </Grid>
                  </Grid>

                </div>

              </Grid>
            </Grid>
            <DialogActions>
              <div className="btn-group" role="group" aria-label="Button group">
                <button className="btn btn-success" onClick={() => { updateOnclick() }}>Save</button>
                <button className="btn btn-danger" onClick={() => { deleteUserOnclick()}}>Delete</button>
                <button className="btn btn-primary" onClick={handleClose}>Close</button>
              </div>
            </DialogActions>
          </div>

        )}
      </Dialog >

    </>
  );
};

export default UserManager;
