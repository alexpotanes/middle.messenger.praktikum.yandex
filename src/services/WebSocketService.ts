export default class WebSocketService {
  private socket: WebSocket | null = null;
  private pingInterval: ReturnType<typeof setInterval> | null = null;
  private onMessageCallback: ((data: unknown) => void) | null = null;
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
  private lastParams: { userId: number; chatId: number; token: string } | null =
    null;

  connect(userId: number, chatId: number, token: string) {
    this.lastParams = { userId, chatId, token };
    this._connect(userId, chatId, token);
  }

  private _connect(userId: number, chatId: number, token: string) {
    if (this.socket) {
      this.socket.onclose = null;
      this.socket.close();
    }

    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }

    this.socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`,
    );

    this.socket.onopen = () => {
      this.pingInterval = setInterval(() => {
        this.socket?.send(JSON.stringify({ type: "ping" }));
      }, 25000);
      this.socket?.send(JSON.stringify({ content: "0", type: "get old" }));
    };

    this.socket.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data?.type === "pong") return;
      this.onMessageCallback?.(data);
    };

    this.socket.onerror = (e) => console.error("WebSocket error:", e);

    this.socket.onclose = (event) => {
      if (this.pingInterval) {
        clearInterval(this.pingInterval);
        this.pingInterval = null;
      }
      if (!event.wasClean && this.lastParams) {
        this.reconnectTimeout = setTimeout(() => {
          this._connect(userId, chatId, token);
        }, 3000);
      }
    };
  }

  onMessage(callback: (data: unknown) => void) {
    this.onMessageCallback = callback;
  }

  send(message: string) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ content: message, type: "message" }));
    }
  }

  close() {
    this.lastParams = null;
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    if (this.socket) {
      this.socket.onclose = null;
      this.socket.close();
    }
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }
}
