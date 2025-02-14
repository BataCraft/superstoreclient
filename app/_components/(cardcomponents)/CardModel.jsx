"use client"
import { Button } from "@/components/ui/button";
import ProductHeader from "../ProdctHeader";
import Card from "./Card.jsx";
import SaleCountdown from "./Offer";
import useStore from "../../../Store/useStore";
import { useEffect } from "react";
import CardSkeleton from "../Skeleton/CardSkeleton";

const CardModel = () => {
  const { data, error, loading, fetchData } = useStore();

  try {
    useEffect(()=>{
      fetchData();
    },[fetchData]);
  } catch (error) {
    console.log(error);
    
    
  }


  if (loading) {
    return (
      <div className="container mx-auto mt-16 p-8 rounded-2xl bg-secondaryColor">
        <ProductHeader title="Deals of the Day" description="Hot items, Affordable Price" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Check if data.products exists before filtering
  const products = data?.products || [];
 
  
  // Changed featured_product to featured to match your filter
  const featuredProducts = products.filter((product) => product.flags.isFeatured === true);

  
  const limitedData = featuredProducts.slice(0, 6);

  return (
    <div className="container mx-auto mt-16 p-8 rounded-2xl bg-secondaryColor">
      <div>
        <ProductHeader title="Deals of the Day" description="Hot items, Affordable Price" />

        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center justify-between gap-8 flex-col">
            <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center place-items-center items-center">
              {limitedData.length > 0 ? (
                limitedData.map((product) => (
                  <Card key={product._id} product={product} />
                ))
              ) : (
                <p>No products available</p>
              )}
            </div>

            <div className="text-center">
              <Button className="bg-assentColor text-white px-12">View More</Button>
            </div>
          </div>

          <div className="flex-1 p-8 hidden xl:block">
            <SaleCountdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModel;