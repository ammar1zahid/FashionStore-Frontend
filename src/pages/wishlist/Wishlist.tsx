import Announcement from "../../components/Annoucement"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"

import WishlistProducts from "../../components/wishlistProducts"


function Wishlist() {
  return (
    <div>
        <Announcement/>
        <Navbar/>
        <WishlistProducts/>
        <Footer/>
    </div>
  )
}

export default Wishlist