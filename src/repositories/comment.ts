import supabase from "../libs/supabase";
import { Comment, Comments, Response } from "../libs/supabase/types";

class CommentRepository {
    public async fetchCommentsBySiteAndContent(siteId: number, content_id: string): Promise<Response<Comments>> {
        return await supabase.from<'comments', Comments>('comments').select().eq("site_id", siteId).eq("content_id", content_id)
    }

    public async saveComment(comment: Comment): Promise<Response<Comments>> {
        return await supabase.from('comments').insert(comment).select()
    }
}

const commentRepository = new CommentRepository()
export default commentRepository