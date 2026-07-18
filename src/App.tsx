import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SetupPage } from './pages/SetupPage';
import { InterviewPage } from './pages/InterviewPage';
import { DashboardPage } from './pages/DashboardPage';
import { ResultPage } from './pages/ResultPage';
import { Home } from './pages/Home';
import { Registro } from './pages/Registro';
import { Login } from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/setup" element={<SetupPage />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/resultado" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;