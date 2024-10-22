export interface PostData {
	id: string;
	title: string;
	content: string;
	url: string;
	user: string;
	posted_at: string;
	like_count: number;
	user_id:number;
}

export interface PostResponse {
	previous: string | null;
	next: string | null;
	count: number;
	results: PostData[];
}
