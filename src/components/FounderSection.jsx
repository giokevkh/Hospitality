import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import founderImg from '../assets/06.jpeg';

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: 'easeOut' } },
});

const FounderSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { dark } = useTheme();
  const { t } = useLanguage();

  const paragraphs = t('founderBio');

  return (
    <section
      id="founder"
      className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 transition-colors duration-500 ${
        dark ? 'bg-card-dark' : 'bg-white'
      }`}
    >
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          variants={fadeIn()}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-12 sm:mb-20"
        >
          <span className="text-gold text-sm tracking-[0.35em] font-heading">{t('founderLabel')}</span>
          <h2 className={`font-heading text-3xl sm:text-4xl md:text-4xl lg:text-5xl tracking-[0.08em] mt-5 ${dark ? 'text-heading-dark' : 'text-heading'}`}>
            {t('founderSectionTitle')}
          </h2>
          <div className="w-16 h-[1px] bg-sage mx-auto mt-6" />
        </motion.div>

        {/* Premium Circular Layout */}
        <div className="flex flex-col items-center max-w-5xl mx-auto">
          {/* Circular Profile Image */}
          <motion.div
            variants={fadeIn(0.2)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative mb-8"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-[0_20px_60px_rgba(79,93,58,0.2)]">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border-2 border-gold/30 z-10 pointer-events-none" />
              <div className="absolute -inset-2 rounded-full border border-gold/10 z-10 pointer-events-none" />
              
              <img
                src={founderImg}
                alt="Natia Mekoshvili"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-[2] pointer-events-none" />
            </div>
          </motion.div>

          {/* Name and Title - Inner Circle */}
          <motion.div
            variants={fadeIn(0.3)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-center mt-8 mb-10"
          >
            <h3 className={`font-heading text-2xl sm:text-3xl md:text-4xl tracking-[0.12em] mb-3 ${dark ? 'text-heading-dark' : 'text-heading'}`}>
              {t('founderFullName')}
            </h3>
            <p className="text-gold text-base sm:text-lg tracking-[0.15em] font-medium mb-4">
              {t('founderTitle')}
            </p>
            <div className="w-16 h-[1px] bg-sage mx-auto" />
          </motion.div>

          {/* Bio Content - Expanding Outward */}
          <motion.div
            variants={fadeIn(0.4)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6 text-left max-w-4xl mb-8 w-full"
          >
            {Array.isArray(paragraphs) && paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={`text-base sm:text-lg leading-relaxed text-justify ${dark ? 'text-text-dark' : 'text-text'}`}
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Decorative element at bottom */}
          <motion.div
            variants={fadeIn(0.5)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex items-center justify-center gap-4"
          >
            <span className={`w-16 h-[1px] ${dark ? 'bg-gray-200-dark' : 'bg-gray-200'}`} />
            <svg viewBox="0 0 24 34" className="w-3 opacity-25" fill="#9FAF8A">
              <path d="M12 0 C18 8 22 16 12 34 C2 16 6 8 12 0Z" />
            </svg>
            <span className={`w-16 h-[1px] ${dark ? 'bg-gray-200-dark' : 'bg-gray-200'}`} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
