import { useState } from 'react';
import { MessageSquare, Heart, Share2 } from 'lucide-react';

export default function Community() {
  const [posts, setPosts] = useState([
    { id: 1, author: 'Kavya B.', time: '2h ago', content: 'Just finished setting up my rooftop rainwater harvesting system before the monsoons! Anyone else doing this in Indiranagar?', likes: 24, comments: 5 },
    { id: 2, author: 'Rahul M.', time: '5h ago', content: 'The new metro line connection is saving me 2kg of CO2 emissions daily compared to driving.', likes: 45, comments: 12 },
  ]);
  const [newPost, setNewPost] = useState('');

  const handlePost = () => {
    if (!newPost.trim()) return;
    setPosts([
      { id: Date.now(), author: 'You', time: 'Just now', content: newPost, likes: 0, comments: 0 },
      ...posts
    ]);
    setNewPost('');
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold text-text-main mb-6">Community Feed</h2>
      
      <div className="dashboard-card mb-8">
        <textarea 
          className="w-full bg-bg-light border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-green resize-none"
          rows="3"
          placeholder="Share your latest eco-action..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        ></textarea>
        <div className="flex justify-end mt-4">
          <button 
            onClick={handlePost}
            className="bg-brand-green hover:bg-brand-green-dark text-white font-medium py-2 px-6 rounded-full transition-colors"
          >
            Post
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="dashboard-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-green-light flex items-center justify-center text-brand-green font-bold">
                {post.author.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-text-main">{post.author}</h4>
                <p className="text-xs text-text-muted">{post.time}</p>
              </div>
            </div>
            <p className="text-text-main mb-6">{post.content}</p>
            <div className="flex items-center gap-6 border-t border-gray-100 pt-4">
              <button className="flex items-center gap-2 text-text-muted hover:text-red-500 transition-colors">
                <Heart size={18} /> <span className="text-sm font-medium">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-text-muted hover:text-brand-green transition-colors">
                <MessageSquare size={18} /> <span className="text-sm font-medium">{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-text-muted hover:text-accent-blue transition-colors ml-auto">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
