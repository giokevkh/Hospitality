import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Languages } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { dark, toggle: toggleTheme } = useTheme();
  const { lang, toggle: toggleLang, t } = useLanguage();

  const navLinks = [
    { label: t('navAbout'), href: '#about' },
    { label: t('navEcosystem'), href: '#ecosystem' },
    { label: t('navServices'), href: '#services' },
    { label: t('navContact'), href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false); // Close menu first
    
    // Small delay to let menu close animation complete
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const navbarHeight = 80; // Approximate navbar height
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? dark
            ? 'bg-bg-dark/95 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.3)]'
            : 'bg-bg/95 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 sm:py-3 md:py-2.5">
        {/* Logo */}
        <a
          href="#hero"
          className="transition-opacity duration-300 hover:opacity-80"
        >
          <img 
            src="/logo.png" 
            alt="Hospitality Ecosystems" 
            className="w-auto"
            style={{
              height: 'clamp(56px, 10vw, 80px)',
              ...(dark
                ? { filter: 'brightness(0) invert(1) contrast(1.5) saturate(1.2) drop-shadow(0 3px 6px rgba(255,255,255,0.3))' }
                : { filter: 'brightness(0) contrast(2) saturate(1.5) drop-shadow(0 3px 6px rgba(0,0,0,0.4))' }
              )
            }}
          />
        </a>

        {/* Desktop Links + Controls */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 lg:gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-heading text-sm font-semibold tracking-[0.2em] transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-sage hover:after:w-full after:transition-all after:duration-300 ${
                    dark ? 'text-gray-400 hover:text-sage' : 'text-gray-500 hover:text-sage'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className={`w-[1px] h-5 ${dark ? 'bg-gray-200-dark' : 'bg-gray-200'}`} />

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className={`flex items-center gap-1.5 text-xs tracking-wider font-heading transition-colors duration-300 cursor-pointer ${
              dark ? 'text-gray-400 hover:text-gold' : 'text-gray-500 hover:text-gold'
            }`}
            aria-label="Toggle language"
          >
            <Languages size={16} />
            {lang === 'en' ? 'GE' : 'ENG'}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 cursor-pointer ${
              dark
                ? 'text-gold hover:bg-gray-200-dark'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gold'
            }`}
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleLang}
            className={`text-xs font-heading tracking-wider cursor-pointer ${dark ? 'text-gray-400' : 'text-gray-500'}`}
          >
            {lang === 'en' ? 'GE' : 'EN'}
          </button>
          <button
            onClick={toggleTheme}
            className={`cursor-pointer ${dark ? 'text-gold' : 'text-gray-500'}`}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`transition-colors cursor-pointer ${dark ? 'text-heading-dark hover:text-gold' : 'text-heading hover:text-gold'}`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className={`md:hidden backdrop-blur-xl border-t overflow-hidden ${
              dark ? 'bg-bg-dark/98 border-gray-200-dark' : 'bg-bg/98 border-gray-200'
            }`}
          >
            <ul className="flex flex-col items-center py-8 gap-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`font-heading text-sm font-semibold tracking-[0.2em] transition-colors duration-300 ${
                      dark ? 'text-gray-400 hover:text-sage' : 'text-gray-500 hover:text-sage'
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
