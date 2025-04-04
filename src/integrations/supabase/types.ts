export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ad_campaigns: {
        Row: {
          advertiser_id: string
          budget: number
          created_at: string
          end_date: string
          id: string
          name: string
          placement_type: string
          start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          advertiser_id: string
          budget: number
          created_at?: string
          end_date: string
          id?: string
          name: string
          placement_type: string
          start_date: string
          status?: string
          updated_at?: string
        }
        Update: {
          advertiser_id?: string
          budget?: number
          created_at?: string
          end_date?: string
          id?: string
          name?: string
          placement_type?: string
          start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ad_campaigns_advertiser_id_fkey"
            columns: ["advertiser_id"]
            isOneToOne: false
            referencedRelation: "advertisers"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_clicks: {
        Row: {
          campaign_id: string
          city: string | null
          click_time: string
          converted: boolean | null
          country: string | null
          creative_id: string
          device_type: string | null
          id: string
          ip_address: string | null
          page_url: string | null
          user_agent: string | null
        }
        Insert: {
          campaign_id: string
          city?: string | null
          click_time?: string
          converted?: boolean | null
          country?: string | null
          creative_id: string
          device_type?: string | null
          id?: string
          ip_address?: string | null
          page_url?: string | null
          user_agent?: string | null
        }
        Update: {
          campaign_id?: string
          city?: string | null
          click_time?: string
          converted?: boolean | null
          country?: string | null
          creative_id?: string
          device_type?: string | null
          id?: string
          ip_address?: string | null
          page_url?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_clicks_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "ad_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_clicks_creative_id_fkey"
            columns: ["creative_id"]
            isOneToOne: false
            referencedRelation: "ad_creatives"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_creatives: {
        Row: {
          campaign_id: string
          click_url: string
          created_at: string
          dimensions: string
          id: string
          storage_path: string
        }
        Insert: {
          campaign_id: string
          click_url: string
          created_at?: string
          dimensions: string
          id?: string
          storage_path: string
        }
        Update: {
          campaign_id?: string
          click_url?: string
          created_at?: string
          dimensions?: string
          id?: string
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "ad_creatives_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "ad_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_impressions: {
        Row: {
          campaign_id: string
          city: string | null
          country: string | null
          creative_id: string
          device_type: string | null
          id: string
          impression_time: string
          ip_address: string | null
          page_url: string | null
          user_agent: string | null
        }
        Insert: {
          campaign_id: string
          city?: string | null
          country?: string | null
          creative_id: string
          device_type?: string | null
          id?: string
          impression_time?: string
          ip_address?: string | null
          page_url?: string | null
          user_agent?: string | null
        }
        Update: {
          campaign_id?: string
          city?: string | null
          country?: string | null
          creative_id?: string
          device_type?: string | null
          id?: string
          impression_time?: string
          ip_address?: string | null
          page_url?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_impressions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "ad_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_impressions_creative_id_fkey"
            columns: ["creative_id"]
            isOneToOne: false
            referencedRelation: "ad_creatives"
            referencedColumns: ["id"]
          },
        ]
      }
      advertiser_payments: {
        Row: {
          advertiser_id: string
          amount: number
          campaign_id: string | null
          id: string
          payment_date: string
          payment_method: string | null
          status: string
          transaction_id: string | null
        }
        Insert: {
          advertiser_id: string
          amount: number
          campaign_id?: string | null
          id?: string
          payment_date?: string
          payment_method?: string | null
          status?: string
          transaction_id?: string | null
        }
        Update: {
          advertiser_id?: string
          amount?: number
          campaign_id?: string | null
          id?: string
          payment_date?: string
          payment_method?: string | null
          status?: string
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "advertiser_payments_advertiser_id_fkey"
            columns: ["advertiser_id"]
            isOneToOne: false
            referencedRelation: "advertisers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "advertiser_payments_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "ad_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      advertisers: {
        Row: {
          company_name: string
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          company_name: string
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          company_name?: string
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          client_id: string
          created_at: string
          date: string
          duration: number | null
          id: string
          notes: string | null
          provider_id: string
          service_id: string
          status: string
          time_slot: string
          total_price: number
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          date: string
          duration?: number | null
          id?: string
          notes?: string | null
          provider_id: string
          service_id: string
          status?: string
          time_slot: string
          total_price: number
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          date?: string
          duration?: number | null
          id?: string
          notes?: string | null
          provider_id?: string
          service_id?: string
          status?: string
          time_slot?: string
          total_price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "service_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_analytics: {
        Row: {
          campaign_id: string
          clicks: number | null
          cost: number | null
          ctr: number | null
          date: string
          id: string
          impressions: number | null
          revenue: number | null
          roi: number | null
          updated_at: string
        }
        Insert: {
          campaign_id: string
          clicks?: number | null
          cost?: number | null
          ctr?: number | null
          date: string
          id?: string
          impressions?: number | null
          revenue?: number | null
          roi?: number | null
          updated_at?: string
        }
        Update: {
          campaign_id?: string
          clicks?: number | null
          cost?: number | null
          ctr?: number | null
          date?: string
          id?: string
          impressions?: number | null
          revenue?: number | null
          roi?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_analytics_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "ad_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      farms: {
        Row: {
          created_at: string
          farm_name: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          farm_name: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          farm_name?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      favorite_trends: {
        Row: {
          created_at: string
          id: string
          trend_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          trend_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          trend_id?: number
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          is_read: boolean | null
          recipient_id: string
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          recipient_id: string
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          recipient_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          booking_id: string | null
          created_at: string
          currency: string | null
          id: string
          payment_method: string | null
          status: string
          transaction_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          booking_id?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          payment_method?: string | null
          status: string
          transaction_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          booking_id?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          payment_method?: string | null
          status?: string
          transaction_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_type: string | null
          bio: string | null
          created_at: string
          id: string
          is_verified: boolean | null
          location: string | null
          name: string
          phone: string | null
          profile_image: string | null
          profile_type: string
          updated_at: string
        }
        Insert: {
          account_type?: string | null
          bio?: string | null
          created_at?: string
          id: string
          is_verified?: boolean | null
          location?: string | null
          name: string
          phone?: string | null
          profile_image?: string | null
          profile_type: string
          updated_at?: string
        }
        Update: {
          account_type?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          is_verified?: boolean | null
          location?: string | null
          name?: string
          phone?: string | null
          profile_image?: string | null
          profile_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          booking_id: string
          client_id: string
          content: string | null
          created_at: string
          id: string
          provider_id: string
          rating: number
          service_id: string
          updated_at: string
        }
        Insert: {
          booking_id: string
          client_id: string
          content?: string | null
          created_at?: string
          id?: string
          provider_id: string
          rating: number
          service_id: string
          updated_at?: string
        }
        Update: {
          booking_id?: string
          client_id?: string
          content?: string | null
          created_at?: string
          id?: string
          provider_id?: string
          rating?: number
          service_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "service_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_comparisons: {
        Row: {
          comparison_data: Json
          created_at: string
          id: string
          name: string
          timeframe: string
          trends: number[]
          user_id: string
        }
        Insert: {
          comparison_data: Json
          created_at?: string
          id?: string
          name: string
          timeframe: string
          trends: number[]
          user_id: string
        }
        Update: {
          comparison_data?: Json
          created_at?: string
          id?: string
          name?: string
          timeframe?: string
          trends?: number[]
          user_id?: string
        }
        Relationships: []
      }
      service_categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      service_listings: {
        Row: {
          availability: Json | null
          avg_rating: number | null
          base_price: number
          category_id: string | null
          created_at: string
          description: string
          id: string
          images: string[] | null
          is_featured: boolean | null
          location: string | null
          price_type: string
          provider_id: string
          title: string
          total_reviews: number | null
          updated_at: string
        }
        Insert: {
          availability?: Json | null
          avg_rating?: number | null
          base_price: number
          category_id?: string | null
          created_at?: string
          description: string
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          location?: string | null
          price_type: string
          provider_id: string
          title: string
          total_reviews?: number | null
          updated_at?: string
        }
        Update: {
          availability?: Json | null
          avg_rating?: number | null
          base_price?: number
          category_id?: string | null
          created_at?: string
          description?: string
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          location?: string | null
          price_type?: string
          provider_id?: string
          title?: string
          total_reviews?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_listings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_listings_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          is_active: boolean | null
          payment_id: string | null
          plan_type: string
          start_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          payment_id?: string | null
          plan_type: string
          start_date: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          payment_id?: string | null
          plan_type?: string
          start_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tracking_events: {
        Row: {
          category: string
          created_at: string
          date: string
          id: string
          module_name: string
          notes: string | null
          progress: number | null
          title: string
          type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          date: string
          id?: string
          module_name: string
          notes?: string | null
          progress?: number | null
          title: string
          type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          date?: string
          id?: string
          module_name?: string
          notes?: string | null
          progress?: number | null
          title?: string
          type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      record_ad_click: {
        Args: {
          p_creative_id: string
          p_campaign_id: string
          p_page_url: string
          p_user_agent: string
          p_ip_address: string
        }
        Returns: string
      }
      record_ad_impression: {
        Args: {
          p_creative_id: string
          p_campaign_id: string
          p_page_url: string
          p_user_agent: string
          p_ip_address: string
        }
        Returns: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
