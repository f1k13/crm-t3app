/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createServer } from "http";
import next from "next";
import { WebSocketServer } from "ws";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    // Обрабатываем HTTP-запросы через Next.js
    handle(req, res);
  });

  // Создаем WebSocket сервер
  const wss = new WebSocketServer({ server });

  wss.on(
    "connection",
    (ws: {
      send: (arg0: string) => void;
      on: (arg0: string, arg1: () => void) => void;
    }) => {
      console.log("WebSocket client connected");

      // Эмитируем событие (например, входящий звонок)
      setInterval(() => {
        const callData = { callId: "12345", callerName: "John Doe" };
        ws.send(JSON.stringify(callData));
      }, 5000); // Каждые 5 секунд отправляем уведомление о звонке

      // Обработка закрытия соединения
      ws.on("close", () => {
        console.log("WebSocket client disconnected");
      });
    },
  );

  // Запуск сервера
  server.listen(3000, () => {
    console.log("> Ready on http://localhost:3000");
  });
});
