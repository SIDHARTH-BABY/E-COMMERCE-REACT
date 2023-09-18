import React from "react";
import Navbar from "../../../components/Common/Navbar/Navbar";
import Banner from "../../../components/Buyer/Header/Banner";
import Cards from "../../../components/Buyer/Cards/Cards";

const HomePage = () => {
  return (
    <div>
      <Navbar />

      <Banner />
      <Cards />
    </div>
  );
};

export default HomePage;
