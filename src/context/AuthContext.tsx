// 'use client';

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// type AuthContextType = {
//   token: string | null;
//   loading: boolean;
//   login: (token: string) => void;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [token, setTokenState] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   const login = (newToken: string) => {
//     sessionStorage.setItem('token', newToken);
//     setTokenState(newToken);
//     router.push('/');
//   };

//   const logout = () => {
//     sessionStorage.removeItem('token');
//     setTokenState(null);
//     router.push('/login');
//   };

//   useEffect(() => {
//     const storedToken = sessionStorage.getItem('token');
//     if (storedToken) {
//       setTokenState(storedToken);
//     }
//     setLoading(false); // ✅ Done checking
//   }, []);

//   return (
//     <AuthContext.Provider value={{ token, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within an AuthProvider');
//   return context;
// };


'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  token: string | null;
  loading: boolean;
  loginAuthContext: (token: string) => void;
  logoutAuthContext: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch('/api/auth/token', { credentials: 'include' });
        const data = await res.json();
        setToken(data.token);
      } catch (error) {
        console.error('Error fetching token', error);
      } finally {
        setLoading(false);
      }
    };
    fetchToken();
  }, []);

  const loginAuthContext = (newToken: string) => {
    setToken(newToken);
    router.push('/');
  };

  const logoutAuthContext = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, loading, logoutAuthContext, loginAuthContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
