import Navbar from "@/components/Navbar";
import HeroSimple from "@/components/HeroSimple";
import About from "@/components/About";
import AlternatingStory from "@/components/AlternatingStory";
import Process from "@/components/Process";
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1 */} <HeroSimple />
        {/* 2 */} <About />
        {/* 3 */} <AlternatingStory />      {/* What We Use */}
        {/* 4 */} <Process />               {/* Why Kanaa */}
        {/* 5 */} <FeaturedProducts />
        {/* 6 */} <Testimonials />
      </main>
      <Footer />
    </>
  );
}
