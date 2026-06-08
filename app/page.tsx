import LandingPhaser from "@/components/LandingPhaser";
import { createServerSideClient } from '@/utils/supabase/server'

export default async function HomePage() {
  const supabase = await createServerSideClient()

  const { data, error } = await supabase
    .from('Profiles')
    .select()

  if (error) {
    console.log("Supabase fel:", error.message)
  }

  return (
    <main className="landing-page">
      <LandingPhaser />
    </main>
  );
}

