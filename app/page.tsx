import Image from "next/image";
import TopBanner from "./components/topBanner/TopBanner";
import Navbar from "./components/navbar/Navbar";

export default function Home() {
  return (
   <>
    <TopBanner />
    <Navbar />
   </>
  );
}
