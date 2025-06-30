
// Database types exported from Supabase integration
// This file provides type-safe database operations for the frontend

import { Database } from '@/integrations/supabase/types';

// Table types
export type Tables = Database['public']['Tables'];

// Individual table row types
export type Profile = Tables['profiles']['Row'];
export type ProfileInsert = Tables['profiles']['Insert'];
export type ProfileUpdate = Tables['profiles']['Update'];

export type Case = Tables['cases']['Row'];
export type CaseInsert = Tables['cases']['Insert'];
export type CaseUpdate = Tables['cases']['Update'];

export type CallResult = Tables['call_results']['Row'];
export type CallResultInsert = Tables['call_results']['Insert'];
export type CallResultUpdate = Tables['call_results']['Update'];

// Enum types for better type safety
export type UserRole = 'user' | 'admin';
export type CaseStatus = 'draft' | 'submitted' | 'hearing' | 'negotiating' | 'completed' | 'cancelled';

// Function types
export type DatabaseFunctions = Database['public']['Functions'];

// Helper types for common operations
export type DatabaseError = {
  message: string;
  code?: string;
  details?: string;
};

// Query result types
export type QueryResult<T> = {
  data: T | null;
  error: DatabaseError | null;
};

export type QueryArrayResult<T> = {
  data: T[] | null;
  error: DatabaseError | null;
};

// Re-export the main Database type for advanced usage
export type { Database };
