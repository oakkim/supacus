export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          content: string
          content_id: string
          created_at: string | null
          id: number
          ip: string | null
          parent_id: number | null
          site_id: number
          user_id: string | null
        }
        Insert: {
          content: string
          content_id: string
          created_at?: string | null
          id?: number
          ip?: string | null
          parent_id?: number | null
          site_id: number
          user_id?: string | null
        }
        Update: {
          content?: string
          content_id?: string
          created_at?: string | null
          id?: number
          ip?: string | null
          parent_id?: number | null
          site_id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_site_id_fkey"
            columns: ["site_id"]
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sites: {
        Row: {
          created_at: string | null
          id: number
          origin: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          origin: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          origin?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sites_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
