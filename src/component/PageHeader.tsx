'use client';

import { ReactNode } from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import HoverAnimation from './hoverAnimation';

const PageHeader = ({ title, showFilter = false, onFilterClick }: PageHeaderProps) => {
    return (
        <div className="flex items-center justify-between py-1 border-b border-grey w-full">
            <h1 className="text-xl font-semibold">{title}</h1>
            {showFilter && (
                <HoverAnimation onClick={onFilterClick}>
                    <AdjustmentsHorizontalIcon className='w-8 cursor-pointer' />
                </HoverAnimation>
            )}
        </div>
    );
};

export default PageHeader;
