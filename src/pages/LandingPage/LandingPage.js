import React from "react";
import "./LandingPage.css";
import Searching from "../../components/common/Searching/Searching";
import Navbar from "../../components/common/navbar/navbar";


export default function LandingPage() {
  return (
    <div>
      <Navbar/>
      <main className="p-2">
        <div className="container ">
          <Searching />
        </div>
      </main>
    </div>
  );
}
