import Desc from "@/app/_Data/Desc"
import { ChevronDown, DollarSign, IndianRupee, Mail, MapPin, MoveDownIcon, Phone, Truck } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



const InfoHeader = () => {
    return (
        <div className="shadow-sm hidden sm:flex">
            <div className="container mx-auto flex justify-between items-center px-2 py-3">
                <div className="flex items-center gap-8">
                    <div className="text-[#df4949] flex items-center gap-2">
                        <Phone />
                        <span className="text-black ">{Desc.HeadingPhone}</span>
                    </div>

                    <div className="text-[#df4949] flex items-center gap-2">
                        <Mail />
                        <span className="text-black">{Desc.HedadinMail}</span>
                    </div>
                </div>

                {/*  */}
                <div className="flex items-center gap-8">

                    <div className="text-[#df4949] flex items-center gap-2">
                        <MapPin />
                        <span className="text-black">{Desc.HeaderLocation}</span>
                    </div>

                    <div className="text-[#df4949] flex items-center gap-2">
                        <Truck />
                        <span className="text-black">{Desc.HeaderTrack}</span>
                    </div>

                    {/* <div className="text-[#df4949]">
                  
                        <span className="text-black">

                            <Select>
                                <SelectTrigger className="w-[180px] border-none outline-none focus:outline-none">
                                    <SelectValue placeholder="Currency" />
                                </SelectTrigger>
                                <SelectContent >
                                    <SelectItem value="light"> <span className="flex items-center gap-2"><DollarSign /> Dollar(US)</span></SelectItem>
                                    <SelectItem value="light"> <span className="flex items-center gap-2"><IndianRupee /> Rupee(Rs)</span></SelectItem>
                                    
                                </SelectContent>
                            </Select>


                        </span>
                    </div> */}

                </div>
            </div>
        </div>
    )
}
export default InfoHeader