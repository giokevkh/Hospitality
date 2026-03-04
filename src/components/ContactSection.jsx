import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, Linkedin, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: 'easeOut' } },
});

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { dark } = useTheme();
  const { t } = useLanguage();

  return (
    <>
      <section
        id="contact"
        className={`py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-10 transition-colors duration-500 ${
          dark ? 'bg-card-dark' : 'bg-white'
        }`}
      >
        <div ref={ref} className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            variants={fadeIn()}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-center mb-10 sm:mb-16"
          >
            <span className="text-gold text-sm tracking-[0.35em] font-heading">{t('contactLabel')}</span>
            <h2 className={`font-heading text-3xl sm:text-4xl md:text-4xl lg:text-5xl tracking-[0.08em] mt-5 ${dark ? 'text-heading-dark' : 'text-heading'}`}>
              {t('contactTitle')}
            </h2>
            <div className="w-16 h-[1px] bg-sage mx-auto mt-6" />
          </motion.div>

          {/* Contact Card */}
          <motion.div
            variants={fadeIn(0.2)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="max-w-lg mx-auto text-center"
          >
            {/* Founder */}
            <div className="mb-10">
              <h3 className={`font-heading text-lg sm:text-xl tracking-[0.12em] ${dark ? 'text-heading-dark' : 'text-heading'}`}>
                {t('founderName')}
              </h3>
              <p className="text-sage text-base tracking-[0.1em] mt-2">{t('founderRole')}</p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <a
                href="https://maps.google.com/?q=Tbilisi,Georgia"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-3 transition-colors duration-300 group ${
                  dark ? 'text-text-dark hover:text-heading-dark' : 'text-text hover:text-heading'
                }`}
              >
                <MapPin size={20} className="text-sage/70 group-hover:text-sage transition-colors" />
                <span className="text-base tracking-wide">{t('location')}</span>
              </a>

              <a
                href="tel:+995599218488"
                className={`flex items-center justify-center gap-3 transition-colors duration-300 group ${
                  dark ? 'text-text-dark hover:text-heading-dark' : 'text-text hover:text-heading'
                }`}
              >
                <Phone size={20} className="text-sage/70 group-hover:text-sage transition-colors" />
                <span className="text-base tracking-wide">{t('phone')}</span>
              </a>

              <a
                href="mailto:natiamekoshvili@gmail.com"
                className={`flex items-center justify-center gap-3 transition-colors duration-300 group ${
                  dark ? 'text-text-dark hover:text-heading-dark' : 'text-text hover:text-heading'
                }`}
              >
                <Mail size={20} className="text-sage/70 group-hover:text-sage transition-colors" />
                <span className="text-base tracking-wide">{t('email')}</span>
              </a>
            </div>

            {/* LinkedIn Button */}
            <motion.div
              variants={fadeIn(0.4)}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="mt-10"
            >
              <a
                href="http://www.linkedin.com/in/natia-mekoshvili-73213034"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-3 font-heading text-sm sm:text-base tracking-[0.15em] px-10 py-4 border transition-all duration-500 ${
                  dark
                    ? 'border-sage/30 text-heading-dark hover:bg-sage hover:text-white'
                    : 'border-sage/40 text-heading hover:bg-sage hover:text-white'
                }`}
              >
                <Linkedin size={18} />
                {t('linkedin')}
              </a>
            </motion.div>

            {/* Decorative divider */}
            <div className="mt-16 flex items-center justify-center gap-4">
              <span className={`w-12 h-[1px] ${dark ? 'bg-gray-200-dark' : 'bg-gray-200'}`} />
              <svg viewBox="0 0 24 34" className="w-3 opacity-25" fill="#9FAF8A">
                <path d="M12 0 C18 8 22 16 12 34 C2 16 6 8 12 0Z" />
              </svg>
              <span className={`w-12 h-[1px] ${dark ? 'bg-gray-200-dark' : 'bg-gray-200'}`} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-2 sm:py-3 px-4 sm:px-6 ${dark ? 'bg-black' : 'bg-heading'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Hospitality Ecosystems Logo" 
              className="h-8 sm:h-10 md:h-12 w-auto"
              style={{
                filter: 'brightness(0) invert(1) contrast(1.5) saturate(1.2) drop-shadow(0 3px 6px rgba(255,255,255,0.3))'
              }}
            />
           
          </div>
          <p className="text-white/30 text-[10px] sm:text-xs tracking-wider">
            {t('footer')}
          </p>
        </div>
      </footer>
    </>
  );
};

export default ContactSection;
