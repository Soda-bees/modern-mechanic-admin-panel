'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import images from '@/services/images';
import SimpleButton from '@/component/simpleButton';

const LoginPage = () => {
  const router = useRouter();
  const { login, token, loading } = useAuth();
  const [stage, setStage] = useState<'expand' | 'shrink' | 'done' | 'rightHalf'>('expand');
  const [showImage, setShowImage] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loader, setLoader] = useState<boolean>(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // tailwind md = 768px
    };

    checkScreenSize(); // initial check
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowImage(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && token) {
      router.replace('/');
    }
  }, [token, loading, router]);

  useEffect(() => {
    const expandTimer = setTimeout(() => setStage('shrink'), 1000);
    const shrinkTimer = setTimeout(() => setStage('done'), 2000);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(shrinkTimer);
    };
  }, []);

  if (loading || token) return null;

  const handleSetAuthToken = () => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
      login('authToken');
    }, 1500);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex">
      {isSmallScreen ?
        <AnimatePresence>
          {showImage && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 z-10"
            >
              <img
                src={images.loginBG}
                alt="login"
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
        :
        <motion.div
          initial={{ width: '0%', left: 0 }}
          animate={
            stage === 'expand'
              ? { width: '100%', left: 0 }
              : stage === 'shrink'
                ? { width: '50%', left: '50%' } // shrink to right side
                : { width: '50%', left: '50%' }
          }
          transition={{ duration: 2, ease: 'backOut' }}
          className="absolute top-0 h-full z-10 p-1"
        >
          <img
            src={images.loginBG}
            alt="login"
            className="w-full h-full object-cover rounded-md"
          />
        </motion.div>}

      {isSmallScreen ? (
        !showImage && (
          <motion.div
            initial={{ opacity: 0, y: 300 }}  // Starts off-screen to the left
            animate={{ opacity: 1, y: 0 }}     // Slides to its original position (right side)
            transition={{ duration: 0.8, delay: 0.5 }}
            className='flex flex-col w-full '>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{
                duration: 0.6,
                delay: 1, // Calculate delay dynamically
                ease: "easeOut",
              }}
              className='pt-3 ml-3'>
              <img src={images.logo} className='w-12 sm:w-18 h-12 sm:h-18 mb-2 sm:mb-0' />
            </motion.div>
            <div className='w-full px-4 mx-auto my-auto mx-auto sm:w-[80%] md:w-[60%]'>
              <div className='text-3xl text-center'>
                👋
              </div>
              <div className='text-3xl font-bold text-black text-center'>Welcome back</div>
              <div className='text-xl font-medium text-black text-center'>Drive smarter. Diagnose faster.</div>
              <div className='mt-8 text-lg font-medium text-black'>Log In to Your Account</div>
              <input className='focus:outline-none w-full p-3 bg-headerBG rounded-lg my-2' placeholder='Email' type='text' onChange={(e) => setEmail((e.target as HTMLInputElement).value)} value={email} />
              <input className='focus:outline-none w-full p-3 bg-headerBG rounded-lg mt-2 mb-6' placeholder='Pasword' type='password' onChange={(e) => setPassword((e.target as HTMLInputElement).value)} value={password} />
              <SimpleButton title='Login' onClick={handleSetAuthToken} loader={loader} />
            </div>
          </motion.div>
        )
      ) : (
        stage === 'done' && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}  // Starts off-screen to the left
            animate={{ opacity: 1, x: 0 }}     // Slides to its original position (right side)
            transition={{ duration: 0.8 }}
            className="absolute left-0 w-[50%] h-full flex flex-col ">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{
                duration: 0.6,
                delay: 1, // Calculate delay dynamically
                ease: "easeOut",
              }}
              className='pt-3 ml-3'>
              <img src={images.logo} className='w-12 sm:w-18 h-12 sm:h-18 mb-2 sm:mb-0' />
            </motion.div>
            <div className='w-[90%] xl:w-[70%] 2xl:w-[50%] self-center my-auto'>
              <div className='text-3xl text-center'>
                👋
              </div>
              <div className='text-3xl font-bold text-black text-center'>Welcome back</div>
              <div className='text-xl font-medium text-black text-center'>Drive smarter. Diagnose faster.</div>
              <div className='mt-8 text-lg font-medium text-black'>Log In to Your Account</div>
              <input className='focus:outline-none w-full p-3 bg-headerBG rounded-lg my-2' placeholder='Email' type='text' onChange={(e) => setEmail((e.target as HTMLInputElement).value)} value={email} />
              <input className='focus:outline-none w-full p-3 bg-headerBG rounded-lg mt-2 mb-6' placeholder='Pasword' type='password' onChange={(e) => setPassword((e.target as HTMLInputElement).value)} value={password} />
              <SimpleButton title='Login' onClick={handleSetAuthToken} loader={loader} />
            </div>
          </motion.div>
        )
      )}
    </div>
  );
};

export default LoginPage;


