import { truncateText } from "@/lib/TruncateText";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Card = ({ product }) => {
  const {
    _id,
    name = '',
    price = {},
    flags = {},
    images = [],
    thumbnail = '',
  } = product || {};

  const maxLength = 20;
  const salePrice = price.sale || 0;
  const regularPrice = price.regular || 0;
  const discount = regularPrice ? ((regularPrice - salePrice) / regularPrice) * 100 : 0;

  return (
    <div className="bg-white w-full sm:w-64 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-3">
        <div className="relative aspect-square mb-3">
          <div className="relative group h-full overflow-hidden rounded-lg">
            <Image
              src={thumbnail || (images[0] || '')}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* <div className="absolute inset-0 bg-black/30 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
              <button className="p-2 bg-white rounded-full hover:bg-gray-100 transform hover:scale-110 transition-all duration-200 shadow-lg">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 bg-white rounded-full hover:bg-gray-100 transform hover:scale-110 transition-all duration-200 shadow-lg">
                <Heart className="w-5 h-5 text-gray-700" />
              </button>
            </div> */}
          </div>

          <div className="absolute top-2 flex items-center justify-between w-full px-2 gap-2">
            {flags?.isNew && (
              <div className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full shadow-md">
                New
              </div>
            )}
            {price?.discount_percentage > 0 && (
              <div className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full shadow-md ml-auto">
                {price.discount_percentage.toFixed(0)}% OFF
              </div>
            )}
          </div>
        </div>

        <Link href={`/productDetails/${_id}`} className="block group">
          <p className="text-gray-500 text-xs font-medium tracking-wide uppercase">Speakers</p>
          <h2 className="text-gray-800 font-semibold text-base mt-1 leading-tight group-hover:text-blue-600 transition-colors">
            {truncateText(name, maxLength)}
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-gray-900">
              ${salePrice || regularPrice}
            </span>
            {salePrice > 0 && (
              <span className="text-gray-400 text-sm line-through">
                ${regularPrice}
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;