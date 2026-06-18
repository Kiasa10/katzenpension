export interface Comment {
  id?: string;
  headline: string;
  username: string;
  content: string;
  date: Date;
}

export interface NewComment {
  headline: string;
  author: string;
  content: string;
  imagePath?: string;
}
