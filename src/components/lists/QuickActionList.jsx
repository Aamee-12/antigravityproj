import { CheckCircle2, Circle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function QuickActionList() {
  const { addActivity } = useAppContext();
  
  // Internal state for these specific dashboard quick actions
  const [actions, setActions] = useState([
    { id: 'q1', title: 'Carpooled today', points: 10, iconType: 'train', completed: false },
    { id: 'q2', title: 'Used reusable bag', points: 5, iconType: 'check', completed: false },
    { id: 'q3', title: 'Turned off AC for 2h', points: 15, iconType: 'energy', completed: false },
  ]);

  const handleComplete = (id) => {
    const action = actions.find(a => a.id === id);
    if (!action || action.completed) return;

    setActions(actions.map(a => a.id === id ? { ...a, completed: true } : a));
    addActivity(action.title, action.points, action.iconType);
  };

  return (
    <div className="dashboard-card flex-1 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-text-main">Quick Log</h3>
        <span className="text-xs font-bold text-brand-green bg-brand-green-light px-2 py-1 rounded">Daily Bonus</span>
      </div>
      
      <div className="space-y-3 flex-1">
        {actions.map((action, i) => (
          <motion.div 
            key={action.id} 
            className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${action.completed ? 'bg-gray-50 border-transparent opacity-60' : 'bg-white border-gray-100 hover:border-brand-green shadow-sm'}`}
            onClick={() => handleComplete(action.id)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + (i * 0.1) }}
            whileHover={!action.completed ? { scale: 1.02 } : {}}
            whileTap={!action.completed ? { scale: 0.98 } : {}}
          >
            <div className="flex items-center gap-3">
              <button disabled={action.completed} className="focus:outline-none">
                {action.completed ? (
                  <CheckCircle2 className="text-brand-green" size={24} />
                ) : (
                  <Circle className="text-gray-300 hover:text-brand-green transition-colors" size={24} />
                )}
              </button>
              <span className={`text-sm ${action.completed ? 'line-through text-text-muted' : 'text-text-main font-medium'}`}>
                {action.title}
              </span>
            </div>
            {!action.completed && (
              <span className="text-xs font-bold text-brand-green">+{action.points}</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
