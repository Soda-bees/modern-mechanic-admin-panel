'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ButtonPropsType } from '@/types/button';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Button: React.FC<ButtonPropsType> = ({ title, activeIcon, inactiveIcon, currentPath, href }) => {
    const pathname = usePathname();
    // const isActive = pathname === currentPath;
    const isActive = currentPath.some(path => {
        if (path === '/') {
            return pathname === '/'; // Exact match for homepage
        }
        return pathname.startsWith(path);
    });

    return (
        <Link href={href} className={isActive ? 'flex flex-row items-center justify-center bg-lightOrange px-4 py-3 rounded-lg' :
            'flex flex-row items-center justify-center px-4 py-3 rounded-lg'}>
            <AnimatePresence mode="popLayout">
                <motion.div
                    className='w-10'
                    key={isActive ? 'active' : 'inactive'}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                >
                    <img alt={title} src={isActive ? activeIcon : inactiveIcon} className='h-5 object-contain' />
                </motion.div>
            </AnimatePresence>
            <span className={isActive ? 'text-lg  text-orange' : 'text-lg  text-grey'}>{title}</span>
        </Link>
    );
};

export default Button;



