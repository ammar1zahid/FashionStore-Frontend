
import Announcement from "../../components/Annoucement"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import PaymentComponent from "../../components/Payment"


function PaymentPage() {
  return (
    <div>
        <Announcement/>
        <Navbar/>
        <PaymentComponent/>
        <Footer/>
    </div>
  )
}

export default PaymentPage