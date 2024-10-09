
export interface CommentData {
    comment: string;
    id: string;
    username: string
    post_id: string;
    posted_at: string;
    user_id: number;
}

export interface CommentResponse {
    results:CommentData[];
    prev:string;
    next:string;
    count:number;
}