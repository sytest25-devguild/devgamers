import { getIO } from "./ioServer.js";

export function serverTest() {
  const io = getIO();

  io.on("connection", (socket) => {
   // console.log("connected:", socket.id); // ← should only fire ONCE per tab
   // console.log("total:", io.engine.clientsCount); // ← should be 1 with one tab open
    console.log("someone connected");

    // Testing events =====================================================
    socket.on("thankYou", (data) => {
      console.log("Received message from client:", data);
    });

    socket.onAny((event, ...args) => {
      console.log("onAny");
      console.log(`server recieved event: "${event}"`, args);

      console.log(socket.id);
    });
    socket.on("message", (data) => {
      console.log("initServerListeners received your message:", data);
      // socket.emit("message", "Hello we recieved your message");
    });
    // =====================================================================
  });
}
