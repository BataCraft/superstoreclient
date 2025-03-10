import React from 'react';
import { motion } from "framer-motion";

const LoadingPage = () => {
  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const loadingCircleVariants = {
    start: {
      y: '0%',
    },
    end: {
      y: '100%',
    },
  };

  const loadingCircleTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut',
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Ensure motion.div works by first testing with a regular div */}
      {motion ? (
        <motion.div
          className="flex flex-row items-center"
          variants={loadingContainerVariants}
          initial="start"
          animate="end"
        >
          <motion.span
            className="block w-5 h-5 m-1 bg-primaryColor rounded-full"
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          />
          <motion.span
            className="block w-5 h-5 m-1 bg-primaryColor rounded-full"
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          />
          <motion.span
            className="block w-5 h-5 m-1 bg-primaryColor rounded-full"
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          />
        </motion.div>
      ) : (
        <div className="flex flex-row items-center">
          <span className="block w-5 h-5 m-1 bg-primaryColor rounded-full" />
          <span className="block w-5 h-5 m-1 bg-primaryColor rounded-full" />
          <span className="block w-5 h-5 m-1 bg-primaryColor rounded-full" />
        </div>
      )}
    </div>
  );
};

export default LoadingPage;