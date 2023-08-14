export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      images: {
        Row: {
          createdAt: string
          id: string
          imageUrl: string
          itemId: string
        }
        Insert: {
          createdAt?: string
          id: string
          imageUrl: string
          itemId: string
        }
        Update: {
          createdAt?: string
          id?: string
          imageUrl?: string
          itemId?: string
        }
        Relationships: [
          {
            foreignKeyName: "images_itemId_fkey"
            columns: ["itemId"]
            referencedRelation: "items"
            referencedColumns: ["id"]
          }
        ]
      }
      items: {
        Row: {
          createdAt: string
          id: string
          name: string
          storeId: string | null
        }
        Insert: {
          createdAt?: string
          id: string
          name: string
          storeId?: string | null
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
          storeId?: string | null
        }
        Relationships: []
      }
      markets: {
        Row: {
          address: string
          createdAt: string
          id: string
          name: string
        }
        Insert: {
          address: string
          createdAt?: string
          id?: string
          name: string
        }
        Update: {
          address?: string
          createdAt?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      stores: {
        Row: {
          address: string
          createdAt: string
          id: string
          marketId: string
          name: string
        }
        Insert: {
          address: string
          createdAt?: string
          id?: string
          marketId: string
          name: string
        }
        Update: {
          address?: string
          createdAt?: string
          id?: string
          marketId?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "stores_marketId_fkey"
            columns: ["marketId"]
            referencedRelation: "markets"
            referencedColumns: ["id"]
          }
        ]
      }
      variations: {
        Row: {
          createdAt: string
          id: string
          itemId: string
          name: string
          price: number
          quantity: number | null
        }
        Insert: {
          createdAt?: string
          id: string
          itemId: string
          name: string
          price: number
          quantity?: number | null
        }
        Update: {
          createdAt?: string
          id?: string
          itemId?: string
          name?: string
          price?: number
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "variations_itemId_fkey"
            columns: ["itemId"]
            referencedRelation: "items"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      stores: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          address: string
          marketName: string
          marketAddress: string
        }[]
      }
      variations: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          itemId: string
          name: string
          storeId: string
          variation: string
          price: number
          quantity: number
          imageUrl: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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
