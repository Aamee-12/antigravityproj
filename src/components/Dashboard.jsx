import TopBar from './layout/TopBar';
import EcoTreeCard from './cards/EcoTreeCard';
import StatCard from './cards/StatCard';
import AlertsList from './lists/AlertsList';
import ActivityList from './lists/ActivityList';
import QuickActionList from './lists/QuickActionList';
import { Droplet, Zap, Leaf } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { ecoScore, waterSaved, energySaved, co2Saved } = useAppContext();
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <TopBar />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
      >
        <motion.div variants={itemVariants} className="h-80">
          <EcoTreeCard 
            score={ecoScore} 
            message={t('great_job')} 
            subMessage={t('this_week_pts')} 
          />
        </motion.div>
        <motion.div variants={itemVariants} className="h-80">
          <StatCard 
            title={t('water_saved')}
            value={waterSaved}
            unit="L"
            subtitle={t('this_week')}
            icon={Droplet}
            iconBgColor="bg-blue-50"
            iconColor="text-accent-blue fill-accent-blue"
            delay={0.1}
          />
        </motion.div>
        <motion.div variants={itemVariants} className="h-80">
          <StatCard 
            title={t('energy_saved')}
            value={energySaved}
            unit="kWh"
            subtitle={t('this_week')}
            icon={Zap}
            iconBgColor="bg-yellow-50"
            iconColor="text-accent-yellow fill-accent-yellow"
            delay={0.2}
          />
        </motion.div>
        <motion.div variants={itemVariants} className="h-80">
          <StatCard 
            title={t('co2_saved')}
            value={co2Saved}
            unit="kg"
            subtitle={t('this_week')}
            icon={Leaf}
            iconBgColor="bg-green-50"
            iconColor="text-brand-green fill-brand-green"
            delay={0.3}
          />
        </motion.div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-72"
      >
        <motion.div variants={itemVariants} className="flex flex-col h-full">
          <QuickActionList />
        </motion.div>
        <motion.div variants={itemVariants} className="flex flex-col h-full">
          <ActivityList />
        </motion.div>
        <motion.div variants={itemVariants} className="flex flex-col h-full">
          <AlertsList />
        </motion.div>
      </motion.div>
    </div>
  );
}
