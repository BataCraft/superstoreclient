import { Search } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const categories = [{name: "Electronics"}, {name: "Fashion"}, {name: "Home & Office"}, {name: "Health & Beauty"}, {name: "Phones & Tablets"}, {name: "Computing"}, {name: "Sporting Goods"}, {name: "Automobile"}, {name: "Baby Products"}, {name: "Gaming"}, {name: "Groceries"}, {name: "Other"}];

const SearchBar = () => {
    return (
        <div className="w-[25rem] lg:w-[40rem]">
            <div className="flex items-center border-[#df4949] border-2 rounded-full">
                <input type="text" placeholder="Search for products, brands and categories" className="w-full rounded-l-full outline-none p-2" />
                <div>
                    <Select>
                        <SelectTrigger className="w-[120px] border-none outline-none">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map(categories => 
                                <SelectItem value={categories.name}>{categories.name}</SelectItem>
                            )}
                            
                            
                        </SelectContent>
                    </Select>

                </div>
                <button className="bg-[#df4949] text-white px-8 py-2 rounded-r-full">
                    <Search />
                </button>
            </div>
        </div>
    )
}
export default SearchBar