import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/common/navbar/navbar";
import { useAuthContext } from "../../hooks/useAuthContext";

function Blogs() {
  const { user } = useAuthContext()
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
      <div className="container mt-4">
        <div className="h1 mb-3 fw-bold">Blogs</div>

        { isAdmin && ( 
                 <a className="custom-color" href="/create">
          <button type="" className="btn btn-primary w-100 customBtn">
            Create blog
          </button>
        </a>
        )}


        {blogs.map((blog, index) => (
          <div className="row" key={index} style={{ borderBottom: '1px solid silver' }}>
            <div className="col pt-3 pb-2">
              <a href={`blogs/${blog.slug}`}>
                <h3>{blog.title}</h3>
              </a>

              <p>{<div dangerouslySetInnerHTML={{ __html: (blog.content.substring(0, 200)) }} />}. . .<a href={`blogs/${blog.slug}`}>more</a></p>

              <p className="text-muted">Author : {blog.author}, Public : {new Date(blog.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
