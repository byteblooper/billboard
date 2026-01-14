import HomeHeader from "./components/home/HomeHeader";
import DealsCarousel from "./components/home/DealsCarousel";
import SidebarFilters from "./components/home/SidebarFilters";
import GrocerySection from "./components/home/GrocerySection";
import FashionSection from "./components/home/FashionSection";
import GadgetSection from "./components/home/GadgetSection";
import MobileBannerSlider from "./components/home/MobileBannerSlider";
import MobileCategories from "./components/home/MobileCategories";
import MobileFlashSale from "./components/home/MobileFlashSale";
import MobileAdBanner from "./components/home/MobileAdBanner";


export default function Home() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Mobile Banner Slider - Only visible on small screens */}
      <MobileBannerSlider />

      <HomeHeader />

      {/* Mobile Categories - Only visible on small screens */}
      <MobileCategories />

      {/* Mobile Flash Sale Banner - Only visible on small screens */}
      <MobileFlashSale />

      {/* Desktop Deals Carousel - Hidden on mobile */}
      <div className="hidden lg:block">
        <DealsCarousel />
      </div>

      <div className="container mx-auto px-4 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block lg:col-span-1">
            <SidebarFilters />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-4 space-y-6 lg:space-y-8">
            <GrocerySection />
            
            {/* Mobile Ad Banner after Grocery */}
            <MobileAdBanner 
              variant="orange"
              title="GROCERY DEALS"
              subtitle="Fresh products daily"
              discount="30% OFF"
              link="/products?category=grocery"
            />
            
            <FashionSection />
            
            {/* Mobile Ad Banner after Fashion */}
            <MobileAdBanner 
              variant="purple"
              title="FASHION WEEK"
              subtitle="Trending styles"
              discount="40% OFF"
              link="/products?category=fashion"
            />
            
            <GadgetSection />
            
            {/* Mobile Ad Banner after Gadget */}
            <MobileAdBanner 
              variant="blue"
              title="TECH SALE"
              subtitle="Latest gadgets"
              discount="25% OFF"
              link="/products?category=gadget"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
