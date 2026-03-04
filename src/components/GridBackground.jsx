import React from 'react';
import { useTheme } from '../context/ThemeContext';

const GridBackground = () => {
  const { dark } = useTheme();

  const lineColor = dark
    ? 'rgba(159,175,138,0.06)'
    : 'rgba(53,69,38,0.12)';

  const dotColor = dark
    ? 'rgba(159,175,138,0.08)'
    : 'rgba(53,69,38,0.18)';

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `
          radial-gradient(circle, ${dotColor} 1px, transparent 1px),
          linear-gradient(to right, ${lineColor} 1px, transparent 1px),
          linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px, 60px 60px, 60px 60px',
        backgroundPosition: '0 0, 0 0, 0 0',
      }}
    />
  );
};

export default GridBackground;
