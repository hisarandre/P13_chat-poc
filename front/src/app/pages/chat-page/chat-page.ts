import { Component } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';
import {ChatMessage} from '../../interfaces/ChatMessage.interface';
import { ChatLogin } from '../../components/chat-login/chat-login';
import {ChatMessages} from '../../components/chat-messages/chat-messages';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.html',
  styleUrls: ['./chat-page.css'],
  imports: [
    ChatLogin,
    ChatMessages
  ]
})
export class ChatPage {
  username = '';

  constructor(public webSocketService: WebSocketService) {}

  get isConnected(): boolean {
    return this.webSocketService.connected();
  }

  get messages(): ChatMessage[] {
    return this.webSocketService.messages();
  }

  handleConnect(username: string) {
    this.username = username;
    this.webSocketService.connect(username);
  }

  sendMessage(message: string) {
    if (!message.trim()) return;
    this.webSocketService.sendMessage(message, this.username);
  }

  disconnect() {
    this.webSocketService.disconnect(this.username);
    this.username = '';
  }
}
