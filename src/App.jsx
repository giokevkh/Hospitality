import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EcosystemDiagram from './components/EcosystemDiagram';
import ServicesAccordion from './components/ServicesAccordion';
import ContactSection from './components/ContactSection';
import FounderSection from './components/FounderSection';


const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="overflow-x-hidden relative">

          <Navbar />
          <HeroSection />
          <AboutSection />
          <EcosystemDiagram />
          <ServicesAccordion />
          <FounderSection />
          <ContactSection />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;