'use client';

import { useState } from 'react';

export default function Home() {
  const [wineType, setWineType] = useState('tinto');
  const [sweetness, setSweetness] = useState(2);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(500);
  const [foodPairing, setFoodPairing] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/wines/search?wineType=${wineType}&sweetness=${sweetness}&priceMin=${priceMin}&priceMax=${priceMax}`
      );

      if (!response.ok) throw new Error('Erro ao buscar vinhos');

      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao buscar vinhos. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">
            🍷 WW - What Wine?
          </h1>
          <p className="text-red-100 text-lg">
            Descubra o vinho perfeito para você
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-2xl p-8 mb-12">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Wine Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tipo de Vinho
                </label>
                <select
                  value={wineType}
                  onChange={(e) => setWineType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="tinto">Tinto</option>
                  <option value="branco">Branco</option>
                  <option value="rose">Rosé</option>
                  <option value="espumante">Espumante</option>
                </select>
              </div>

              {/* Sweetness */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nível de Secura
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={sweetness}
                    onChange={(e) => setSweetness(Number(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-gray-700 w-12">
                    {sweetness}/5
                  </span>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preço Mínimo: R$ {priceMin}
                </label>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceMin}
                  onChange={(e) => setPriceMin(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Max Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preço Máximo: R$ {priceMax}
                </label>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Food Pairing */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Alimento para Acompanhar (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: carne vermelha, queijo, peixe..."
                  value={foodPairing}
                  onChange={(e) => setFoodPairing(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
            >
              {loading ? 'Buscando...' : 'Buscar Vinhos'}
            </button>
          </form>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((wine) => (
              <div
                key={wine.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {wine.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{wine.producer}</p>

                <div className="space-y-2 text-sm">
                  <p>
                    <strong>País:</strong> {wine.country}
                  </p>
                  <p>
                    <strong>Preço:</strong> R$ {wine.price}
                  </p>
                  {wine.rating && (
                    <p>
                      <strong>Rating:</strong> ⭐ {wine.rating}/5
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && results.length === 0 && (
          <div className="text-center text-white">
            <p className="text-lg">
              Nenhum vinho encontrado. Tente ajustar os filtros!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
