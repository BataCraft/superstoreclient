import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownClock = () => {
  const [timeRemaining, setTimeRemaining] = useState(2 * 60 * 60); // 2 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: Number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: secondsLeft.toString().padStart(2, '0'),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeRemaining);

  const timeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  const resetTimer = () => {
    setTimeRemaining(2 * 60 * 60);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <div className="flex gap-4 text-white">
        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className="flex gap-2">
            {hours.split('').map((digit, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-4 rounded-lg text-4xl font-mono"
                variants={timeVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3 }}
              >
                {digit}
              </motion.div>
            ))}
          </div>
          <span className="text-sm mt-2 text-gray-400">HOURS</span>
        </div>

        {/* Colon Separator */}
        <div className="text-4xl self-center">:</div>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className="flex gap-2">
            {minutes.split('').map((digit, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-4 rounded-lg text-4xl font-mono"
                variants={timeVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3 }}
              >
                {digit}
              </motion.div>
            ))}
          </div>
          <span className="text-sm mt-2 text-gray-400">MINUTES</span>
        </div>

        {/* Colon Separator */}
        <div className="text-4xl self-center">:</div>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <div className="flex gap-2">
            {seconds.split('').map((digit, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-4 rounded-lg text-4xl font-mono"
                variants={timeVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3 }}
              >
                {digit}
              </motion.div>
            ))}
          </div>
          <span className="text-sm mt-2 text-gray-400">SECONDS</span>
        </div>
      </div>

      <button
        onClick={resetTimer}
        className="mt-8 px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-white"
      >
        Reset Timer
      </button>
    </div>
  );
};

export default CountdownClock;