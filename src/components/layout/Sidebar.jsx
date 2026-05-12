import { NavLink } from 'react-router-dom';
import { Home, Bot, BarChart2, CheckSquare, Camera, Users, User, Settings, Leaf } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Sidebar({ isOpen, setIsOpen }) {
  const { t } = useLanguage();

  const navItems = [
    { name: t('nav_dashboard'), icon: Home, path: '/' },
    { name: t('nav_assistant'), icon: Bot, path: '/assistant' },
    { name: t('nav_insights'), icon: BarChart2, path: '/insights' },
    { name: t('nav_actions'), icon: CheckSquare, path: '/actions' },
    { name: t('nav_scanner'), icon: Camera, path: '/scanner' },
    { name: t('nav_community'), icon: Users, path: '/community' },
    { name: t('nav_profile'), icon: User, path: '/profile' },
    { name: t('nav_settings'), icon: Settings, path: '/settings' },
  ];

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={`
        w-64 h-screen bg-bg-light border-r border-gray-100 flex flex-col p-4 
        fixed left-0 top-0 z-50 overflow-y-auto transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="flex items-center gap-2 px-4 py-6 mb-4 mt-12 lg:mt-0">
          <Leaf className="text-brand-green fill-brand-green" size={28} />
          <span className="text-xl font-bold text-text-main">Eco <span className="text-brand-green">Setu</span></span>
        </div>
        
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-brand-green-light text-brand-green-dark font-medium' 
                    : 'text-text-muted hover:bg-gray-100 hover:text-text-main'
                }`
              }
            >
              <item.icon size={20} className="stroke-[2.5]" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
