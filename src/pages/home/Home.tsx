import Announcement from "../../components/Annoucement"
import Categories from "../../components/Categories"
import Featured from "../../components/Featured"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import Newsletter from "../../components/NewLetter"
import Products from "../../components/Products"
import Slider from "../../components/Slider"

function Home() {
  return (
    <div>
    <Announcement/>
    <Navbar/>
    <Slider/>
    <Featured/>
    <Categories/>
    <Products cat={""} filters={{}} sort={""}/>
    <Newsletter/>
    <Footer/>
    </div>
  )
}

export default Home