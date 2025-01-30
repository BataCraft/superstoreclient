import Link from "next/link"
import SearchBar from "./SearchBar"
import { ShoppingBag } from "lucide-react"

const SearchSection = () => {
  return (
    <nav className="container mx-auto px-4 mt-6">
        <div className="flex items-center justify-between">
            <Link href="/"><h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">SUPERSTORE<span className="text-4xl text-[#df4949]">.</span></h1> </Link>

           <div>
              <div className="flex items-center gap-8">
                <div className=" hidden sm:block"><SearchBar/></div>
                <div className="hidden lg:flex items-center gap-4">
                  <div className="">
                    <p className="text-gray-400">Need </p><span className="text-black font-semibold">Help?</span>
                  </div>
  
                  <div className="">
                    <p className="text-gray-400">Your </p><span className="text-black font-semibold">Account</span>
                  </div>
                </div>
  
                <div className="relative">
                  <ShoppingBag/>
                  <span className="absolute top-1 right-[-10px] bg-[#df4949] text-white rounded-full size-5 text-center">4</span>
                </div>
              </div>
           </div>
        </div>
    </nav>
  )
}
export default SearchSection