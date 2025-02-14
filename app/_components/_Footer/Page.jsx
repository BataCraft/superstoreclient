import React from 'react';
import Link from 'next/link';
import { Headset, LucideFacebook } from 'lucide-react';
import { 
    Facebook, 
    Twitter, 
    Instagram, 
    Linkedin, 
    Youtube
  } from 'lucide-react';

const Footer = () => {
  const buyerCentral = [
    { name: 'Sign in', href: '#' },
    { name: 'Buyer Protection', href: '#' },
    { name: 'Payment Options', href: '#' },
    { name: 'Shipping Policy', href: '#' },
    { name: 'Return Policy', href: '#' }
  ];

  const socialMedia = [
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, href: '#' },
    { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, href: '#' },
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, href: '#' },
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, href: '#' },
    { name: 'YouTube', icon: <Youtube className="w-5 h-5" />, href: '#' }
  ];


  const information = [
    { name: 'About Us', href: '#' },
    { name: 'Band of Trust', href: '#' },
    { name: 'Market History', href: '#' },
    { name: 'News', href: '#' },
    { name: 'Contact us', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Buyer Central Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Buyer Central</h3>
            <ul className="space-y-2">
              {buyerCentral.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Best Rating Product Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Best Rating Product</h3>
            <div className="space-y-4">
              {[1, 2].map((item) => (
                <div key={item} className="space-y-2">
                  <span className="text-sm text-gray-400">Speakers</span>
                  <Link href="#" className="block text-blue-400 hover:text-blue-300">
                    Red Wireless Headphone Solo 2 HD
                  </Link>
                  <div className="flex items-center">
                    <span className="mr-2">£2,300</span>
                    <div className="flex">
                      {[1, 2].map((star) => (
                        <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Information Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              {information.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact info</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-red-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>1789 Street Name, City Name, United States</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="flex flex-col">
                  <span>0092 - 123 455 789</span>
                  <span>+123 958 789</span>
                </div>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-gray-300">Email: support@uxnaqvi.com</span>
                  <span className="text-sm text-gray-400">9AM-5PM, Mon - Sat, GMT+3</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Newsletter */}
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2 rounded-l-md bg-white text-gray-900 focus:outline-none"
              />
              <button className="px-6 py-2 bg-black text-white rounded-r-md  transition-colors">
                Sign Up
              </button>
            </div>

            {/* Support */}
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="text-3xl">
                <Headset className='text-primaryColor ' size={50}/>
               
              </div>
              <div>
                <div className="text-sm">Got questions? Call us 24/7!</div>
                <div className="text-xl text-white">(920) 8001-8188</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center md:justify-end space-x-4">
              {socialMedia.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  {social.icon}
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Copyright and Payment Methods */}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm">
              © uxnaqvi - All rights Reserved
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;