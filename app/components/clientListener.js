"use client";

import { useEffect, useState } from "react";
import { getSocket } from "./socketStuff/connectSocket.js";

export default function Home() {

  useEffect(() => {
    console.log("useEffect in Home ran");
    const socket = getSocket();

    socket.on("message", () => {
      console.log("message from server");
    });

    return () => {
      socket.off("message");
    };
  }, []);


}