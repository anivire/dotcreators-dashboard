export interface ArtistProfile {
  id: string;
  username: string;
  userId: string;
  joinedAt: Date;
  tweetsCount: number;
  followersCount: number;
  url: string;
  images: {
    avatar: string;
    banner?: string;
  };
  weeklyFollowersGrowingTrend?: number;
  weeklyPostsGrowingTrend?: number;
  country?: string;
  tags?: string[];
  name?: string;
  website?: string;
  bio?: string;
  lastUpdatedAt: Date;
  createdAt: Date;
}
