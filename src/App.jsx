import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import InsightsPage from './pages/InsightsPage';

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Initialize sidebar state based on screen size and listen for changes
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Keep sidebar closed on mobile, open on desktop
      setSidebarOpen(!mobile);
    };

    window.addEventListener('resize', handleResize);
    // Set initial state
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Fixed on left */}
      <Sidebar isOpen={sidebarOpen} onNavigate={closeSidebar} />

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area with dynamic left margin */}
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen && !isMobile ? 'md:ml-64' : 'ml-0'}`}>
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto pt-24">
          <div className="px-8 py-8 w-full">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/insights" element={<InsightsPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <FinanceProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </FinanceProvider>
  );
}

export default App;
