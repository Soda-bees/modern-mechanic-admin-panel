import './globals.css';
import { SearchProvider } from '@/context/SearchContext';
import AuthLayout from '@/component/AuthLayout';
import { AuthProvider } from '@/context/AuthContext';
import StoreProvider from './StoreProvider';

export const metadata = {
  title: 'OBD-Admin',
  description: 'Admin Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <StoreProvider>
          <AuthProvider>
            <SearchProvider>
              <AuthLayout />
              <div className=''>
                {children}
              </div>
            </SearchProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

