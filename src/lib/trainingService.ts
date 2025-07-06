import { supabase } from './supabaseClient';

export interface Training {
  id: string;
  title: string;
  description: string;
  start_date: string;
  start_time: string;
  end_date?: string;
  end_time?: string;
  location: string;
  image_url?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  max_participants: number;
  price: number;
  currency: string;
  status: 'draft' | 'published' | 'completed' | 'cancelled';
  topics: string[];
  requirements?: string[];
  instructor: string;
  instructor_bio?: string;
  registration_enabled: boolean;
  registration_fields: string[];
  certificate_provided: boolean;
  materials_included: string[];
  created_at: string;
  updated_at: string;
}

export interface TrainingRegistration {
  id: string;
  training_id: string;
  registration_data: {
    name?: string;
    email?: string;
    phone?: string;
    [key: string]: any;
  };
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

export interface TrainingRegistrationWithTraining extends TrainingRegistration {
  training_title?: string;
  training_start_date?: string;
  training_start_time?: string;
  training_location?: string;
}

export const fetchTrainings = async (): Promise<Training[]> => {
  const { data, error } = await supabase
    .from('trainings')
    .select('*')
    .order('start_date', { ascending: true });

  if (error) {
    throw error;
  }

  return data || [];
};

export const fetchTrainingById = async (id: string): Promise<Training | null> => {
  const { data, error } = await supabase
    .from('trainings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching training:', error);
    return null;
  }

  return data;
};

export const createTraining = async (training: Omit<Training, 'id' | 'created_at' | 'updated_at'>): Promise<Training> => {
  const { data, error } = await supabase
    .from('trainings')
    .insert([training])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateTraining = async (id: string, training: Partial<Training>): Promise<Training> => {
  const { data, error } = await supabase
    .from('trainings')
    .update(training)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteTraining = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('trainings')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
};

export const createTrainingRegistration = async (registration: Omit<TrainingRegistration, 'id' | 'created_at'>): Promise<TrainingRegistration> => {
  const { data, error } = await supabase
    .from('training_registrations')
    .insert([registration])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const fetchTrainingRegistrations = async (trainingId?: string): Promise<TrainingRegistration[]> => {
  let query = supabase
    .from('training_registrations')
    .select('*')
    .order('created_at', { ascending: false });

  if (trainingId) {
    query = query.eq('training_id', trainingId);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data || [];
};

export const fetchTrainingRegistrationsWithTrainings = async (trainingId?: string): Promise<TrainingRegistrationWithTraining[]> => {
  let query = supabase
    .from('training_registrations')
    .select(`
      *,
      trainings!inner(
        title,
        start_date,
        start_time,
        location
      )
    `)
    .order('created_at', { ascending: false });

  if (trainingId) {
    query = query.eq('training_id', trainingId);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  // Transform the data to match our interface
  const transformedData = data?.map(registration => ({
    ...registration,
    training_title: registration.trainings?.title,
    training_start_date: registration.trainings?.start_date,
    training_start_time: registration.trainings?.start_time,
    training_location: registration.trainings?.location,
  })) || [];

  return transformedData;
}; 