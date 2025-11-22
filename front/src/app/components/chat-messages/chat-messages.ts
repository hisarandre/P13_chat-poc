import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ChatMessage, MessageType} from '../../interfaces/ChatMessage.interface';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {NgClass} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconButton} from '@angular/material/button';


@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.html',
  imports: [
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatIcon,
    MatCardContent,
    NgClass,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconButton,
  ],
  styleUrls: ['./chat-messages.css']
})
export class ChatMessages {
  @Input() username = '';
  @Input() messages: ChatMessage[] = [];
  @Output() onSend = new EventEmitter<string>();
  @Output() onDisconnect= new EventEmitter<void>();

  readonly MessageType = MessageType;

  messageContent = '';

  get canSendMessage(): boolean {
    return this.messageContent.trim().length > 0;
  }

  get isSupport(): boolean {
    return this.username === 'Support';
  }

  get canDisconnect(): boolean {
    return !this.isSupport;
  }

  isSystemMessage(message: ChatMessage): boolean {
    return message.type === MessageType.JOIN || message.type === MessageType.LEAVE;
  }

  sendMessage(){
    this.onSend.emit(this.messageContent.trim());
    this.messageContent = '';
  }

  disconnect(){
    this.onDisconnect.emit();
  }

  getMessageText(message: ChatMessage) {
    switch (message.type) {
      case MessageType.JOIN:
        return `${message.sender} a rejoint le chat`;
      case MessageType.LEAVE:
        return `${message.sender} a quitté le chat`;
      case MessageType.CHAT:
        return message.content;
    }
  }

  formatTime(ts?: Date) {
    return ts ? new Date(ts).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '';
  }

  getMessageClasses(message: ChatMessage): string {
    const isOwnMessage = message.sender === this.username;
    return isOwnMessage
      ? 'flex justify-end'
      : 'flex justify-start';
  }

  getMessageBubbleClasses(message: ChatMessage): string {
    const isOwnMessage = message.sender === this.username;
    const baseClasses = 'rounded-lg p-3 max-w-xs lg:max-w-md';

    return isOwnMessage
      ? `${baseClasses} bg-blue-600 text-white`
      : `${baseClasses} border border-gray-300 text-gray-800`;
  }

  getSenderNameClasses(message: ChatMessage): string {
    return message.sender === this.username ? 'text-white' : 'text-blue-600';
  }
}
