import Navbar from "../../Components/Header";
import Footer from "../../Components/Footer";

export default function PricingLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
