import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const AccordionItem = ({ item, isOpen, onClick, index, dark }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`border-b last:border-b-0 ${dark ? 'border-gray-200-dark' : 'border-gray-200'}`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 sm:py-6 md:py-8 text-left group cursor-pointer"
      >
        <div className="flex items-center gap-4 sm:gap-6">
          <h3 className={`font-heading text-base sm:text-lg md:text-lg tracking-[0.05em] sm:tracking-[0.08em] transition-colors duration-300 ${
            isOpen
              ? dark ? 'text-heading-dark' : 'text-heading'
              : dark ? 'text-text-dark group-hover:text-heading-dark' : 'text-text group-hover:text-heading'
          }`}>
            {item.title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`transition-colors duration-300 ${isOpen ? 'text-sage' : dark ? 'text-gray-400 group-hover:text-sage' : 'text-gray-300 group-hover:text-sage'}`}
        >
          <ChevronDown size={22} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-6 sm:pb-8 pl-12 sm:pl-16 md:pl-20 pr-4">
              <ul className="space-y-3">
                {item.details.map((detail, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    className={`flex items-start gap-3 text-base md:text-base leading-relaxed ${dark ? 'text-text-dark' : 'text-text'}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sage/60 mt-2 shrink-0" />
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ServicesAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { dark } = useTheme();
  const { t } = useLanguage();

  const servicesData = t('svcItems');

  return (
    <section
      id="services"
      className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 transition-colors duration-500 ${
        dark ? 'bg-bg-dark' : 'bg-bg'
      }`}
    >
      <div ref={ref} className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm tracking-[0.35em] font-heading">{t('svcLabel')}</span>
          <h2 className={`font-heading text-3xl sm:text-4xl md:text-4xl lg:text-5xl tracking-[0.08em] mt-5 ${dark ? 'text-heading-dark' : 'text-heading'}`}>
            {t('svcTitle')}
          </h2>
          <div className="w-16 h-[1px] bg-sage mx-auto mt-6" />
          <p className="text-gray-400 text-base md:text-lg mt-6 max-w-lg mx-auto leading-relaxed px-4 text-center">
            {t('svcSubtitle')}
          </p>
        </motion.div>

        {/* Accordion */}
        <div className={`border-t ${dark ? 'border-gray-200-dark' : 'border-gray-200'}`}>
          {Array.isArray(servicesData) && servicesData.map((item, index) => (
            <AccordionItem
              key={item.number}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              dark={dark}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesAccordion;
