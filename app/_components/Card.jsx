"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { fetchProducts } from "../Pages/api/Product";

import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Heart, ShoppingBasket } from "lucide-react";
import CardSkeleton from "./Skeleton/CardSkeleton";

const Card = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();


    useEffect(() => {
        // Update date and time


        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data.products);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch products");
                setLoading(false);
            }
        };

        getProducts();


    }, []);

    if (loading) return <div> <CardSkeleton/> </div>;
    if (error) return <div>{error}</div>;

    // Display only 8 items
    const displayedProducts = products.slice(0, 8);

    // Handle View More click
    const handleViewMore = () => {
        router.push('/products');
    };

    return (
        <div className="container mx-auto p-4 mt-16">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-4xl font-bold">Deals of the Day</h1>
                    <p className="text-base text-gray-300">Hot items, Affordable prices</p>
                </div>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-10">
                {displayedProducts.map((product) => (
                    // Change this line in your Card component
                    <Link href={`/product/${product.id}`} key={product.id} className="border rounded-lg p-4 shadow-md relative group">
                        <div className="relative overflow-hidden">
                            {product.image && (
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={300}
                                    height={200}
                                    className="w-full h-48 object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                                    placeholder="blur"
                                    blurDataURL="/path-to-placeholder-image"
                                />
                            )}

                            {/* Hover Icons */}
                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex items-center justify-center gap-4">
                                <button
                                    className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200 transform hover:scale-110"
                                    onClick={() => console.log('Added to favorites')}
                                    aria-label="Add to favorites"
                                >
                                    <Heart className="text-red-500 text-xl" />
                                </button>
                                <button
                                    className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200 transform hover:scale-110"
                                    onClick={() => console.log('Added to cart')}
                                    aria-label="Add to cart"
                                >
                                    <ShoppingBasket className="text-blue-500 text-xl" />
                                </button>
                            </div>
                        </div>

                        <p className="font-semibold text-gray-300 text-base mt-8">Speaker</p>
                        <h1 className="text-xl font-bold mt-2 hover:text-blue-600 transition-colors duration-200">
                            {product.name}
                        </h1>
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-gray-500 line-through">${product.real_price}</p>
                            <p className="text-lg font-semibold text-green-600">${product.discount_price}</p>
                        </div>
                        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md">
                            -{product.discount_percentage}%
                        </div>
                    </Link>
                ))}
            </div>

            {/* View More Button */}
            <div className="text-center mt-8">
                <button
                    onClick={handleViewMore}
                    className="bg-[#283138] text-white px-8 py-3 rounded-lg  
                             transition-colors duration-200 transform hover:scale-105 
                             flex items-center justify-center mx-auto gap-2"
                >
                    View More Items
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Card;