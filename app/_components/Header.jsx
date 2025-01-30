import HeaderAds from "./_NavComponents/HeaderAds"
import InfoHeader from "./_NavComponents/InfoHeader"
import SearchSection from "./_NavComponents/SearchSection"

const Header = () => {
  return (
    <div>
        <nav>
            <HeaderAds/>
            <InfoHeader/>
            <SearchSection/>
        </nav>
    </div>
  )
}
export default Header