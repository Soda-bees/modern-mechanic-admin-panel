'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

const HoverAnimation = ({ children, onClick }: HoverAnimationProps) => {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{
                rotate: [0, -12, 12, -7, 7, 0],
                transition: { duration: 0.4 },
            }}
            whileTap={{ scale: 0.9 }}
        >
            {children}
        </motion.button>
    );
};

export default HoverAnimation;
