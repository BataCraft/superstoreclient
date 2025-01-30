import Brands from "../_components/_Brands/Brands"
import MainHeroSection from "../_components/_HeroSection/MainHeroSection"
import Card from "../_components/Card"
import Service from "../_components/Service"

const HomeSection = () => {
  return (
    <div>
       <main>
          <MainHeroSection/>
          <Service/>
          <Brands/>

          <Card/>
       </main>
    </div>
  )
}
export default HomeSection