import { useLanguage } from '../../context/LanguageContext';

export default function EcoScoreCard({ score, maxScore, message, subMessage }) {
  const { t } = useLanguage();
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / maxScore) * circumference;

  return (
    <div className="dashboard-card flex flex-col items-center h-full justify-between py-6">
      <h3 className="text-text-main font-medium">{t('eco_score')}</h3>
      
      <div className="relative w-40 h-40 flex items-center justify-center my-4">
        <svg className="transform -rotate-90 w-40 h-40">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#d1fae5"
            strokeWidth="12"
            fill="transparent"
            strokeLinecap="round"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#10b981"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-5xl font-bold text-text-main leading-none">{score}</span>
          <span className="text-text-muted text-sm font-medium">/{maxScore}</span>
        </div>
      </div>

      <div className="text-center mt-2">
        <p className="font-bold text-text-main">{message}</p>
        <p className="text-brand-green font-medium text-sm">{subMessage}</p>
      </div>
    </div>
  );
}
