import { ArrowRight } from "lucide-react"
import Image from "next/image"
import ProductHeader from "../ProdctHeader"

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
                        <ProductHeader title={"Brands"} description={"Hot items, Affordable Price"} />
                    </div>

                    <div className="text-center mt-12">
                        <button className="flex items-center text-gray-400 sm:px-8 py-3 rounded-full 
                                      transition-colors duration-300 
                                     font-medium text-sm sm:text-xl">
                            View All Brands <ArrowRight />
                        </button>
                    </div>

                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {brandLogo.map((brand) => (
                        <div
                            key={brand.id}
                            className="group relative bg-white sm:p-6 rounded-xl shadow-sm 
                                     hover:shadow-md transition-all duration-300 
                                     transform hover:-translate-y-1"
                        >
                            <div className="relative  h-32 md:h-44 w-full">
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
                           
                        </div>
                    ))}
                </div>



            </div>
        </section>
    )
}

export default Brands