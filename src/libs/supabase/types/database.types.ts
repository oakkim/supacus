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
          nickname: string | null
          parent_id: number | null
          site_id: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: string
          content_id: string
          created_at?: string | null
          id?: number
          ip?: string | null
          nickname?: string | null
          parent_id?: number | null
          site_id: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          content_id?: string
          created_at?: string | null
          id?: number
          ip?: string | null
          nickname?: string | null
          parent_id?: number | null
          site_id?: number
          updated_at?: string
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
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          id: string
          user_name: string | null
        }
        Insert: {
          avatar_url?: string | null
          id: string
          user_name?: string | null
        }
        Update: {
          avatar_url?: string | null
          id?: string
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
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
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      test: {
        Row: {
          created_at: string | null
          id: number
          pw: string | null
          test: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          pw?: string | null
          test?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          pw?: string | null
          test?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_anon_comment: {
        Args: {
          id: number
          password: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
