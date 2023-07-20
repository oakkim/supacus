/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import type { Database } from './database.types'

// -------Utility-------
export type TableNames = keyof Database['public']['Tables']

export type Table<T extends TableNames> = Database['public']['Tables'][T]
export type Row<T extends TableNames> = Table<T>['Row']
export type InsertDto<T extends TableNames> = Table<T>['Insert']
export type UpdateDto<T extends TableNames> = Table<T>['Update']

export type SchemaResponse<T extends Schema<any>> = PostgrestSingleResponse<T['table']['Row'][]>
export type Response<T> = PostgrestSingleResponse<T>
export type ResponseData<T> = Response<T>['data']
export type ResponseError<T> = Response<T>['error']

// -------Schema-------
export type Schema<T extends TableNames> = {
    table: Table<T>,
    name: T
}

export type Sites = Schema<'sites'>
export type Comments = Schema<'comments'>
export type Profiles = Schema<'profiles'>

export type Site = Row<'sites'>
export type SiteInsertDto = InsertDto<'sites'>
export type SiteUpdateDto = UpdateDto<'sites'>

export type Comment = Row<'comments'>
export type CommentInsertDto = InsertDto<'comments'>
export type CommentUpdateDto = UpdateDto<'comments'>

export type Profile = Row<'profiles'>
export type ProfileInsertDto = InsertDto<'profiles'>
export type ProfileUpdateDto = UpdateDto<'profiles'>