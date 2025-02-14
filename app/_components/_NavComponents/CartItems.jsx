import { Button } from "@/components/ui/button"
import Image from "next/image"

const CartItems = () => {
  return (
    <div>
        <div className="flex bg-black text-white items-center justify-center w-full">
                    <Image src={"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="card" width={200} height={400}/>
                    <div className="w-1/2 p-4">
                        <p className="font-medium">Wireless Audio System Multiroom 350</p>
                        <p>$2,999</p>

                        
                    </div>
                </div>
    </div>
  )
}
export default CartItems