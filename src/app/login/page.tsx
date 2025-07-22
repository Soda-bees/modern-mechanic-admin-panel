'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const LoginPage = () => {
    const router = useRouter();
    const { login, token, loading } = useAuth();

    useEffect(() => {
        if (!loading && token) {
            router.replace('/');
        }
    }, [token, loading, router]);

    if (loading || token) return;

    const handleSetAuthToken = () => {
        const token = 'authToken';
        login(token);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-[100vh]">
            Login Form Here
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSetAuthToken}
                className="relative bg-orange text-white px-6 py-3 rounded-lg shadow-md font-semibold overflow-hidden w-[150px] mt-4 cursor-pointer"
            >
                Login
            </motion.button>
        </div>
    );
};

export default LoginPage;
