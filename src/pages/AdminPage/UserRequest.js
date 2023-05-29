import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Adminstyle.css"
import Navbar from "../../components/common/navbar/navbar";

const UserRequest = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="container p-3">
       
      </div>
    </>

  );
};

export default UserRequest;
