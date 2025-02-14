import { Hand, HandCoins, RefreshCcw, TagIcon, ThumbsUp, Truck } from "lucide-react"



const Service = () => {
  return (
    <div className=" container mx-auto mt-10">
        <div className="grid grid-cols-2 md:grid-cols-5  bg-gray-200 w-full h-[150px]">

            <div className="flex items-center justify-center gap-3 border border-r-gray-300">
                <Truck size={30} className="text-[#df4949] "/>
                <div>
                    <h4 className="font-bold text-xs sm:text-base md:text-xl">Free Delivery</h4>
                    <span className="font-medium text-black/70 text-xs sm:text-base">from $50</span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-3 border border-r-gray-300">
                <ThumbsUp size={30} className="text-[#df4949]"/>
                <div>
                    <h4 className="font-bold text-xs sm:text-base md:text-xl">99% Customer</h4>
                    <span className="font-medium text-black/70 text-xs sm:text-base">Feedbacks</span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-3 border border-r-gray-300">
                <RefreshCcw size={30} className="text-[#df4949]"/>
                <div>
                    <h4 className="font-bold text-xs sm:text-base md:text-xl">365 Days</h4>
                    <span className="font-medium text-black/70 text-xs sm:text-base">for free return</span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-3 border border-r-gray-300">
                <HandCoins size={30} className="text-[#df4949]"/>
                <div>
                    <h4 className="font-bold text-xs sm:text-base md:text-xl">Payment</h4>
                    <span className="font-medium text-black/70 text-xs sm:text-base">Secure System</span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-3 border border-r-gray-300">
                <TagIcon size={30} className="text-[#df4949]"/>
                <div>
                    <h4 className="font-bold text-xs sm:text-base md:text-xl">Only Best</h4>
                    <span className="font-medium text-black/70 text-xs sm:text-base">Brands</span>
                </div>
            </div>



        </div>
    </div>
  )
}
export default Service