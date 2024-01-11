
export type Post = {
    id: number;
    image: string;
    text?: string;
    date: string;
    lesson_num: number;
    title: string;
    author?: number;
    onMoreClick? : (post:Post) => void;
    onStatusClick?: (status: LikeStatus) => void;
}

export type PostsList = Post[]

export enum TabsTypes {
    All = "all",
    MyFavorite = "favourites",
    Popular = "popular",
  }
  
  export type Tab = {
    key: TabsTypes;
    title: string;
    disabled: boolean;
  };
  export type TabsListType = Tab[];

  export enum Theme{
    Light = "light",
    Dark = "dark",
  }

  export enum LikeStatus{
    Like= "like",
    Dislike = 'dislike'
  }

  export enum SaveStatus{
    SavePost = 'savedPost'
  }