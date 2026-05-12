import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './components/Dashboard';
import AIAssistant from './pages/AIAssistant';
import Insights from './pages/Insights';
import Actions from './pages/Actions';
import Scanner from './pages/Scanner';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Welcome from './pages/Welcome';
import { AppProvider, useAppContext } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';

function AppRoutes() {
  const { hasOnboarded } = useAppContext();

  return (
    <Routes>
      <Route path="/welcome" element={!hasOnboarded ? <Welcome /> : <Navigate to="/" />} />
      <Route path="/" element={hasOnboarded ? <Layout /> : <Navigate to="/welcome" />}>
        <Route index element={<Dashboard />} />
        <Route path="assistant" element={<AIAssistant />} />
        <Route path="insights" element={<Insights />} />
        <Route path="actions" element={<Actions />} />
        <Route path="scanner" element={<Scanner />} />
        <Route path="community" element={<Community />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </LanguageProvider>
  );
}

export default App;
