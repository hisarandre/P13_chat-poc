import {Component, OnInit} from '@angular/core';
import {WebSocketService} from '../../services/websocket.service';
import {ChatMessages} from '../../components/chat-messages/chat-messages';

@Component({
  selector: 'app-support-page',
  imports: [
    ChatMessages
  ],
  templateUrl: './support-page.html',
  styleUrl: './support-page.css',
})
export class SupportPage implements OnInit{
  username = 'Support';

  constructor(public webSocketService: WebSocketService) {}

  ngOnInit() {
    this.webSocketService.connect(this.username);
  }

  sendMessage(message: string) {
    if (!message.trim()) return;
    this.webSocketService.sendMessage(message, this.username);
  }
}
