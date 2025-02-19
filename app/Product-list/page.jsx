"use client";
import useStore from "@/Store/useStore";
import Card from "../_components/(cardcomponents)/Card";
import { useEffect } from "react";
import toast from "react-hot-toast";
import LoadingPage from "@/components/Custom/Loader";
import CardSkeleton from "../_components/Skeleton/CardSkeleton";

const AllproductList = () => {
  const { data, loading, error, fetchData } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <LoadingPage />;
  if (error) return <div className="text-red-500">
    <CardSkeleton/>
  </div>;

  // Ensure `data.products` is used correctly
  const products = data?.products || [];

  return (
    <div className="container mx-auto grid grid-flow-row grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 my-16">
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
