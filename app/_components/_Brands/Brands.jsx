import { ArrowRight } from "lucide-react"
import Image from "next/image"

const brandLogo = [
    {
        id: 1,
        image: "/JBL.png",
        name: "JBL"
    },
    {
        id: 2,
        image: "/brand02.png",
        name: "Sony"
    },
    {
        id: 3,
        image: "/bose.png",
        name: "Bose"
    },
    {
        id: 4,
        image: "/brand03.png",
        name: "Beats"
    },
    {
        id: 5,
        image: "/brand04.webp",
        name: "Harman Kardon"
    }
]

const Brands = () => {
    return (
        <section className="py-16 bg-gray-50 mt-16">
            <div className="container mx-auto px-4">
               <div className="flex items-baseline justify-between">
                    <div className=" mb-12">
                        <h1 className="text-4xl font-bold mb-3 text-gray-800">
                            Brand Zone
                        </h1>
                        <p className="text-lg text-gray-600">
                            Premium Brands, Affordable Prices
                        </p>
                    </div>

                    <div className="text-center mt-12">
                    <button className="flex items-center text-gray-400 px-8 py-3 rounded-full 
                                      transition-colors duration-300 
                                     font-medium">
                        View All Brands <ArrowRight/>
                    </button>
                </div>

               </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {brandLogo.map((brand) => (
                        <div 
                            key={brand.id}
                            className="group relative bg-white p-6 rounded-xl shadow-sm 
                                     hover:shadow-md transition-all duration-300 
                                     transform hover:-translate-y-1"
                        >
                            <div className="relative h-32 w-full">
                                <Image
                                    src={brand.image}
                                    alt={brand.name}
                                    fill
                                    className="object-contain p-2 filter 
                                             group-hover:brightness-110 transition-all 
                                             duration-300"
                                    sizes="(max-width: 768px) 50vw,
                                           (max-width: 1200px) 33vw,
                                           20vw"
                                />
                            </div>
                            <div className="text-center mt-4 opacity-0 group-hover:opacity-100 
                                          transition-opacity duration-300">
                                <p className="text-sm font-medium text-gray-700">
                                    {brand.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

               
                
            </div>
        </section>
    )
}

export default Brands