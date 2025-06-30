
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

export const casesService = {
  async getAll(): Promise<QueryArrayResult<Case>> {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  async getById(id: string): Promise<QueryResult<Case>> {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  },

  async create(caseData: CaseInsert): Promise<QueryResult<Case>> {
    const { data, error } = await supabase
      .from('cases')
      .insert(caseData)
      .select()
      .single();
    
    return { data, error };
  },

  async update(id: string, updates: CaseUpdate): Promise<QueryResult<Case>> {
    const { data, error } = await supabase
      .from('cases')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    return { data, error };
  },

  async delete(id: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('cases')
      .delete()
      .eq('id', id);
    
    return { error };
  }
};

export const callResultsService = {
  async getByCaseId(caseId: string): Promise<QueryArrayResult<CallResult>> {
    const { data, error } = await supabase
      .from('call_results')
      .select('*')
      .eq('case_id', caseId)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  async create(callResultData: CallResultInsert): Promise<QueryResult<CallResult>> {
    const { data, error } = await supabase
      .from('call_results')
      .insert(callResultData)
      .select()
      .single();
    
    return { data, error };
  }
};

export const profilesService = {
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

  async getAll(): Promise<QueryArrayResult<Profile>> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    return { data, error };
  }
};

export const statisticsService = {
  async getCaseStatistics() {
    const { data: cases, error } = await supabase
      .from('cases')
      .select('status, created_at');

    if (error) return { data: null, error };

    const total = cases?.length || 0;
    const statusCounts = cases?.reduce((acc, case_) => {
      acc[case_.status || 'draft'] = (acc[case_.status || 'draft'] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

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
