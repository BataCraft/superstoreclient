import { Hand, HandCoins, RefreshCcw, TagIcon, ThumbsUp, Truck } from "lucide-react"



const Service = () => {
  return (
    <div className=" container mx-auto mt-10">
        <div className="grid grid-cols-2 md:grid-cols-5  bg-gray-200 w-full h-[150px]">

            <div className="flex items-center justify-center gap-3 border border-r-gray-300">
                <Truck size={40} className="text-[#df4949]"/>
                <div>
                    <h4 className="font-bold">Free Delivery</h4>
                    <span className="font-medium text-black/70">from $50</span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-3 border border-r-gray-300">
                <ThumbsUp size={40} className="text-[#df4949]"/>
                <div>
                    <h4 className="font-bold">99% Customer</h4>
                    <span className="font-medium text-black/70">Feedbacks</span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-3 border border-r-gray-300">
                <RefreshCcw size={40} className="text-[#df4949]"/>
                <div>
                    <h4 className="font-bold">365 Days</h4>
                    <span className="font-medium text-black/70">for free return</span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-3 border border-r-gray-300">
                <HandCoins size={40} className="text-[#df4949]"/>
                <div>
                    <h4 className="font-bold">Payment</h4>
                    <span className="font-medium text-black/70">Secure System</span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-3 border border-r-gray-300">
                <TagIcon size={40} className="text-[#df4949]"/>
                <div>
                    <h4 className="font-bold">Only Best</h4>
                    <span className="font-medium text-black/70">Brands</span>
                </div>
            </div>



        </div>
    </div>
  )
}
export default Service