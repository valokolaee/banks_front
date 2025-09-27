// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

// Pages
import Home from "./pages/Home";
import Pools from "./pages/Pools/Pools";
import Banks from "./pages/Banks";
import Wallet from "./pages/Wallet";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { setUser } from "./redux/actions";
import RealtimeChart from "./pages/monitoring/components/realTime/RealtimeChart";
import Monitoring from "./pages/monitoring/Monitoring";
import Router from "./Router/Router";

function App() {
  return (
    <Layout >
      <Router />
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pools" element={<Pools />} />
        <Route path="/banks" element={<Banks />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chart" element={<Monitoring />} />
      </Routes> */}
    </Layout>
  );
}

export default App;