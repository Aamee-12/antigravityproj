import { useState } from 'react';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold text-text-main mb-8">Settings</h2>
      
      <div className="dashboard-card space-y-6">
        <h3 className="text-xl font-bold text-text-main border-b border-gray-100 pb-2">Preferences</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-text-main">Push Notifications</h4>
            <p className="text-sm text-text-muted">Receive alerts for extreme weather.</p>
          </div>
          <button 
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-brand-green' : 'bg-gray-200'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${notifications ? 'left-7' : 'left-1'}`} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-text-main">Weekly Reports</h4>
            <p className="text-sm text-text-muted">Get a summary of your climate impact.</p>
          </div>
          <button 
            onClick={() => setWeeklyReport(!weeklyReport)}
            className={`w-12 h-6 rounded-full transition-colors relative ${weeklyReport ? 'bg-brand-green' : 'bg-gray-200'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${weeklyReport ? 'left-7' : 'left-1'}`} />
          </button>
        </div>

        <h3 className="text-xl font-bold text-text-main border-b border-gray-100 pb-2 mt-8">Account</h3>
        <div className="space-y-4">
          <button className="text-text-main font-medium hover:text-brand-green w-full text-left">Edit Profile Details</button>
          <button className="text-text-main font-medium hover:text-brand-green w-full text-left">Connect Smart Meter</button>
          <button className="text-red-500 font-medium hover:text-red-700 w-full text-left">Sign Out</button>
        </div>
      </div>
    </div>
  );
}
