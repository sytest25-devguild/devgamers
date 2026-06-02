import { getSocket } from "./socketStuff/connectSocket"; // ← same shared socket

export default function TestButtonEmitMessage() {
  const socket = getSocket();
  socket.emit("message", "emitting message from testButtonEmitMessage");
}