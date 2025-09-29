// src/App.tsx
import Layout from "./components/layout/Layout";

// Pages
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