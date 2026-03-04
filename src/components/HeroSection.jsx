import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.25, delayChildren: 0.5 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
};

const HeroSection = () => {
  const { dark } = useTheme();
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden transition-colors duration-500 ${
        dark ? 'bg-bg-dark' : 'bg-bg'
      }`}
    >
      {/* Decorative line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-32 bg-gradient-to-b from-transparent via-sage to-transparent origin-top"
      />

      {/* Decorative circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: dark ? 0.2 : 0.35, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className={`absolute -top-40 -right-40 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full border-2 ${
            dark ? 'border-sage' : 'border-sage/60'
          }`}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: dark ? 0.15 : 0.3, scale: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
          className={`absolute -bottom-60 -left-60 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] rounded-full border-2 ${
            dark ? 'border-sage-light' : 'border-sage-light/60'
          }`}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-3xl"
      >


        {/* Logo / Title */}
        <motion.h1
          variants={fadeUp}
          className={`font-heading text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl tracking-[0.08em] sm:tracking-[0.12em] leading-tight text-center ${
            dark ? 'text-heading-dark' : 'text-heading'
          }`}
        >
          <span className="inline-block">{t('heroTitle1')}</span>
          <br />
          <span className="text-sage">{t('heroTitle2')}</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className={`mt-8 sm:mt-10 text-base sm:text-lg md:text-lg lg:text-xl font-semibold tracking-wide max-w-xl mx-auto px-4 sm:px-0 leading-relaxed ${
            dark ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          {t('heroTagline')}
        </motion.p>

        {/* CTA */}
        <motion.div variants={fadeUp} className="mt-12">
          <a
            href="#ecosystem"
            className="inline-block font-heading text-xs sm:text-xs tracking-[0.15em] sm:tracking-[0.18em] px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-gold text-gold hover:bg-gold hover:text-white transition-all duration-500 rounded-none"
          >
            {t('heroCta')}
          </a>
        </motion.div>
      </motion.div>


    </section>
  );
};

export default HeroSection;
