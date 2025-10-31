import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import HomePage from './pages/HomePage';
import { LogOut } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'login' | 'search'>('home');
  const [user, setUser] = useState<{ id: number; email: string } | null>(null);

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Security Lab</h1>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-gray-700 hover:text-gray-900 font-medium transition"
            >
              Home
            </button>
            {!user ? (
              <>
                <button
                  onClick={() => setCurrentPage('login')}
                  className="text-gray-700 hover:text-gray-900 font-medium transition"
                >
                  Login
                </button>
                <button
                  onClick={() => setCurrentPage('search')}
                  className="text-gray-700 hover:text-gray-900 font-medium transition"
                >
                  Search
                </button>
              </>
            ) : (
              <>
                <span className="text-sm text-gray-600">
                  Logged in as: <span className="font-medium">{user.email}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 text-gray-700 hover:text-red-600 font-medium transition"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
        {currentPage === 'login' && (
          <LoginPage
            onLoginSuccess={(user) => {
              setUser(user);
              setCurrentPage('home');
            }}
          />
        )}
        {currentPage === 'search' && <SearchPage />}
      </div>
    </div>
  );
}

export default App;
