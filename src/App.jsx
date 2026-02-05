import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Settings from './pages/Settings.jsx';
import Reports from './pages/Reports.jsx';
import Quiz from './pages/Quiz.jsx'
import Journey from './pages/Journey.jsx';
import ToastProvider from './components/ToastProvider.jsx';
import Collaborate from './pages/Collaborate.jsx';
import Community from './pages/Community.jsx'



function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/reports" element={<Reports />} />

        {/* Journey (coming soon) */}
        <Route path="/journey" element={<Journey />} />

        {/* Quiz (coming soon) */}
        <Route path="/quiz" element={<Quiz />} />

        {/* Collaborate (coming soon) */}
        <Route path="/collaborate" element={<Collaborate />} />

        {/* Community Page (in building) */}
        <Route path='/community' element={<Community />} />
        
      </Routes>
    </ToastProvider>
  );
}

export default App;
