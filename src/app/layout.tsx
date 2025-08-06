import './globals.css';
import { SearchProvider } from '@/context/SearchContext';
import StoreProvider from './StoreProvider';
import Header from '@/component/Header';
import Navbar from '@/component/Navbar';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'OBD-Admin',
  description: 'Admin Dashboard',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const token = (await cookies()).get('session')?.value

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <StoreProvider>
          <SearchProvider>
            <Header token={token} />
            <Navbar token={token} />
            <div className=''>
              {children}
            </div>
          </SearchProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

