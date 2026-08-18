"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function UsernameChange({
  userId,
  currentUsername,
}: {
  userId: string;
  currentUsername: string;
}) {
  const [username, setUsername] = useState(currentUsername);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const supabase = createClient();

  const handleSave = async () => {
    setMessage(null);

    const trimmed = username.trim();

    if (trimmed.length === 0) {
      setMessage("Username får inte vara tomt.");
      return;
    }

    if (trimmed.length < 3) {
      setMessage("Username måste vara minst 3 tecken.");
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({ username: trimmed })
      .eq("id", userId);

    setSaving(false);

    if (error) {
      if (error.code === "23505") {
        setMessage("Det username:et är redan taget.");
      } else {
        setMessage("Något gick fel: " + error.message);
      }
      return;
    }

    setMessage("Sparat!");
  };

  return (
    <div>
      <p>Nuvarande username: {currentUsername}</p>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <button onClick={handleSave} disabled={saving}>
        {saving ? "Sparar..." : "Spara"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}