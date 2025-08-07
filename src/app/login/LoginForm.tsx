"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import images from "@/services/images";
import Image from "next/image";
import { customImageLoader } from "@/lib/imageLoader";
import { useAppDispatch } from "@/lib/hooks";
import { fetchAllAdminData } from "@/lib/features/adminData/adminDataSlice";
import { login } from "../actions/auth";

const LoginForm = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [stage, setStage] = useState<
    "expand" | "shrink" | "done" | "rightHalf"
  >("expand");
  const [showImage, setShowImage] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowImage(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const expandTimer = setTimeout(() => setStage("shrink"), 1000);
    const shrinkTimer = setTimeout(() => setStage("done"), 2000);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(shrinkTimer);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await login({ email, password });
      if (result.success) {
        router.push("/");
        dispatch(fetchAllAdminData());
      } else {
        alert("Something went wrong. Please try again!");
      }
    });
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex">
      {isSmallScreen ? (
        <AnimatePresence>
          {showImage && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 z-10"
            >
              <Image
                loader={customImageLoader}
                src={images.loginBG}
                alt={"Car Logo"}
                fill
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <motion.div
          initial={{ width: "0%", left: 0 }}
          animate={
            stage === "expand"
              ? { width: "100%", left: 0 }
              : stage === "shrink"
              ? { width: "50%", left: "50%" } // shrink to right side
              : { width: "50%", left: "50%" }
          }
          transition={{ duration: 2, ease: "backOut" }}
          className="absolute top-0 h-full z-10 p-4"
        >
          <Image
            loader={customImageLoader}
            src={images.loginBG}
            alt={"Car Logo"}
            fill
            className="object-cover p-1 rounded-xl"
          />
        </motion.div>
      )}

      {isSmallScreen
        ? !showImage && (
            <form onSubmit={handleSubmit} className="w-full flex flex-row">
              <motion.div
                initial={{ opacity: 0, y: 300 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col w-full h-full"
              >
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{
                    duration: 0.6,
                    delay: 1,
                    ease: "easeOut",
                  }}
                  className="pt-3 ml-3"
                >
                  <Image
                    loader={customImageLoader}
                    src={images.logo}
                    alt={"Logo"}
                    width={55}
                    height={55}
                    className=""
                  />
                </motion.div>
                <div className="w-full px-4 mx-auto my-auto sm:w-[80%] md:w-[60%]">
                  <div className="text-3xl text-center">👋</div>
                  <div className="text-3xl font-bold text-black text-center">
                    Welcome back
                  </div>
                  <div className="text-xl font-medium text-black text-center">
                    Drive smarter. Diagnose faster.
                  </div>
                  <div className="mt-8 text-lg font-medium text-black">
                    Log In to Your Account
                  </div>
                  <input
                    className="focus:outline-none w-full p-3 bg-headerBG rounded-lg my-2 text-black"
                    placeholder="Email"
                    type="text"
                    onChange={(e) =>
                      setEmail((e.target as HTMLInputElement).value)
                    }
                    value={email}
                  />
                  <input
                    className="focus:outline-none w-full p-3 bg-headerBG rounded-lg mt-2 mb-6 text-black"
                    placeholder="Pasword"
                    type="password"
                    onChange={(e) =>
                      setPassword((e.target as HTMLInputElement).value)
                    }
                    value={password}
                  />
                  {/* <SimpleButton title='Login' onClick={handleAdminLogin} loader={loader} /> */}
                  <button
                    type="submit"
                    disabled={isPending}
                    className="bg-orange text-white px-6 py-3 rounded-lg shadow-md font-semibold cursor-pointer w-full flex items-center justify-center h-14"
                  >
                    {isPending ? (
                      <img
                        src={images.loader}
                        className="w-8 h-8 filter brightness-0 invert animate-spin"
                      />
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </motion.div>
            </form>
          )
        : stage === "done" && (
            <form onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0, x: 300 }} // Starts off-screen to the left
                animate={{ opacity: 1, x: 0 }} // Slides to its original position (right side)
                transition={{ duration: 0.8 }}
                className="absolute left-0 w-[50%] h-full flex flex-col "
              >
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{
                    duration: 0.6,
                    delay: 1, // Calculate delay dynamically
                    ease: "easeOut",
                  }}
                  className="pt-3 ml-3"
                >
                  <Image
                    loader={customImageLoader}
                    src={images.logo}
                    alt={"Logo"}
                    width={75}
                    height={75}
                    className=""
                  />
                </motion.div>
                <div className="w-[90%] xl:w-[70%] 2xl:w-[50%] self-center my-auto">
                  <div className="text-3xl text-center">👋</div>
                  <div className="text-3xl font-bold text-black text-center">
                    Welcome back
                  </div>
                  <div className="text-xl font-medium text-black text-center">
                    Drive smarter. Diagnose faster.
                  </div>
                  <div className="mt-8 text-lg font-medium text-black">
                    Log In to Your Account
                  </div>
                  <input
                    className="focus:outline-none w-full p-3 bg-headerBG rounded-lg my-2 text-black"
                    placeholder="Email"
                    type="text"
                    onChange={(e) =>
                      setEmail((e.target as HTMLInputElement).value)
                    }
                    value={email}
                  />
                  <input
                    className="focus:outline-none w-full p-3 bg-headerBG rounded-lg mt-2 mb-6 text-black"
                    placeholder="Pasword"
                    type="password"
                    onChange={(e) =>
                      setPassword((e.target as HTMLInputElement).value)
                    }
                    value={password}
                  />
                  <button
                    type="submit"
                    disabled={isPending}
                    className="bg-orange text-white px-6 py-3 rounded-lg shadow-md font-semibold cursor-pointer w-full flex items-center justify-center h-14"
                  >
                    {isPending ? (
                      <img
                        src={images.loader}
                        className="w-8 h-8 filter brightness-0 invert animate-spin"
                      />
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </motion.div>
            </form>
          )}
    </div>
  );
};

export default LoginForm;
