"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HeroNav = () => {
  const pathname = usePathname();

  // Function to check if the link is active
  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-6">
        <Link href="/" className={isActive('/') ? 'text-black border-b-2 border-[#df4949] font-medium' : 'text-gray-400'}>
          SuperDeals
        </Link>
        <Link href="/featurebrands" className={isActive('/featurebrands') ? 'text-black border-b-2 border-[#df4949] font-medium' : 'text-gray-400'}>
          Feature Brands
        </Link>
        <Link href="/trending" className={isActive('/trending') ? 'text-black border-b-2 border-[#df4949] font-medium' : 'text-gray-400'}>
          Trending Styles
        </Link>
        <Link href="/giftcards" className={isActive('/giftcards') ? 'text-black border-b-2 border-[#df4949] font-medium' : 'text-gray-400'}>
          Gift Cards
        </Link>
        <Link href="/blog" className={isActive('/blog') ? 'text-black border-b-2 border-[#df4949] font-medium' : 'text-gray-400'}>
          Blogs
        </Link>
      </div>
    </div>
  );
};

export default HeroNav;