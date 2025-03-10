export interface TikTokVideo {
    id: string;
    title: string;
    cover: string;
    playUrl: string;
    author: {
      username: string;
      nickname: string;
      avatarUrl: string;
    };
    stats: {
      likes: number;
      comments: number;
      shares: number;
    };
  }
  
  export interface TikTokApiResponse {
    data: TikTokVideo[];
    cursor: string;
    hasMore: boolean;
  }