import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import LandMap from './pages/LandMap';
import RobulusRegister from './pages/RobulusRegister';
import Domus from './pages/Domus';
import DomusRegister from './pages/DomusRegister';
import SmartContract from './pages/SmartContract';
import AdminMap from './pages/AdminMap';
import AdminMemorandums from './pages/AdminMemorandums';


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/land" element={<LandMap />} />
          <Route path="/robulus" element={<RobulusRegister />} />
          <Route path="/domus" element={<Domus />} />
          <Route path="/domus/register" element={<DomusRegister />} />
          <Route path="/smart-contract" element={<SmartContract />} />
          <Route path="/admin/map" element={<AdminMap />} />
          <Route path="/admin/memorandums" element={<AdminMemorandums />} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
