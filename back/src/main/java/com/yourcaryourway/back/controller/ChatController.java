package com.yourcaryourway.back.controller;

import com.yourcaryourway.back.dto.ChatMessage;
import com.yourcaryourway.back.enums.MessageType;
import com.yourcaryourway.back.service.ChatService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/api/messages")
    public List<ChatMessage> getMessages() {
        return chatService.getMessages();
    }

    @MessageMapping("/chat.send")
    public void sendMessage(@Payload ChatMessage chatMessage) {
        chatService.sendMessage(chatMessage, MessageType.CHAT);
    }

    @MessageMapping("/chat.join")
    public void userJoined(@Payload ChatMessage chatMessage) {
        chatService.sendMessage(chatMessage, MessageType.JOIN);
    }

    @MessageMapping("/chat.leave")
    public void userLeft(@Payload ChatMessage chatMessage) {
        chatService.sendMessage(chatMessage, MessageType.LEAVE);
    }
}