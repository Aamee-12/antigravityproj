import { AlertCircle, Flame } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function AlertsList() {
  const { t } = useLanguage();

  const alerts = [
    {
      id: 1,
      title: t('aqi_poor'),
      desc: t('aqi_desc'),
      icon: Flame,
      color: 'text-red-500',
      bg: 'bg-red-50'
    },
    {
      id: 2,
      title: t('heatwave'),
      desc: t('heatwave_desc'),
      icon: AlertCircle,
      color: 'text-accent-yellow',
      bg: 'bg-yellow-50'
    }
  ];

  return (
    <div className="dashboard-card flex-1 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-text-main">{t('live_alerts')}</h3>
        <button className="text-brand-green font-medium text-sm hover:underline">{t('view_all')}</button>
      </div>
      
      <div className="space-y-4 flex-1">
        {alerts.map(alert => (
          <div key={alert.id} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
            <div className={`p-2 rounded-full ${alert.bg}`}>
              <alert.icon className={alert.color} size={20} />
            </div>
            <div>
              <h4 className="font-bold text-text-main text-sm">{alert.title}</h4>
              <p className="text-text-muted text-xs mt-0.5">{alert.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
