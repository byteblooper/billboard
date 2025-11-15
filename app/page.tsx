import Image from "next/image";
import TopBanner from "./components/navbar/TopBanner";
import Navbar from "./components/navbar/Navbar";
import FlashSell from "./components/hero/FlashSell";

export default function Home() {
  return (
   <>
    <TopBanner />
    <Navbar />
    <FlashSell />
   </>
  );
}
