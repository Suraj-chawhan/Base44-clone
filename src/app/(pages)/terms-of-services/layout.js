import Navbar from "@/app/Components/Header";
import Footer from "@/app/Components/Footer";
export default function TermsOfServicesLayout({ children }) {
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
