'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import images from '@/services/services/images';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Header = () => {
    const pathname = usePathname();

    return (
        <header className="bg-red flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="">
                <img src={images.logo} />
            </Link>
            <div>
                <div>
                    <MagnifyingGlassIcon className='w-6 h-6' />
                </div>
                {/* <BellIcon className="w-6 h-6 text-gray-600" /> */}
            </div>
        </header>
    );
};

export default Header;



