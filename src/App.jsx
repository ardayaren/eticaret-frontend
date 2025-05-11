import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GirisYap from "./pages/Girisyap";
import Kaydol from "./pages/Kaydol";
import Urunler from "./pages/Urunler";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
              E-Ticaret
            </Link>
            <div className="space-x-4">
              <Link to="/giris" className="hover:underline">
                Giriş Yap
              </Link>
              <Link to="/kaydol" className="hover:underline">
                Kaydol
              </Link>
              <Link to="/urunler" className="hover:underline">
                Ürünler
              </Link>
            </div>
          </div>
        </nav>

        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/giris" element={<GirisYap />} />
            <Route path="/kaydol" element={<Kaydol />} />
            <Route path="/urunler" element={<Urunler />} />
            <Route path="/" element={<Urunler />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
