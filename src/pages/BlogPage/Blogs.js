import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/common/navbar/navbar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";

function Blogs() {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const isAdmin = user && user.data && user.data.isAdmin;
  const [blogs, setBlogs] = useState([]);

  const fecthData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    fecthData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container"  style={{ paddingTop: "5rem" }}>
        <div className="h1 mb-3 fw-bold">Blogs</div>

        {isAdmin && (
            <button type="" className="btn btn-primary w-100 mb-4" onClick={()=>navigate("/create")}>
              Create blog
            </button>
        )}

        {blogs.map((blog, index) => (
          <div class="card mb-3">
            <button onClick={()=>navigate(`/blogs/${blog.slug}`)}>
              <div class="h5 fw-bold card-header">
              {blog.title}
              </div>
            </button>
            <div class="card-body">
              <blockquote class=" ">
                <p>{<div dangerouslySetInnerHTML={{ __html: (blog.content.substring(0, 200)) }} />}. . .<a onClick={()=>navigate(`/blogs/${blog.slug}`)}> more</a>
                </p>
                <footer class="blockquote-footer">Author : <cite title="Source Title">{blog.author} &nbsp;</cite>Public : {new Date(blog.updatedAt).toLocaleString()}</footer>
              </blockquote>
            </div>
          </div>
        ))}


      </div>
    </div>
  );
}

export default Blogs;
