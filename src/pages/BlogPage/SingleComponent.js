import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const SingleComponent = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blogs/${slug}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, [slug]);

  return (
    <div className="container p-4">
      <div className="card container"  >
        <div className="card-body">
          <h2 className="card-title">{blog.title}</h2>
          <h4 className="card-subtitle mb-2 text-muted">{blog.author}</h4>
          <p className="card-text">
            {blog.content}
          </p>

        </div>
      </div>
    </div>
  );
};

export default SingleComponent;
