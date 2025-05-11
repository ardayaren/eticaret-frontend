// Girisyap.jsx
import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

function Girisyap() {
  const [formData, setFormData] = useState({
    email: "",
    sifre: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser(formData);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/urunler");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h2>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Şifre</label>
          <input
            type="password"
            name="sifre"
            value={formData.sifre}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </button>
      </form>

      <p className="mt-4 text-center">
        Hesabınız yok mu?{" "}
        <a href="/kaydol" className="text-blue-600 hover:underline">
          Kaydolun
        </a>
      </p>
    </div>
  );
}

export default Girisyap;
