# Wedding Invitation Application

A modern, responsive, and elegant digital wedding invitation built with **React 19**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Vite**.

---

## Project Structure

```text
wedding/
├── public/                      # Static assets
├── src/
│   ├── assets/                  # Media files (audio, images)
│   │   ├── audio/
│   │   └── images/
│   ├── components/              # UI components
│   │   ├── common/              # Shared reusable components
│   │   │   ├── AudioPlayer.tsx
│   │   │   ├── ScrollToTopButton.tsx
│   │   │   └── WeddingPetalsCanvas.tsx
│   │   ├── layout/              # Layout containers
│   │   │   └── PhoneFrame.tsx
│   │   └── wedding/             # Wedding components
│   │       ├── sections/        # Modular invitation sections
│   │       │   ├── WeddingHeroCover.tsx
│   │       │   ├── WeddingLoveStoryBanner.tsx
│   │       │   ├── WeddingMessageSection.tsx
│   │       │   ├── WeddingBentoStorySection.tsx
│   │       │   ├── WeddingFallInLoveSection.tsx
│   │       │   ├── WeddingStoryGridSection.tsx
│   │       │   ├── WeddingCalendarSection.tsx
│   │       │   ├── WeddingCloudsPoemSection.tsx
│   │       │   ├── WeddingVenueSection.tsx
│   │       │   ├── WeddingGiftSection.tsx
│   │       │   └── WeddingFooterSection.tsx
│   │       ├── CalendarQrCard.tsx
│   │       ├── FloatingControls.tsx
│   │       └── WeddingGiftModal.tsx
│   ├── config/                  # App & event configurations
│   │   ├── env.config.ts
│   │   └── wedding.config.ts
│   ├── constants/               # Banking data, calendar & asset URLs
│   │   ├── bank.constants.ts
│   │   ├── calendar.constants.ts
│   │   └── images.constants.ts
│   ├── hooks/                   # Custom React hooks (audio, timer, scroll, copy)
│   │   ├── useAudioPlayer.ts
│   │   ├── useClipboard.ts
│   │   ├── useCountdown.ts
│   │   ├── useScrollTop.ts
│   │   └── useVideoFade.ts
│   ├── pages/                   # Main page views (Hero & Wedding)
│   │   ├── HeroPage.tsx
│   │   └── WeddingPage.tsx
│   ├── services/                # Supabase client & storage service
│   │   └── supabase.service.ts
│   ├── styles/                  # Fonts & theme animations
│   │   ├── fonts.css
│   │   └── theme.css
│   ├── types/                   # TypeScript interfaces & definitions
│   │   ├── bank.types.ts
│   │   ├── countdown.types.ts
│   │   ├── supabase.types.ts
│   │   └── wedding.types.ts
│   ├── utils/                   # Helper functions (calendar, clipboard)
│   │   ├── calendar.utils.ts
│   │   ├── clipboard.utils.ts
│   │   └── supabase.ts
│   ├── App.tsx                  # Root router & view controller
│   ├── index.css
│   └── main.tsx
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Key Features

- **Mobile-First Responsive Layout**: Optimized for mobile with a 500px phone frame on desktop.
- **Falling Petals Animation**: Dynamic canvas effect reacting to scroll velocity.
- **Audio Experience**: Background soundtrack with a spinning vinyl control toggle.
- **Countdown & Smart Calendar**: Live countdown and automated month calendar with pulsing heart badge.
- **Venue & Google Maps**: Embedded map with direct navigation link.
- **QR Banking & One-Click Copy**: Instant account copying for gift boxes.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 6](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Animation**: [Motion (Framer Motion)](https://motion.dev/)
- **Backend / Storage**: [Supabase](https://supabase.com/)
- **Linter**: [Oxlint](https://oxc.rs/)
