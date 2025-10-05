// src/pages/Home.tsx
import React from "react";
import Features from "../components/ui/Features";
import Hero from "../components/ui/Hero";
import CCharts from "../components/ui/CCharts/CCharts";
import Skeleton from "./monitoring/components/Skeleton/Skeleton";
 
const Home: React.FC = () => {
  // setUser({id:-1,token:''})
  return (
    <div>
      <Skeleton />
      
      {/* without any style*/}
      {/* <>{apis.users.user({userId:1}).folderUrl }</> */}
      {/* <CCharts/> */}
      {/* <Hero />
      <Features /> */}
    </div>
  );
};

export default Home;