"use client"

import { Search } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce, useDebouncedCallback } from "use-debounce";


const categories = [{name: "Electronics"}, {name: "Fashion"}, {name: "Home & Office"}, {name: "Health & Beauty"}, {name: "Phones & Tablets"}, {name: "Computing"}, {name: "Sporting Goods"}, {name: "Automobile"}, {name: "Baby Products"}, {name: "Gaming"}, {name: "Groceries"}, {name: "Other"}];

const SearchBar = () => {
    // const [text, setText] = useState("");
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const{replace} = useRouter();
 


    const handleSearch = useDebouncedCallback((term) => {
        const params  = new URLSearchParams(searchParams);
    //    console.log(term);

       if(term)
       {
        params.set('query', term);

       }
       else{
        params.delete('query');
       }
       replace(`/Product-list?${params.toString()}`);
        
    }, 300);
    return (
        <div className="w-[25rem] lg:w-[40rem]">
            <div className="flex items-center border-[#df4949] border-2 rounded-full">
                <input 
                // value={text}
                onChange={(e) =>{
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
                type="text" placeholder="Search for products, brands and categories" className="w-full rounded-l-full outline-none p-2" />
                <div>
                    <Select>
                        <SelectTrigger className="w-[120px] border-none outline-none">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            {categories.map((categories, index) => 
                                (
                                    <SelectItem value={categories.name} key={`category-${index}`}>{categories.name}</SelectItem>
                                )
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