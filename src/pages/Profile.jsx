export default function Profile() {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold text-text-main mb-8">Your Profile</h2>
      
      <div className="dashboard-card mb-8 text-center flex flex-col items-center">
        <img 
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
          alt="User Profile" 
          className="w-32 h-32 rounded-full object-cover shadow-sm border-4 border-white mb-4"
        />
        <h3 className="text-2xl font-bold text-text-main">Priya Sharma</h3>
        <p className="text-text-muted">Bengaluru, India</p>
        <span className="mt-3 bg-brand-green-light text-brand-green-dark px-4 py-1 rounded-full text-sm font-bold">
          Level 4: Climate Champion
        </span>
      </div>

      <h3 className="text-xl font-bold text-text-main mb-4">Badges Earned</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['🌱 First Tree', '🚇 Commuter', '💡 Energy Saver', '♻️ Zero Waste'].map((badge, i) => (
          <div key={i} className="dashboard-card flex flex-col items-center justify-center py-6">
            <span className="text-3xl mb-2">{badge.split(' ')[0]}</span>
            <span className="text-sm font-medium text-text-main text-center">{badge.substring(badge.indexOf(' ') + 1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
