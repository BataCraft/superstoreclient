import { ShoppingBag } from "lucide-react";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import CartItems from "./CartItems";
import { Button } from "@/components/ui/button";

const NavCart = () => {
    const cartItems = true;
    return (
        <div>
            <Menubar className="border-none bg-transparent ">
                <MenubarMenu>
                    <MenubarTrigger className="relative border-none cursor-pointer outline-none p-0">
                        <ShoppingBag className="w-6 h-6" />
                        <span className="absolute top-[-5px] right-[-5px] bg-[#df4949] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            4
                        </span>
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            {
                                !cartItems ? (
                                    <div>Cart is empty</div>
                                ) :
                                    (
                                        <div className="flex flex-col gap-8 items-center bg-black py-8">
                                            <div className="flex items-center justify-center flex-col gap-2 bg-black">
                                                <CartItems />
                                                <CartItems />
                                            </div>

                                            <div>
                                                <p className="text-white text-xl font-semibold">Total : <span>$2,999</span></p>
                                            </div>

                                            <div className="flex items-center justify-between px-10 w-full">
                                                <Button className="bg-primaryColor text-white">View Cart</Button>
                                                <Button  className="bg-assentColor text-white">Check out</Button>
                                            </div>
                                        </div>
                                )
                            }
                        
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    );
};
export default NavCart;
