import "./style.css";
import Navbar from "../../components/common/navbar/navbar";
import profile from "../../assets/images/dummy-profile.png";
import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Swal from "sweetalert2";
import axios from "axios";
import PublicProfile from "./PublicProfile";
import uploadImageToAzure from "../../utils/UploadImage";

export default function MyProfile() {
  const user = JSON.parse(localStorage.getItem("user")).data;
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/user/${user.user.email}`)
      .then((response) => {
        setDname(response.data.displayname);
        setBio(response.data.bio);
        setUid(response.data._id)
        if(response.data.profile_img){
          setSelectedImage(response.data.profile_img)
        }
      })
      .catch((err) => { });
  }, [user.user.email]);

  const [activeSection, setActiveSection] = useState("Account");
  const [selectedImage, setSelectedImage] = useState(profile);
  const [imgFile, setImagefile] = useState()
  const [file, setfile] = useState()
  const [dname, setDname] = useState(user.user.displayname);
  const [uid, setUid] = useState();
  const [bio, setBio] = useState(user.user.bio);
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

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

  const saveName = (e) => {
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
        const name = e.target.getAttribute("name");
        if (name === "nBtn") {
          axios
            .put(`${process.env.REACT_APP_API}/user/${user.user.email}`, {
              displayname: dname,
            })
            .then((res) => {
              Swal.fire("Complete", "Displayname has been changed!", "success");
            })
            .catch((err) => {
              Swal.fire("Incompleted!", "Data not updated", "error");
            });
        } else if (name === "pBtn") {
          if (newPassword === rePassword) {
            if (newPassword.trim() === "") {
              Swal.fire("Incompleted!", "Password cannot be blank.", "error");
              return;
            }

            axios
              .put(`${process.env.REACT_APP_API}/user/${user.user.email}`, {
                password: newPassword,
              })
              .then((res) => {
                Swal.fire("Complete", "Password has been changed!", "success");
              })
              .catch((err) => {
                Swal.fire("Incompleted!", err.response.data.error, "error"); // Show the error message
              });
          } else {
            Swal.fire("Incompleted!", "Passwords do not match!", "error");
          }
        } else if (name === "bBtn") {
          axios
            .put(`${process.env.REACT_APP_API}/user/${user.user.email}`, {
              bio: bio,
            })
            .then((res) => {
              Swal.fire("Complete", "Bio has been changed!", "success");
            })
            .catch((err) => {
              Swal.fire("Incompleted!", "Data not updated", "error");
            });
        }
      } else {
        setBio(user.user.bio)
        setDname(user.user.displayname)

      }
    });
  };

  const saveOnclick = async () => {
    if(selectedImage===profile){
      Swal.fire("Warning", "Please select a profile image", "warning");
    }else{
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
        .put(`${process.env.REACT_APP_API}/user/${user.user.email}`, {
          profile_img: `${process.env.REACT_APP_AZURE_API}/userprofile/${uid}_profile.jpeg`,
        })
        .then((res) => {
          uploadImageToAzure(imgFile, file, uid)
          Swal.fire("Complete", "profile has been changed!", "success");
        })
        .catch((err) => {
          Swal.fire("Incompleted!", "Data not updated", "error");
        });
        
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
  };

  const handleSectionToggle = (sectionName) => {
    setActiveSection(sectionName);
  };
  return (
    <div>

      <Navbar />
      <div className="rootBox pt-3 rounded-1">
        <div className="container">
          <h1 className="d-flex justify-content-center fw-bold mb-3">
            My Profile &nbsp;<i className="m bi bi-person-vcard"></i>
          </h1>

          <div
            className="btn-group w-100"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <button
              type="button"
              className={`btn btn-outline-primary ${activeSection === "Account" ? "active" : ""
                }`}
              onClick={() => handleSectionToggle("Account")}
            >
              Account
            </button>

            <button
              type="button"
              className={`btn btn-outline-primary ${activeSection === "Public" ? "active" : ""
                }`}
              onClick={() => handleSectionToggle("Public")}
            >
              Public Profile
            </button>

            <button
              type="button"
              className={`btn btn-outline-primary ${activeSection === "Premium" ? "active" : ""
                }`}
              onClick={() => handleSectionToggle("Premium")}
            >
              Premium
            </button>
          </div>
        </div>

        <CSSTransition
          in={activeSection === "Account"}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <section name="Account">
            <div className="container mt-3">
              <h2 className="fw-semibold">Account Detail</h2>
              <p>You can change your personal information in this area. </p>
              <hr className="bg-danger border-4 border-top border-primary"></hr>
            </div>

            <div className="container h5">
              <div className="row mb-4">
                <div className="col-12 col-md-4 fw-bolder mt-1">
                  Display name:
                </div>
                <div className="col-12 col-md-8 mt-1">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={dname}
                      onChange={(e) => setDname(e.target.value)}
                    />
                    <button
                      name="nBtn"
                      className="btn btn-primary"
                      type="button"
                      id="button-addon2"
                      onClick={saveName}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-12 col-md-4 fw-bolder mt-1">Email:</div>
                <div className="col-12 col-md-8 mt-1">
                  <input
                    type="text"
                    className="form-control"
                    value={user.user.email}
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-12 col-md-4 fw-bolder">Member tier:</div>
                <div className="col-12 col-md-8 mt-1">
                  <input
                    type="text"
                    className="form-control"
                    value={user.user.tier}
                  />
                </div>
              </div>

              <div>
                <div className="row mb-4">
                  <div className="col-12 col-md-4 fw-bolder">New Password:</div>
                  <div className="form-control-sm col-12 col-md-8">
                    <div className="input-group">
                      <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-12 col-md-4 fw-bolder">Re Password:</div>
                  <div className="form-control-sm col-12 col-md-8">
                    <div className="input-group">
                      <input
                        type="password"
                        className="form-control"
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                      />
                      <button
                        name="pBtn"
                        className="btn btn-primary"
                        type="button"
                        id="button-addon2"
                        onClick={saveName}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="bg-danger border-4 border-top border-primary"></hr>
              <div className="row mb-4">
                <div className="col-12 col-md-4 fw-bolder">Bio:</div>
                <div className="col-12 col-md-8">
                  <div className="input-group">
                    <textarea
                      className="form-control"
                      value={bio}
                      rows="4"
                      onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                    <button
                      name="bBtn"
                      className="btn btn-primary"
                      type="button"
                      id="button-addon2"
                      onClick={saveName}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
              <hr className="bg-danger border-4 border-top border-primary"></hr>

              {/* Profile Image */}
              <div className="d-flex justify-content-center">
                <img
                  src={selectedImage}
                  className="rounded-top  profileimg mb-3"
                  style={{ aspectRatio: "2/2" }}
                  alt=""
                />
              </div>
              <div className="mb-3">
          
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <button
                  onClick={saveOnclick}
                  className="btn btn-primary w-100 mt-4"
                >
                  Save image
                </button>
                <hr className="bg-danger border-4 border-top border-primary"></hr>
              </div>
            </div>
          </section>
        </CSSTransition>

        <CSSTransition
          in={activeSection === "Public"}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <section name="Public">
            <PublicProfile img={selectedImage} />
          </section>
        </CSSTransition>

        <CSSTransition
          in={activeSection === "Premium"}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <section name="Premium">
            <div className="container mt-3"></div>
          </section>
        </CSSTransition>
      </div>
    </div>
  );
}
