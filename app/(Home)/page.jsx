import React, { Suspense } from "react";

const HomeSection = () => {
  return (
    <div>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <MainHeroSection />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Service />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Brands />
        </Suspense>

        <CardModel />
        <OfferBanner />
        <NewProduct />
      </main>
    </div>
  );
};
