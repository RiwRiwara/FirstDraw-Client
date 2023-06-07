import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./style.css"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import Navbar from "../../components/common/navbar/navbar";
import { useAuthContext } from "../../hooks/useAuthContext";
import PageTitle from "../../components/features/pageTitle";
import { Divider } from "@mui/material";

const SingleComponent = () => {
  const { user } = useAuthContext()
  const { slug } = useParams();
  const isAdmin = user && user.data && user.data.isAdmin;
  const [blog, setBlog] = useState("");
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blogs/${slug}`)
      .then((response) => {
        setBlog(response.data);
        setContent(response.data.content)
      })
      .catch((err) => {
        alert(err);
      });
  }, [slug]);

  const updateBlog = () => {
    setEditMode(!editMode);
  };


  const [content, setContent] = useState('')

  const submitContent = (event) => {
    setContent(event)
  }
  const saveBlog = () => {
    axios
      .put(`${process.env.REACT_APP_API}/blogs/${slug}`, { title: blog.title, content: content, author: blog.author })
      .then(res => {
        Swal.fire("Update!", "Data has updated", "success")
      }).catch(err => {
        console.log(err)
        Swal.fire("Unsuccess!", "Data not updated", "error")
      })
    setEditMode(!editMode);
  };
  const goBackPage = () => navigate('/blogs');

  const confirmDelete = (blog) => {
    Swal.fire({
      title: `Are you sure to delete ${blog.title}`,
      icon: "warning",
      showCancelButton: true
    }).then((res) => {
      if (res.isConfirmed) {
        deleteBlog(blog.slug)
        goBackPage()
      }
    })
  }

  const deleteBlog = (slug) => {
    axios.delete(`${process.env.REACT_APP_API}/blogs/${slug}`)
      .then(res => {
        Swal.fire("Deleted!", res.data.message, "success")
      })
  }



  return (
    <div>
      <Navbar />
      <div className="container "  style={{ paddingTop: "5rem" }}>
        <PageTitle title="Single Blog" />

        {isAdmin && (
          <div className="text-end">
            <div class="dropdown open mb-2 ">
              <button class="btn btn-secondary dropdown-toggle vcolor" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">
                Action
              </button>
              <div class="dropdown-menu" aria-labelledby="triggerId">
                <button class="dropdown-item" onClick={() => updateBlog()}>Update</button>
                <button class="dropdown-item" onClick={() => confirmDelete(blog)}>Delete</button>
              </div>
            </div>
          </div>

        )}



        <div className="card container">
          <div className="card-body">
            {editMode ? (
              <input
                className="form-control mb-3"
                defaultValue={blog.title}
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
              />
            ) : (
              <h2 className="card-title">{blog.title}</h2>
            )}
            {editMode ? (
              <input
                className="form-control mb-3"
                defaultValue={blog.author}
                onChange={(e) => setBlog({ ...blog, author: e.target.value })}
              />
            ) : (
              <h4 className="card-subtitle mb-2 text-muted">{blog.author}</h4>
            )}
            {editMode ? (
              <>
                <ReactQuill
                  value={content}
                  onChange={submitContent}
                  theme="snow"
                  placeholder="My story . . ."

                /></>
            ) : (
              <>
                <Divider className="mt-2 mb-2" />
                <div dangerouslySetInnerHTML={{ __html: content }} /></>
            )}
            {editMode && (
              <button className="btn btn-primary mt-3 customBtn" onClick={saveBlog}>
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default SingleComponent;
