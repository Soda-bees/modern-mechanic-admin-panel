'use client';
import { SearchStateType } from '@/types/search';
import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

const SearchContext = createContext<SearchStateType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [search, setSearch] = useState('');
    const [placeholder, setPlaceholder] = useState('Search...');
    const pathname = usePathname();

    useEffect(() => {
        setSearch('');
      }, [pathname]);

    return (
        <SearchContext.Provider value={{ search, setSearch , placeholder, setPlaceholder}}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};
