// App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';

// Pages
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicyPage  from './pages/PrivacyPolicyPage';
import AdminDashboard     from './pages/AdminDashboard';
import StickyBanner from './components/Stickybanner';

// Layout
import Nav    from './components/Nav';
import Footer from './components/Footer';
import WaFloat from './components/WaFloat';

// Sections — each lives in its own file
import Hero                 from './components/Hero';
import Pricing              from './components/Pricing';
import Services             from './components/Services';
import WhyAndForm           from './components/WhyAndForm';
import Statistics           from './components/Statistics';
import CompleteCare         from './components/CompleteCare';
import CompetitiveAdvantage from './components/CompetitiveAdvantage';
import Testimonials         from './components/Testimonials';  // ← NEW
import FAQ                  from './components/FAQ';

// Pricing configs
import { getPricingConfig } from './data/pricingConfigs';

/* ─── Main landing page ─── */
const LandingPage = () => {
  const location = useLocation();
  const pricingConfig = getPricingConfig(location.pathname);

  return (
    <>
      <Nav />
      <WaFloat />
      <StickyBanner bannerConfig={pricingConfig.stickyBanner} />
      <main>
        {/*
          Section order matches the original App.jsx layout:
          Hero → Pricing → Services → WhyAndForm → Statistics
               → CompleteCare → CompetitiveAdvantage → FAQ
        */}
        <Hero />
        <Pricing config={pricingConfig} />
        <Services />
        <WhyAndForm />
        <Statistics />
        <CompleteCare />
        <CompetitiveAdvantage />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </>
  );
};

/* ─── Router ─── */
export default function App() {
  return (
    <Routes>
      <Route path="/"                    element={<LandingPage />} />
      <Route path="/making-home-senior-friendly"        element={<LandingPage />} />
      <Route path="/companion-support-for-elders"        element={<LandingPage />} />
      <Route path="/psychologist-and-psychiatrist-support" element={<LandingPage />} />
      <Route path="/admin/*"             element={<AdminDashboard />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/privacy-policy"      element={<PrivacyPolicyPage />} />
    </Routes>
  );
}