import { useState, useEffect } from "react";

function Urunler() {
  const [urunler, setUrunler] = useState([]);
  const [sepet, setSepet] = useState([]);

  useEffect(() => {
    // Burada normalde API'den ürünler çekilir
    const fakeUrunler = [
      {
        id: 1,
        ad: "Laptop",
        fiyat: 12000,
        aciklama: "Yüksek performanslı laptop",
      },
      { id: 2, ad: "Telefon", fiyat: 8000, aciklama: "Akıllı telefon" },
      { id: 3, ad: "Tablet", fiyat: 5000, aciklama: "10 inç tablet" },
      { id: 4, ad: "Kulaklık", fiyat: 500, aciklama: "Kablosuz kulaklık" },
    ];
    setUrunler(fakeUrunler);
  }, []);

  const sepeteEkle = (urun) => {
    setSepet([...sepet, urun]);
    alert(`${urun.ad} sepete eklendi!`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Ürünler</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {urunler.map((urun) => (
          <div key={urun.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{urun.ad}</h2>
            <p className="text-gray-600 mb-2">{urun.aciklama}</p>
            <p className="text-blue-600 font-bold mb-4">{urun.fiyat} TL</p>
            <button
              onClick={() => sepeteEkle(urun)}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Sepete Ekle
            </button>
          </div>
        ))}
      </div>

      {sepet.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Sepetiniz ({sepet.length} ürün)
          </h2>
          <ul className="space-y-2">
            {sepet.map((urun, index) => (
              <li key={index} className="flex justify-between">
                <span>{urun.ad}</span>
                <span>{urun.fiyat} TL</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t">
            <p className="font-bold">
              Toplam: {sepet.reduce((total, urun) => total + urun.fiyat, 0)} TL
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Urunler;
