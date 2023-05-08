import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Navbar from "./components/common/navbar/navbar";
import Footer from "./components/common/footer/footer";
import Blogs from "./pages/BlogPage/Blogs";

const MyRoute = () => {
  return (
    <div>
        <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blogs" element={<Blogs />} />
          </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
};

export default MyRoute;
