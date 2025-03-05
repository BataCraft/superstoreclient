"use client"
import useAuthStore from "@/Store/userStore"
import CardModel from "../_components/(cardcomponents)/CardModel"
import Brands from "../_components/_Brands/Brands"
import Footer from "../_components/_Footer/Page"
import MainHeroSection from "../_components/_HeroSection/MainHeroSection"

import Service from "../_components/Service"
import OfferBanner from "../_Offers/OfferBanner"
import { useEffect } from "react"
import NewProduct from "../_components/_NewProduct/NewProduct"


const HomeSection = () => {
  
  return (
    <div>
       <main>
          <MainHeroSection/>
          <Service/>
          <Brands/>

          <CardModel/>
          <OfferBanner/> 

          <NewProduct/>

          
          
       </main>
    </div>
  )
}
export default HomeSection