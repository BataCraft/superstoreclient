"use client"
import useStore from "@/Store/useStore"
import ProductHeader from "../ProdctHeader"
import { useEffect } from "react";
import CardSkeleton from "../Skeleton/CardSkeleton";
import Card from "../(cardcomponents)/Card";
import WeaklyProducts from "../_WeaklyProducts/WeaklyProducts";

const NewProduct = () => {
    const {data, loading, fetchData} = useStore();

    useEffect(()=>{
        fetchData();
    },[fetchData]);

    if(loading ) <div><CardSkeleton/></div>

    const products = data?.products || [];
    const featuredProducts = products.filter((product) => product.flags.isNew === true);

    const limitedData = featuredProducts.slice(0,12);

  return (
    <div className="container mx-auto mb-16">
        <div>
            <h1><ProductHeader title={"New Products"} description={"Hot, New Products"}/></h1>

            <div className="my-16">
                <div id="products" className="flex  justify-between gap-8">
                    {/* Weakly Product */}

                    <div className="hidden lg:block">
                        <WeaklyProducts/>
                    </div>

                    {/* New Product */}
                    <div id="card" className="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {
                            limitedData.length > 0? (
                                limitedData.map((product) => {
                                  return (
                                    <Card key={product._id} product={product}/>
                                  )
                                })
                            )
                            :
                            (
                                <div>No Products</div>
                            )
                        }
                    </div>

                    
                </div>

            </div>      
            
        </div>
    </div>
  )
}
export default NewProduct