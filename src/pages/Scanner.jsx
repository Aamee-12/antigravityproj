import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export default function Scanner() {
  const { addActivity } = useAppContext();
  const { t } = useLanguage();
  const [image, setImage] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setResult(null);
    }
  };

  const handleScan = () => {
    if (!image) return;
    setScanning(true);
    
    // Simulate AI Processing time
    setTimeout(() => {
      setScanning(false);
      setResult({
        issue: "Water Leakage Detected",
        location: "Koramangala Block 3",
        pointsAwarded: 25,
        message: "Thank you for reporting this issue! Your local authorities have been notified."
      });
      addActivity("Reported Water Leakage", 25, "camera");
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-text-main flex items-center gap-3">
          <Camera className="text-brand-green" size={32} />
          {t('nav_scanner')}
        </h2>
        <p className="text-text-muted mt-2">Upload a photo of a local climate or infrastructure issue. Our AI will analyze it and reward you for your citizen science!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="dashboard-card flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden bg-gray-50 border-2 border-dashed border-gray-300">
          {!image ? (
            <label className="flex flex-col items-center cursor-pointer p-8 w-full h-full justify-center">
              <Upload size={48} className="text-gray-400 mb-4" />
              <span className="text-text-main font-medium">Click to Upload Photo</span>
              <span className="text-text-muted text-sm mt-2">Supports JPG, PNG</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          ) : (
            <div className="relative w-full h-full flex flex-col">
              <img src={image} alt="Upload" className="w-full h-64 object-cover rounded-t-xl" />
              
              {/* Laser Scanning Animation */}
              {scanning && (
                <motion.div 
                  className="absolute top-0 left-0 w-full h-1 bg-brand-green shadow-[0_0_15px_#10b981]"
                  animate={{ y: [0, 256, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              )}
              {scanning && (
                <div className="absolute inset-0 bg-brand-green/10 animate-pulse rounded-t-xl" />
              )}

              <div className="p-4 bg-white flex-1 rounded-b-xl border-t border-gray-100 flex items-center justify-center">
                {!scanning && !result && (
                  <button 
                    onClick={handleScan}
                    className="bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors w-full"
                  >
                    Analyze with AI
                  </button>
                )}
                {scanning && <span className="font-bold text-brand-green animate-pulse">Processing Image...</span>}
                {result && <span className="font-bold text-text-main flex items-center gap-2"><CheckCircle className="text-brand-green"/> Analysis Complete</span>}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="dashboard-card h-full flex flex-col justify-center">
            <h3 className="text-xl font-bold text-text-main mb-6 border-b border-gray-100 pb-4">AI Analysis Report</h3>
            
            {!result && !scanning && (
              <div className="flex-1 flex flex-col items-center justify-center text-text-muted text-center gap-4">
                <AlertTriangle size={32} className="opacity-50" />
                <p>Upload and scan an image to generate a report.</p>
              </div>
            )}

            {scanning && (
              <div className="flex-1 flex flex-col justify-center space-y-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
              </div>
            )}

            {result && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 flex flex-col justify-center gap-6"
              >
                <div>
                  <span className="text-sm text-text-muted font-medium uppercase tracking-wider">Identified Issue</span>
                  <p className="text-lg font-bold text-red-500 mt-1">{result.issue}</p>
                </div>
                <div>
                  <span className="text-sm text-text-muted font-medium uppercase tracking-wider">Location Tag</span>
                  <p className="text-lg font-bold text-text-main mt-1">{result.location}</p>
                </div>
                <div className="bg-brand-green-light p-4 rounded-xl border border-brand-green/20">
                  <p className="text-brand-green-dark font-medium">{result.message}</p>
                  <p className="text-2xl font-bold text-brand-green mt-2">+{result.pointsAwarded} Eco Points</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
