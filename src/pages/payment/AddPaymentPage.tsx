import AddPayment from "../../components/AddPayment";
import Announcement from "../../components/Annoucement";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

function AddPaymentPage() {
  return (
    <div>
      <Announcement />
      <Navbar />
        <AddPayment/>
      <Footer />
    </div>
  );
}

export default AddPaymentPage;
