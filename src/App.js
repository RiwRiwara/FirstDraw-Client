import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Footer from "./components/common/footer/footer";
import Blogs from "./pages/BlogPage/Blogs";
import FromComponent from "./pages/BlogPage/FromComponent";
import SingleComponent from "./pages/BlogPage/SingleComponent";
import Login from "./pages/AuthPage/Login";
import Register from "./pages/AuthPage/Register";
import MyProfile from "./pages/Profile/MyProfile";
import PrivateRoute from "./utils/PrivateRoutes";
import React, { Fragment } from 'react';

const MyRoute = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route exact path='/' element={<PrivateRoute />}>
            <Route path="/profile" element={<MyProfile />} />
          </Route>
          {/* <Route path="/profile" element={<MyProfile />} /> */}
          <Route path="/regsiter" element={<Register />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/create" element={<FromComponent />} />
          <Route path="/blogs/:slug" element={<SingleComponent />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default MyRoute;