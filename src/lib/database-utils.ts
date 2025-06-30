
import { supabase } from '@/integrations/supabase/client';
import { 
  Case, 
  CaseInsert, 
  CaseUpdate, 
  CallResult, 
  CallResultInsert, 
  Profile, 
  ProfileUpdate,
  QueryResult,
  QueryArrayResult 
} from './database.types';

// Cases operations
export const casesService = {
  // Get all cases (respects RLS - users see own cases, admins see all)
  async getAll(): Promise<QueryArrayResult<Case>> {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  // Get case by ID (respects RLS)
  async getById(id: string): Promise<QueryResult<Case>> {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  },

  // Create new case
  async create(caseData: CaseInsert): Promise<QueryResult<Case>> {
    const { data, error } = await supabase
      .from('cases')
      .insert(caseData)
      .select()
      .single();
    
    return { data, error };
  },

  // Update case
  async update(id: string, updates: CaseUpdate): Promise<QueryResult<Case>> {
    const { data, error } = await supabase
      .from('cases')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    return { data, error };
  },

  // Delete case
  async delete(id: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('cases')
      .delete()
      .eq('id', id);
    
    return { error };
  }
};

// Call results operations
export const callResultsService = {
  // Get call results for a case
  async getByCaseId(caseId: string): Promise<QueryArrayResult<CallResult>> {
    const { data, error } = await supabase
      .from('call_results')
      .select('*')
      .eq('case_id', caseId)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  // Create call result
  async create(callResultData: CallResultInsert): Promise<QueryResult<CallResult>> {
    const { data, error } = await supabase
      .from('call_results')
      .insert(callResultData)
      .select()
      .single();
    
    return { data, error };
  }
};

// Profiles operations
export const profilesService = {
  // Get current user profile
  async getCurrentUserProfile(): Promise<QueryResult<Profile>> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: { message: 'User not authenticated' } };
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    return { data, error };
  },

  // Update current user profile
  async updateCurrentUserProfile(updates: ProfileUpdate): Promise<QueryResult<Profile>> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: { message: 'User not authenticated' } };
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();
    
    return { data, error };
  },

  // Get all profiles (for admin use)
  async getAll(): Promise<QueryArrayResult<Profile>> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    return { data, error };
  }
};

// Statistics operations (for admin dashboard)
export const statisticsService = {
  // Get case statistics
  async getCaseStatistics() {
    const { data: cases, error } = await supabase
      .from('cases')
      .select('status, created_at');

    if (error) return { data: null, error };

    // Calculate statistics
    const total = cases?.length || 0;
    const statusCounts = cases?.reduce((acc, case_) => {
      acc[case_.status || 'draft'] = (acc[case_.status || 'draft'] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    // Monthly statistics
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonth = cases?.filter(case_ => {
      const caseDate = new Date(case_.created_at || '');
      return caseDate.getMonth() === currentMonth && caseDate.getFullYear() === currentYear;
    }).length || 0;

    return {
      data: {
        total,
        thisMonth,
        statusCounts,
        completionRate: total > 0 ? ((statusCounts.completed || 0) / total * 100) : 0
      },
      error: null
    };
  }
};
