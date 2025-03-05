"use client"

import { Suspense } from "react";
import { Search } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const categories = [
    {name: "Gaming"}, 
];

const SearchBar = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`/Product-list?${params.toString()}`);
    }, 300);

    return (
        <div className="w-[25rem] lg:w-[40rem]">
            <div className="flex items-center border-[#df4949] border-2 rounded-full">
                <input 
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.get('query')?.toString()}
                    type="text" 
                    placeholder="Search for products, brands and categories" 
                    className="w-full rounded-l-full outline-none p-2" 
                />
                <div>
                    <Select>
                        <SelectTrigger className="w-[120px] border-none outline-none">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            {categories.map((category, index) => (
                                <SelectItem 
                                    value={category.name} 
                                    key={`category-${index}`}
                                >
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <button className="bg-[#df4949] text-white px-8 py-2 rounded-r-full">
                    <Search />
                </button>
            </div>
        </div>
    );
}

export default SearchBar;
