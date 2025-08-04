import './globals.css';
import { SearchProvider } from '@/context/SearchContext';
import StoreProvider from './StoreProvider';
import Header from '@/component/Header';
import Navbar from '@/component/Navbar';

export const metadata = {
  title: 'OBD-Admin',
  description: 'Admin Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <StoreProvider>
          <SearchProvider>
            <Header />
            <Navbar />
            <div className=''>
              {children}
            </div>
          </SearchProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

