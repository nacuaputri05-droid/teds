import { useState } from 'react';
import { AlertCircle, Search } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResults('');

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const html = await response.text();
      setResults(html);
    } catch (err) {
      setResults(`<div class="error">Terjadi kesalahan: ${(err as Error).message}</div>`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="max-w-2xl">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pencarian</h2>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <AlertCircle className="text-orange-600 flex-shrink-0" size={20} />
              <div className="text-sm text-orange-800">
                <p className="font-semibold mb-1">Kerentanan XSS (Reflected)</p>
                <p>
                  Halaman ini menampilkan query pencarian tanpa melakukan encoding atau sanitasi HTML.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari sesuatu..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
              >
                <Search size={18} />
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-600 mb-3">
              <span className="font-semibold">Coba XSS Injection:</span>
            </p>
            <div className="space-y-2">
              <code className="block text-xs bg-gray-100 p-2 rounded text-gray-800 break-all">
                &lt;script&gt;alert('XSS Attack')&lt;/script&gt;
              </code>
              <code className="block text-xs bg-gray-100 p-2 rounded text-gray-800 break-all">
                &lt;img src=x onerror="alert('XSS')"&gt;
              </code>
              <code className="block text-xs bg-gray-100 p-2 rounded text-gray-800 break-all">
                &lt;svg/onload=alert('XSS')&gt;
              </code>
            </div>
          </div>
        </div>
      </div>

      {results && (
        <div className="max-w-2xl bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hasil</h3>
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: results }}
          />
        </div>
      )}
    </div>
  );
}
