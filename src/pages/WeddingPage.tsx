import React, { useState } from 'react';
import { PhoneFrame } from '../components/layout/PhoneFrame';
import { WeddingPetalsCanvas } from '../components/common/WeddingPetalsCanvas';
import { ScrollToTopButton } from '../components/common/ScrollToTopButton';
import { FloatingControls } from '../components/wedding/FloatingControls';
import { WeddingGiftModal } from '../components/wedding/WeddingGiftModal';
import {
  WeddingHeroCover,
  WeddingLoveStoryBanner,
  WeddingMessageSection,
  WeddingBentoStorySection,
  WeddingFallInLoveSection,
  WeddingStoryGridSection,
  WeddingCalendarSection,
  WeddingCloudsPoemSection,
  WeddingVenueSection,
  WeddingGiftSection,
  WeddingFooterSection,
} from '../components/wedding/sections';
import { useAudioPlayer, useCountdown, useScrollTop, useClipboard } from '../hooks';
import { WEDDING_AUDIO_URL } from '../constants/images.constants';
import { groomBank, brideBank } from '../constants/bank.constants';
import { WEDDING_CONFIG, WEDDING_COUPLE } from '../config/wedding.config';
import type { WeddingPageProps } from '../types/wedding.types';

export const WeddingPage: React.FC<WeddingPageProps> = ({ onBackToTech }) => {
  const [showPetals, setShowPetals] = useState(true);
  const [showGiftModal, setShowGiftModal] = useState(false);

  // Custom hooks for cleanly separated concerns
  const { audioRef, isPlayingMusic, toggleMusic } = useAudioPlayer();
  const { showScrollTop, scrollToTop } = useScrollTop();
  const { copySuccess, copy } = useClipboard();
  const timeLeft = useCountdown(WEDDING_CONFIG.targetDate);

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-stone-900 font-sans relative selection:bg-rose-200 selection:text-rose-900">
      {/* HTML5 Audio Player */}
      <audio ref={audioRef} src={WEDDING_AUDIO_URL} loop preload="auto" />

      {/* PHONE-STYLE CONTAINER (500px width matching template) */}
      <PhoneFrame>
        {/* Ambient Falling Petals & Floating Sparkles Canvas */}
        {showPetals && <WeddingPetalsCanvas />}

        {/* Floating Controls (Back to Hero, Toggle Petals, Toggle Audio) */}
        <FloatingControls
          onBack={onBackToTech}
          showPetals={showPetals}
          onTogglePetals={() => setShowPetals((prev) => !prev)}
          isPlayingMusic={isPlayingMusic}
          onToggleMusic={toggleMusic}
        />

        {/* Section 1: Hero Cover */}
        <WeddingHeroCover />

        {/* Section 2: Our Love Story Banner & Sweet Moment */}
        <WeddingLoveStoryBanner />

        {/* Section 3: Tâm sự ngày cưới */}
        <WeddingMessageSection />

        {/* Section 4: Bento Photos Story & December 06 */}
        <WeddingBentoStorySection />

        {/* Section 5: Song Hỷ & Deep Embrace */}
        <WeddingFallInLoveSection />

        {/* Section 6: Love Wedding Information Grid */}
        <WeddingStoryGridSection />

        {/* Section 7: Calendar & Red Countdown */}
        <WeddingCalendarSection timeLeft={timeLeft} />

        {/* Section 8: Poem & Forever and Ever */}
        <WeddingCloudsPoemSection />

        {/* Section 9: Wedding Venue Venus Luxury & Map & Sunshine Photo */}
        <WeddingVenueSection />

        {/* Section 10: Hộp quà mừng (Chú rể) */}
        <WeddingGiftSection
          groomBank={groomBank}
          groomName={WEDDING_COUPLE.groom.fullName}
          isCopied={copySuccess === 'groom'}
          onCopy={() => void copy(groomBank.accountNumber, 'groom')}
        />

        {/* Section 11: Footer Thank You */}
        <WeddingFooterSection />
      </PhoneFrame>

      {/* Modal: Gift / QR Banking (Cô dâu) */}
      <WeddingGiftModal
        isOpen={showGiftModal}
        onClose={() => setShowGiftModal(false)}
        brideBank={brideBank}
        brideName={WEDDING_COUPLE.bride.modalName}
        isCopied={copySuccess === 'bride'}
        onCopy={() => void copy(brideBank.accountNumber, 'bride')}
      />

      {/* Floating Scroll to Top button */}
      <ScrollToTopButton show={showScrollTop} onClick={scrollToTop} />
    </div>
  );
};

export default WeddingPage;

