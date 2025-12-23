
import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button, a, .hover-target')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Use Variants type and 'as const' to fix type mismatch with framer-motion's strict transition types
  const variants: Variants = {
    default: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      scale: 1,
      backgroundColor: '#FF5E4D',
      transition: { type: 'spring' as const, damping: 25, stiffness: 350, mass: 0.5 }
    },
    hover: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: 2.5,
      backgroundColor: 'rgba(255, 94, 77, 0.3)',
      transition: { type: 'spring' as const, damping: 25, stiffness: 350, mass: 0.5 }
    }
  };

  return (
    <>
      {/* Main Cursor Dot - Sharp and Small */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={isHovering ? "hover" : "default"}
        variants={variants}
      />
      {/* Outer Ring - More Subtle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#FF5E4D]/30 rounded-full pointer-events-none z-[9998] hidden md:block"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.2 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ type: 'spring', damping: 35, stiffness: 250, mass: 0.8 }}
      />
    </>
  );
};

export default CustomCursor;