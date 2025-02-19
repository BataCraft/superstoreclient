import { Check, CornerUpLeftIcon } from "lucide-react"
import Image from "next/image"

const OfferBanner = () => {
    return (
        <div className=" h-[50rem]  relative flex  flex-col justify-center ic text-white mt-16">
            <div className="bg-black ">
                <div className="container mx-auto py-10 text-white">
                    <div className="text-white flex items-center justify-between ">
                        
                        <div className="flex flex-col  text-white ">
                            <p className="text-base font-light text-white">from</p>
                            <h5 className="text-2xl sm:text-3xl md:text-6xl    font-bold ">$999</h5>
                        </div>
                        <div>
                            <h4 className="text-white font-light text-2xl md:text-5xl">Noise Cancelling <br /> <span className="font-bold">Headphones</span> Wireless <br />Bluetooth</h4>
                        </div>

                        <div>
                            <div className="absolute top-10 bg-[#29272e] p-8 right-80 text-white">
                                <h5 className="font-semibold text-xl mb-4">Item specifics</h5>
                                <li className="list-none flex items-center gap-2 pb-3"><span> <Check size={20} className="text-gray-400" /> </span>Bluetooth</li>
                                <li className="list-none flex items-center gap-2 pb-3"><span> <Check size={20} className="text-gray-400" /> </span>Active Noise-Cancellation</li>
                                <li className="list-none flex items-center gap-2 pb-3"><span> <Check size={20} className="text-gray-400" /> </span>With Microphone</li>
                                <li className="list-none flex items-center gap-2 pb-3"><span> <Check size={20} className="text-gray-400" /> </span>Resistance</li>
                                <li className="list-none flex items-center gap-2 pb-3"><span> <Check size={20} className="text-gray-400" /> </span>Vocalism Principle</li>
                                <li className="list-none flex items-center gap-2 pb-3"><span> <Check size={20} className="text-gray-400" /> </span>Support Memory Card</li>
                            </div>

                            <div className=""><Image src={"/headphone01.png"} width={600} height={600} alt="banners"/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OfferBanner