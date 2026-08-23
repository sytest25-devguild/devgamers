"use client";

import { JSX, useEffect, useState } from "react";
import URLS from "../../utils/constants/urls";

const EmojiThrower = (): JSX.Element => {
  const [emoji, setEmoji] = useState<string>("");

  useEffect(() => {
    const ws = new WebSocket(URLS.EXTERNAL_APIS.EMOJI_THROWER);
    ws.onmessage = (event: MessageEvent) => {
      setEmoji(event.data);
    };
    return () => ws.close();
  }, []);

  return (
    <div
      className={
        "flex flex-col items-center justify-center " +
        "fixed h-10 w-[200px] px-5 text-[120%] " +
        "bg-[#d4dce0] text-[#5d6263] rounded font-semibold"
      }
    >
      <p className="w-full text-center">Welcome! {emoji || "❌"}</p>
    </div>
  );
};

export default EmojiThrower;
