package com.yourcaryourway.back.service;

import com.yourcaryourway.back.dto.ChatMessage;
import com.yourcaryourway.back.enums.MessageType;
import com.yourcaryourway.back.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatService {
    private static final String CHAT_TOPIC = "/topic/chat";

    private final ChatRepository repository;
    private final SimpMessagingTemplate messagingTemplate;

    public ChatService(ChatRepository repository,
                       SimpMessagingTemplate messagingTemplate) {
        this.repository = repository;
        this.messagingTemplate = messagingTemplate;
    }

    public void sendMessage(ChatMessage message, MessageType type) {
        message.setType(type);
        message.setTimestamp(LocalDateTime.now());
        repository.save(message);
        messagingTemplate.convertAndSend(CHAT_TOPIC, message);
    }

    public List<ChatMessage> getMessages() {
        return repository.findAll();
    }
}
