export interface FetchedArtistProfile {
  username: string;
  name?: string;
  followersCount: number;
  tweetsCount: number;
  images: {
    avatar: string;
    banner?: string;
  };
}
