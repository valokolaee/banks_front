// src/App.tsx
import Layout from "./components/layout/Layout";
import Skeleton from "./pages/monitoring/components/Skeleton/Skeleton";

// Pages
import Router from "./Router/Router";

function App() {
 
//   return (
//    <Skeleton/>
//  )
 
  return (
    <Layout >
      <Router />
 
    </Layout>
  );
}

export default App;