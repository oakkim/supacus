import supabase from "../libs/supabase";
import { Comment, CommentInsertDto, Comments, Profile, Response } from "../libs/supabase/types";

export type GetCommentsDto = Comment & {
	profiles: Profile
}

class CommentRepository {
	public async fetchBySiteAndContent(siteId: number, content_id: string): Promise<Response<GetCommentsDto[]>> {
		return await supabase.from<'comments', Comments>('comments')
				.select('*, profiles(*)')
				.eq("site_id", siteId)
				.eq("content_id", content_id)
				.returns<GetCommentsDto[]>()
	}

	public async saveComment(comment: CommentInsertDto): Promise<Response<Comment>> {
		return await supabase.from('comments').insert(comment).select().returns<Comment>()
	}
}

const commentRepository = new CommentRepository()
export default commentRepository