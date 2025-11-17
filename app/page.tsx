import Image from "next/image";
import TopBanner from "./components/home/navbar/TopBanner";
import Navbar from "./components/home/navbar/Navbar";
import Hero from "./components/home/hero/Hero";
import Category from "./components/home/categories/Category";
import Trending from "./components/home/trending/Trending";
import WhyNearBy from "./components/home/whyNearby/WhyNearBy";


export default function Home() {
  return (
   <>
  
  
    <Hero />

    <Category />

   <Trending />

   <WhyNearBy />
  
   </>
  );
}
