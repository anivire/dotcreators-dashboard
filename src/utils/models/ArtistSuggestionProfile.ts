export interface ArtistSuggestionProfile {
  requestId: string;
  username: string;
  country: string | null;
  tags: string[];
  requestStatus: string;
  avatarUrl: string;
  createdAt: Date;
}
