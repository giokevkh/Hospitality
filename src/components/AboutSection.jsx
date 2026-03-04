import React, { useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { Target, Eye } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
// import img1 from '../assets/01.jpeg';
import img2 from '../assets/02.jpeg';
import img3 from '../assets/03.jpeg';
import img4 from '../assets/04.jpeg';
import img5 from '../assets/05.jpeg';
import img7 from "../assets/07.jpeg";
import img10 from "../assets/010.jpeg";

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: 'easeOut' } },
});

const images = [img7, img2, img3, img4, img5, img10];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const { dark } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 transition-colors duration-500 ${
        dark ? 'bg-bg-dark' : 'bg-bg'
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
          <span className="text-gold text-sm tracking-[0.35em] font-heading">{t('aboutLabel')}</span>
          <h2 className={`font-heading text-3xl sm:text-4xl md:text-4xl lg:text-5xl tracking-[0.08em] mt-5 ${dark ? 'text-heading-dark' : 'text-heading'}`}>
            {t('aboutTitle')}
          </h2>
          <div className="w-16 h-[1px] bg-sage mx-auto mt-6" />
        </motion.div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-16 sm:mb-24">
          {/* Text Side */}
          <motion.div
            variants={fadeIn(0.2)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <p className={`text-base sm:text-lg md:text-lg leading-relaxed mb-5 sm:mb-6 text-justify ${dark ? 'text-text-dark' : 'text-text'}`}>
              {(() => {
                const text = t('aboutP1');
                const enName = 'Hospitality Ecosystems LLC';
                const kaName = 'შპს „სტუმარმასპინძლობის ეკოსისტემები"';
                const bold = text.startsWith(enName) ? enName : text.startsWith(kaName) ? kaName : null;
                if (!bold) return text;
                const rest = text.slice(bold.length);
                return <><strong>{bold}</strong>{rest}</>;
              })()}
            </p>
            <p className={`text-base sm:text-lg md:text-lg leading-relaxed text-justify ${dark ? 'text-text-dark' : 'text-text'}`}>
              {t('aboutP2')}
            </p>
          </motion.div>

          {/* Image Slideshow Side */}
          <motion.div
            variants={fadeIn(0.4)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-[0_8px_40px_rgba(79,93,58,0.12)]"
          >
            <div className="absolute inset-0 border-2 border-gold/20 rounded-lg z-10 pointer-events-none" />

            <AnimatePresence initial={false}>
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt="Hospitality"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-[2] pointer-events-none" />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    i === currentIndex ? 'bg-gold w-6' : 'bg-white/60 hover:bg-white/90'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Mission */}
          <motion.div
            variants={fadeIn(0.3)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`group relative border p-6 sm:p-10 md:p-12 transition-all duration-500 cursor-default ${
              dark
                ? 'bg-card-dark border-gray-200-dark hover:border-sage/50 hover:shadow-[0_8px_40px_rgba(159,175,138,0.08)]'
                : 'bg-white border-gray-200 hover:border-sage/50 hover:shadow-[0_8px_40px_rgba(159,175,138,0.12)]'
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center border border-sage/30 text-sage group-hover:bg-sage group-hover:text-white transition-all duration-500">
                <Target size={24} />
              </div>
              <h3 className={`font-heading text-lg sm:text-xl md:text-2xl tracking-[0.08em] sm:tracking-[0.12em] ${dark ? 'text-heading-dark' : 'text-heading'}`}>
                {t('missionTitle')}
              </h3>
            </div>
            <p className={`leading-[1.8] text-base sm:text-lg text-left ${dark ? 'text-text-dark' : 'text-text'}`}>
              {t('missionText')}
            </p>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-sage group-hover:w-full transition-all duration-700" />
          </motion.div>

          {/* Vision */}
          <motion.div
            variants={fadeIn(0.5)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`group relative border p-6 sm:p-10 md:p-12 transition-all duration-500 cursor-default ${
              dark
                ? 'bg-card-dark border-gray-200-dark hover:border-sage/50 hover:shadow-[0_8px_40px_rgba(159,175,138,0.08)]'
                : 'bg-white border-gray-200 hover:border-sage/50 hover:shadow-[0_8px_40px_rgba(159,175,138,0.12)]'
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center border border-sage/30 text-sage group-hover:bg-sage group-hover:text-white transition-all duration-500">
                <Eye size={24} />
              </div>
              <h3 className={`font-heading text-lg sm:text-xl md:text-2xl tracking-[0.08em] sm:tracking-[0.12em] ${dark ? 'text-heading-dark' : 'text-heading'}`}>
                {t('visionTitle')}
              </h3>
            </div>
            <p className={`leading-[1.8] text-base sm:text-lg text-left ${dark ? 'text-text-dark' : 'text-text'}`}>
              {t('visionText')}
            </p>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-sage group-hover:w-full transition-all duration-700" />
          </motion.div>

          {/* Values */}
          <motion.div
            variants={fadeIn(0.7)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`group relative border p-6 sm:p-10 md:p-12 transition-all duration-500 cursor-default md:col-span-2 lg:col-span-1 ${
              dark
                ? 'bg-card-dark border-gray-200-dark hover:border-sage/50 hover:shadow-[0_8px_40px_rgba(159,175,138,0.08)]'
                : 'bg-white border-gray-200 hover:border-sage/50 hover:shadow-[0_8px_40px_rgba(159,175,138,0.12)]'
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center border border-sage/30 text-sage group-hover:bg-sage group-hover:text-white transition-all duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
              </div>
              <h3 className={`font-heading text-lg sm:text-xl md:text-2xl tracking-[0.08em] sm:tracking-[0.12em] ${dark ? 'text-heading-dark' : 'text-heading'}`}>
                {t('valuesTitle')}
              </h3>
            </div>
            <p className={`leading-[1.8] text-base sm:text-lg text-left ${dark ? 'text-text-dark' : 'text-text'}`}>
              {t('valuesText')}
            </p>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-sage group-hover:w-full transition-all duration-700" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
