import { Injectable, signal } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {ChatMessage, MessageType} from '../interfaces/ChatMessage.interface';

const CHAT_TOPIC = '/topic/chat';

const SOCKET_URL = 'http://localhost:8080/ws';

enum ChatDestination {
  SEND = '/app/chat.send',
  JOIN = '/app/chat.join',
  LEAVE = '/app/chat.leave'
}

@Injectable({ providedIn: 'root' })
export class WebSocketService {

  private stompClient: Client | null = null;

  connected = signal(false);
  messages = signal<ChatMessage[]>([]);

  connect(username: string): void {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      reconnectDelay: 5000
    });

    this.stompClient.onConnect = () => {
      this.connected.set(true);

      this.stompClient?.subscribe(CHAT_TOPIC, (msg) => {
        const chatMessage: ChatMessage = JSON.parse(msg.body);
        this.messages.update(list => [...list, chatMessage]);
      });

      this.sendJoinMessage(username);
    };

    this.stompClient.activate();
  }

  sendMessage(message: string, username: string): void {
    if (this.stompClient?.connected) {
      const chatMessage: ChatMessage = {
        sender: username,
        content: message,
        type: MessageType.CHAT,
      };
      this.stompClient?.publish({destination: ChatDestination.SEND, body: JSON.stringify(chatMessage)});
    }
  }

  disconnect(username: string): void {
    this.sendLeaveMessage(username);
    this.stompClient?.deactivate();
    this.connected.set(false);
    this.messages.set([]);
  }

  private sendJoinMessage(username: string): void {
    const message: ChatMessage = {
      sender: username,
      content: '',
      type: MessageType.JOIN
    };
    this.stompClient?.publish({destination: ChatDestination.JOIN, body: JSON.stringify(message)});
  }

  private sendLeaveMessage(username: string): void {
    const message: ChatMessage = {
      sender: username,
      content: '',
      type: MessageType.LEAVE
    };
    this.stompClient?.publish({destination: ChatDestination.LEAVE, body: JSON.stringify(message)});
  }
}
