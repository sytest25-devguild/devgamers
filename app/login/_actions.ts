'use server';

import { createClient } from '@/utils/supabase/server';

export async function signInWithEmailAndPassword(email: string, password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, user: data.user };
}