export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      auth_token_revocations: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          token_hash: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          token_hash: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          token_hash?: string
        }
        Relationships: []
      }
      causes: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          avatar_url: string | null
          company_name: string
          contact_email: string | null
          contact_phone: string | null
          cover_image_url: string | null
          created_at: string
          creator_id: string
          description: string | null
          email: string | null
          employees_count: number | null
          esg_priorities: string[] | null
          founded_year: number | null
          id: string
          industry: string | null
          location: string | null
          onboarding_completed: boolean
          tagline: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          company_name: string
          contact_email?: string | null
          contact_phone?: string | null
          cover_image_url?: string | null
          created_at?: string
          creator_id: string
          description?: string | null
          email?: string | null
          employees_count?: number | null
          esg_priorities?: string[] | null
          founded_year?: number | null
          id?: string
          industry?: string | null
          location?: string | null
          onboarding_completed?: boolean
          tagline?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          company_name?: string
          contact_email?: string | null
          contact_phone?: string | null
          cover_image_url?: string | null
          created_at?: string
          creator_id?: string
          description?: string | null
          email?: string | null
          employees_count?: number | null
          esg_priorities?: string[] | null
          founded_year?: number | null
          id?: string
          industry?: string | null
          location?: string | null
          onboarding_completed?: boolean
          tagline?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      company_domains: {
        Row: {
          company_id: string
          created_at: string
          domain: string
          id: string
          is_active: boolean
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          domain: string
          id?: string
          is_active?: boolean
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          domain?: string
          id?: string
          is_active?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_domains_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_members: {
        Row: {
          company_id: string
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_members_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      company_social_development_goals: {
        Row: {
          company_id: string
          created_at: string
          sdg_id: number
        }
        Insert: {
          company_id: string
          created_at?: string
          sdg_id: number
        }
        Update: {
          company_id?: string
          created_at?: string
          sdg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_social_development_goals_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_social_development_goals_sdg_id_fkey"
            columns: ["sdg_id"]
            isOneToOne: false
            referencedRelation: "social_development_goals"
            referencedColumns: ["id"]
          },
        ]
      }
      mission_causes: {
        Row: {
          cause_id: string
          created_at: string
          mission_id: string
        }
        Insert: {
          cause_id: string
          created_at?: string
          mission_id: string
        }
        Update: {
          cause_id?: string
          created_at?: string
          mission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mission_causes_cause_id_fkey"
            columns: ["cause_id"]
            isOneToOne: false
            referencedRelation: "causes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mission_causes_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
        ]
      }
      mission_participants: {
        Row: {
          created_at: string
          id: string
          joined_at: string
          left_at: string | null
          mission_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          joined_at?: string
          left_at?: string | null
          mission_id: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          joined_at?: string
          left_at?: string | null
          mission_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mission_participants_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mission_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      mission_skills: {
        Row: {
          created_at: string
          mission_id: string
          skill_id: string
        }
        Insert: {
          created_at?: string
          mission_id: string
          skill_id: string
        }
        Update: {
          created_at?: string
          mission_id?: string
          skill_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mission_skills_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mission_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      mission_social_development_goals: {
        Row: {
          created_at: string
          mission_id: string
          sdg_id: number
        }
        Insert: {
          created_at?: string
          mission_id: string
          sdg_id: number
        }
        Update: {
          created_at?: string
          mission_id?: string
          sdg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "mission_social_development_goals_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mission_social_development_goals_sdg_id_fkey"
            columns: ["sdg_id"]
            isOneToOne: false
            referencedRelation: "social_development_goals"
            referencedColumns: ["id"]
          },
        ]
      }
      missions: {
        Row: {
          approval_status: string
          approved_at: string | null
          approved_by_user_id: string | null
          beneficiaries_count: number
          company_id: string
          created_at: string
          created_by_company_id: string | null
          created_by_entity_type: string
          created_by_nonprofit_id: string | null
          created_by_user_id: string
          description: string | null
          end_date: string | null
          hours: number
          id: string
          is_virtual: boolean
          location: string | null
          organization_id: string
          point_of_contact: string | null
          registration_open: boolean | null
          requirements: string | null
          start_date: string | null
          target_company_id: string | null
          target_nonprofit_id: string | null
          title: string
          updated_at: string
          volunteers_required: number
        }
        Insert: {
          approval_status?: string
          approved_at?: string | null
          approved_by_user_id?: string | null
          beneficiaries_count?: number
          company_id: string
          created_at?: string
          created_by_company_id?: string | null
          created_by_entity_type: string
          created_by_nonprofit_id?: string | null
          created_by_user_id: string
          description?: string | null
          end_date?: string | null
          hours?: number
          id?: string
          is_virtual?: boolean
          location?: string | null
          organization_id: string
          point_of_contact?: string | null
          registration_open?: boolean | null
          requirements?: string | null
          start_date?: string | null
          target_company_id?: string | null
          target_nonprofit_id?: string | null
          title: string
          updated_at?: string
          volunteers_required?: number
        }
        Update: {
          approval_status?: string
          approved_at?: string | null
          approved_by_user_id?: string | null
          beneficiaries_count?: number
          company_id?: string
          created_at?: string
          created_by_company_id?: string | null
          created_by_entity_type?: string
          created_by_nonprofit_id?: string | null
          created_by_user_id?: string
          description?: string | null
          end_date?: string | null
          hours?: number
          id?: string
          is_virtual?: boolean
          location?: string | null
          organization_id?: string
          point_of_contact?: string | null
          registration_open?: boolean | null
          requirements?: string | null
          start_date?: string | null
          target_company_id?: string | null
          target_nonprofit_id?: string | null
          title?: string
          updated_at?: string
          volunteers_required?: number
        }
        Relationships: [
          {
            foreignKeyName: "missions_approved_by_user_id_fkey"
            columns: ["approved_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "missions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "missions_created_by_company_id_fkey"
            columns: ["created_by_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "missions_created_by_nonprofit_id_fkey"
            columns: ["created_by_nonprofit_id"]
            isOneToOne: false
            referencedRelation: "nonprofits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "missions_created_by_user_id_fkey"
            columns: ["created_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "missions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "nonprofits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "missions_target_company_id_fkey"
            columns: ["target_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "missions_target_nonprofit_id_fkey"
            columns: ["target_nonprofit_id"]
            isOneToOne: false
            referencedRelation: "nonprofits"
            referencedColumns: ["id"]
          },
        ]
      }
      nonprofit_causes: {
        Row: {
          cause_id: string
          created_at: string
          nonprofit_id: string
        }
        Insert: {
          cause_id: string
          created_at?: string
          nonprofit_id: string
        }
        Update: {
          cause_id?: string
          created_at?: string
          nonprofit_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nonprofit_causes_cause_id_fkey"
            columns: ["cause_id"]
            isOneToOne: false
            referencedRelation: "causes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nonprofit_causes_nonprofit_id_fkey"
            columns: ["nonprofit_id"]
            isOneToOne: false
            referencedRelation: "nonprofits"
            referencedColumns: ["id"]
          },
        ]
      }
      nonprofit_members: {
        Row: {
          created_at: string
          id: string
          nonprofit_id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          nonprofit_id: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          nonprofit_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nonprofit_members_nonprofit_id_fkey"
            columns: ["nonprofit_id"]
            isOneToOne: false
            referencedRelation: "nonprofits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nonprofit_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      nonprofit_social_development_goals: {
        Row: {
          created_at: string
          nonprofit_id: string
          sdg_id: number
        }
        Insert: {
          created_at?: string
          nonprofit_id: string
          sdg_id: number
        }
        Update: {
          created_at?: string
          nonprofit_id?: string
          sdg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "nonprofit_social_development_goals_nonprofit_id_fkey"
            columns: ["nonprofit_id"]
            isOneToOne: false
            referencedRelation: "nonprofits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nonprofit_social_development_goals_sdg_id_fkey"
            columns: ["sdg_id"]
            isOneToOne: false
            referencedRelation: "social_development_goals"
            referencedColumns: ["id"]
          },
        ]
      }
      nonprofits: {
        Row: {
          avatar_url: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          creator_id: string
          description: string | null
          id: string
          location: string | null
          onboarding_completed: boolean
          organization_name: string
          organization_type: string | null
          social_media: Json | null
          updated_at: string
          website: string | null
          year_founded: number | null
        }
        Insert: {
          avatar_url?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          creator_id: string
          description?: string | null
          id?: string
          location?: string | null
          onboarding_completed?: boolean
          organization_name: string
          organization_type?: string | null
          social_media?: Json | null
          updated_at?: string
          website?: string | null
          year_founded?: number | null
        }
        Update: {
          avatar_url?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          creator_id?: string
          description?: string | null
          id?: string
          location?: string | null
          onboarding_completed?: boolean
          organization_name?: string
          organization_type?: string | null
          social_media?: Json | null
          updated_at?: string
          website?: string | null
          year_founded?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "nonprofits_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          created_at: string
          id: string
          key: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      social_development_goals: {
        Row: {
          id: number
          image_url: string | null
          key: string
          name: string
        }
        Insert: {
          id: number
          image_url?: string | null
          key: string
          name: string
        }
        Update: {
          id?: number
          image_url?: string | null
          key?: string
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          description: string | null
          email: string
          full_name: string | null
          id: string
          location: string | null
          okta_user_id: string | null
          onboarding: boolean
          password_hash: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          description?: string | null
          email: string
          full_name?: string | null
          id?: string
          location?: string | null
          okta_user_id?: string | null
          onboarding?: boolean
          password_hash?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          description?: string | null
          email?: string
          full_name?: string | null
          id?: string
          location?: string | null
          okta_user_id?: string | null
          onboarding?: boolean
          password_hash?: string | null
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      volunteer_causes: {
        Row: {
          cause_id: string
          created_at: string
          volunteer_id: string
        }
        Insert: {
          cause_id: string
          created_at?: string
          volunteer_id: string
        }
        Update: {
          cause_id?: string
          created_at?: string
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_causes_cause_id_fkey"
            columns: ["cause_id"]
            isOneToOne: false
            referencedRelation: "causes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "volunteer_causes_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteers"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_skills: {
        Row: {
          created_at: string
          skill_id: string
          volunteer_id: string
        }
        Insert: {
          created_at?: string
          skill_id: string
          volunteer_id: string
        }
        Update: {
          created_at?: string
          skill_id?: string
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "volunteer_skills_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteers"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_social_development_goals: {
        Row: {
          created_at: string
          sdg_id: number
          volunteer_id: string
        }
        Insert: {
          created_at?: string
          sdg_id: number
          volunteer_id: string
        }
        Update: {
          created_at?: string
          sdg_id?: number
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_social_development_goals_sdg_id_fkey"
            columns: ["sdg_id"]
            isOneToOne: false
            referencedRelation: "social_development_goals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "volunteer_social_development_goals_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteers"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteers: {
        Row: {
          company_id: string | null
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          id: string
          updated_at?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "volunteers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

