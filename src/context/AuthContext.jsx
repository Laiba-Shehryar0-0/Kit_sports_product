import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'kws_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [authModal, setAuthModal] = useState({ open: false, tab: 'signin' });

  const openSignIn  = useCallback(() => setAuthModal({ open: true, tab: 'signin' }),  []);
  const openSignUp  = useCallback(() => setAuthModal({ open: true, tab: 'signup' }),  []);
  const closeModal  = useCallback(() => setAuthModal(prev => ({ ...prev, open: false })), []);

  const signIn = useCallback((email, password) => {
    // Lookup from registered users stored in localStorage
    const registered = JSON.parse(localStorage.getItem('kws_users') || '[]');
    const found = registered.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid email or password.');
    const { password: _, ...safe } = found;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
    setUser(safe);
  }, []);

  const signUp = useCallback((name, email, password) => {
    const registered = JSON.parse(localStorage.getItem('kws_users') || '[]');
    if (registered.some(u => u.email === email)) {
      throw new Error('An account with this email already exists.');
    }
    const newUser = { id: Date.now(), name, email, password, avatar: name.charAt(0).toUpperCase() };
    registered.push(newUser);
    localStorage.setItem('kws_users', JSON.stringify(registered));
    const { password: _, ...safe } = newUser;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
    setUser(safe);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, logout, openSignIn, openSignUp, closeModal, authModal }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
