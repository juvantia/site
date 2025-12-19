import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import LandMap from './pages/LandMap';
import RobulusRegister from './pages/RobulusRegister';
import Shelter from './pages/Shelter';
import ShelterRegister from './pages/ShelterRegister';
import SmartContract from './pages/SmartContract';
import AdminMap from './pages/AdminMap';
import AdminMemorandums from './pages/AdminMemorandums';
import AdminTechStack from './pages/AdminTechStack';
import Tech from './pages/Tech';
import FAQ from './pages/FAQ';
import Legal from './pages/Legal';


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/land" element={<LandMap />} />
          <Route path="/robulus" element={<RobulusRegister />} />
          <Route path="/shelter" element={<Shelter />} />
          <Route path="/shelter/register" element={<ShelterRegister />} />
          <Route path="/smart-contract" element={<SmartContract />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/admin/map" element={<AdminMap />} />
          <Route path="/admin/memorandums" element={<AdminMemorandums />} />
          <Route path="/admin/tech" element={<AdminTechStack />} />
          <Route path="/legal" element={<Legal />} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
