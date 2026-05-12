import { Train, Camera, CheckSquare, Zap, Droplet } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';

const iconMap = {
  train: { icon: Train, color: 'text-accent-blue', bg: 'bg-blue-50' },
  camera: { icon: Camera, color: 'text-gray-600', bg: 'bg-gray-100' },
  check: { icon: CheckSquare, color: 'text-brand-green', bg: 'bg-brand-green-light' },
  energy: { icon: Zap, color: 'text-accent-yellow', bg: 'bg-yellow-50' },
  water: { icon: Droplet, color: 'text-accent-blue', bg: 'bg-blue-50' }
};

export default function ActivityList() {
  const { activities } = useAppContext();
  const { t } = useLanguage();

  return (
    <div className="dashboard-card flex-1 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-text-main">{t('recent_activity')}</h3>
        <button className="text-brand-green font-medium text-sm hover:underline">{t('view_all')}</button>
      </div>
      
      <div className="space-y-4 flex-1">
        {activities.slice(0, 3).map(activity => {
          const style = iconMap[activity.iconType] || iconMap.check;
          const IconComponent = style.icon;
          
          return (
            <div key={activity.id} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
              <div className={`p-2 rounded-full ${style.bg}`}>
                <IconComponent className={style.color} size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-text-main text-sm flex items-center gap-2">
                  {activity.title}
                  {activity.points > 0 && (
                    <span className="text-brand-green text-xs flex items-center gap-0.5">
                      🌱 +{activity.points} {t('pts')}
                    </span>
                  )}
                  {activity.title?.includes('photo') && <span>📸</span>}
                </h4>
                <p className="text-text-muted text-xs mt-0.5">{activity.time === 'Just now' ? t('just_now') : activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
