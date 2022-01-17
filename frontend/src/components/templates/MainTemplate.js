import Navbar from "components/organisms/Navbar/Navbar";
import Footer from "components/organisms/Footer/Footer";

export default function MainTemplate({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
