export interface PostsType {
  link: string;
  linkID: number;
  postCollect: {
    title: string;
    content: string;
  } | null;
  websiteID: number;
}

export interface newPosts {
  postCollectID: number;
  title: string;
  content: string;
  linkExtractID: number;
}

export interface Post{
    postFinallyID: number;
    title: string;
    content: string;
    summary: string;
    keywords: string;
    postCollectID: string;
}
