import { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const initialActions = [
  { id: 1, title: 'Use public transport for commute', points: 10, iconType: 'train', completed: false },
  { id: 2, title: 'Opt for a plant-based meal today', points: 5, iconType: 'check', completed: false },
  { id: 3, title: 'Install LED bulbs in living room', points: 15, iconType: 'energy', completed: false },
  { id: 4, title: 'Fix leaking faucet', points: 8, iconType: 'water', completed: false },
];

export default function Actions() {
  const [actions, setActions] = useState(initialActions);
  const { addActivity } = useAppContext();

  const handleComplete = (id) => {
    const action = actions.find(a => a.id === id);
    if (!action || action.completed) return;

    setActions(actions.map(a => a.id === id ? { ...a, completed: true } : a));
    addActivity(action.title, action.points, action.iconType);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold text-text-main mb-6">Eco Actions</h2>
      <p className="text-text-muted mb-8">Complete these tasks to increase your Eco Score and unlock badges.</p>

      <div className="space-y-4">
        {actions.map(action => (
          <div 
            key={action.id} 
            className={`dashboard-card flex items-center justify-between transition-all ${action.completed ? 'opacity-50' : 'hover:border-brand-green cursor-pointer'}`}
            onClick={() => handleComplete(action.id)}
          >
            <div className="flex items-center gap-4">
              <button 
                disabled={action.completed}
                className="focus:outline-none"
              >
                {action.completed ? (
                  <CheckCircle2 className="text-brand-green" size={28} />
                ) : (
                  <Circle className="text-gray-300 hover:text-brand-green" size={28} />
                )}
              </button>
              <span className={`text-lg ${action.completed ? 'line-through text-text-muted' : 'text-text-main font-medium'}`}>
                {action.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-brand-green-light text-brand-green-dark px-3 py-1 rounded-full text-sm font-bold">
                +{action.points} pts
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
