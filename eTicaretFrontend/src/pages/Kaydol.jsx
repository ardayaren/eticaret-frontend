// Kaydol.jsx
import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

function Kaydol() {
  const [formData, setFormData] = useState({
    ad: "",
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
      const response = await registerUser(formData);
      if (response && response.user) {
        alert("Kayıt başarılı! Giriş yapabilirsiniz.");
        navigate("/giris");
      }
    } catch (err) {
      setError(err.message || "Beklenmeyen bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Kaydol</h2>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Ad Soyad</label>
          <input
            type="text"
            name="ad"
            value={formData.ad}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

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
            minLength="6"
          />
          <p className="text-sm text-gray-500 mt-1">
            Şifre en az 6 karakter olmalıdır
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? "Kayıt Olunuyor..." : "Kaydol"}
        </button>
      </form>

      <p className="mt-4 text-center">
        Zaten hesabınız var mı?{" "}
        <a href="/giris" className="text-blue-600 hover:underline">
          Giriş yapın
        </a>
      </p>
    </div>
  );
}

export default Kaydol;
