import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface FloatingControlsProps {
  onBack: () => void;
  showPetals: boolean;
  onTogglePetals: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  onBack,
  showPetals,
  onTogglePetals,
  isPlayingMusic,
  onToggleMusic,
}) => {
  return (
    <>
      {/* Floating Back to Hero Button */}
      <div className="fixed top-3 left-3 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md text-xs font-medium border border-white/20 transition-all shadow-md active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </motion.button>
      </div>

      {/* Top-Right Phone Container Controls */}
      <div className="absolute top-3 right-3 z-40 flex items-center gap-2">
        {/* Petal Canvas Toggle */}
        <button
          onClick={onTogglePetals}
          title={showPetals ? 'Tắt hiệu ứng' : 'Bật hiệu ứng'}
          aria-label="Toggle Petals"
          className="relative w-8 h-8 rounded-full bg-black/70 hover:bg-black/85 border border-white/70 shadow-md flex items-center justify-center text-white overflow-hidden active:scale-95 transition-all"
        >
          <Sparkles className={`w-3.5 h-3.5 ${showPetals ? 'text-pink-300' : 'text-stone-400'}`} />
        </button>

        {/* Audio Toggle Icon */}
        <button
          onClick={onToggleMusic}
          aria-label="Toggle Music"
          title={isPlayingMusic ? 'Tắt nhạc' : 'Bật nhạc'}
          className="relative w-8 h-8 rounded-full bg-black/80 border border-white/80 shadow-md flex items-center justify-center text-white overflow-hidden active:scale-95 transition-transform"
        >
          <div
            className={`w-full h-full flex items-center justify-center ${
              isPlayingMusic ? 'animate-[spin_5s_linear_infinite]' : ''
            }`}
          >
            <div className="absolute inset-1 rounded-full border border-white/20" />
            <div className="absolute inset-2 rounded-full border border-white/10" />
            <span className="text-xs font-serif text-white">♫</span>
          </div>
          {!isPlayingMusic && (
            <div className="absolute inset-0 bg-red-900/60 flex items-center justify-center">
              <span className="w-5 h-0.5 bg-white rotate-45 rounded-full" />
            </div>
          )}
        </button>
      </div>
    </>
  );
};

export default FloatingControls;

