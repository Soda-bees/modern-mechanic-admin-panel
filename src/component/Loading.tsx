'use client';

import images from '@/services/images';

const Loading = () => {
    return (
        <div className='w-full h-[100vh] flex items-center justify-center bg-black '>
            <div className='relative'>
                <div style={{ backgroundImage: `url(${images.loader})` }}
                    className="bg-cover bg-center h-14 sm:w-18 w-14 sm:h-18 md:w-22 md:h-22 lg:w-28 lg:h-28 xl:w-34 xl:h-34 animate-spin-slow flex items-center justify-center">
                </div>
                <img src={images.loader2} className='w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-15 lg:h-15 xl:w-19 xl:h-19 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
            </div>
        </div>
    );
};

export default Loading;
