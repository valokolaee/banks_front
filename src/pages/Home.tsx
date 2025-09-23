// src/pages/Home.tsx
import React from "react";
import Hero from "../components/ui/Hero";
import Features from "../components/ui/Features";
import apis from "../webService/ApiUrls/apis";
import { setUser } from "../redux/actions";

const Home: React.FC = () => {
  // setUser({id:-1,token:''})
  return (
    <div> {/* without any style*/}
      <>{apis.users.user({userId:1}).folderUrl }</>
      <Hero />
      <Features />
    </div>
  );
};

export default Home;