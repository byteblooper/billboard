import Image from "next/image";
import TopBanner from "./components/navbar/TopBanner";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";


export default function Home() {
  return (
   <>
    <TopBanner />
    <Navbar />
  
    <Hero />
  
   </>
  );
}
