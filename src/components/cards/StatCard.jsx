import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function StatCard({ title, value, unit, subtitle, icon: Icon, iconBgColor, iconColor, delay = 0 }) {
  // Number counter animation logic
  const springValue = useSpring(0, { bounce: 0, duration: 2000 });
  const displayValue = useTransform(springValue, Math.round);

  useEffect(() => {
    // Small timeout to allow entrance animation to start first
    const timeout = setTimeout(() => {
      springValue.set(value);
    }, 500 + (delay * 1000));
    return () => clearTimeout(timeout);
  }, [value, springValue, delay]);

  return (
    <motion.div 
      className="dashboard-card flex flex-col h-full items-center justify-center gap-6 py-8"
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className={`p-4 rounded-full ${iconBgColor}`}>
        <Icon className={iconColor} size={28} />
      </div>
      <div className="flex flex-col items-center gap-2 w-full">
        <h3 className="text-text-main font-medium text-center">{title}</h3>
        <div className="flex items-baseline gap-1">
          <motion.span className="text-5xl font-bold text-text-main">
            {displayValue}
          </motion.span>
          <span className="text-2xl font-bold text-text-main">{unit}</span>
        </div>
        <p className="text-text-muted text-sm">{subtitle}</p>
      </div>
    </motion.div>
  );
}
