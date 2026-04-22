import Navbar from "@/components/Navbar";
// import OfferBanner from "@/components/OfferBanner"; // removed per request
// import ScrollHero from "@/components/ScrollHero"; // disabled — using HeroSimple instead
import HeroSimple from "@/components/HeroSimple";
// import MarqueeBar from "@/components/MarqueeBar"; // duplicate of hero marquee — disabled
import About from "@/components/About";
import AlternatingStory from "@/components/AlternatingStory";
// import FlavorCarousel from "@/components/FlavorCarousel"; // replaced by ProductSpotlight
import ProductSpotlight from "@/components/ProductSpotlight";
import AtOurTable from "@/components/AtOurTable";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
// import SkyDiveFinale from "@/components/SkyDiveFinale"; // disabled — redundant CTA, heavy 3D
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSimple />
        {/* <MarqueeBar /> — duplicate of hero marquee */}
        <About />
        <ProductSpotlight />
        <AlternatingStory />
        {/* <FlavorCarousel /> — replaced by ProductSpotlight */}
        <AtOurTable />
        <Process />
        {/* <SkyDiveFinale /> */}
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
