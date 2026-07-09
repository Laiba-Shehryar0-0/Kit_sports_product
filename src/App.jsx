import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import AuthModal  from './components/AuthModal/AuthModal';
import Navbar     from './components/Navbar/Navbar';
import Footer     from './components/Footer/Footer';
import Home       from './pages/Home';
import Kits       from './pages/Kits';
import Customize  from './pages/Customize';
import Checkout   from './pages/Checkout';
import About      from './pages/About';
import Contact    from './pages/Contact';

const IMMERSIVE_ROUTES = ['/customize', '/checkout'];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppFooter() {
  const { pathname } = useLocation();
  if (IMMERSIVE_ROUTES.includes(pathname)) return null;
  return <Footer />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Navbar />
        <AuthModal />
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/kits"      element={<Kits />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/checkout"  element={<Checkout />} />
          <Route path="/about"     element={<About />} />
          <Route path="/contact"   element={<Contact />} />
          <Route path="*"          element={<NotFound />} />
        </Routes>
        <AppFooter />
      </AuthProvider>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '72px',
      gap: '16px',
      background: 'var(--bg-800)',
      color: 'var(--light-100)',
      textAlign: 'center',
    }}>
      <span style={{ fontSize: '4rem' }}>🏆</span>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', letterSpacing: '4px' }}>404</h1>
      <p style={{ color: 'var(--light-500)' }}>Page not found.</p>
      <a href="/" style={{ color: 'var(--gold)' }}>← Back to Home</a>
    </div>
  );
}
