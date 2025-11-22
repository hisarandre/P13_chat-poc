package com.yourcaryourway.back.controller;

import com.yourcaryourway.back.dto.ChatMessage;
import com.yourcaryourway.back.enums.MessageType;
import com.yourcaryourway.back.service.ChatService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Handles real time chat between clients and support.
 * Sends messages via STOMP with WebSocket.
 */
@RestController
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    /**
     * Gets the chat message history.
     *
     * @return a copy of the message list
     */
    @GetMapping("/api/messages")
    public List<ChatMessage> getMessages() {
        return chatService.getMessages();
    }

    /**
     * Handles messages from participant.
     * The message is sent to all chat participants.
     *
     * @param chatMessage the message sent
     */
    @MessageMapping("/chat.send")
    public void sendMessage(@Payload ChatMessage chatMessage) {
        chatService.sendMessage(chatMessage, MessageType.CHAT);
    }

    /**
     * Notifies that a user has joined the chat.
     *
     * @param chatMessage the notification message with user information
     */
    @MessageMapping("/chat.join")
    public void userJoined(@Payload ChatMessage chatMessage) {
        chatService.sendMessage(chatMessage, MessageType.JOIN);
    }

    /**
     * Notifies that a user has left the chat.
     *
     * @param chatMessage the notification message with user information
     */
    @MessageMapping("/chat.leave")
    public void userLeft(@Payload ChatMessage chatMessage) {
        chatService.sendMessage(chatMessage, MessageType.LEAVE);
    }
}