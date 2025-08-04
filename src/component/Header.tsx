'use client';

import React, { useActionState } from 'react';
import Link from 'next/link';
import images from '@/services/images';
import { BellIcon, MagnifyingGlassIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline';
import { useSearch } from '@/context/SearchContext';
import { motion } from 'framer-motion';
import { useAppDispatch } from '@/lib/hooks';
import { logout } from '@/app/actions/auth';
import { usePathname } from 'next/navigation';

const Header = () => {
    const [state, action, pending] = useActionState(logout, undefined);

    const dispatch = useAppDispatch()
    const { search, setSearch } = useSearch();
    const pathname = usePathname();

    if (pathname === '/login') {
        return null;
    }

    return (
        <header className="bg-headerBG flex flex-col sm:flex-row justify-between items-center px-4 py-4 sm:px-8 w-full">
            <div className='flex flex-row items-center justify-between w-full sm:w-auto'>
                <Link href="/" className="">
                    <img src={images.logo} className='w-12 sm:w-18 h-12 sm:h-18 mb-2 sm:mb-0' />
                </Link>
                <div className='flex flex-row items-center sm:hidden'>
                    <BellIcon className="w-6 h-6 text-gray-600 mr-2 cursor-pointer" />
                    <h4 className='font-bold text-black'>John Doe</h4>
                    <form action={action}>
                        <motion.button
                            type='submit'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            className='flex flex-row items-center justify-center cursor-pointer bg-orange px-2 py-1 rounded-lg ml-6'>
                            <ArrowLeftEndOnRectangleIcon className="w-6 h-6 text-white cursor-pointer md:mr-2" />
                            <span className='text-white hidden md:flex'>
                                {pending ? 'Logging out...' : 'Logout'}
                            </span>
                        </motion.button>
                    </form>
                </div>
            </div>
            <div className='w-[80%] md:w-[85%] lg:w-[65%] xl:w-[55%] sm:flex flex-row items-center justify-between hidden '>
                <div className='flex flex-row items-center w-[60%] rounded-lg bg-white p-2 shadow-xs '>
                    <MagnifyingGlassIcon className='w-5 h-5 mr-1 text-grey' />
                    <input
                        className='focus:outline-none text-grey p-1 font-medium w-full'
                        placeholder='Search...' onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className='flex flex-row items-center'>
                    <BellIcon className="w-6 h-6 text-gray-600 mr-4 cursor-pointer" />
                    <h4 className='font-bold mr-6 text-black'>John Doe</h4>
                    <form action={action}>
                        <motion.button
                            type='submit'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            className='flex flex-row items-center justify-center cursor-pointer bg-orange px-2 py-1 rounded-lg'>
                            <ArrowLeftEndOnRectangleIcon className="w-6 h-6 text-white cursor-pointer md:mr-2" />
                            <span className='text-white hidden md:flex'>
                                {pending ? 'Logging out...' : 'Logout'}
                            </span>
                        </motion.button>
                    </form>
                </div>

            </div>
            <div className='flex flex-row items-center w-full rounded-lg bg-white p-2 shadow-xs sm:hidden'>
                <MagnifyingGlassIcon className='w-5 h-5 mr-1 text-grey' />
                <input
                    className='focus:outline-none text-grey p-1 font-medium w-full'
                    placeholder='Search...' onChange={(e) => setSearch(e.target.value)} />
            </div>
        </header>
    );
};

export default Header;



