'use client';

import { useAuth } from '@/context/AuthContext';
import Header from './Header';
import Navbar from './Navbar';

export default function AuthLayout() {
  const { token } = useAuth();

  if (!token) return null;

  return (
    <>
      <Header />
      <Navbar />
    </>
  );
}
