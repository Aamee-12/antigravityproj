import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [userName, setUserName] = useState('');
  const [hasOnboarded, setHasOnboarded] = useState(false);
  
  const [ecoScore, setEcoScore] = useState(72);
  const [waterSaved, setWaterSaved] = useState(150);
  const [energySaved, setEnergySaved] = useState(20);
  const [co2Saved, setCo2Saved] = useState(5);
  
  const [activities, setActivities] = useState([
    { id: 1, title: 'Used metro', points: 5, time: '2 hours ago', iconType: 'train' },
    { id: 2, title: 'Analyzed traffic photo', points: 0, time: '4 hours ago', iconType: 'camera' }
  ]);

  const addActivity = (title, points, iconType) => {
    const newActivity = {
      id: Date.now(),
      title,
      points,
      time: 'Just now',
      iconType
    };
    setActivities([newActivity, ...activities]);
    if (points > 0) {
      setEcoScore(prev => Math.min(prev + points, 100));
    }
  };

  const completeOnboarding = (name) => {
    setUserName(name);
    setHasOnboarded(true);
  };

  return (
    <AppContext.Provider value={{
      userName, hasOnboarded, completeOnboarding,
      ecoScore, waterSaved, energySaved, co2Saved,
      activities, addActivity
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
