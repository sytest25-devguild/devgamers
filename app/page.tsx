"use client";

import Image from "next/image";
import setupListeners from "./components/clientListeners";
import { useEffect } from "react";
import testButtonEmitMessage from "./components/testButtonEmitMessage";
import { getSocket, disconnectSocket } from "./components/socketStuff/connectSocket";

export default function Home() {
  useEffect(() => {
    console.log("useEffect in Home ran");
    getSocket();
  }, []);
  

  
  const handleButtonClick = () => {
    testButtonEmitMessage();
  }
  
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-6xl font-bold text-center sm:text-left">
          Let the game begin.
        </h1>
        <p className="mt-3 text-2xl text-center sm:text-left">
          This is the landing page of the game. 
        </p>
        <button onClick={handleButtonClick} className="mt-5 px-5 py-3 rounded-lg bg-blue-500 text-white text-lg hover:bg-blue-600">
          testbutton
          </button>
      </main>
    </div>
  );
}
