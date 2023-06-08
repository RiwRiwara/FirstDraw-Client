import Navbar from "../../components/common/navbar/navbar";
import { useParams, useNavigate } from "react-router-dom";
import PageTitle from "./pageTitle";

const NoLogin = () => {
    const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingTop: "5rem" }}>
       <h2> Please login</h2>
       <button type="button" class="ml-2 btn btn-primary mb-3" onClick={()=>{navigate("/login")}}>Go to Login</button>
      </div>
    </>

  );
};

export default NoLogin;
