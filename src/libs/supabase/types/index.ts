/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { Database } from './database.types';

// -------Utility-------
export type TableNames = keyof Database['public']['Tables'];

export type Table<T extends TableNames> = Database['public']['Tables'][T];
export type Row<T extends TableNames> = Table<T>['Row'];
export type InsertDto<T extends TableNames> = Table<T>['Insert'];
export type UpdateDto<T extends TableNames> = Table<T>['Update'];

export type Response<T extends Schema<any>> = PostgrestSingleResponse<T['table']['Row'][]>;
export type ResponseData<T extends Schema<any>> = Response<T>['data'];
export type ResponseError<T extends Schema<any>> = Response<T>['error'];

// -------Schema-------
export type Schema<T extends TableNames> = {
    table: Table<T>,
    name: T
};

export type Sites = Schema<'sites'>;
export type Comments = Schema<'comments'>;

export type Site = Row<'sites'>;


export type Comment = Row<'comments'>;
export type CommentInsertDto = InsertDto<'comments'>
export type CommentUpdateDto = UpdateDto<'comments'>