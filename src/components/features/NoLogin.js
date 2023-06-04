import Navbar from "../../components/common/navbar/navbar";
import { useParams, useNavigate } from "react-router-dom";

const NoLogin = () => {
    const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <div className="container p-3 d-flex justify-content-center">
       <h2> Please login</h2>
       <button type="button" class="ml-2 btn btn-primary" onClick={()=>{navigate("/login")}}>Go to Login</button>
      </div>
    </>

  );
};

export default NoLogin;
