import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-login',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chat-login.html',
  styleUrl: './chat-login.css',
})
export class ChatLogin {
  username = '';

  @Output() onConnect = new EventEmitter<string>();

  get canConnect(): boolean {
    return this.username.trim().length > 0;
  }

  get buttonClasses(): string {
    const baseClasses = 'w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200';

    return this.canConnect
      ? `${baseClasses} transform bg-blue-600 hover:bg-blue-700 hover:shadow-lg`
      : `${baseClasses} bg-gray-300 cursor-not-allowed`;
  }

  connect(): void {
    if (this.canConnect) {
      this.onConnect.emit(this.username.trim());
    }
  }
}
