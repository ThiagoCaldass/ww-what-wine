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
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/wines/search?wineType=${wineType}&sweetness=${sweetness}&priceMin=${priceMin}&priceMax=${priceMax}`;
      console.log('Fetching:', apiUrl);

      const response = await fetch(apiUrl);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500 mb-4">
            🍷 WW - What Wine?
          </h1>
          <p className="text-xl text-gray-300">
            Descubra o vinho perfeito para você
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-slate-800 border border-amber-700 rounded-xl shadow-2xl p-8 mb-12">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Wine Type */}
              <div>
                <label className="block text-sm font-semibold text-amber-300 mb-3">
                  Tipo de Vinho
                </label>
                <select
                  value={wineType}
                  onChange={(e) => setWineType(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-amber-600 text-white rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                >
                  <option value="tinto">Tinto</option>
                  <option value="branco">Branco</option>
                  <option value="rose">Rosé</option>
                  <option value="espumante">Espumante</option>
                </select>
              </div>

              {/* Sweetness */}
              <div>
                <label className="block text-sm font-semibold text-amber-300 mb-3">
                  Nível de Secura: {sweetness}/5
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={sweetness}
                  onChange={(e) => setSweetness(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-amber-300 mb-3">
                  Preço Mínimo: R$ {priceMin}
                </label>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceMin}
                  onChange={(e) => setPriceMin(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Max Price */}
              <div>
                <label className="block text-sm font-semibold text-amber-300 mb-3">
                  Preço Máximo: R$ {priceMax}
                </label>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Food Pairing */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-amber-300 mb-3">
                  Alimento para Acompanhar (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: carne vermelha, queijo, peixe..."
                  value={foodPairing}
                  onChange={(e) => setFoodPairing(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-amber-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 text-lg"
            >
              {loading ? '⏳ Buscando...' : '🔍 Buscar Vinhos'}
            </button>
          </form>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-amber-300 mb-6">
              {results.length} Vinho{results.length !== 1 ? 's' : ''} Encontrado{results.length !== 1 ? 's' : ''}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((wine) => (
                <div
                  key={wine.id}
                  className="bg-slate-800 border border-amber-700 rounded-lg shadow-lg p-6 hover:shadow-2xl hover:border-amber-500 transition duration-300"
                >
                  <h3 className="text-xl font-bold text-amber-300 mb-2">
                    {wine.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">{wine.producer}</p>

                  <div className="space-y-2 text-sm text-gray-300">
                    <p>
                      <span className="text-amber-300 font-semibold">País:</span> {wine.country}
                    </p>
                    <p>
                      <span className="text-amber-300 font-semibold">Preço:</span> R$ {wine.price}
                    </p>
                    {wine.rating && (
                      <p>
                        <span className="text-amber-300 font-semibold">Rating:</span> ⭐ {wine.rating}/5
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && results.length === 0 && (
          <div className="text-center">
            <p className="text-xl text-gray-400">
              👇 Ajuste os filtros e clique em "Buscar Vinhos" para começar!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
