import React from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import Navbar from "../../components/common/navbar/navbar";
import PageTitle from "../../components/features/pageTitle";
import { Divider } from "@mui/material";


export default function FromComponent() {


  const [state, setState] = useState({
    title: "",
    author: "",
  });
  const { title, author } = state;
  const navigate = useNavigate();


  const [content, setContent] = useState('')

  const submitContent = (event) => {
    setContent(event)
  }

  //Define value in state
  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/create`, { title, content, author })
      .then((response) => {
        Swal.fire("Notification", "Create Complete!", "success");
        setState({ ...state, title: "", author: "" });
        setContent("")
        goBackPage()
      })
      .catch((err) => {
        Swal.fire("Notification", err.response.data.error, "error");
      });
  };
  const goBackPage = () => navigate('/blogs');

  return (
    <div>
      <Navbar/>
      <div className="container p-5">
      <PageTitle title="Create Blog"/>
      <Divider className="mt-2 mb-2"/>
        <h2 className="text-center fw-bold">Write Blog</h2>
        <form onSubmit={submitForm}>
          <div className="mb-3">
            <label for="" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id=""
              placeholder="Blog Title"
              value={title}
              onChange={inputValue("title")}
            />
          </div>
          <div className="mb-3">
            <label for="" className="form-label">
              Content
            </label>
            <ReactQuill
              value={content}
              onChange={submitContent}
              theme="snow"
              placeholder="My story . . 
              
              
              
              
              
              "
              className="rounded"
              style={{minHeight:"10rem"}}
            />
          </div>
          <div className="mb-3">
            <label for="" className="form-label">
              Author
            </label>
            <input
              type="text"
              className="form-control"
              id=""
              placeholder="Admin"
              value={author}
              onChange={inputValue("author")}
            />
          </div>
          <div className="login-bt mb-2 ">
            <button type="submit" className="w-100 btn btn-primary">
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
