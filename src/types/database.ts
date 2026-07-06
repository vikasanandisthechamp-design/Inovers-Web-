// Minimal hand-written DB types for MVP.
// Regenerate with `pnpm dlx supabase gen types typescript` once CLI is wired up.

export type Database = {
  public: {
    Tables: {
      waitlist: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          city: string;
          skills: string;
          why: string | null;
          source: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          city: string;
          skills: string;
          why?: string | null;
          source?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["waitlist"]["Insert"]>;
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          city: string | null;
          headline: string | null;
          skills: string[] | null;
          avatar_url: string | null;
          innovator_score: number;
        };
        Insert: {
          id: string;
          created_at?: string;
          name: string;
          city?: string | null;
          headline?: string | null;
          skills?: string[] | null;
          avatar_url?: string | null;
          innovator_score?: number;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      ideas: {
        Row: {
          id: string;
          created_at: string;
          author_id: string;
          title: string;
          problem: string;
          proposal: string;
          tags: string[];
          skills_needed: string[];
          stage:
            | "spark"
            | "validate"
            | "pod_form"
            | "blueprint"
            | "execute"
            | "impact";
          upvotes: number;
          interested_count: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          author_id: string;
          title: string;
          problem: string;
          proposal: string;
          tags?: string[];
          skills_needed?: string[];
          stage?:
            | "spark"
            | "validate"
            | "pod_form"
            | "blueprint"
            | "execute"
            | "impact";
          upvotes?: number;
          interested_count?: number;
        };
        Update: Partial<Database["public"]["Tables"]["ideas"]["Insert"]>;
        Relationships: [];
      };
      idea_interests: {
        Row: {
          id: string;
          created_at: string;
          idea_id: string;
          user_id: string;
          role: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          idea_id: string;
          user_id: string;
          role?: string | null;
        };
        Update: Partial<
          Database["public"]["Tables"]["idea_interests"]["Insert"]
        >;
        Relationships: [];
      };
      pods: {
        Row: {
          id: string;
          created_at: string;
          idea_id: string;
          lead_id: string;
          name: string;
          status:
            | "forming"
            | "active"
            | "stalled"
            | "shipped"
            | "archived";
          summary: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          idea_id: string;
          lead_id: string;
          name: string;
          status?:
            | "forming"
            | "active"
            | "stalled"
            | "shipped"
            | "archived";
          summary?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["pods"]["Insert"]>;
        Relationships: [];
      };
      pod_members: {
        Row: {
          id: string;
          created_at: string;
          pod_id: string;
          user_id: string;
          role: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          pod_id: string;
          user_id: string;
          role: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["pod_members"]["Insert"]
        >;
        Relationships: [];
      };
      accelerator_leads: {
        Row: {
          id: string;
          created_at: string;
          cohort_code: string;
          name: string;
          email: string;
          city: string | null;
          role:
            | "founder"
            | "investor"
            | "mentor"
            | "operator"
            | "corporate_partner"
            | "student"
            | "media"
            | "other";
          startup_url: string | null;
          interest: string | null;
          source: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          cohort_code?: string;
          name: string;
          email: string;
          city?: string | null;
          role:
            | "founder"
            | "investor"
            | "mentor"
            | "operator"
            | "corporate_partner"
            | "student"
            | "media"
            | "other";
          startup_url?: string | null;
          interest?: string | null;
          source?: string | null;
        };
        Update: Partial<
          Database["public"]["Tables"]["accelerator_leads"]["Insert"]
        >;
        Relationships: [];
      };
      accelerator_applications: {
        Row: {
          id: string;
          created_at: string;
          cohort_code: string;
          application_code: string;
          email: string;
          founder_name: string;
          startup_name: string | null;
          city: string | null;
          status:
            | "submitted"
            | "in_review"
            | "interview"
            | "diligence"
            | "selected"
            | "rejected"
            | "withdrawn";
          answers: Record<string, unknown>;
          review_score: number | null;
          review_notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          cohort_code?: string;
          application_code: string;
          email: string;
          founder_name: string;
          startup_name?: string | null;
          city?: string | null;
          status?:
            | "submitted"
            | "in_review"
            | "interview"
            | "diligence"
            | "selected"
            | "rejected"
            | "withdrawn";
          answers: Record<string, unknown>;
          review_score?: number | null;
          review_notes?: string | null;
        };
        Update: Partial<
          Database["public"]["Tables"]["accelerator_applications"]["Insert"]
        >;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      recent_activity: {
        Args: { lim?: number };
        Returns: {
          kind: "joined" | "idea" | "interest" | "pod";
          who: string;
          city: string;
          what: string;
          created_at: string;
        }[];
      };
    };
    Enums: {
      idea_stage:
        | "spark"
        | "validate"
        | "pod_form"
        | "blueprint"
        | "execute"
        | "impact";
      pod_status:
        | "forming"
        | "active"
        | "stalled"
        | "shipped"
        | "archived";
    };
    CompositeTypes: Record<string, never>;
  };
};
