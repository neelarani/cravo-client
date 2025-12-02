import Hero from '@/components/modules/Home/Hero';

import MenuSection from '@/components/modules/Home/MenuSection';
import CustomerReviews from '@/components/modules/Home/CustomerReviews';
import GallerySection from '@/components/modules/Home/GallerySection';
import ChefSection from '@/components/modules/Home/ChefSection';
import Contact from '@/components/modules/Home/Contact';
import PopularItems from '@/components/modules/Home/PopulerItems';

const page = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <PopularItems />
      <MenuSection />
      <GallerySection />
      <ChefSection />
      <CustomerReviews />
      <Contact />
    </div>
  );
};

export default page;
