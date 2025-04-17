export type Database = {
  public: {
    Tables: {
      reports: {
        Row: {
          id: string;
          user_id: string | null;
          title: string;
          type: string;
          date: string;
          description: string;
          location: string | null;
          is_anonymous: boolean;
          contact_email: string | null;
          contact_phone: string | null;
          status: string;
          progress: number;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          title: string;
          type: string;
          date: string;
          description: string;
          location?: string | null;
          is_anonymous: boolean;
          contact_email?: string | null;
          contact_phone?: string | null;
          status?: string;
          progress?: number;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          title?: string;
          type?: string;
          date?: string;
          description?: string;
          location?: string | null;
          is_anonymous?: boolean;
          contact_email?: string | null;
          contact_phone?: string | null;
          status?: string;
          progress?: number;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      report_media: {
        Row: {
          id: string;
          report_id: string;
          file_path: string;
          file_type: string;
          file_name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          report_id: string;
          file_path: string;
          file_type: string;
          file_name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          report_id?: string;
          file_path?: string;
          file_type?: string;
          file_name?: string;
          created_at?: string;
        };
      };
    };
  };
};
