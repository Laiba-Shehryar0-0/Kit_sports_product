import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { hasPickedDesign } from './customize/kitShapes';
import AuthModal  from './components/AuthModal/AuthModal';
import Navbar     from './components/Navbar/Navbar';
import Footer     from './components/Footer/Footer';
import Home       from './pages/Home';
import Kits       from './pages/Kits';
import Customize  from './pages/Customize';
import Checkout   from './pages/Checkout';
import About      from './pages/About';
import Contact    from './pages/Contact';

// Lazy-loaded: both pull in fabric.js (~300KB), so it should only download when
// someone actually opens one of these, not on every page visit.
const DrawStudio = lazy(() => import('./pages/DrawStudio'));
const KitEditor  = lazy(() => import('./pages/KitEditor'));

/** Guards /checkout: requires a signed-in user who has already picked/saved a design. */
function CheckoutGuard() {
  const { user, openSignIn } = useAuth();

  useEffect(() => {
    if (!user) openSignIn();
  }, [user, openSignIn]);

  if (!user) return <Navigate to="/" replace />;
  if (!hasPickedDesign()) return <Navigate to="/customize" replace />;
  return <Checkout />;
}

const IMMERSIVE_ROUTES = ['/customize', '/checkout', '/draw-studio', '/kit-editor'];

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
          <Route path="/draw-studio" element={
            <Suspense fallback={<PageLoading />}>
              <DrawStudio />
            </Suspense>
          } />
          <Route path="/kit-editor" element={
            <Suspense fallback={<PageLoading />}>
              <KitEditor />
            </Suspense>
          } />
          <Route path="/checkout"  element={<CheckoutGuard />} />
          <Route path="/about"     element={<About />} />
          <Route path="/contact"   element={<Contact />} />
          <Route path="*"          element={<NotFound />} />
        </Routes>
        <AppFooter />
      </AuthProvider>
    </BrowserRouter>
  );
}

function PageLoading() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '72px',
      background: 'var(--color-bg-800)',
      color: 'var(--color-light-500)',
      fontSize: '13px',
      letterSpacing: '0.5px',
    }}>
      Loading…
    </div>
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
      background: 'var(--color-bg-800)',
      color: 'var(--color-light-100)',
      textAlign: 'center',
    }}>
      <span style={{ fontSize: '4rem' }}>🏆</span>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', letterSpacing: '4px' }}>404</h1>
      <p style={{ color: 'var(--color-light-500)' }}>Page not found.</p>
      <a href="/" style={{ color: 'var(--color-gold)' }}>← Back to Home</a>
    </div>
  );
}
