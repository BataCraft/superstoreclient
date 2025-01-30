'use client';

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const params = useParams();
  const id = params.id; // This will now correctly get the ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const res = await fetch('/Product.json');
        if (!res.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await res.json();
        
        const foundProduct = data.products.find(
          (p) => p.id === parseInt(id)
        );
        
        if (!foundProduct) {
          throw new Error('Product not found');
        }
        
        setProduct(foundProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductById();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative h-96">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-4">
              <p className="text-2xl font-bold text-green-600">
                ${product.discount_price}
              </p>
              <p className="text-lg text-gray-500 line-through">
                ${product.real_price}
              </p>
              <span className="bg-blue-600 text-white px-2 py-1 rounded-md">
                -{product.discount_percentage}%
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      index < product.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">({product.rating} / 5)</span>
            </div>

            {/* Stock */}
            <p className="text-gray-600">
              Stock: {product.quantity_in_stock} units available
            </p>

            {/* Available Colors */}
            <div>
              <h3 className="font-semibold mb-2">Available Colors:</h3>
              <div className="flex gap-2">
                {product.available_colors.map((color) => (
                  <span
                    key={color}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;