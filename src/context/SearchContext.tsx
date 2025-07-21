'use client';
import { SearchStateType } from '@/types/search';
import React, { createContext, useContext, useState, ReactNode } from 'react';

const SearchContext = createContext<SearchStateType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [search, setSearch] = useState('');

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
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
