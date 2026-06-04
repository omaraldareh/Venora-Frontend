import HeroSection from '../components/HeroSection';
import VenuesSection from '../components/VenuesSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeaturesSection from '../components/FeaturesSection';
import ProvidersSection from '../components/ProvidersSection';
import HowItWorks from '../components/HowItWorks';

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <VenuesSection />
      <ProvidersSection />
      <HowItWorks />
      <Footer />
    </>
  );
};

export default Home;