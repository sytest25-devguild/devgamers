"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import EmojiThrower from "../../components/generate-text/EmojiThrower";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);

  // useLayoutEffect runs before the browser paints the page.
  // This prevents the page from flashing/switching to light mode
  // while the saved theme is being restored after navigation.
  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      return;
    }

    if (savedTheme === "light") {
      setDarkMode(false);
      return;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    setDarkMode(prefersDark);
    localStorage.setItem("theme", prefersDark ? "dark" : "light");
  }, []);

  function toggleTheme() {
    setDarkMode((current) => {
      const next = !current;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  }

  return (
    <main
      className={`min-h-screen transition-colors ${
        darkMode
          ? "bg-zinc-950 text-zinc-100"
          : "bg-white text-zinc-900"
      }`}
    >
      <nav
        className={`border-b ${
          darkMode ? "border-zinc-800" : "border-zinc-200"
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/home" className="font-bold">
            DevGamers
          </Link>

          <div className="flex items-center gap-5 text-sm">
            <Link href="/home" className="hover:underline">
              Home
            </Link>
            <Link href="/games" className="hover:underline">
              Games
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>

            <button
              type="button"
              onClick={toggleTheme}
              className={`rounded border px-3 py-1.5 ${
                darkMode
                  ? "border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
                  : "border-zinc-300 bg-zinc-100 hover:bg-zinc-200"
              }`}
            >
              {darkMode ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </div>
      </nav>
      <EmojiThrower />

      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center">
        <Image
          src="/logo.png"
          alt="DevGamers logo"
          width={420}
          height={420}
          priority
          className="h-auto w-full max-w-sm"
        />

        <h1 className="mt-8 text-3xl font-bold">Welcome to DevGamers</h1>
        <p
          className={`mt-3 max-w-xl ${
            darkMode ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          Play games, learn stuff, and whatever else we decide to put here.
        </p>

        <Link
          href="/games"
          className={`mt-8 rounded border px-5 py-2 font-medium ${
            darkMode
              ? "border-zinc-700 hover:bg-zinc-900"
              : "border-zinc-300 hover:bg-zinc-100"
          }`}
        >
          View games
        </Link>
      </section>
    </main>
  );
}
