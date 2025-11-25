import HomeHeader from "./components/home/HomeHeader";
import DealsCarousel from "./components/home/DealsCarousel";
import SidebarFilters from "./components/home/SidebarFilters";
import GrocerySection from "./components/home/GrocerySection";
import FashionSection from "./components/home/FashionSection";
import GadgetSection from "./components/home/GadgetSection";


export default function Home() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <HomeHeader />
      <DealsCarousel />
      <div className="container mx-auto px-4 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <SidebarFilters />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-4 space-y-8">
            <GrocerySection />
            <FashionSection />
            <GadgetSection />
          </div>
        </div>
      </div>
    </main>
  );
}
