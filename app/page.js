import LoadingPage from '@/components/Custom/Loader';
import { Suspense, lazy } from 'react';

// Lazy load components
const CardModel = lazy(() => import("./_components/(cardcomponents)/CardModel"));
const Brands = lazy(() => import("./_components/_Brands/Brands"));
const MainHeroSection = lazy(() => import("./_components/_HeroSection/MainHeroSection"));
const NewProduct = lazy(() => import("./_components/_NewProduct/NewProduct"));
const Service = lazy(() => import("./_components/Service"));
const OfferBanner = lazy(() => import("./_Offers/OfferBanner"));

export default function Home() {
  return (
    <>
      <main>
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