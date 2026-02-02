import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Settings from './pages/Settings.jsx';
import Reports from './pages/Reports.jsx';
import Quiz from './pages/Quiz.jsx'
import Journey from './pages/Journey.jsx';
import TokenGuard from './components/TokenGuard.jsx';
import ToastProvider from './components/ToastProvider.jsx';



function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />

        {/* Reports with optional token support (query param or path param) */}
        <Route path="/reports" element={<TokenGuard resource="reports"><Reports /></TokenGuard>} />
        <Route path="/reports/:id" element={<TokenGuard resource="reports"><Reports /></TokenGuard>} />

        {/* Journey (coming soon) with optional id support */}
        <Route path="/journey" element={<TokenGuard resource="journey"><Journey /></TokenGuard>} />
        <Route path="/journey/:id" element={<TokenGuard resource="journey"><Journey /></TokenGuard>} />

        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </ToastProvider>
  );
}

export default App;
