import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export default function EcoTreeCard({ score, message, subMessage }) {
  const { t } = useLanguage();
  
  // Calculate how many leaves should be shown based on score (max 10 leaves for score 100)
  const leavesToShow = Math.floor((score / 100) * 10);

  const leafPositions = [
    { cx: 80, cy: 30, delay: 0.1 },
    { cx: 50, cy: 45, delay: 0.2 },
    { cx: 110, cy: 45, delay: 0.3 },
    { cx: 35, cy: 75, delay: 0.4 },
    { cx: 125, cy: 75, delay: 0.5 },
    { cx: 65, cy: 60, delay: 0.6 },
    { cx: 95, cy: 60, delay: 0.7 },
    { cx: 50, cy: 95, delay: 0.8 },
    { cx: 110, cy: 95, delay: 0.9 },
    { cx: 80, cy: 15, delay: 1.0 },
  ];

  return (
    <motion.div 
      className="dashboard-card flex flex-col items-center h-full justify-between py-6 overflow-hidden relative"
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h3 className="text-text-main font-medium z-10">{t('eco_score')}</h3>
      
      <div className="relative w-40 h-40 flex items-center justify-center my-4">
        {/* SVG Tree Animation */}
        <svg viewBox="0 0 160 160" className="w-full h-full">
          {/* Trunk */}
          <motion.path 
            d="M 70 160 Q 80 100 80 60 Q 80 100 90 160 Z" 
            fill="#8B5A2B"
            initial={{ scaleY: 0, transformOrigin: 'bottom' }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          {/* Branches */}
          <motion.path 
            d="M 80 100 Q 50 80 40 60" 
            stroke="#8B5A2B" strokeWidth="6" strokeLinecap="round" fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.path 
            d="M 80 90 Q 110 70 120 50" 
            stroke="#8B5A2B" strokeWidth="6" strokeLinecap="round" fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          />

          {/* Leaves */}
          {leafPositions.slice(0, leavesToShow).map((pos, i) => (
            <motion.circle
              key={i}
              cx={pos.cx}
              cy={pos.cy}
              r="15"
              fill="#10b981"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.9 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                delay: 1 + pos.delay 
              }}
            />
          ))}
        </svg>

        {/* Score Overlay */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-full backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-text-main leading-none drop-shadow-md">{score}</span>
            <span className="text-text-main text-xs font-bold drop-shadow-md">/100</span>
          </div>
        </motion.div>
      </div>

      <div className="text-center mt-2 z-10">
        <p className="font-bold text-text-main">{message}</p>
        <p className="text-brand-green font-medium text-sm">{subMessage}</p>
      </div>
    </motion.div>
  );
}
