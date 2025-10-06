// src/pages/Home.tsx
import React from "react";
import Features from "../components/ui/Features";
import Hero from "../components/ui/Hero";
 
const Home: React.FC = () => {
  // setUser({id:-1,token:''})
  return (
    <div> {/* without any style*/}
      {/* <>{apis.users.user({userId:1}).folderUrl }</> */}
       <Hero />
      <Features />
    </div>
  );
};

export default Home;