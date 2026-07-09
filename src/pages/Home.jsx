import Hero              from '../components/Hero/Hero';
import Stats             from '../components/Stats/Stats';
import WhyChooseUs       from '../components/WhyChooseUs/WhyChooseUs';
import FeaturedKits      from '../components/FeaturedKits/FeaturedKits';
import SportsCategories  from '../components/SportsCategories/SportsCategories';
import CustomizeSection  from '../components/CustomizeSection/CustomizeSection';
import SizeGuide         from '../components/SizeGuide/SizeGuide';
import HowItWorks        from '../components/HowItWorks/HowItWorks';
import FAQ               from '../components/FAQ/FAQ';
import CTABanner         from '../components/CTABanner/CTABanner';
import ContactSection    from '../components/ContactSection/ContactSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <WhyChooseUs />
      <FeaturedKits />
      <SportsCategories />
      <CustomizeSection />
      <SizeGuide />
      <HowItWorks />
      <FAQ />
      <CTABanner />
      <ContactSection />
    </main>
  );
}
