"use client";

import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

import Discription from "@/app/_components/ProductDiscrption/page";
import CardSkeleton from "@/app/_components/Skeleton/CardSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useStore from "@/Store/useStore";
import { Heart, Minus, Plus, ShoppingCart, Package } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import StarReview from '@/components/Custom/Star';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import useAuthStore from '@/Store/userStore';

const ProductDetails = ({ params }) => {
    const { id } = useParams();
    const { product, loading, error, getProductById } = useStore();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState('');
    const [cartButtonText, setCartButtonText] = useState('Add to Cart');
    const {user, checkAuth} = useAuthStore();
    const router = useRouter(); 

    useEffect(() => {
        const checkUserStatus = async () => {
            await checkAuth();
            
        }
        checkUserStatus();
    },[checkAuth]);

    useEffect(() => {
        if (id) getProductById(id);
    }, [id, getProductById]);

    useEffect(() => {
        if (product) setSelectedImage(product.image);
    }, [product]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const addCart = () => {
        if(!user)
        {
            toast.error("Please Login!")
            router.push('/auth/login')
            return;
        }
        const cartItem = {
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.thumbnail,
            quantity: quantity
        };
    
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
        const existingItemIndex = cart.findIndex(item => item.id === cartItem.id);
    
        if(existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push(cartItem);
        }
    
        localStorage.setItem("cart", JSON.stringify(cart));
    
        setCartButtonText('Added');
        toast.success('Added to cart');
    
        // Reset button text after 2 seconds
        setTimeout(() => {
            setCartButtonText('Add to Cart');
        }, 2000);
    };

    // if (loading) return <CardSkeleton />;
    if (error) return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
    if (!product) return <div className="container mx-auto p-4">No Product Found</div>;

    const stockStatus = product.stock?.status === "out_of_stock"
    ? { text: "Out of stock", color: "bg-red-100 text-red-800" }
    : product.stock?.status === "low_stock"
    ? { text: "Low stock", color: "bg-yellow-100 text-yellow-800" }
    : { text: "In stock", color: "bg-green-100 text-green-800" };
// 
    // const stockStatus = getStockStatus(product.stock);

    const handleQuantity = (action) => {
        if (action === 'add' && quantity < product.stock.quantity) {
            setQuantity(prev => prev + 1);
        } else if (action === 'remove' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    // const salePrice = price.sale || 0;
//   const regularPrice = price.regular || 0;

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="">
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Image Gallery Section */}
                        <div className="space-y-4">
                            {/* <div className="overflow-hidden w-full rounded-lg bg-gray-100"> */}
                                <div className=" w-full">
                                    <InnerImageZoom
                                        src={selectedImage || product.thumbnail}
                                        zoomSrc={selectedImage || product.thumbnail}
                                        zoomScale={2}
                                        zoomType="hover"
                                        hideHint = {true}
                                        
                                        // hasSpacer={false}
                                        width={400}
                                     
                                        className='w-full object-cover '
                                    />
                                </div>
                            {/* </div> */}
                            <div className="grid grid-cols-4 gap-4">
                                {product.images?.map((image, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleImageClick(image)}
                                        className={` overflow-hidden rounded-md ${
                                            selectedImage === image ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-200'
                                        }`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`Product ${index + 1}`}
                                            width={200}
                                            height={200}
                                            className="object-contain"
                                            
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Details Section */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                                <div className="mt-4 flex items-center justify-between">
                                    <StarReview stars={product.ratings} />
                                    <Badge className={stockStatus.color}>
                                        <Package className="mr-2 h-4 w-4" />
                                        {stockStatus.text}
                                    </Badge>
                                </div>
                            </div>

                            <div className="border-t border-b py-4">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-gray-900">${product.price.sale || product.price.regular}</span>
                                        {
                                            product.price.sale > 0 && (
                                    <span className="text-lg text-gray-500 line-through">
                                                {product.price.regular}
                                    </span>
                                            )
                                        }
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between rounded-lg border p-3">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleQuantity('remove')}
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="text-xl font-semibold">{quantity}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleQuantity('add')}
                                        disabled={quantity >= product.stock.quantity}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="flex gap-4">
                                    <Button
                                        className="flex-1 gap-2 bg-primaryColor text-white text-base"
                                        size="lg"
                                        onClick={addCart}
                                        disabled={product.stock.quantity <= 0}
                                    >
                                        <ShoppingCart className="h-5 w-5" />
                                        Add to Cart
                                    </Button>
                                    <Button variant="outline" size="lg">
                                        <Heart className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="mt-12">
                        <Tabs defaultValue="desc" className="w-full">
                            <TabsList className="w-full justify-start border-b">
                                <TabsTrigger value="desc" className="text-lg">Description</TabsTrigger>
                                <TabsTrigger value="review" className="text-lg">Reviews</TabsTrigger>
                            </TabsList>
                            <TabsContent value="desc" className="mt-6">
                                <Discription product={product} />
                            </TabsContent>
                            <TabsContent value="review" className="mt-6">
                                <div className="text-gray-600">Reviews will be displayed here.</div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductDetails;