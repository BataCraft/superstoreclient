"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useStore from "@/Store/useStore";
import Card from "../_components/(cardcomponents)/Card";
import LoadingPage from "@/components/Custom/Loader";
import CardSkeleton from "../_components/Skeleton/CardSkeleton";

const AllproductList = () => {
  const { data, loading, error, fetchData } = useStore();
  const searchParams = useSearchParams();
  
  const query = searchParams.get("query")?.toLowerCase() || "";
  const category = searchParams.get("category") || "";

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <LoadingPage />;
  if (error) return <div className="text-red-500"><CardSkeleton/></div>;

  // Ensure `data.products` is used correctly
  let products = data?.products || [];

  // Apply search filtering
  products = products.filter(product => 
    product.name.toLowerCase().includes(query)
  );

  // Apply category filtering (if a category is selected)
  if (category && category !== "All Categories") {
    products = products.filter(product => product.category === category);
  }

  return (
    <div className="container mx-auto grid grid-flow-row grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-4 gap-5 my-16">
      {products.length > 0 ? (
        products.map((product) => (
          <Card key={product._id} product={product} />
        ))
      ) : (
        <p className="text-center text-gray-500">No Product Available</p>
      )}
    </div>
  );
};

export default AllproductList;
