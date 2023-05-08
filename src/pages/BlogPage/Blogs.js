import axios from "axios";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

function Blogs() {
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
    <div className="container p-4">
      <div className="h1 mb-3">Blogs</div>
      <a className="dropdown-item custom-color o" href="/create">
                    Create Blog
                  </a>

      {blogs.map((blog, index) => (
        <div className="row" key={index} style={{borderBottom: '1px solid silver'}}>
          <div className="col pt-3 pb-2">
            <Link to={`${blog.slug}`}>
            <h3>{blog.title}</h3>
            </Link>
            <p>{blog.content.substring(0,100)}. . .<Link to={`${blog.slug}`}>more</Link></p>
            <p className="text-muted">Author : {blog.author}, Public : {new Date(blog.createdAt).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Blogs;
