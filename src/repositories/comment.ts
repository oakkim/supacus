import supabase from "../libs/supabase"
import { Comment, CommentInsertDto, CommentUpdateDto, Profile, Response } from "../libs/supabase/types"

export type CommentGetDtoWithProfile = Comment & {
  profiles: Profile
}

class CommentRepository {
  public async fetchBySiteAndContent(siteId: number, contentId: string): Promise<Response<CommentGetDtoWithProfile[]>> {
    return await supabase.from('comments')
        .select('*, profiles(*)')
        .eq("site_id", siteId)
        .eq("content_id", contentId)
        .order('created_at', { ascending: true })
        .returns<CommentGetDtoWithProfile[]>()
  }

  public async save(comment: CommentInsertDto): Promise<Response<null>> {
    return await supabase.from('comments').insert(comment)
  }

  public async modify(comment: CommentUpdateDto): Promise<Response<Comment>> {
    return await supabase.from('comments').update(comment).select().returns<Comment>()
  }

  public async delete(commentId: number): Promise<Response<null>> {
    return await supabase.from('comments').delete().eq('id', commentId)
  }

  public async deleteAnonComment(commentId: number, password: string): Promise<Response<null>> {
    return await supabase.rpc('delete_anon_comment', {id: commentId, password})
  }
}

const commentRepository = new CommentRepository()
export default commentRepository