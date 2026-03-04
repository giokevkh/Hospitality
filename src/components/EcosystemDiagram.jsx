import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const EcosystemDiagram = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const { dark } = useTheme();
  const { t } = useLanguage();

  const services = t('ecoServices');

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const getPosition = (index, total, radius) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  // Desktop values
  const containerSize = 620;
  const radius = 220;
  const center = containerSize / 2;
  const svgSize = containerSize;

  return (
    <section
      id="ecosystem"
      className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 transition-colors duration-500 ${
        dark ? 'bg-card-dark' : 'bg-white'
      }`}
    >
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-20"
        >
          <span className="text-gold text-sm tracking-[0.35em] font-heading">{t('ecoLabel')}</span>
          <h2 className={`font-heading text-3xl sm:text-4xl md:text-4xl lg:text-5xl tracking-[0.08em] mt-5 ${dark ? 'text-heading-dark' : 'text-heading'}`}>
            {t('ecoTitle')}
          </h2>
          <div className="w-16 h-[1px] bg-sage mx-auto mt-6" />
          <p className="text-gray-400 text-base md:text-lg mt-5 sm:mt-6 max-w-lg mx-auto px-4 leading-relaxed">
            {t('ecoSubtitle')}
          </p>
        </motion.div>

        {/* ===== MOBILE LAYOUT ===== */}
        {isMobile && (
          <div className="flex flex-col items-center gap-6">
            {/* Center Hub */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-heading to-sage flex items-center justify-center shadow-[0_6px_35px_rgba(79,93,58,0.35)]">
                <div className="text-center text-white px-4">
                  <p className="font-heading text-sm tracking-[0.15em] leading-tight">
                    {t('ecoCenter1')}
                  </p>
                  <div className="w-8 h-[1px] bg-white/50 mx-auto my-2" />
                  <p className="font-heading text-sm tracking-[0.15em] leading-tight">
                    {t('ecoCenter2')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Decorative connector line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-[1px] h-6 bg-sage/40 origin-top"
            />

            {/* Service Cards Grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-md items-start">
              {Array.isArray(services) && services.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  onClick={() => setHovered(hovered === i ? null : i)}
                  className={`relative border rounded-lg p-5 cursor-pointer transition-all duration-300 ${
                    hovered === i
                      ? dark
                        ? 'border-gold/60 bg-card-dark shadow-[0_4px_20px_rgba(168,136,42,0.15)]'
                        : 'border-gold/60 bg-card shadow-[0_4px_20px_rgba(168,136,42,0.12)]'
                      : dark
                        ? 'border-gray-200-dark bg-card-dark'
                        : 'border-gray-200 bg-card'
                  }`}
                >
                  {/* Title */}
                  <p className={`font-heading text-xs font-semibold tracking-[0.03em] mt-3 leading-tight break-words ${
                    dark ? 'text-heading-dark' : 'text-heading'
                  }`}>
                    {service.title}
                  </p>

                  {/* Description — shown when tapped */}
                  {hovered === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className={`text-sm font-medium leading-relaxed mt-3 ${
                        dark ? 'text-text-dark' : 'text-gray-500'
                      }`}
                    >
                      {service.desc}
                    </motion.p>
                  )}

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 h-[2px] rounded-b-lg transition-all duration-500 ${
                    hovered === i ? 'w-full bg-gold' : 'w-0 bg-sage'
                  }`} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ===== DESKTOP LAYOUT (orbital diagram) ===== */}
        {!isMobile && (
          <div className="flex items-center justify-center">
            <div
              className="relative"
              style={{ width: containerSize, height: containerSize, maxWidth: '100%' }}
            >
              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${svgSize} ${svgSize}`}>
                {Array.isArray(services) && services.map((_, i) => {
                  const pos = getPosition(i, 6, radius);
                  return (
                    <motion.line
                      key={`line-${i}`}
                      x1={center} y1={center}
                      x2={center + pos.x} y2={center + pos.y}
                      stroke="#9FAF8A"
                      strokeWidth="0.5"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
                      transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                    />
                  );
                })}
                <motion.circle
                  cx={center} cy={center} r={radius}
                  fill="none" stroke="#9FAF8A" strokeWidth="0.5" strokeDasharray="2 6"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 0.25 } : {}}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </svg>

              {/* Center Circle */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, type: 'spring', stiffness: 200, damping: 20 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-heading to-sage flex items-center justify-center shadow-[0_6px_35px_rgba(79,93,58,0.35)]">
                  <div className="text-center text-white">
                    <p className="font-heading text-xs sm:text-sm tracking-[0.15em] leading-tight">
                      {t('ecoCenter1')}
                    </p>
                    <div className="w-6 h-[1px] bg-white/50 mx-auto my-1" />
                    <p className="font-heading text-xs sm:text-sm tracking-[0.15em] leading-tight">
                      {t('ecoCenter2')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Satellite Services */}
              {Array.isArray(services) && services.map((service, i) => {
                const pos = getPosition(i, 6, radius);
                const isActive = hovered === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1, x: pos.x, y: pos.y } : {}}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.15, type: 'spring', stiffness: 150, damping: 18 }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ zIndex: isActive ? 20 : 5 }}
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? 1.15 : 1,
                        borderColor: isActive ? '#D6B25E' : dark ? '#353830' : '#9FAF8A',
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 flex flex-col items-center justify-center shadow-[0_2px_12px_rgba(79,93,58,0.1)] hover:shadow-[0_4px_24px_rgba(159,175,138,0.25)] transition-shadow duration-300 ${
                        dark ? 'bg-bg-dark' : 'bg-white'
                      }`}
                    >
                      <span className={`text-center leading-[1.2] font-medium text-[10px] sm:text-[12px] px-2 max-w-[95px] sm:max-w-[120px] break-words ${dark ? 'text-gray-400' : 'text-heading'}`}>
                        {service.title}
                      </span>
                    </motion.div>

                    {/* Tooltip */}
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={isActive ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.9 }}
                      transition={{ duration: 0.25 }}
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 border shadow-xl p-4 pointer-events-none w-52 ${
                        dark ? 'bg-card-dark border-sage/20' : 'bg-white border-sage/30'
                      }`}
                    >
                      <p className={`font-heading text-xs tracking-[0.1em] mb-1 ${dark ? 'text-heading-dark' : 'text-heading'}`}>
                        {service.title}
                      </p>
                      <p className="text-gray-400 text-[11px] leading-relaxed">{service.desc}</p>
                      <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 border-t border-l rotate-45 ${
                        dark ? 'bg-card-dark border-sage/20' : 'bg-white border-sage/30'
                      }`} />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EcosystemDiagram;
