import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Adminstyle.css"
import Navbar from "../../components/common/navbar/navbar";

const Permission = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="container p-3">
       <p> You don't have permission to reach this page!</p>
      </div>
    </>

  );
};

export default Permission;
