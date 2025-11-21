import HeroShortener from "@/components/HeroShortener";
import WhyChoose from "@/components/WhyChoose";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/header";

export default function Landing() {
  return (
    <>
      <Header />
      <HeroShortener />
      <WhyChoose />
      <Features />
      <Footer />
    </>
  );
}
