
import { useEffect, useState } from "react";
import { getSocket } from "./socketStuff/connectSocket.js";

export default function setupListeners() {

  useEffect(() => {
    console.log("useEffect in setupListeners ran");
    const socket = getSocket();

    socket.on("message", () => {
      console.log("message from server");
    });

    return () => {
      socket.off("message");
    };
  }, []);


}