
export interface Database {
    public: {
        Tables: {
            plans: {
                Row: {
                    id: string
                    user_id: string
                    title: string
                    description: string
                    date: Date
                    location: string
                    created_at: Date
                    updated_at: Date
                    participants: Database["public"]["Tables"]["participants"]["Row"][],
                }
                Insert: {
                    id?: string
                    user_id: string
                    title: string
                    description: string
                    date: Date
                    location: string
                    created_at?: Date
                    updated_at?: Date
                }
                Update: {
                    id: string
                    user_id?: string
                    title?: string
                    description?: string
                    date?: Date
                    location?: string
                    created_at?: Date
                    updated_at?: Date
                }
            },
            participants: {
                Row: {
                    id: string
                    plan_id: string
                    name: string
                    email: string
                    created_at: Date
                    updated_at: Date
                },
                Insert: {
                    id: string
                    plan_id: string
                    name: string
                    email: string
                    created_at?: Date
                    updated_at?: Date
                },
            },
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

export type Plan = Database["public"]["Tables"]["plans"]["Row"];
export type PlanInsert = Database["public"]["Tables"]["plans"]["Insert"];
export type PlanUpdate = Database["public"]["Tables"]["plans"]["Insert"];
export type Participant = Database["public"]["Tables"]["participants"]["Row"];
export type ParticipantInsert = Database["public"]["Tables"]["participants"]["Insert"];
