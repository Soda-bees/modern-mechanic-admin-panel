'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import images from '@/services/images';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearch } from '@/context/SearchContext';

const Header = () => {
    const pathname = usePathname();
    const { search, setSearch } = useSearch();

    return (
        <header className="bg-headerBG flex flex-col sm:flex-row justify-between items-center px-4 py-4 sm:px-8 w-full">
            <div className='flex flex-row items-center justify-between w-full sm:w-auto'>
                <Link href="/" className="">
                    <img src={images.logo} className='w-12 sm:w-18 h-12 sm:h-18 mb-2 sm:mb-0' />
                </Link>
                <div className='flex flex-row items-center sm:hidden'>
                    <BellIcon className="w-6 h-6 text-gray-600 mr-2 cursor-pointer" />
                    <h4 className='font-bold'>John Doe</h4>
                </div>
            </div>
            <div className='w-[80%] md:w-[65%] lg:w-[60%] xl:w-[50%] sm:flex flex-row items-center justify-between hidden'>
                <div className='flex flex-row items-center w-[75%] rounded-lg bg-white p-2 shadow-xs '>
                    <MagnifyingGlassIcon className='w-5 h-5 mr-1 text-grey' />
                    <input
                        className='focus:outline-none text-grey p-1 font-medium w-full'
                        placeholder='Search...' onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className='flex flex-row items-center'>
                    <BellIcon className="w-6 h-6 text-gray-600 mr-4 cursor-pointer" />
                    <h4 className='font-bold'>John Doe</h4>
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



