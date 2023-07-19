import { UserMetadata } from "@supabase/supabase-js";
import supabase from "../libs/supabase";
import { Comment, Comments, InsertDto, Response } from "../libs/supabase/types";

export type GetCommentsDto = Comments & {
    users: {
        id: string,
        name: string,
        user_metadata: UserMetadata
    }
}

class CommentRepository {
    public async fetchCommentsBySiteAndContent(siteId: number, content_id: string): Promise<Response<GetCommentsDto>> {
        return await supabase.from<'comments', Comments>('comments').select('name').eq("site_id", siteId).eq("content_id", content_id)
    }

    public async saveComment(comment: InsertDto<'comments'>): Promise<Response<Comments>> {
        return await supabase.from('comments').insert(comment).select()
    }
}

const commentRepository = new CommentRepository()
export default commentRepository