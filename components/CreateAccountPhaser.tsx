"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function CreateAccountPhaser() {
  const gameContainerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    let game: Phaser.Game | null = null;

    const handlePhaserNavigate = (event: Event) => {
      const customEvent = event as CustomEvent<{ path?: string }>;
      const path = customEvent.detail?.path;

      if (typeof path === "string" && path.length > 0) {
        router.push(path);
      }
    };

    window.addEventListener("phaser:navigate", handlePhaserNavigate as EventListener);

    async function startGame() {
      if (!gameContainerRef.current || !isMounted) return;

      const Phaser = (await import("phaser")).default;
      const CreateAccountScene = (await import("@/game/scenes/CreateAccountScene")).default;

      if (!gameContainerRef.current || !isMounted) return;

      const config = {
        type: Phaser.AUTO,
        parent: gameContainerRef.current,
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: "#0f172a",
        dom: {
          createContainer: true,
        },
        scene: [CreateAccountScene],
        scale: {
          mode: Phaser.Scale.RESIZE,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
      };

      game = new Phaser.Game(config);
    }

    startGame();

    return () => {
      isMounted = false;
      window.removeEventListener("phaser:navigate", handlePhaserNavigate as EventListener);
      game?.destroy(true);
      game = null;
    };
  }, [router]);

  return <div ref={gameContainerRef} className="phaser-container" />;
}
