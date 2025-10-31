import { AlertCircle, Lock, Search } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: 'login' | 'search') => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">Security Lab</h2>
        <p className="text-lg text-gray-600">
          Aplikasi pembelajaran untuk memahami kerentanan keamanan web
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onClick={() => onNavigate('login')}
          className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertCircle className="text-red-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                SQL Injection Demo
              </h3>
              <p className="text-gray-600 mb-4">
                Pelajari bagaimana SQL Injection dapat mengakses data tanpa otorisasi yang benar.
              </p>
              <div className="text-sm font-mono bg-gray-50 p-3 rounded mb-3 text-gray-700">
                Coba: admin@example.com' OR '1'='1
              </div>
              <button
                onClick={() => onNavigate('login')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
              >
                <Lock size={16} />
                Akses Login
              </button>
            </div>
          </div>
        </div>

        <div
          onClick={() => onNavigate('search')}
          className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <AlertCircle className="text-orange-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                XSS (Reflected) Demo
              </h3>
              <p className="text-gray-600 mb-4">
                Pahami bagaimana script berbahaya dapat diinjeksikan melalui URL dan dijalankan di browser.
              </p>
              <div className="text-sm font-mono bg-gray-50 p-3 rounded mb-3 text-gray-700">
                Coba: &lt;script&gt;alert('XSS')&lt;/script&gt;
              </div>
              <button
                onClick={() => onNavigate('search')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
              >
                <Search size={16} />
                Akses Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-3">Informasi Penting</h4>
        <ul className="text-blue-800 space-y-2 text-sm">
          <li>
            • Aplikasi ini dibuat untuk tujuan pembelajaran keamanan sistem di kelas
          </li>
          <li>
            • Kerentanan yang ada adalah DISENGAJA untuk demonstrasi edukatif
          </li>
          <li>
            • JANGAN gunakan teknik ini untuk mengakses sistem orang lain
          </li>
          <li>
            • Pelajari cara melindungi aplikasi dari serangan ini
          </li>
        </ul>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-3">Akun Demo</h4>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-mono bg-white p-1 rounded">admin@example.com</span> /
            <span className="font-mono bg-white p-1 rounded ml-1">password123</span>
          </p>
          <p>
            <span className="font-mono bg-white p-1 rounded">user@example.com</span> /
            <span className="font-mono bg-white p-1 rounded ml-1">secure456</span>
          </p>
        </div>
      </div>
    </div>
  );
}
