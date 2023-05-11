import React from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import Navbar from "../../components/common/navbar/navbar";

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
        <nav class="breadcrumb">
          <a class="breadcrumb-item" href="/blogs">Blog</a>
          <span class="breadcrumb-item active" aria-current="page">Create Blog</span>
        </nav>
        <h1>Write Blog</h1>
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
              placeholder="My story . . ."

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
          <div className="login-bt mb-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
