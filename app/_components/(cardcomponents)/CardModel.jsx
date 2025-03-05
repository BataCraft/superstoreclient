"use client"
import { Button } from "@/components/ui/button";
import ProductHeader from "../ProdctHeader";
import Card from "./Card.jsx";
import SaleCountdown from "./Offer";
import useStore from "../../../Store/useStore";
import { useEffect } from "react";
import CardSkeleton from "../Skeleton/CardSkeleton";
import Link from "next/link";
import LoadingPage from "@/components/Custom/Loader";

const CardModel = () => {
  const { data, error, loading, fetchData } = useStore();

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [fetchData]);

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 lg:px-8">
        <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 shadow-sm">
          <ProductHeader title="Deals of the Day" description="Hot items, Affordable Price" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4">
        <CardSkeleton />
      </div>
    );
  }

  const products = data?.products || [];
  const featuredProducts = products.filter((product) => product.flags.isFeatured === true);
  const limitedData = featuredProducts.slice(0, 8);

  return (
    <div className="container mx-auto py-8 px-4 lg:px-8">
      <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 shadow-sm">
        <ProductHeader title="Deals of the Day" description="Hot items, Affordable Price" />

        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <div className="flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 justify-items-center">
              {limitedData.length > 0 ? (
                limitedData.map((product) => (
                  <Card key={product._id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500 text-lg">No products available</p>
                </div>
              )}
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/Product-list"
                className="inline-flex px-8 py-3 bg-blue-600 text-white rounded-lg font-medium
                  hover:bg-blue-700 transition-colors duration-200 shadow-sm
                  hover:shadow-md active:transform active:scale-95"
              >
                View More Products
              </Link>
            </div>
          </div>

          <div className="hidden xl:block w-80 flex-shrink-0 ">
            <div className="sticky top-8 ">
              <SaleCountdown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModel;