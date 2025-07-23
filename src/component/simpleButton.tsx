'use client';

import images from '@/services/images';
import { motion } from 'framer-motion';

const SimpleButton = ({ title, onClick, loader }: SimpleButtonProps) => {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="bg-orange text-white px-6 py-3 rounded-lg shadow-md font-semibold cursor-pointer w-full flex items-center justify-center h-14"
        >
            {
                loader ?
                <img src={images.loader} className='w-8 h-8 filter brightness-0 invert animate-spin' />
                : title
            }
        </motion.button>
    );
};

export default SimpleButton;
