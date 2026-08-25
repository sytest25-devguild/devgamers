import { createClient } from '@/utils/supabase/client'

export async function getProfile() {
  const supabase = createClient()

  // Hämta inloggad användares id från sessionen
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error('Ingen inloggad användare', userError)
    return null
  }

  // Hämta profilraden som matchar användarens id
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, username, email, created_at, updated_at')
    .eq('id', user.id)
    .single()

  if (profileError) {
    console.error('Kunde inte hämta profil', profileError)
    return null
  }

  return profile
}