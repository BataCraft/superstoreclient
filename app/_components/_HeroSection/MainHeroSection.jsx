"use client"; // Add this directive to explicitly make this a client component

import React from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import { motion } from "framer-motion";

const img = [
  {
    image_name: "Innovative Solutions",
    src: "/image1.png",
    description: "Transforming ideas into digital reality"
  },
  {
    image_name: "Creative Design",
    src: "/image2.png",
    description: "Crafting experiences that inspire"
  },
  {
    image_name: "Technical Excellence",
    src: "/image3.png",
    description: "Pushing the boundaries of technology"
  }
];

const MainHeroSection = () => {
  return (
    <main className="relative mt-8 flex flex-col">
      <div className="flex-1 container mx-auto px-4 sm:px-0 pb-12 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl"
        >
          <Carousel 
            showThumbs={false} 
            autoPlay 
            infiniteLoop 
            showStatus={false}
            className="shadow-2xl rounded-2xl overflow-hidden"
          >
            {img.map((item, index) => (
              <div 
                key={index} 
                className="relative group"
              >
                <Image 
                  src={item.src} 
                  width={1200} 
                  height={400} 
                  alt={item.image_name}
                  className="w-full h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center text-white p-6">
                    <h2 className="text-3xl font-bold mb-2">{item.image_name}</h2>
                    <p className="text-xl">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </motion.div>
      </div>
    </main>
  );
};

export default MainHeroSection;