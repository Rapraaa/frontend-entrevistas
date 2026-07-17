import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SetupPage } from './pages/SetupPage';
import { InterviewPage } from './pages/InterviewPage';
import { DashboardPage } from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SetupPage />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
