import { useEffect, useState, useCallback } from 'react';
import { HeroPage } from './pages/HeroPage';
import { WeddingPage } from './pages/WeddingPage';
import { WEDDING_COUPLE } from './config/wedding.config';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'hero' | 'wedding'>('hero');

  useEffect(() => {
    if (WEDDING_COUPLE.groom.shortName && WEDDING_COUPLE.bride.shortName) {
      const gInit = WEDDING_COUPLE.groom.shortName.charAt(0);
      const bInit = WEDDING_COUPLE.bride.shortName.charAt(0);
      document.title = `${gInit}&${bInit} — The Journey of Love, We Begin Together`;
    }
  }, []);

  const handleOpenInvitation = useCallback(() => {
    setCurrentPage('wedding');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleBackToHero = useCallback(() => {
    setCurrentPage('hero');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return currentPage === 'wedding' ? (
    <WeddingPage onBackToTech={handleBackToHero} />
  ) : (
    <HeroPage onOpenInvitation={handleOpenInvitation} />
  );
}
