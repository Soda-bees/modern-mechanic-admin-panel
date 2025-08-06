'use client';

import React from 'react';
import images from '@/services/images';
import Button from './Button';

const Navbar = ({token}:{token:string | null | undefined}) => {

    if (!token) {
        return null; 
    }

    return (
        <div className="w-full overflow-x-auto scrollbar-hide custom1100:overflow-x-visible custom1100:w-[96%] max-w-[1100px] custom1100:pl-6 sticky top-0">
            <div className="flex flex-row items-center custom1100:justify-evenly bg-headerBG mt-4 w-max min-w-full p-4 rounded-2xl shadow-sm whitespace-nowrap ">
                <Button title="Overview" activeIcon={images.overViewActive} inactiveIcon={images.overViewInActive} href="/" currentPath={['/']} />
                <Button title="Users Management" activeIcon={images.userActive} inactiveIcon={images.userInActive} href="/usersmanagement" currentPath={['/usersmanagement']} />
                <Button title="Scan Results" activeIcon={images.scnaActive} inactiveIcon={images.scanInActive} href="/scanresults" currentPath={['/scanresults']} />
                <Button title="Complaints" activeIcon={images.complainsActive} inactiveIcon={images.complainsInActive} href="/complaints" currentPath={['/complaints']} />
                <Button title="Workshops" activeIcon={images.workshopsActive} inactiveIcon={images.workshopsInActive} href="/workshops" currentPath={['/workshops']} />
                <Button title="Queries" activeIcon={images.supportActive} inactiveIcon={images.supportInActive} href="/queries" currentPath={['/queries']} />
            </div>
        </div>
    );
};

export default Navbar;


