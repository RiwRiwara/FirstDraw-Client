import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./style.css"
import Navbar from "../../components/common/navbar/navbar";
import { useAuthContext } from "../../hooks/useAuthContext";

const Request = () => {
  const { user } = useAuthContext()
  const isAdmin = user && user.data && user.data.isAdmin;
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="container p-3">
       
      </div>
    </>

  );
};

export default Request;
