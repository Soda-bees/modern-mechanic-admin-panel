// // src/app/layout.tsx
// import Header from '@/component/Header';
// import './globals.css';
// import Link from 'next/link';

// export const metadata = {
//   title: 'OBD-Admin',
//   description: 'Admin Dashboard',
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="min-h-screen">
//         {/* <header className="bg-gray-100 dark:bg-gray-800 shadow-md p-6 flex justify-between items-center">
//           <Link href="/" className="text-2xl font-bold">Admin</Link>
//           <nav className="space-x-6">
//             <Link href="/scanResults" className="hover:text-blue-500">scanResults</Link>
//             <Link href="/usersManagement" className="hover:text-blue-500">usersManagement</Link>
//             <Link href="/support" className="hover:text-blue-500">Support</Link>
//           </nav>
//         </header> */}
//         <Header />
//         <main className="min-h-[calc(100vh-100px)]">{children}</main>
//       </body>
//     </html>
//   );
// }


// src/app/layout.tsx
import Header from '@/component/Header';
import './globals.css';
import Link from 'next/link';
import { SearchProvider } from '@/context/SearchContext';
import Navbar from '@/component/Navbar';

export const metadata = {
  title: 'OBD-Admin',
  description: 'Admin Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center ">
        <SearchProvider>
          <Header />
          <Navbar />
          {children}
        </SearchProvider>
        {/* <main className="min-h-[calc(100vh-100px)]">{children}</main> */}
      </body>
    </html>
  );
}

