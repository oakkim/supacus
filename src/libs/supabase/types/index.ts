/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import type { Database } from './database.types'

// -------Utility-------
export type TableNames = keyof Database['public']['Tables']
export type ViewNames = keyof Database['public']['Views']
export type EntityNames = TableNames|ViewNames

export type Table<T extends TableNames> = Database['public']['Tables'][T]
export type View<T extends ViewNames> = Database['public']['Views'][T]
export type Entity<T extends EntityNames> = T extends TableNames ? Table<T> : T extends ViewNames ? View<T> : never

export type Row<T extends EntityNames> = Entity<T>['Row']
export type InsertDto<T extends EntityNames> = Entity<T>['Insert']
export type UpdateDto<T extends EntityNames> = Entity<T>['Update']

export type SchemaResponse<T extends Schema<any>> = PostgrestSingleResponse<T['entity']['Row'][]>
export type Response<T> = PostgrestSingleResponse<T>
export type ResponseData<T> = Response<T>['data']
export type ResponseError<T> = Response<T>['error']

// -------Schema-------
export type Schema<T extends EntityNames> = {
    entity: Entity<T>,
    name: T
}

export type Sites = Schema<'sites'>
export type Comments = Schema<'comments'>
export type CommentsView = Schema<'comments_without_passwords'>
export type Profiles = Schema<'profiles'>

export type Site = Row<'sites'>
export type SiteInsertDto = InsertDto<'sites'>
export type SiteUpdateDto = UpdateDto<'sites'>

export type Comment = Row<'comments'>
export type CommentGetDto = Row<'comments_without_passwords'>
export type CommentInsertDto = InsertDto<'comments'>
export type CommentUpdateDto = UpdateDto<'comments'>

export type Profile = Row<'profiles'>
export type ProfileInsertDto = InsertDto<'profiles'>
export type ProfileUpdateDto = UpdateDto<'profiles'>