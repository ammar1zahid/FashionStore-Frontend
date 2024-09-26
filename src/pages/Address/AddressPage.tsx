import AddressComponent from "../../components/Address"
import Announcement from "../../components/Annoucement"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"


function AddressPage() {
  return (
    <div>
        <Announcement/>
        <Navbar/>
       <AddressComponent/>
        <Footer/>
    </div>
  )
}

export default AddressPage