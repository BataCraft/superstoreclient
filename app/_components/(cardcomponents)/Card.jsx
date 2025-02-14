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
    <div className="bg-white w-full sm:w-[20rem] max-w-sm rounded-lg shadow-sm transition-all duration-300 hover:shadow-xl">
      <div className="p-4">
        <div className="relative aspect-square mb-4">
          <div className="relative group h-full">
            <Image
              src={thumbnail || (images[0] || '')}
              alt={name}
              fill
              className="object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="absolute top-2 flex items-center justify-between w-full px-2">
            {flags?.isNew && (
              <div className="px-3 py-1 bg-blueColor text-white text-xs font-medium rounded-full">
                New
              </div>
            )}
            {price?.discount_percentage > 0 && (
              <div className="px-3 py-1 bg-blueColor text-white text-xs font-medium rounded-full ml-auto">
                {price.discount_percentage.toFixed(0)}% OFF
              </div>
            )}
          </div>
        </div>

        <Link href={`/productDetails/${_id}`} className="block">
          <p className="text-gray-500 text-sm">Speakers</p>
          <h2 className="text-gray-900 font-semibold text-lg mt-2 leading-tight">
            {truncateText(name, maxLength)}
          </h2>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-lg font-semibold">${salePrice || regularPrice}</span>
            {salePrice > 0 && (
              <span className="text-gray-500 text-sm line-through">
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