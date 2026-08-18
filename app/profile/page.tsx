import { createServerSideClient } from "@/utils/supabase/server";
import UsernameChange from "@/components/UsernameChange";

export default async function ProfilePage() {
  const supabase = await createServerSideClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <p>Du är inte inloggad.</p>;

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  return <UsernameChange userId={user.id} currentUsername={profile?.username ?? ""} />;
}