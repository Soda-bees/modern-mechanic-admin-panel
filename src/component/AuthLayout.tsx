'use client';

import { useAuth } from '@/context/AuthContext';
import Header from './Header';
import Navbar from './Navbar';

export default function AuthLayout() {
  const { token , loading } = useAuth();

  if (!token) return null;
  if(loading) return null
  return (
    <>
      <Header />
      <Navbar />
    </>
  );
}
