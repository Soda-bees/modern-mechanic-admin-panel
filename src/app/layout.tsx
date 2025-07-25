import './globals.css';
import { SearchProvider } from '@/context/SearchContext';
import AuthLayout from '@/component/AuthLayout';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'OBD-Admin',
  description: 'Admin Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col ">
        <AuthProvider>
          <SearchProvider>
            <AuthLayout />
            {/* <div className='px-6 w-full mt-4'> */}
            <div >
              {children}
            </div>
          </SearchProvider>
        </AuthProvider>
        {/* <main className="min-h-[calc(100vh-100px)]">{children}</main> */}
      </body>
    </html>
  );
}

