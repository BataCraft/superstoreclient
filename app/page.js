import { Suspense } from "react";
import Service from "./_components/Service";
import MainHeroSection from "./_components/_HeroSection/MainHeroSection";
import Brands from "./_components/_Brands/Brands";
import CardModel from "./_components/(cardcomponents)/CardModel";
import OfferBanner from "./_Offers/OfferBanner";
import NewProduct from "./_components/_NewProduct/NewProduct";
import LoadingPage from "@/components/Custom/Loader";

export default function Home() {
  return (
    <>
      <main className='overflow-hidden'>
        <Suspense fallback={<LoadingPage />}>
          <MainHeroSection />
          <Service />
          <Brands />
          <CardModel />
          <OfferBanner /> 
          <NewProduct />
        </Suspense>
      </main>
    </>
  );
}