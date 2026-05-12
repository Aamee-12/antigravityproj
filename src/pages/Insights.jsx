import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  { name: 'Jan', footprint: 400, score: 45 },
  { name: 'Feb', footprint: 350, score: 52 },
  { name: 'Mar', footprint: 380, score: 50 },
  { name: 'Apr', footprint: 310, score: 61 },
  { name: 'May', footprint: 290, score: 68 },
  { name: 'Jun', footprint: 250, score: 72 },
];

export default function Insights() {
  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold text-text-main mb-8">Impact Insights</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="dashboard-card h-96 flex flex-col">
          <h3 className="text-xl font-bold text-text-main mb-6">Carbon Footprint (kg)</h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Bar dataKey="footprint" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-card h-96 flex flex-col">
          <h3 className="text-xl font-bold text-text-main mb-6">Eco Score Trend</h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
