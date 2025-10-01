// src/App.tsx
import { Route, Routes } from "react-router-dom";

// Pages
import RealtimeChart from "../pages/monitoring/components/realTime/RealtimeChart";
import Account from "../pages/Account";
import Banks from "../pages/Banks/Banks";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Pools from "../pages/Pools/Pools";
import Register from "../pages/Register";
import Wallet from "../pages/Wallet";
import Monitoring from "../pages/monitoring/Monitoring";
import Profile from "../pages/Profile/Profile";


export default () =>

  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/pools" element={<Pools />} />
    <Route path="/banks" element={<Banks />} />
    <Route path="/wallet" element={<Wallet />} />
    <Route path="/account" element={<Account />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/monitoring" element={<Monitoring />} />
  </Routes>


