export interface WeddingVenue {
  name: string;
  hall?: string;
  address: string;
  mapEmbedUrl: string;
  mapExternalUrl: string;
}

export interface WeddingConfig {
  targetDate: string;
  title: string;
  dateFormatted: string;
  lunarText: string;
}

export interface WeddingCoupleMember {
  fullName: string;
  shortName: string;
  modalName?: string;
}

export interface WeddingCouple {
  groom: WeddingCoupleMember;
  bride: WeddingCoupleMember;
}

export interface WeddingPageProps {
  onBackToTech: () => void;
}
