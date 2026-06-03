"use client";

import { JSX, useEffect, useState } from "react";

const EmojiThrower = (): JSX.Element => {
  const [emoji, setEmoji] = useState<string>("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event: MessageEvent) => {
      setEmoji(event.data);
    };
    return () => ws.close();
  }, []);

  return <span>{emoji || "❌"}</span>;
};

export default EmojiThrower;
