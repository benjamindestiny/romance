import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Settings from './pages/Settings.jsx';
import Reports from './pages/Reports.jsx';
import Quiz from './pages/Quiz.jsx'
import ToastProvider from './components/ToastProvider.jsx';


function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </ToastProvider>
  );
}

export default App;
